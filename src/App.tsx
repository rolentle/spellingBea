import { useState } from 'react'
import Words from './Words'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const words = [
    "quickly",
    "neatly",
    "ugly",
    "jelly",
    "chilly",
    "slowly",
    "funny",
    "angry",
    "empty",
    "mommy",
    "daddy",
    "happy",
    "pretty",
    "grumpy"
    ]

  return (
    <>
      <h1>Spelling Bea</h1>
      <Words words={words} />
    </>
  )
}

export default App
