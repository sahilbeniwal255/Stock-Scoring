import { useContext, useState } from 'react'
import Input from './components/Input'
import { FinContext, FinProvider } from './FinContext'
import Navbar from './components/Navbar'
import HEro from './components/HEro'
import Score from './components/Score'
import Table from './components/Table'
import ProductDesc from './components/ProductDesc'
import Footer from './components/Footer'
import News from './components/News'

function App() {

  const[mode, setMode] = useState(false);

  return (
    <FinProvider>
      <div className = {`${mode == true ? 'bg-black' : ''}`}>
        <Navbar mode = {mode} setMode = {setMode}/>
        <HEro/>
        <Input mode = {mode}/>
        <Table/>
        <Score/>
        <News mode = {mode}/>
        <ProductDesc mode = {mode}/>
        <Footer/>
      </div>
    </FinProvider>
  )
}

export default App
