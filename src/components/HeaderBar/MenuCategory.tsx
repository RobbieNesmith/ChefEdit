import { useState } from "react";

export default function MenuCategory(props: {name: string, children?: any}) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="MenuCategory"
            onClick={() => setOpen(o => !o)}
            onMouseLeave={() => setOpen(false)}
        >
            <span>{props.name}</span>
            { open ? <ul>{props.children}</ul> : null }
        </div>
    );
}