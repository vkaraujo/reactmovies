import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import './global.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Router/> {}
        <Footer/>
      </BrowserRouter>      
    </>
  )
}

export default App
