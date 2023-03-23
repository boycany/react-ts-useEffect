import { useState, useEffect } from 'react';
import * as React from 'react';

let interval = null;
let num = 0;

const TimeCounter: React.FC = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('effect render start');
    interval = setInterval(() => {
      console.log('interval');
      num++;
      console.log(num);
    }, 1000);

    //這個回傳的 function 在每一次 render 之前都會執行，在這裡進行一個重置的動作。
    return () => {
      console.log('pre re-render');

      //避免因點擊按鈕啟動 setCounter，一直觸發 counter 綁定的 side effect，interval 會越讀越快
      //只要在 return 的 function 將 interval 在 pre re-render 時清除掉，就可以解決這個問題。
      if (interval !== null) {
        clearInterval(interval);
        num = 0;
      }
    };
  }, [counter]);

  function clickHandler() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h1>Another Counter</h1>
      <p>counter: {counter}</p>
      <button onClick={clickHandler}>Click</button>
    </div>
  );
};

export default TimeCounter;
