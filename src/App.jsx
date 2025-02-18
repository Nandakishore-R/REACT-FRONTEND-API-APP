import './App.css'
import React from 'react'
import { Provider } from "react-redux"
import Vendor from './Pages/vendors/Vendor'
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'
import VendorEntry from './components/vendor/VendorEntry'
import store from './store/Store'
import ActionCentre from './Pages/actionCenter/ActionCentre'

// const loadFormRendererDeps = () => {
//   window.React = React;
//   window.ReactDOM = ReactDOM
//   const script = document.createElement("script");
//   script.src = "/assets/js/form-renderer-deps.js";  // Adjust the path if needed
//   script.async = true;
//   document.body.appendChild(script);
// };

function App() {
  // useEffect(() => loadFormRendererDeps,[]);
  return (
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<ActionCentre />} /> 
              <Route path="/vendor" element={<Vendor />} />
              <Route path="/vendordetail" element={<VendorEntry />} />
            </Routes>
          </Router>
        </Provider>
  )
}

export default App
