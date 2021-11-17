import Mob, { Coordinates } from "../models/mob";

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
/*
function loadFileToEditor() {
  levelData = tmpLevelData;
  tmpLevelData = "";
  closeLoadDialog();
  var numMobsOffset = 1360;
  var bg = document.getElementById('workspace');
  var fg = document.getElementById('workspacefg');
  for (var i = 0; i < 20 * 15; i++) {
    var tile = levelData.charCodeAt(bgoffset + i * 2);
    tile += levelData.charCodeAt((bgoffset + i * 2 + 1)) * 256;
    placeAtIndex(0, i, tile);
  }
  for (var i = 0; i < 20 * 15; i++) {
    var tile = levelData.charCodeAt(fgoffset + i * 2);
    tile += levelData.charCodeAt((fgoffset + i * 2 + 1)) * 256;
    placeAtIndex(1, i, tile);
  }
  var numMobs = levelData.charCodeAt(numMobsOffset);
  console.log("Loading " + numMobs + " mobs.");
  var mobInfo = document.getElementById('mobinfo');
  for (var i = mobInfo.children.length - 1; i >= 0; i--) {
    mobInfo.removeChild(mobInfo.children[i]);
  }
  var mobDelim = String.fromCharCode(255);
  mobDelim += mobDelim;
  mobDelim += mobDelim;
  mobDelim += mobDelim;
  var mobArray = levelData.substr(numMobsOffset, levelData.length).split(mobDelim);
  for (var i = 0; i < numMobs; i++) {
    var mobHolder = document.createElement('div');
    var mobTitle = document.createElement('span');
    var mobData = document.createElement('textarea');
    mobHolder.className = "mobholder";
    mobTitle.innerText = "A mob";
    console.log(parseMob(mobArray[i], i === 0));
    for (var j = 0; j < mobArray[i].length; j++) {
      var temp = mobArray[i].charCodeAt(j).toString(16);
      if (temp.length === 1) {
        temp = "0" + temp;
      }
      mobData.value += temp;
    }
    mobData.style.width = "100%";
    mobData.style.height = "50px";
    mobData.style.resize = "vertical";
    mobHolder.appendChild(mobTitle);
    mobHolder.appendChild(mobData);
    mobInfo.appendChild(mobHolder);
  }
}

function newFile() {
  levelData = "";
  var bg = document.getElementById('workspace');
  var fg = document.getElementById('workspacefg');
  for (var i = 0; i < 20 * 15; i++) {
    placeAtIndex(0, i, 0);
    placeAtIndex(1, i, 0);
  }
}

function saveFile(levelName: string, levelData: string, backgroundTiles: Array<number>, foregroundTiles: Array<number>) {

  var firstChunk = levelData.substr(0, bgoffset);
  var secondChunk = levelData.substr(688, 68);
  var thirdChunk = levelData.substr(1356, levelData.length);
  var bgData = "";
  var fgData = "";
  for (var i = 0; i < 20 * 15; i++) {
    var bgTile = backgroundTiles[i];
    var fgTile = foregroundTiles[i];
    bgData += String.fromCharCode(bgTile & 255);
    bgData += String.fromCharCode(bgTile >> 8);
    fgData += String.fromCharCode(fgTile & 255);
    fgData += String.fromCharCode(fgTile >> 8);
  }
  levelData = firstChunk + bgData + secondChunk + fgData + thirdChunk;
  var outfile = "";
  for (var i = 0; i < levelData.length; i++) {
    var outChar = levelData.charCodeAt(i).toString(16);
    if (outChar.length == 1) {
      outfile += "0";
    }
    outfile += outChar;
  }

  var dlLink = document.createElement('a');
  dlLink.href = "data:text/plain," + outfile;
  dlLink.style.display = "none";
  dlLink.download = levelName;
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}

function parseMob(mobstr: string, isFirstMob: boolean) {
  function readFourBytes(theString: string, thePos: number) {
    var result = theString.charCodeAt(thePos);
    result *= 256;
    result += theString.charCodeAt(thePos + 1);
    result *= 256;
    result += theString.charCodeAt(thePos + 2);
    result *= 256;
    result += theString.charCodeAt(thePos + 3);
    return result;
  }

  // parse mob code

  var pointer = 0;
  var extraDataFlag;
  if (isFirstMob) {
    extraDataFlag = 0;
  } else {
    extraDataFlag = mobstr.charCodeAt(pointer);
  }
  var extraData;
  pointer += 4;
  if (extraDataFlag == 0x11) {
    extraData = mobstr.substr(pointer, 8);
    pointer += 8;
  } else if (extraDataFlag == 0x10) {
    extraData = mobstr.substr(pointer, 4);
    pointer += 4;
  } else if (extraDataFlag == 0x01) {
    extraData = mobstr.substr(pointer, 4);
    pointer += 4;
  }
  var coordinates = [];
  coordinates.push([readFourBytes(mobstr, pointer), readFourBytes(mobstr, pointer + 4)]);
  pointer += 8;
  var isFlipped = readFourBytes(mobstr, pointer);
  pointer += 4;
  var name = "";
  var curChar = "";
  while (curChar != String.fromCharCode(0)) {
    name += curChar;
    curChar = mobstr.charAt(pointer);
    pointer++;
  }
  var numCoords = mobstr.charCodeAt(pointer);
  pointer += 4;
  for (var i = 0; i < numCoords; i++) {
    coordinates.push([readFourBytes(mobstr, pointer), readFourBytes(mobstr, pointer + 4)]);
    pointer += 8;
  }

  return {
    extraDataFlag,
    extraData,
    isFlipped,
    numCoords,
    coordinates,
    name
  };
}
*/