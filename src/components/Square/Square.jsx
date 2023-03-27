import { useState, useEffect } from 'react';
import './Square.css';

const Square = ({ r, c, val, setSqr }) => {
  const obj = {
    '[object Object]': "traveled",
    0: "start",
    e: "end",
    w: "wall",
    p: "path",
  }
  return (
    <button className={obj[val]} onClick={ () => setSqr(r, c, 'click') } onMouseOut={ () => setSqr(r, c) }></button>
  )
}

export default Square