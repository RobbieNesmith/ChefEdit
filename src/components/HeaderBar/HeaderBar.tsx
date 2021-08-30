import MenuCategory from "./MenuCategory";
import "./HeaderBar.css";
import MenuOption from "./MenuOption";
import useEditorState from "../../hooks/useEditorState";

export default function HeaderBar() {
    const { toggleForegroundVisible } = useEditorState();
    return <div className="HeaderBar">
        <MenuCategory name="file">
            <MenuOption name="New" callback={() => console.log("new file")} />
            <MenuOption name="Open" callback={() => console.log("open file")} />
            <MenuOption name="Save" callback={() => console.log("save file")} />
        </MenuCategory>
        <MenuCategory name="edit">
            <MenuOption name="Cut" callback={() => console.log("cut")} />
            <MenuOption name="Copy" callback={() => console.log("copy")} />
            <MenuOption name="Paste" callback={() => console.log("paste")} />
            </MenuCategory>
        <MenuCategory name="view">
            <MenuOption name="Switch Layer" callback={toggleForegroundVisible} />
        </MenuCategory>
    </div>;
}