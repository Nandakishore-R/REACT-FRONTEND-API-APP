import React from 'react'
import VendorMain from '../../components/vendor/VendorMain'
import ThemeLayout from '../../common/ThemeLayout';
import './vendor.css';
function Vendor() {
  return (
    <>
      <ThemeLayout>
        <div>
          <VendorMain />
        </div>
      </ThemeLayout>
    </>

  )
}

export default Vendor