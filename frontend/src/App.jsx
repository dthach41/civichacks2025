import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/home/home";
import NavBar from "./components/navbar";
import LandingPage from "./components/landing-page/landing-page";


function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/landing" element={<LandingPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
