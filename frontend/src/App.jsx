import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/home/home";
import NavBar from "./components/navbar";
import SkillsResources from "./components/analyzer/skills-resources";


function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/skills-resources" element={<SkillsResources/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
