import ChefHeaders from "../models/ChefHeaders";
import Mob, { Coordinates } from "../models/Mob";
import { saveAs } from "file-saver";

const bgoffset = 88;
const fgoffset = 756;
const numMobsOffset = 1360;
const baseMobLength = 32;

const fileHeaderLength = 0x14;
const layerHeaderLength = 0x44;

export async function readFile(inputFile: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as ArrayBuffer)
    reader.readAsArrayBuffer(inputFile);
  });
}

export function getHeaders(fileData: ArrayBuffer): ChefHeaders {
  return {
    fileHeader: new Uint8Array(fileData.slice(0, fileHeaderLength)),
    backgroundHeader: new Uint8Array(fileData.slice(bgoffset - layerHeaderLength, bgoffset)),
    foregroundHeader: new Uint8Array(fileData.slice(fgoffset - layerHeaderLength, fgoffset))
  };
}

export function getBackgroundLayer(fileData: ArrayBuffer) {
  return new Uint16Array(fileData.slice(bgoffset, bgoffset + 20 * 15 * 2));
}

export function getForegroundLayer(fileData: ArrayBuffer) {
  return new Uint16Array(fileData.slice(fgoffset, fgoffset + 20 * 15 * 2));
}

function readUint8(mobData: ArrayBuffer, ptr: number) {
  return new Uint8Array(mobData.slice(ptr, ptr + 1))[0];
}

function readInt32(mobData: ArrayBuffer, ptr: number) {
  return new Int32Array(mobData.slice(ptr, ptr + 4))[0];
}

function readFloat32(mobData: ArrayBuffer, ptr: number) {
  return new Float32Array(mobData.slice(ptr, ptr + 4))[0];
}

function readCString(mobData: ArrayBuffer, ptr: number) {
  const view = new Uint8Array(mobData);
  let nameEndPtr = ptr;
  while (nameEndPtr < mobData.byteLength && view[nameEndPtr] !== 0) {
    nameEndPtr++;
  }
  return new TextDecoder().decode(new Uint8Array(mobData.slice(ptr, nameEndPtr)));
}

export function getMobs(fileData: ArrayBuffer) {
  let mobs = [] as Array<Mob>;
  const mobData = fileData.slice(numMobsOffset);
  const numMobs = readUint8(mobData, 0);
  let ptr = 4;
  while (mobs.length < numMobs && ptr < mobData.byteLength) {
    const startPtr = ptr;
    const startX = readFloat32(mobData, ptr);
    ptr += 4;
    const startY = readFloat32(mobData, ptr);
    ptr += 4;

    const flippedH = readInt32(mobData, ptr);
    ptr += 4;

    const name = readCString(mobData, ptr);
    ptr += name.length + 1;

    const numPathCoordinates = readUint8(mobData, ptr);
    ptr += 4;

    let pathCoordinates = [] as Array<Coordinates>;

    for (let i = 0; i < numPathCoordinates; i++) {
      const pathX = readFloat32(mobData, ptr);
      ptr += 4;
      const pathY = readFloat32(mobData, ptr);
      ptr += 4;
      pathCoordinates.push({ x: pathX, y: pathY });
    }

    // The next 4 bytes are always 0x00
    ptr += 4;


    // The next 4 bytes are always 0xFF
    ptr += 4;

    const spawnFromMob = readUint8(mobData, ptr);
    ptr += 4;

    const extraDataFlag = readUint8(mobData, ptr);
    ptr += 4;

    let unknown1 = null as number | null;
    let unknown2 = null as number | null;

    if (extraDataFlag & 0x01) {
      unknown1 = readUint8(mobData, ptr);
      ptr += 4;
    }

    if (extraDataFlag & 0x10) {
      unknown2 = readFloat32(mobData, ptr);
      ptr += 4
    }

    mobs.push({
      id: mobs.length + 1,
      rawData: new Uint8Array(mobData.slice(startPtr, ptr)),
      unknown1: unknown1,
      unknown2: unknown2,
      startingCoordinates: { x: startX, y: startY },
      flippedH: flippedH === -1,
      name: name,
      pathCoordinates: pathCoordinates,
      spawnFromMob: spawnFromMob,
    });
  }
  return mobs;
}

function float32ToBytes(value: number) {
  return new Uint8Array(new Float32Array([value]).buffer);
}

function coordinatesToBytes(coordinates: Coordinates) {
  return new Uint8Array(new Float32Array([coordinates.x, coordinates.y]).buffer);
}

function stringToBytes(value: string) {
  return new Uint8Array([...Array.from(value).map(c => c.charCodeAt(0)), 0]);
}

function mobToBinary(mob: Mob) {
  const mobLength = baseMobLength // required fields
    + mob.name.length + 1 // mob name cstring length
    + mob.pathCoordinates.length * 8 // path coordinates (two float32s each)
    + (mob.unknown1 !== null ? 4 : 0) // optional padded uint8
    + (mob.unknown2 !== null ? 4 : 0); // optional float32

  const mobBinary = new Uint8Array(mobLength);

  let ptr = 0;

  const coordinateBytes = coordinatesToBytes(mob.startingCoordinates);

  for (let i = 0; i < 8; i++) {
    mobBinary[i] = coordinateBytes[i];
  }
  ptr += 8;

  const flipByte = mob.flippedH ? 255 : 0;
  for (let i = 0; i < 4; i++) {
    mobBinary[ptr + i] = flipByte;
  }
  ptr += 4;

  const nameBytes = stringToBytes(mob.name);
  for (let i = 0; i < nameBytes.byteLength; i++) {
    mobBinary[ptr + i] = nameBytes[i];
  }
  ptr += nameBytes.byteLength;

  mobBinary[ptr] = mob.pathCoordinates.length;
  ptr += 4;

  for (const pathCoords of mob.pathCoordinates) {
    const pathCoordinateBytes = coordinatesToBytes(pathCoords);
    for (let i = 0; i < 8; i++) {
      mobBinary[ptr + i] = pathCoordinateBytes[i];
    }
    ptr += 8;
  }
  // The next 4 bytes are always 0x00
  ptr += 4;

  // The next 4 bytes are always 0xFF
  for (let i = 0; i < 4; i++) {
    mobBinary[ptr + i] = 255;
  }
  ptr += 4;

  if (mob.spawnFromMob === 255) {
    for (let i = 0; i < 4; i++) {
      mobBinary[ptr + i] = 255;
    }
  } else {
    mobBinary[ptr] = mob.spawnFromMob;
  }
  ptr += 4;

  let extraDataFlag = 0;

  if (mob.unknown1 !== null) {
    extraDataFlag |= 16;
  }
  if (mob.unknown2 !== null) {
    extraDataFlag |= 1;
  }
  mobBinary[ptr] = extraDataFlag;
  ptr += 4;

  if (mob.unknown1 !== null) {
    mobBinary[ptr] = mob.unknown1;
    ptr += 4;
  }

  if (mob.unknown2 !== null) {
    const unknown2Bytes = float32ToBytes(mob.unknown2);
    for (let i = 0; i < 4; i++) {
      mobBinary[ptr + i] = unknown2Bytes[i];
    }
  }

  return mobBinary;
}

export function levelToBinary(headers: ChefHeaders, backgroundLayer: Uint16Array, foregroundLayer: Uint16Array, mobs: Array<Mob>) {
  const binaryMobs = mobs.map(mobToBinary);
  const mobLength = binaryMobs.map(m => m.byteLength).reduce((prev, next) => prev + next, 0);
  const levelLength = headers.fileHeader.byteLength
    + headers.backgroundHeader.byteLength
    + headers.foregroundHeader.byteLength
    + backgroundLayer.byteLength
    + foregroundLayer.byteLength
    + 8 // Mob header?
    + mobLength
    + 8; // EOF?

  const backgroundBytes = new Uint8Array(backgroundLayer.buffer);
  const foregroundBytes = new Uint8Array(foregroundLayer.buffer);

  const levelBinary = new Uint8Array(levelLength);

  let ptr = 0;

  for (let i = 0; i < headers.fileHeader.byteLength; i++) {
    levelBinary[i] = headers.fileHeader[i];
  }
  ptr += headers.fileHeader.byteLength;

  for (let i = 0; i < headers.backgroundHeader.byteLength; i++) {
    levelBinary[ptr + i] = headers.backgroundHeader[i];
  }
  ptr += headers.backgroundHeader.byteLength;

  for (let i = 0; i < backgroundBytes.byteLength; i++) {
    levelBinary[ptr + i] = backgroundBytes[i];
  }
  ptr += backgroundBytes.byteLength;

  for (let i = 0; i < headers.foregroundHeader.byteLength; i++) {
    levelBinary[ptr + i] = headers.foregroundHeader[i];
  }
  ptr += headers.foregroundHeader.byteLength;

  for (let i = 0; i < foregroundBytes.byteLength; i++) {
    levelBinary[ptr + i] = foregroundBytes[i];
  }
  ptr += foregroundBytes.byteLength;

  levelBinary[ptr] = 1;
  ptr += 4;
  levelBinary[ptr] = binaryMobs.length;
  ptr += 4;


  for (const mob of binaryMobs) {
    for (let i = 0; i < mob.byteLength; i++) {
      levelBinary[ptr + i] = mob[i];
    }
    ptr += mob.byteLength;
  }

  for (let i = 0; i < 8; i++) {
    levelBinary[ptr + i] = 255;
  }
  return levelBinary;
}

export function saveLevel(levelBinary: Uint8Array, fileName: string) {
  const blob = new Blob([levelBinary], { type: "application/octet-stream" });
  saveAs(blob, fileName);
}