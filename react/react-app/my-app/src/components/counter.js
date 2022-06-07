import React,{useState,useEffect} from 'react'

const Counter =()=>{
    const [count,setCount]  = useState(0)
    useEffect(()=>{
        document.title = `You clicked ${count} times`;
    },[count])
    return(
        <>
        <div>counter:{count}</div>
        <button onClick={()=>setCount(count+1)}>+1</button>
        </>
    )
}
export default Counter