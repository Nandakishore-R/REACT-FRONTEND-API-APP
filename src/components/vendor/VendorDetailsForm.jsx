// import React, { useState, useEffect } from "react";
// import { Form, Button, Upload, Select, Input, Spin } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// // import moment from "moment";

// const { Option } = Select;
// const { TextArea } = Input;

// function VendorDetailsForm(props) {
//   const [issuanceDate, setIssuanceDate] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   const dispatch = useDispatch();
//   const {
//     FormData,
//     IsActive,
//     URN,
//     InActivationDate,
//     ReasonOfInactivation,
//     InActivationEvidence,
//     isInViewMode,
//     vendorId,
//     isCentrilized,
//   } = useSelector((state) => ({
//     FormData: state.vendor.details.FormData,
//     IsActive: state.vendor.details.IsActive,
//     URN: state.vendor.details.URN,
//     InActivationDate: state.vendor.details.InActivationDate,
//     ReasonOfInactivation: state.vendor.details.ReasonOfInactivation,
//     InActivationEvidence: state.vendor.details.InActivationEvidence,
//     isInViewMode: state.vendor.editAccess.isInViewMode,
//     vendorId: state.vendor.vendorId,
//     isCentrilized: state.vendor.isUserCentrilized,
//   }));

//   const handleFileChange = ({ fileList }) => {
//     if (fileList.length !== 0) {
//       const file = [fileList[fileList.length - 1]];
//       dispatch({
//         type: "SET_INACTIVATION",
//         payload: { InActivationEvidence: file },
//       });
//     } else {
//       dispatch({
//         type: "SET_INACTIVATION",
//         payload: { InActivationEvidence: "" },
//       });
//     }
//   };

//   const fetchLatestURN = async () => {
//     try {
//       const response = await fetch("/Vendor/GetLatestURN");
//       const res = await response.json();
//       if (res.Status === "success") {
//         dispatch({
//           type: "SET_URN",
//           payload: { URN: res.data },
//         });
//       } else {
//         console.error(res.Message);
//       }
//     } catch (err) {
//       console.error("URN Fetch Failure");
//     }
//   };

//   useEffect(() => {
//     const fetchVendorData = async () => {
//       try {
//         const response = await fetch(`/Vendor/GetVendorById?Id=${vendorId}`);
//         const res = await response.json();
//         if (res.Status === "success") {
//           const data = JSON.parse(res.Data.FormData || res.Data.JsonForm);
//           const dataCopy = props.getData(data.action || data);

//           dispatch({
//             type: "CHANGE_VENOR_DETAILS_FORM",
//             payload: { FormData: dataCopy, IsActive: res.Data.IsActive },
//           });

//           if (res.Data.MaterialityDate) {
//             setIssuanceDate(moment(res.Data.MaterialityDate).format("DD-MM-YYYY"));
//           }

//           if (res.Data.URN) {
//             dispatch({
//               type: "SET_URN",
//               payload: { URN: res.Data.URN },
//             });
//           } else {
//             fetchLatestURN();
//           }

//           if (res.Data.IsActive === false && res.Data.InActivationDate) {
//             const IDate = moment(res.Data.InActivationDate).format("YYYY-MM-DD");
//             dispatch({
//               type: "SET_INACTIVATION",
//               payload: {
//                 InActivationDate: IDate,
//                 ReasonOfInactivation: res.Data.ReasonOfInactivation,
//                 InActivationEvidence: [res.Data.ReasonOfInactivationFiles],
//               },
//             });
//           }

//           if (res.Data.IsTemplateChanged) {
//             console.info("Template has changed");
//           }
//         } else {
//           console.error(res.Message);
//         }
//       } catch (err) {
//         console.error("Form Fetch Failure");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchVendorData();
//   }, [dispatch, props, vendorId]);

//   if (isLoading) {
//     return (
//       <div className="loadingOverlayVd">
//         <Spin size="large" style={{ position: "absolute", top: "40%", left: "50%" }} />
//       </div>
//     );
//   }

//   return (
//     <div className="vendorDetails-container">
//       <Form className="vd-staticValues-container" layout="vertical">
//         <Form.Item label="URN">
//           <Input disabled value={URN} className="vd-input vd-w5" />
//         </Form.Item>
//         <Form.Item label="Materiality Issuance Date/Empanelment Month">
//           <Input disabled value={issuanceDate} className="vd-input vd-w10" />
//         </Form.Item>
//         <Form.Item label="Status">
//           <Select
//             value={IsActive}
//             disabled={isInViewMode || !isCentrilized}
//             onChange={(e) =>
//               dispatch({
//                 type: "SET_IS_ACTIVE",
//                 payload: { IsActive: e },
//               })
//             }
//           >
//             <Option value={true}>Active</Option>
//             <Option value={false}>Inactive</Option>
//           </Select>
//         </Form.Item>

//         {IsActive === false && (
//           <>
//             <Form.Item label="Inactivation Date">
//               <Input
//                 type="date"
//                 className="vd-input vd-w10"
//                 value={InActivationDate}
//                 onChange={(e) =>
//                   dispatch({
//                     type: "SET_INACTIVATION",
//                     payload: { InActivationDate: e.target.value },
//                   })
//                 }
//                 disabled={isInViewMode}
//               />
//             </Form.Item>
//             <Form.Item label="Upload Inactivation Evidence">
//               <Upload
//                 beforeUpload={() => false}
//                 fileList={InActivationEvidence}
//                 onChange={handleFileChange}
//                 maxCount={1}
//               >
//                 <Button disabled={isInViewMode}>Click to Upload</Button>
//               </Upload>
//             </Form.Item>
//             <Form.Item label="Reason of Inactivation">
//               <TextArea
//                 className="vd-input vd-w85"
//                 value={ReasonOfInactivation}
//                 onChange={(e) =>
//                   dispatch({
//                     type: "SET_INACTIVATION",
//                     payload: { ReasonOfInactivation: e.target.value },
//                   })
//                 }
//                 disabled={isInViewMode}
//               />
//             </Form.Item>
//           </>
//         )}
//       </Form>
//       <div id="formDesignerArea">
//         {FormData && FormData.length > 0 && (
//           <FormRender
//             data={FormData}
//             readOnly={isInViewMode || !isCentrilized}
//             isComponentUpdate={true}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default VendorDetailsForm;
import React from 'react'

function VendorDetailsForm() {
  return (
    <div>VendorDetailsForm</div>
  )
}

export default VendorDetailsForm