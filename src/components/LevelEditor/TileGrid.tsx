import React from "react";
import useEditorState from "../../hooks/useEditorState";

function getOffsetForTileId(index: number) {
    return {
        xOffset: index % 16 * -32,
        yOffset: Math.floor(index / 16) * -32
    };
}

export default function TileGrid(props: {
    tiles: Uint16Array,
    onTilePlaced(index: number, button: number): void,
    onTilePicked(tileId: number): void
}) {
    const { leftClickPressed, rightClickPressed, leftClickTileId, rightClickTileId, setLeftClickPressed, setRightClickPressed } = useEditorState();

    function handleMouseDown(index: number, evt: React.MouseEvent) {
        evt.stopPropagation();
        evt.preventDefault();
        if (evt.button === 0) {
            setLeftClickPressed(true);
            setRightClickPressed(false);
            props.onTilePlaced(index, leftClickTileId);
        } else if (evt.button === 1) {
            setLeftClickPressed(false);
            setRightClickPressed(false);
            props.onTilePicked(props.tiles[index]);
        } else if (evt.button === 2) {
            setLeftClickPressed(false);
            setRightClickPressed(true);
            props.onTilePlaced(index, rightClickTileId);
        }
    }

    function handleMouseMove(index: number, evt: React.MouseEvent) {
        if (leftClickPressed) {
            props.onTilePlaced(index, leftClickTileId);
        } else if (rightClickPressed) {
            props.onTilePlaced(index, rightClickTileId);
        }
        evt.stopPropagation();
        evt.preventDefault();
    }

    return (
        <div
            className="TileGrid"
        >
            {Array.from(props.tiles).map((tileId, index) => {
                const offset = getOffsetForTileId(tileId);
                return (
                    <div
                        key={index}
                        className="Tile"
                        style={{
                            backgroundPositionX: offset.xOffset,
                            backgroundPositionY: offset.yOffset
                        }}
                        onMouseDown={(evt) => handleMouseDown(index, evt)}
                        onMouseMove={(evt) => handleMouseMove(index, evt)}
                    />
                );
            })}
        </div>
    );
}