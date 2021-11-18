import Mob, { Coordinates } from "../models/Mob";

const bgoffset = 88;
const fgoffset = 756;
const numMobsOffset = 1360;

export async function readFile(inputFile: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as ArrayBuffer)
    reader.readAsArrayBuffer(inputFile);
  });
}

export function getBackgroundLayer(fileData: ArrayBuffer) {
  const view = new Uint16Array(fileData.slice(bgoffset, bgoffset + 20 * 15 * 2));
  let background = [];
  for (var i = 0; i < 20 * 15; i++) {
    background.push(view[i]);
  }
  return background;
}

export function getForegroundLayer(fileData: ArrayBuffer) {
  const view = new Uint16Array(fileData.slice(fgoffset, fgoffset + 20 * 15 * 2));
  let foreground = [];
  for (var i = 0; i < 20 * 15; i++) {
    foreground.push(view[i]);
  }
  return foreground;
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