import './App.css'
import { Provider } from "react-redux"
import Vendor from './Pages/Vendor'
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'
import VendorEntry from './components/vendor/VendorEntry'
import store from './store/Store'
import Navbar from './components/navbar/Navbar'
import { Layout} from "antd";
const { Header } = Layout;
function App() {
  return (
    // <div 
    // style={{position:"relative",height:"100%",margin:"0"}} 
    // >
      <div style={{display:"flex"}}>
        <div style={{width:"85px"}}>
    <Navbar>
    </Navbar>
    </div>
    <div style={{flex:"1"}}>
    <Header className="app-header">
          <div className="header-title">Vendor Master</div>
          <div className="header-user">
            <i className="fas fa-search"></i>
            <span style={{ marginRight: ".5rem" }}>POC TEAM</span>
            <i className="fas fa-user-circle fa-lg"></i>
          </div>
    </Header>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Vendor/>}/>
          <Route path='/vendordetail' element={<VendorEntry/>}/>
        </Routes>  
      </Router>
    </Provider>
    </div>
    </div>
    // </div>
  )
}

export default App
