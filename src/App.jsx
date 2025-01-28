import './App.css'
import { Provider } from "react-redux"
import Vendor from './Pages/Vendor'
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'
import VendorEntry from './components/vendor/VendorEntry'
import store from './store/Store'
import Layout from './Layout/vendor/Layout'
function App() {
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
