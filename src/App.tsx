import './App.css';
import HeaderBar from './components/HeaderBar/HeaderBar';
import BlockPalette from './components/BlockPalette/BlockPalette';
import LevelEditor from './components/LevelEditor/LevelEditor';
import MobSidebar from './components/MobSidebar/MobSidebar';
import useEditorState from './hooks/useEditorState';

function App() {
  const { setLeftClickPressed, setRightClickPressed } = useEditorState()
  return (
    <div className="App"
      onMouseUp={ () => {
        setLeftClickPressed(false);
        setRightClickPressed(false);
      } }
    >
      <HeaderBar />
      <div className="ContentContainer">
        <BlockPalette />
        <LevelEditor />
        <MobSidebar />
      </div>
    </div>
  );
}

export default App;
