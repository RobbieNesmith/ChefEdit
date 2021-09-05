import { useEffect, useState } from "react";
import { tileInfo } from "../../data/tileInfo";
import useEditorState from "../../hooks/useEditorState";
import "./BlockPalette.css";

interface BlockInfo {
    id: number;
    xOffset: number;
    yOffset: number;
    description: string;
}

function getBlocks(): Array<BlockInfo> {
    return Array(340).fill(0).map((_, index) => getBlockWithIndex(index));
}

function getBlockWithIndex(index: number) {
    return {
        id: index,
        xOffset: index % 16 * -32,
        yOffset: Math.floor(index / 16) * -32,
        description: index < tileInfo.length ? tileInfo[index] : ""
    };
}

export default function BlockPalette() {
    const [blocks, setBlocks] = useState([] as Array<BlockInfo>);
    const [open, setOpen] = useState(true);

    const {leftClickTileId, rightClickTileId, setLeftClickTileId, setRightClickTileId} = useEditorState();

    useEffect(() => {
        setBlocks(getBlocks());
    }, []);

    function handleBlockSelection(evt: React.MouseEvent, id: number) {
        if (evt.button === 0) {
            setLeftClickTileId(id);
        } else if (evt.button === 2) {
            setRightClickTileId(id);
        }
        evt.preventDefault();
        evt.stopPropagation();
    }

    return (
        <div
            className="BlockPalette"
            style={{left: open ? 0 : "-15rem"}}
        >
            <ul>
                {blocks.map(b => {
                    let selectionClass = "";
                    if (leftClickTileId === b.id) {
                        selectionClass = "LeftClick";
                        if (rightClickTileId === b.id) {
                            selectionClass = "LeftRightClick"
                        }
                    } else if (rightClickTileId === b.id) {
                        selectionClass = "RightClick";
                    }
                    return(
                        <li
                            key={b.id}
                            className={selectionClass}
                            onClick={ (evt) => handleBlockSelection(evt, b.id) }
                            onContextMenu={ (evt) => handleBlockSelection(evt, b.id)}
                        >
                            <div
                                className="BlockImage"
                                style={{
                                    backgroundPositionX: `${b.xOffset}px`,
                                    backgroundPositionY: `${b.yOffset}px`
                                }}
                            ></div>
                            <div className="BlockDescription">{b.description}</div>
                        </li>
                    );
                })}
            </ul>

            <div
                className="CollapseBlockPalette"
                onClick={() => setOpen(o => !o)}
            >{ open ? "<" : ">" }</div>
        </div>
    );
}