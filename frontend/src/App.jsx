import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/home/home";
import NavBar from "./components/navbar";


function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
