import React, {useState} from 'react'

const useCounter = (initialState) => {
  const [count, setCount] = useState(initialState);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return [count, {increment, decrement}]
}

const Counter = () => {
  const [myCount, {increment, decrement}] = useCounter(0);
  return (
    <div>
      <p>{myCount}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Counter;
