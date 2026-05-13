//useEffect Lifecycle
//No array: every render
//[] -> once
//[state] -> on mount+ when state change 


import { useEffect,useState } from "react";

// useEffect Lifecycle
export function UseEffectLifecycle(){
    const [count,setCount]=useState(0);
    // 1.No dependency array
    useEffect(()=>{
        console.log("Effect 1: ru  s after every remmder");
    });
    // 2. Empty dependency array
    // This effect runs only once after the component mounts
    useEffect(()=>{
        console.log("Effect 2: runs only once after the component mounts");
    },[]);
    // 3. Dependency based array
    useEffect(()=>{
        console.log("Effect 3: count changed to",count);
        return()=>{
            console.log("Cleanup for Effect 3: count was",count);
        };
    },[count]);
    // Event handler 
    function handleIncrement(){
        setCount(prevCount=>prevCount+1);
    }
    function handleReset(){
        setCount(0);
}
return(
    <section>
        <h2>useEffect Lifecycle</h2>
        <p>Count: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleReset}>Reset</button>
        
    </section>
);  
}