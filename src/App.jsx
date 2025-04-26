import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Tickets from './Pages/Ticket/Tickets'
import Summerdeals from './Pages/Summerdeals/Summerdeals'
import Payment from './Pages/Payment/Payment'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ticket/:match_number/:team1VsTeam2" element={<Tickets />} />
        <Route path="/summerdeals/:match_number" element={<Summerdeals />} />
        <Route path='/payment' element={<Payment/>} />
      </Routes>
    </>
  )
}

export default App
