import { useState } from "react";
import useEditorState from "../../hooks/useEditorState";
import MobInfo from "./MobInfo";
import "./MobSidebar.css";

export default function MobSidebar() {
    const [open, setOpen] = useState(false);
    const { mobs } = useEditorState();
    return (
        <div
            className="MobSidebar"
            style={{ right: open ? 0 : "-15rem" }}
        >
            <ul>
                {mobs.map(m => <MobInfo key={m.id} mob={m} />)}
            </ul>
            <div
                className="CollapseMobSidebar"
                onClick={() => setOpen(o => !o)}
            >{open ? ">" : "<"}</div>
        </div>
    );
}