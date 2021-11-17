export interface Coordinates {
    x: number;
    y: number;
}

export default interface Mob {
    id: number;
    rawData: Uint8Array;
    unknown1: number | null;
    unknown2: number | null;
    startingCoordinates: Coordinates;
    flippedH: boolean;
    name: string;
    pathCoordinates: Array<Coordinates>;
    spawnFromMob: number;
}