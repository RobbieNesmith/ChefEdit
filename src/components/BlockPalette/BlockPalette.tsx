import { useEffect, useState } from "react";
import { tileInfo } from "../../data/tileInfo";
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
    const [leftClickBlock, setLeftClickBlock] = useState(0);
    const [rightClickBlock, setRightClickBlock] = useState(0);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setBlocks(getBlocks());
    }, []);

    function handleBlockSelection(evt: React.MouseEvent, id: number) {
        if (evt.button === 0) {
            setLeftClickBlock(id);
        } else if (evt.button === 2) {
            setRightClickBlock(id);
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
                    if (leftClickBlock === b.id) {
                        selectionClass = "LeftClick";
                        if (rightClickBlock === b.id) {
                            selectionClass = "LeftRightClick"
                        }
                    } else if (rightClickBlock === b.id) {
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