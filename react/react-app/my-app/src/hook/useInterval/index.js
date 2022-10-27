import React, { useEffect, useRef } from 'react'

function useInterval(callback, delay) {
  const saveCallback = useRef();
  useEffect(() => {
    saveCallback.current = callback
  })
  useEffect(() => {
    // 当delay 变化是清掉上一个定时器，重新设置新的,实现可调整的delay
    function tick() {
      saveCallback.current()
    }
    if (delay != null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
  return (
    <div>useInterval</div>
  )
}

export default useInterval