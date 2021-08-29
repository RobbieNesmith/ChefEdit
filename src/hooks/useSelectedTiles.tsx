import { createContext, useContext, useMemo, useState } from "react";

export interface SelectedTileContextState {
    leftClickTileId: number;
    rightClickTileId: number;
    setLeftClickTileId(tileId: number): void;
    setRightClickTileId(tileId: number): void;
}

export const SelectedTileContext = createContext({leftClickTileId: 0, rightClickTileId: 0} as SelectedTileContextState);

export default function useSelectedTiles() {
    return useContext(SelectedTileContext);
}

export function SelectedTilesProvider(props: {children: any}) {
    const [leftClickTileId, setLeftClickTileId] = useState(0);
    const [rightClickTileId, setRightClickTileId] = useState(0);

    const value = useMemo(() => ({
        leftClickTileId,
        rightClickTileId,
        setLeftClickTileId: (tileId:number) => setLeftClickTileId(tileId),
        setRightClickTileId: (tileId:number) => setRightClickTileId(tileId)
    }), [leftClickTileId, rightClickTileId]);

    return (
        <SelectedTileContext.Provider value={value}>
            { props.children }
        </SelectedTileContext.Provider>
    );
}