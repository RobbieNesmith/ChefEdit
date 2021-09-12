import { useState } from "react";
import useEditorState from "../../hooks/useEditorState";
import "./MobSidebar.css";

export default function MobSidebar() {
    const [open, setOpen] = useState(false);
    const {mobs} = useEditorState();
    return (
        <div
            className="MobSidebar"
            style={{right: open ? 0 : "-15rem"}}
        >
            <div>
                {mobs.map(m => {
                    return (
                        <div>
                            {m.rawData.join(",")}
                        </div>
                    );
                })}
            </div>
            <div
                className="CollapseMobSidebar"
                onClick={() => setOpen(o => !o)}
            >{ open ? ">" : "<" }</div>
        </div>
    );
}