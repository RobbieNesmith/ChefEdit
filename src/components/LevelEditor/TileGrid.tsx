import React from "react";
import useEditorState from "../../hooks/useEditorState";

function getOffsetForTileId(index: number) {
    return {
        xOffset: index % 16 * -32,
        yOffset: Math.floor(index / 16) * -32
    };
}

export default function TileGrid(props: {
    tiles: Array<number>,
    onTilePlaced(index: number, button: number):void,
    onTilePicked(tileId: number): void
}) {
    const {leftClickPressed, rightClickPressed, setLeftClickPressed, setRightClickPressed} = useEditorState();

    function handleMouseDown(index: number, evt: React.MouseEvent) {
        evt.stopPropagation();
        evt.preventDefault();
        if (evt.button === 0) {
            setLeftClickPressed(true);
            setRightClickPressed(false);
            props.onTilePlaced(index, 0);
        } else if (evt.button === 1) {
            setLeftClickPressed(false);
            setRightClickPressed(false);
            props.onTilePicked(props.tiles[index]);
        } else if (evt.button === 2) {
            setLeftClickPressed(false);
            setRightClickPressed(true);
            props.onTilePlaced(index, 2);
        }
    }

    function handleMouseMove(index: number, evt: React.MouseEvent) {
        if (leftClickPressed) {
            props.onTilePlaced(index, 0);
        } else if (rightClickPressed) {
            props.onTilePlaced(index, 2);
        }
        evt.stopPropagation();
        evt.preventDefault();
    }

    return (
        <div
            className="TileGrid"
            onContextMenu={evt => {
                evt.preventDefault();
                evt.stopPropagation();
            }}
        >
            {props.tiles.map((tileId, index) => {
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