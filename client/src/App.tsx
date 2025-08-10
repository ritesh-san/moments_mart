import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Rule from './cms/Rule'
import store from './store/stores'
import { Provider } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store} >
        <Rule/>
      </Provider>
    </>
  )
}

export default App
