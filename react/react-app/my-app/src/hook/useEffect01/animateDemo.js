
import { useState, useRef, useEffect } from 'react';
// @ts-ignore
import anime from 'animejs';

export default function AnimateDemo() {
  const [anime01, setAnime01] = useState(false);
  const [anime02, setAnime02] = useState(false);
  const element = useRef(null);
  // 是否已经停下来了
  const stoped = useRef(true)

  useEffect(() => {
    anime01 && animate01();
    anime02 && animate02();

  }, [anime01, anime02]);

  function animate01() {
    anime({
      targets: element.current,
      translateX: 400,
      backgroundColor: '#FF8F42',
      borderRadius: ['0%', '50%'],
      complete: () => {
        setAnime01(false)
        setAnime02(true)
      }
    })
  }

  function animate02() {
    anime({
      targets: element.current,
      translateX: 0,
      backgroundColor: '#FFF',
      borderRadius: ['50%', '0%'],
      easing: 'easeInOutQuad',
      complete: () => {
        setAnime02(false);
        stoped.current = true
      }
    })
  }

  function clickHandler() {
    if (stoped.current) {
      stoped.current = false
      setAnime01(true);
    }
  }

  return (
    <div className="container" onClick={clickHandler}>
      <div className="el" ref={element} />
      {anime01 && <div>第一段动画执行中</div>}
      {anime02 && <div>第二段动画执行中</div>}
    </div>
  )
}