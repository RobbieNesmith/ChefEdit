import useEditorState from "../../hooks/useEditorState";
import "./LevelEditor.css";
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
        mobs
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
                {
                    mobs.map(m => {
                        const pathStartString = `M ${m.startingCoordinates.x} ${m.startingCoordinates.y}`;
                        const pathContinuationString = m.pathCoordinates.map(p => `L ${p.x} ${p.y}`)
                        const pathString = [pathStartString, ...pathContinuationString].join(" ");
                        return (
                            <>
                                {
                                    pathString.length > 1 &&
                                    <svg width="640" height="480" className="MobPath">
                                        <path stroke="#FF00FF" strokeWidth="2" d={pathString} />
                                    </svg>
                                }
                                <div
                                    className="Mob"
                                    style={{
                                        left: m.startingCoordinates.x,
                                        bottom: 480 - m.startingCoordinates.y,
                                    }}
                                >
                                    <img
                                        src={`${process.env.PUBLIC_URL}/img/${m.name}.gif`}
                                        alt={m.name}
                                    />
                                </div>
                                {m.pathCoordinates.map(pc => {
                                    return (
                                        <div
                                            className="Mob"
                                            style={{
                                                opacity: 0.5,
                                                left: pc.x,
                                                bottom: 480 - pc.y,
                                            }}
                                        >
                                            <img
                                                src={`${process.env.PUBLIC_URL}/img/${m.name}.gif`}
                                                alt={m.name}
                                            />
                                        </div>
                                    );
                                })}
                            </>
                        );
                    })
                }
            </div>
        </div>
    );
}