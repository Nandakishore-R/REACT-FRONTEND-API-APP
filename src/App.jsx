import { useState } from 'react'
import './App.css'
import {APP_NAME} from './constants'
import ClauseModel from './components/vendor/ClauseModel'
import VendorMain from './components/vendor/VendorMain'
import VendorApp from './components/vendor/VendorApp'
import Vendor from './Pages/Vendor'
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Vendor/>}/>
          <Route path='/vendordetail' element={<VendorApp/>}/>
        </Routes>  
      </Router>
    </>
  )
}

export default App
