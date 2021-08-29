import { useState } from "react";
import "./MobSidebar.css";

export default function MobSidebar() {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="MobSidebar"
            style={{right: open ? 0 : "-15rem"}}
        >
            <div>Mob Sidebar</div>
            <div
                className="CollapseMobSidebar"
                onClick={() => setOpen(o => !o)}
            >{ open ? ">" : "<" }</div>
        </div>
    );
}