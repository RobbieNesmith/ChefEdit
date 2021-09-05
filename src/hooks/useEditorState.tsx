import { createContext, useContext, useMemo, useState } from "react";

export interface EditorState {
    leftClickPressed: boolean;
    rightClickPressed: boolean;
    foregroundVisible: boolean;
    leftClickTileId: number;
    rightClickTileId: number;
    foregroundTiles: Array<number>;
    backgroundTiles: Array<number>;
    setLeftClickPressed(pressed: boolean): void;
    setRightClickPressed(pressed: boolean): void;
    toggleForegroundVisible(): void;
    setLeftClickTileId(tileId: number): void;
    setRightClickTileId(tileId: number): void;
    placeForegroundTileAtIndex(tileId: number, index: number): void,
    placeBackgroundTileAtIndex(tileId: number, index: number): void,
    pickTile(tileId: number): void,
}

function getEmptyEditorState(): EditorState {
    return {
        leftClickPressed: false,
        rightClickPressed: false,
        foregroundVisible: true,
        leftClickTileId: 0,
        rightClickTileId: 0,
        foregroundTiles: getBlankTileGrid(),
        backgroundTiles: getBlankTileGrid(),
        setLeftClickPressed: (b: boolean) => { throw new Error("Editor State Context not found") },
        setRightClickPressed: (b: boolean) => { throw new Error("Editor State Context not found") },
        toggleForegroundVisible: () => { throw new Error("Editor State Context not found") },
        setLeftClickTileId: (tileId: number) => { throw new Error("Editor State Context not found") },
        setRightClickTileId: (tileId: number) => { throw new Error("Editor State Context not found") },
        placeForegroundTileAtIndex: (tileId: number, index: number) => { throw new Error("Editor State Context not found") },
        placeBackgroundTileAtIndex: (tileId: number, index: number) => { throw new Error("Editor State Context not found") },
        pickTile: (tileId: number) => { throw new Error("Editor State Context not found") },
    }
}

function getBlankTileGrid(): Array<number> {
    return Array(20 * 15).fill(0);
}

export const EditorStateContext = createContext(getEmptyEditorState());

export default function useEditorState() {
    return useContext(EditorStateContext);
}

export function EditorStateProvider(props: {children: any}) {
    const [leftClickPressed, setLeftClickPressed] = useState(false);
    const [rightClickPressed, setRightClickPressed] = useState(false);
    const [foregroundVisible, setForegroundVisible] = useState(true);
    const [leftClickTileId, setLeftClickTileId] = useState(0);
    const [rightClickTileId, setRightClickTileId] = useState(0);
    const [backgroundTiles, setBackgroundTiles] = useState(getBlankTileGrid());
    const [foregroundTiles, setForegroundTiles] = useState(getBlankTileGrid());

    function placeBackgroundTileAtIndex(index: number, tileId: number) {
        setBackgroundTiles((bt) => {
            return [...bt.slice(0, index), tileId, ...bt.slice(index + 1)];
        });
    }

    function placeForegroundTileAtIndex(index: number, tileId: number) {
        setForegroundTiles((ft) => {
            return [...ft.slice(0, index), tileId, ...ft.slice(index + 1)];
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
        setLeftClickPressed,
        setRightClickPressed,
        toggleForegroundVisible: () => setForegroundVisible(fv => !fv),
        setLeftClickTileId: (id: number) => setLeftClickTileId(id),
        setRightClickTileId: (id: number) => setRightClickTileId(id),
        placeForegroundTileAtIndex,
        placeBackgroundTileAtIndex,
        pickTile,
    }), [leftClickPressed, rightClickPressed, foregroundVisible, leftClickTileId, rightClickTileId, foregroundTiles, backgroundTiles]);

    return (
        <EditorStateContext.Provider value={value}>
            { props.children }
        </EditorStateContext.Provider>
    );
}