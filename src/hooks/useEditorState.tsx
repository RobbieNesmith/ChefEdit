import { createContext, useContext, useMemo, useState } from "react";

export interface EditorState {
    leftClickPressed: boolean;
    rightClickPressed: boolean;
    foregroundVisible: boolean;
    leftClickTileId: number;
    rightClickTileId: number;
    setLeftClickPressed(pressed: boolean): void;
    setRightClickPressed(pressed: boolean): void;
    toggleForegroundVisible(): void;
    setLeftClickTileId(tileId: number): void;
    setRightClickTileId(tileId: number): void;
}

function getEmptyEditorState(): EditorState {
    return {
        leftClickPressed: false,
        rightClickPressed: false,
        foregroundVisible: true,
        leftClickTileId: 0,
        rightClickTileId: 0,
        setLeftClickPressed: (b: boolean) => { throw new Error("Editor State Context not found") },
        setRightClickPressed: (b: boolean) => { throw new Error("Editor State Context not found") },
        toggleForegroundVisible: () => { throw new Error("Editor State Context not found") },
        setLeftClickTileId: (tileId: number) => { throw new Error("Editor State Context not found") },
        setRightClickTileId: (tileId: number) => { throw new Error("Editor State Context not found") }
    }
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

    const value = useMemo(() => ({
        leftClickPressed,
        rightClickPressed,
        foregroundVisible,
        leftClickTileId,
        rightClickTileId,
        setLeftClickPressed,
        setRightClickPressed,
        toggleForegroundVisible: () => setForegroundVisible(fv => !fv),
        setLeftClickTileId: (id: number) => setLeftClickTileId(id),
        setRightClickTileId: (id: number) => setRightClickTileId(id)
    }), [leftClickPressed, rightClickPressed, foregroundVisible, leftClickTileId, rightClickTileId]);

    return (
        <EditorStateContext.Provider value={value}>
            { props.children }
        </EditorStateContext.Provider>
    );
}