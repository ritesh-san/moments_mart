import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Rule from './cms/Rule'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Rule/>
    </>
  )
}

export default App
