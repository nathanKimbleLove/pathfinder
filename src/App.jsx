import { useState } from 'react';
import './App.css';
import Selection from './components/Selection/Selection.jsx';
import Grid from './components/Grid/Grid.jsx';
import solve from '../solve.js';

function App() {
  const [grid, setGrid] = useState(Array(15).fill(Array(30).fill(Infinity)));
  const [hasStart, setHasStart] = useState(false);
  const [hasEnd, setHasEnd] = useState(false);

  const find = () => {
    const solved = solve.dijkstra(grid);
    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= solved.length) {
        clearInterval(intervalId);
        return;
      }
      setGrid(solved[i]);
      i++;
    }, 5)
  }

  const clear = () => {
    setGrid(Array(15).fill(Array(30).fill(Infinity)));
    setHasStart(false);
    setHasEnd(false);
  }

  return (
    <div className="App">
      <h1>Pathfinder</h1>
      <Selection />
      <Grid grid={grid} setGrid={setGrid} hasStart={hasStart} setHasStart={setHasStart} hasEnd={hasEnd} setHasEnd={setHasEnd}/>
      <button onClick={find}>Find the Path!</button>
      <button onClick={clear}>Clear All</button>
    </div>
  )
}

export default App
