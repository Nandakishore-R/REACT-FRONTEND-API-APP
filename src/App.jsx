import './App.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import Vendor from './Pages/Vendor'
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'
import VendorEntry from './components/vendor/VendorEntry'
import store from './store/Store'
import Layout from './Layout/vendor/Layout'
import { useEffect } from 'react'

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
    <Layout>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Vendor />} />
              <Route path="/vendordetail" element={<VendorEntry />} />
            </Routes>
          </Router>
        </Provider>
      </Layout>
  )
}

export default App
