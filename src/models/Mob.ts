export interface Coordinates {
    x: number;
    y: number;
}

export default interface Mob {
    id: number;
    rawData: Uint8Array;
    extraData: ArrayBuffer | null;
    startingCoordinates: Coordinates;
    flippedH: boolean;
    name: string;
    pathCoordinates: Array<Coordinates>;
}