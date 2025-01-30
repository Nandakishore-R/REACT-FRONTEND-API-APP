import React from 'react'
import { useLocation } from 'react-router-dom';
import VendorApp from './VendorApp';
import { Provider } from "react-redux";
import store from "../../store/Store";

function VendorEntry() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const vendorId = queryParams.get('id');
    // var viewType = "VIEW";
    // var vendorDetailsId = ""; // Id , in case of existing Vendor
    // var vendorName = "";
    // var isCentrilizedUser = "false";
    const vendorType = sessionStorage.getItem("vendorType");
    return (
    //   <div>
    //     <h1>Vendor Details</h1>
    //     <p>Vendor Id : {vendorId}</p>
    //     <p>Vendor Type : {vendorType}</p>
    //   </div>
        <>
        <div id='csroot'>
          <VendorApp/>
        </div>
        </>
    //  </Provider>
    
    )
  }
  
export default VendorEntry