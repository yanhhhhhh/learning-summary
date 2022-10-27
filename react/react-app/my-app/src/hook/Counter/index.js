import React, { useState } from 'react'
import useInterval from '../useInterval/index'
function Counter() {
  const [counter, setCounter] = useState(0);
  const [delay, setDelay] = useState(1000)
  // 暂停定时器
  const [isRunning, setIsRunning] = useState(true)
  // 
  useInterval(() => { setCounter(counter + 1) }, isRunning ? delay : null)
  return (
    <><div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
      <input onChange={(e) => setDelay(Number(e.target.value))} value={delay}
      ></input>
      <div>定时器状态：{isRunning ? '执行中' : '暂停'}</div>
      <button onClick={() => setIsRunning(!isRunning)}>切换定时器状态</button>
    </>
  )
}

export default Counter