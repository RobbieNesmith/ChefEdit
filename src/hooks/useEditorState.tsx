import { createContext, useContext, useMemo, useState } from "react";
import ChefHeaders from "../models/ChefHeaders";
import Mob from "../models/Mob";

export interface EditorState {
    leftClickPressed: boolean;
    rightClickPressed: boolean;
    foregroundVisible: boolean;
    leftClickTileId: number;
    rightClickTileId: number;
    foregroundTiles: Uint16Array;
    backgroundTiles: Uint16Array;
    levelData: ArrayBuffer;
    mobs: Array<Mob>;
    showMobs: boolean;
    headers: ChefHeaders | null;
    setLeftClickPressed(pressed: boolean): void;
    setRightClickPressed(pressed: boolean): void;
    toggleForegroundVisible(): void;
    setLeftClickTileId(tileId: number): void;
    setRightClickTileId(tileId: number): void;
    setLevelData(data: ArrayBuffer): void;
    setForegroundTiles(tiles: Uint16Array): void;
    setBackgroundTiles(tiles: Uint16Array): void;
    setMobs(mobs: Array<Mob>): void;
    placeForegroundTileAtIndex(tileId: number, index: number): void,
    placeBackgroundTileAtIndex(tileId: number, index: number): void,
    pickTile(tileId: number): void,
    toggleMobs(): void,
    setHeaders(headers: ChefHeaders): void,
}

function getBlankTileGrid(): Uint16Array {
    return new Uint16Array(20 * 15);
}

export const EditorStateContext = createContext(null as EditorState | null);

export default function useEditorState() {
    const editorStateContext = useContext(EditorStateContext);
    if (!editorStateContext) throw new Error("Editor State Provider not found!");
    return editorStateContext;
}

export function EditorStateProvider(props: { children: any }) {
    const [leftClickPressed, setLeftClickPressed] = useState(false);
    const [rightClickPressed, setRightClickPressed] = useState(false);
    const [foregroundVisible, setForegroundVisible] = useState(true);
    const [leftClickTileId, setLeftClickTileId] = useState(0);
    const [rightClickTileId, setRightClickTileId] = useState(0);
    const [backgroundTiles, setBackgroundTiles] = useState(getBlankTileGrid());
    const [foregroundTiles, setForegroundTiles] = useState(getBlankTileGrid());
    const [levelData, setLevelData] = useState(new ArrayBuffer(0));
    const [mobs, setMobs] = useState([] as Array<Mob>);
    const [showMobs, setShowMobs] = useState(true);
    const [headers, setHeaders] = useState(null as ChefHeaders | null)

    function placeBackgroundTileAtIndex(index: number, tileId: number) {
        setBackgroundTiles((bt) => {
            return bt.map((tid, idx) => index === idx ? tileId : tid);
        });
    }

    function placeForegroundTileAtIndex(index: number, tileId: number) {
        setForegroundTiles((ft) => {
            return ft.map((tid, idx) => index === idx ? tileId : tid);
        });
    }

    function pickTile(tileId: number) {
        setLeftClickTileId(tileId);
    }

    const value = useMemo(() => ({
        leftClickPressed,
        rightClickPressed,
        foregroundVisible,
        leftClickTileId,
        rightClickTileId,
        foregroundTiles,
        backgroundTiles,
        levelData,
        mobs,
        showMobs,
        headers,
        setLeftClickPressed,
        setRightClickPressed,
        toggleForegroundVisible: () => setForegroundVisible(fv => !fv),
        setLeftClickTileId: (id: number) => setLeftClickTileId(id),
        setRightClickTileId: (id: number) => setRightClickTileId(id),
        setLevelData: (data: ArrayBuffer) => setLevelData(data),
        setForegroundTiles: (tiles: Uint16Array) => setForegroundTiles(tiles),
        setBackgroundTiles: (tiles: Uint16Array) => setBackgroundTiles(tiles),
        setMobs: (mobs: Array<Mob>) => setMobs(mobs),
        placeForegroundTileAtIndex,
        placeBackgroundTileAtIndex,
        pickTile,
        toggleMobs: () => setShowMobs(sm => !sm),
        setHeaders,
    }), [leftClickPressed, rightClickPressed, foregroundVisible, leftClickTileId, rightClickTileId, foregroundTiles, backgroundTiles, levelData, mobs, showMobs, headers]);

    return (
        <EditorStateContext.Provider value={value}>
            {props.children}
        </EditorStateContext.Provider>
    );
}