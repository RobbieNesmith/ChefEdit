import { useState } from "react";
import useEditorState from "../../hooks/useEditorState";
import "./LevelEditor.css";
import TileGrid from "./TileGrid";

function getBlankTileGrid(): Array<number> {
    return Array(20 * 15).fill(0);
}

export default function LevelEditor() {
    const {foregroundVisible, leftClickTileId, rightClickTileId, toggleForegroundVisible, setLeftClickTileId} = useEditorState();
    const [backgroundTiles, setBackgroundTiles] = useState(getBlankTileGrid());
    const [foregroundTiles, setForegroundTiles] = useState(getBlankTileGrid());

    function placeBackgroundTileAtIndex(index: number, button: number) {
        const tileToAdd = button === 0 ? leftClickTileId : rightClickTileId;
        setBackgroundTiles((bt) => {
            return [...bt.slice(0, index), tileToAdd, ...bt.slice(index + 1)];
        });
    }

    function placeForegroundTileAtIndex(index: number, button: number) {
        const tileToAdd = button === 0 ? leftClickTileId : rightClickTileId;
        setForegroundTiles((ft) => {
            return [...ft.slice(0, index), tileToAdd, ...ft.slice(index + 1)];
        });
    }

    function pickTile(tileId: number) {
        setLeftClickTileId(tileId);
    }

    return(
        <div className="LevelEditor">
            <div className="TileGridHolder">
                <TileGrid
                    tiles={backgroundTiles}
                    onTilePicked={pickTile}
                    onTilePlaced={placeBackgroundTileAtIndex}
                />
                {foregroundVisible ? <TileGrid
                    tiles={foregroundTiles}
                    onTilePicked={pickTile}
                    onTilePlaced={placeForegroundTileAtIndex}
                /> : null }
                <div
                    className="LayerTab"
                    onClick={toggleForegroundVisible}
                    style={{backgroundColor: foregroundVisible ? "#6888e8" : "#e09038"}}
                >
                    Editing: {foregroundVisible ? "Foreground" : "Background"}
                </div>
            </div>
        </div>
    );
}