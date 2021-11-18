import useEditorState from "../../hooks/useEditorState";
import "./LevelEditor.css";
import MobSprite from "./MobSprite";
import TileGrid from "./TileGrid";

export default function LevelEditor() {
    const {
        foregroundVisible,
        toggleForegroundVisible,
        backgroundTiles,
        foregroundTiles,
        placeBackgroundTileAtIndex,
        placeForegroundTileAtIndex,
        pickTile,
        mobs,
        showMobs,
        toggleMobs,
    } = useEditorState();

    return (
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
                /> : null}
                <div
                    className="LayerTab"
                    onClick={toggleForegroundVisible}
                    style={{ backgroundColor: foregroundVisible ? "#6888e8" : "#e09038" }}
                >
                    Editing: {foregroundVisible ? "Foreground" : "Background"}
                </div>

                <div
                    className="MobTab"
                    onClick={toggleMobs}
                    style={{ backgroundColor: showMobs ? "#6888e8" : "#e09038" }}
                >
                    {showMobs ? "Hide Mobs" : "Show Mobs"}
                </div>

                {
                    showMobs && mobs.map(m => <MobSprite key={m.id} mob={m} />)
                }
            </div>
        </div>
    );
}