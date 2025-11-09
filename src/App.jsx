import { useState } from 'react'
import './App.css'
import ContactForm from './components/ContactForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ContactForm/>
    </div>
  )
}

export default App
