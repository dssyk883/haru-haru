import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Intro from './pages/Intro'
import Home from './pages/Home'
import Stat from './pages/Stat'
import TaskMgmt from './pages/TaskMgmt'
import Timer from './pages/Timer'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro/>} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/stat" element={<Stat/>}/>
      <Route path="/tasks" element={<TaskMgmt/>}/>
      <Route path="/timer" element={<Timer/>}/>
    </Routes>
  )
}

export default App