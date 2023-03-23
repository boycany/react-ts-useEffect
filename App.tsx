import * as React from 'react';
import { useEffect, useState } from 'react';
import FetchApi from './FetchApi';
import './style.css';
import TimeCounter from './TimeCounter';

export default function App() {
  const [text, setText] = useState('偶數');
  const [counter, setCounter] = useState(0);

  /** 1. mount */
  // useEffect(() => {
  //   console.log('onInit effect');
  // }, []);

  /** 2. binding to state */
  useEffect(() => {
    if (counter % 2 === 0) {
      setText('even');
    } else {
      setText('odd');
    }

    if (counter === 10) {
      alert('Congratulation! Click ' + counter + ' times!');
    }
  }, [counter]);

  function handleClick() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={handleClick}>+1</button>
      {/* <p>{counter % 2 === 0 ? 'even' : 'odd'}</p> */}
      <p>{text}</p>
      {/* <TimeCounter /> */}
      <FetchApi />
    </div>
  );
}
