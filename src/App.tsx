import './App.css';
import HeaderBar from './components/HeaderBar/HeaderBar';
import BlockPalette from './components/BlockPalette/BlockPalette';
import LevelEditor from './components/LevelEditor/LevelEditor';
import MobSidebar from './components/MobSidebar/MobSidebar';

function App() {
  return (
    <div className="App">
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
