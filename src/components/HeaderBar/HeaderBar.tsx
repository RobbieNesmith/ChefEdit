import MenuCategory from "./MenuCategory";
import "./HeaderBar.css";
import MenuOption from "./MenuOption";
import useEditorState from "../../hooks/useEditorState";
import { useState } from "react";
import FileLoadModal from "./FileLoadModal";
import { getBackgroundLayer, getForegroundLayer, getHeaders, getMobs, readFile } from "../../logic/fileOperations";

export default function HeaderBar() {
    const { toggleForegroundVisible, setLevelData, setForegroundTiles, setBackgroundTiles, setMobs, toggleMobs, setHeaders } = useEditorState();
    const [fileLoadModalShown, setFileLoadModalShown] = useState(false);

    async function loadFile(fileToLoad: File) {
        console.log(fileToLoad);
        window.document.title = fileToLoad.name;
        const fileContents = await readFile(fileToLoad);
        setHeaders(getHeaders(fileContents));
        setForegroundTiles(getForegroundLayer(fileContents));
        setBackgroundTiles(getBackgroundLayer(fileContents));
        const mobs = getMobs(fileContents);
        console.log(mobs);
        setMobs(mobs);
        setLevelData(fileContents);
        setFileLoadModalShown(false);
    }

    return <div className="HeaderBar">
        <MenuCategory name="file">
            <MenuOption name="New" callback={() => console.log("new file")} />
            <MenuOption name="Open" callback={() => setFileLoadModalShown(true)} />
            <MenuOption name="Save" callback={() => console.log("save file")} />
        </MenuCategory>
        <MenuCategory name="edit">
            <MenuOption name="Cut" callback={() => console.log("cut")} />
            <MenuOption name="Copy" callback={() => console.log("copy")} />
            <MenuOption name="Paste" callback={() => console.log("paste")} />
        </MenuCategory>
        <MenuCategory name="view">
            <MenuOption name="Switch Layer" callback={toggleForegroundVisible} />
            <MenuOption name="Show/Hide Mobs" callback={toggleMobs} />
        </MenuCategory>
        <FileLoadModal shown={fileLoadModalShown} onConfirm={loadFile} onDismiss={() => setFileLoadModalShown(false)} />
    </div>;
}