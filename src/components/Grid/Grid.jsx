import { useState, useEffect, useRef } from 'react';
import './Grid.css';
import Square from '../Square/Square.jsx';

const Grid = ({ grid, setGrid, hasStart, setHasStart, hasEnd, setHasEnd }) => {

  const down = useRef(false);
  const [disp, setDisp] = useState([]);

  const setSqr = (dt, dl, click) => {
    if (click || down.current) {
      let temp = [...grid];
      let sqr = temp[dt][dl];
      if (!hasStart) {
        sqr = 0;
        setHasStart([dt, dl]);
      } else if (sqr === 0) {
        sqr = Infinity;
        setHasStart(false);
      } else if (!hasEnd) {
        sqr = 'e';
        setHasEnd([dt, dl])
      } else if (sqr === 'e') {
        sqr = Infinity;
        setHasEnd(false);
      } else if (sqr === 'w') {
        sqr = Infinity;
      } else {
        sqr = 'w';
      }
      temp[dt] = [...temp[dt]];
      temp[dt][dl] = sqr;
      setGrid(temp);
    }
  }

  const handleMouseDown = () => down.current = true
  const handleMouseUp = () => down.current = false
  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [])

  useEffect(() => {
    if (grid) {
      let temp = grid.map((row, r) =>
          <div className="grid-row">
            {row.map((sqr, c) => {
              return <Square key={`${r}, ${c}`} r={r} c={c} setSqr={setSqr} val={sqr} />
            })}
          </div>
          )
      setDisp(temp);
    }
  }, [grid])

  return (
    <div className="Grid">
      {disp}
    </div>
  )
}

export default Grid