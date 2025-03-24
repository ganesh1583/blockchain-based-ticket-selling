import { useState } from 'react'
import Signup from "./components/Signup"
// import {signin } 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello</h1>
      <Signup />
    </>
  )
}

export default App
