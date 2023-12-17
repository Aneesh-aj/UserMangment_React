import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Header from './component/Header'


function App() {

  return (
        
       <BrowserRouter>
             <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/sing-up" element={<Signup/>} />
                <Route path="/sign-in" element={<Signin/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
       </BrowserRouter>
  )
}

export default App
