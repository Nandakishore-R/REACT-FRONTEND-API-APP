import React from 'react'
import { useLocation } from 'react-router-dom';
import VendorApp from './VendorApp';
import ThemeLayout from '../../common/ThemeLayout';
import "../../Pages/vendors/vendor.css";
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
    <ThemeLayout>
      <div id='csroot'>
        <VendorApp />
      </div>
    </ThemeLayout>
    //  </Provider>

  )
}

export default VendorEntry