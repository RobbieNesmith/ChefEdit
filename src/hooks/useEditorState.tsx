import { createContext, useContext, useMemo, useState } from "react";

export interface EditorState {
    leftClickPressed: boolean;
    rightClickPressed: boolean;
    setLeftClickPressed(pressed: boolean): void;
    setRightClickPressed(pressed: boolean): void;
}

function getEmptyEditorState(): EditorState {
    return {
        leftClickPressed: false,
        rightClickPressed: false,
        setLeftClickPressed: (b: boolean) => { throw new Error("Editor State Context not found") },
        setRightClickPressed: (b: boolean) => { throw new Error("Editor State Context not found") }
    }
}

export const EditorStateContext = createContext(getEmptyEditorState());

export default function useEditorState() {
    return useContext(EditorStateContext);
}

export function EditorStateProvider(props: {children: any}) {
    const [leftClickPressed, setLeftClickPressed] = useState(false);
    const [rightClickPressed, setRightClickPressed] = useState(false);

    const value = useMemo(() => ({
        leftClickPressed,
        rightClickPressed,
        setLeftClickPressed,
        setRightClickPressed
    }), [leftClickPressed, rightClickPressed]);

    return (
        <EditorStateContext.Provider value={value}>
            { props.children }
        </EditorStateContext.Provider>
    );
}