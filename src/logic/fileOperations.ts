import Mob from "../models/mob";

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

function parseMob(mobData: ArrayBuffer, id: number): Mob {
  const rawData = new Uint8Array(mobData);
  let ptr = 0;
  let extraData = null;
  let skip = 3;
  if (id !== 0) {
    skip = 4;
  }

  let extraDataLength = 0;
  if (rawData[0] & 0x10) {
    extraDataLength = 4;
  }
  if (rawData[0] & 0x01) {
    extraDataLength += 4;
  }
  extraData = mobData.slice(skip, skip + extraDataLength);
  ptr += skip + extraDataLength;

  const startCoords = new Float32Array(mobData.slice(ptr, ptr + 8));
  const startingCoordinates = {
    x: startCoords[0],
    y: startCoords[1]
  }
  ptr += 8;

  const flippedH = !!new Int32Array(mobData.slice(ptr, ptr + 4));
  ptr += 4;

  let nameEndPtr = ptr;
  while(rawData[nameEndPtr]) {
    nameEndPtr++;
  }
  const name = new TextDecoder().decode(new Uint8Array(mobData.slice(ptr, nameEndPtr)));
  ptr = nameEndPtr + 1;

  const numPathCoordinates = rawData[ptr];
  ptr += 4;

  let pathCoordinates = [];

  for (let i = 0; i < numPathCoordinates; i++) {
    const pathCoords = new Float32Array(mobData.slice(ptr, ptr + 8));
    pathCoordinates.push({
      x: pathCoords[0],
      y: pathCoords[1]
    });
    ptr += 8;
  }

  return {
    id,
    rawData,
    extraData,
    startingCoordinates,
    flippedH,
    name,
    pathCoordinates
  }
}

export function getMobs(fileData: ArrayBuffer): Array<Mob> {
  const view = new Uint8Array(fileData.slice(numMobsOffset));
  const numMobs = view[0];
  let ptr = 1;
  let mobDataStart = ptr;
  let delimiterCount = 0;
  let mobs = [];
  while (mobs.length < numMobs) {
    while (delimiterCount < 8 || view[ptr] === 0xFF) {
      if (view[ptr] === 0xFF) {
        delimiterCount++;
      } else {
        delimiterCount = 0;
      }
      ptr++;
    }
    mobs.push(fileData.slice(numMobsOffset + mobDataStart, numMobsOffset + ptr));
    mobDataStart = ptr;
    delimiterCount = 0;
  }
  return mobs.map(parseMob);
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