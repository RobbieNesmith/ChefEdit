import { createContext, useContext, useMemo, useState } from "react";

export interface EditorState {
    leftClickPressed: boolean;
    rightClickPressed: boolean;
    foregroundVisible: boolean;
    setLeftClickPressed(pressed: boolean): void;
    setRightClickPressed(pressed: boolean): void;
    toggleForegroundVisible(): void;
}

function getEmptyEditorState(): EditorState {
    return {
        leftClickPressed: false,
        rightClickPressed: false,
        foregroundVisible: true,
        setLeftClickPressed: (b: boolean) => { throw new Error("Editor State Context not found") },
        setRightClickPressed: (b: boolean) => { throw new Error("Editor State Context not found") },
        toggleForegroundVisible: () => { throw new Error("Editor State Context not found") },
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

    const value = useMemo(() => ({
        leftClickPressed,
        rightClickPressed,
        foregroundVisible,
        setLeftClickPressed,
        setRightClickPressed,
        toggleForegroundVisible: () => setForegroundVisible(fv => !fv),
    }), [leftClickPressed, rightClickPressed, foregroundVisible]);

    return (
        <EditorStateContext.Provider value={value}>
            { props.children }
        </EditorStateContext.Provider>
    );
}