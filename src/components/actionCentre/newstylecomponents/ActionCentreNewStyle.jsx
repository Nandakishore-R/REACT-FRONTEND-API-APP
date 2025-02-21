import React from 'react'
import FormRenderNew from './FormRenderNew';
import parsedData from './formdata';
import SummaryOfChanges from './SummaryOfChanges';

function ActionCentreNewStyle() {
    const getDateTimeValue = (dataCopy) => {
        if (dataCopy.value) {
          let valueFormat = dataCopy.format ? dataCopy.format : "YYYY-MM-DD";
          //Need to Revisit FormRender - It's not optimised way to do
          if (dataCopy.value.split("-")[0].length == 4) {
            dataCopy.value = moment(dataCopy.value).format(valueFormat);
          } else {
            dataCopy.value = moment(dataCopy.value, dataCopy.format).format(valueFormat);
          }
        }
        return dataCopy;
      };
    const getData = (Fdata) => {
        let formData = [];
        Fdata.forEach((data) => {
            let dataCopy = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    if (key !== "eventEmitter" && key !== "isConverted") {
                        dataCopy[key] = element;
                    }
                }
            }
            if (dataCopy.type === "date") {
                dataCopy = getDateTimeValue(dataCopy);
            }
            formData.push(dataCopy);
        });
        return formData;
    };

    let data;
    if (parsedData.action) {
        data = parsedData.action;
    }
    else{
        data = getData(parsedData);
    }

    
    console.log(data);
    return (
        <div className="main-container">
            <div
                id="myModal"
                className="quickview-wrapper fullWidth open"
                style={{ marginTop: " 8.2vh" }}>
                <div id="root"></div>
                <div className="LayoutPage" style={{ height: '593px' }}
                    data-bind="with: gm.actioncentre.selectedRow()">
                    <div className="LayoutPageHeader" style={{ padding: '6px' }}>
                        <div className="navigate-tabs-panel"
                            style={{
                                padding: '1.067vh 0.521vw',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                                background: 'fff',
                                width: '100%',
                            }}>
                            <div className="tabs-list">
                                <ul className="nav nav-tabs action-tabs p-t-0  " role="tablist">
                                    <li className="active" role="presentation">
                                        <a role="tab" data-toggle="tab" title="Form"
                                            //onclick="gm.actioncentre.leftClick();return false;"
                                            className="nav-tabs-action">
                                            Form
                                        </a>
                                    </li>
                                    <li className="hidden" role="presentation">
                                        <a role="tab" data-toggle="tab" title="Reviewer's Action"
                                            //onclick="gm.actioncentre.rightClick();return false;"
                                            className="nav-tabs-action">
                                            Reviewer's Action
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div id="actionFormStages">
                                <span className="action-form-stages-label">Status</span><div className="action-form-stages-container"><span className="fa fa-angle-left viewMoreAngle"></span><div><div className="action-form-stages-initiator action-form-stages-complete"><div></div><div className="action-form-stages-tooltip"><div className="action-form-stages-tooltip-header"><strong>Stage : </strong>Initiator</div></div></div><div className="action-form-stages-complete"><div className=""></div><div className="action-form-stages-tooltip"><div className="action-form-stages-tooltip-header"><strong>Stage3: </strong>Materiality Statem...</div></div></div><div className="action-form-stages-complete"><div className=""></div><div className="action-form-stages-tooltip"><div className="action-form-stages-tooltip-header"><strong>Stage4: </strong>Materiality Statem...</div></div></div><div className="action-form-stages-complete"><div className=""></div><div className="action-form-stages-tooltip"><div className="action-form-stages-tooltip-header"><strong>Stage5: </strong>Materiality issuan...</div></div></div><div className="action-form-stages-complete"><div className="action-form-stages-last"></div><div className="action-form-stages-tooltip"><div className="action-form-stages-tooltip-header"><strong>Stage6: </strong>RMCE Note</div></div></div></div><span className="fa fa-angle-right viewMoreAngle"></span></div>
                                <div>
                                    <div className="all-stages-link" style={{}} data-bind="click:gm.actioncentre.viewApprovalHistory" id="actionFormShowStagesHistory" tabIndex="8" data-show="true">
                                        View All
                                    </div>
                                </div>
                            </div>
                            <div className="control-panel">
                                <div className="DcButton  hidden" id="remediationButton">
                                    <a href="#"
                                    //onclick="gm.actioncentre.addRemidiation()"
                                    >
                                        <table>
                                            <tbody><tr>

                                                <td>
                                                    <span id="" className="bold">ADD REMEDIATION</span>
                                                </td>
                                            </tr>
                                            </tbody></table>
                                    </a>
                                </div>
                                <button type="button" className="btn flatButton " id="print-icon"
                                    //onclick="printForm()"
                                    style={{
                                        marginLeft: '0.521vw',
                                        fontSize: '0.625vw',
                                        backgroundColor: 'transparent',
                                        boxShadow: 'inherit',
                                        margin: '0',
                                        borderRadius: '0',
                                        height: 'calc(40* 100vh / 910)',
                                        lineHeight: 'calc(40* 100vh / 910)',
                                    }}
                                ><i id="" className="glyphicon glyphicon-print"></i></button>

                                <div className="DcButton "
                                    style={{
                                        height: 'calc(40 * 100vh / 910)',
                                        lineHeight: 'calc(40* 100vh / 910)',
                                        margin: '0 0 calc(13* 100vw / 1920) calc(14* 100vw / 1920)',
                                        fontSize: 'calc(16*(50vh + 23.5vw) / 910)',
                                        backgroundColor: '#4e4e4e',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        padding: '0',
                                        borderRadius: 'calc(5*(50vh + 23.5vw)/910)',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <a href="#"
                                        style={{
                                            color: '#FFF',
                                            width: '100%',
                                            padding: '0 calc(16* 100vw / 1920)',
                                        }}
                                    //onclick="gm.actioncentre.closeRightPane(this)"
                                    >
                                        <table style={{ width: '100%' }}>
                                            <tbody><tr>

                                                <td>
                                                    <span id="" className="bold">Close</span>
                                                </td>
                                            </tr>
                                            </tbody></table>
                                    </a>
                                </div>

                                <div className="DcButton disabled" id="btn_left" style={{ display: 'none' }}>
                                    <a href="#">
                                        <table>
                                            <tbody><tr>

                                                <td>
                                                    <i id="" className="glyphicon glyphicon-chevron-left"></i>
                                                </td>
                                            </tr>
                                            </tbody></table>
                                    </a>
                                </div>

                                <div className="DcButton disabled" id="btn_right" style={{ display: 'none' }}>
                                    <a href="#">
                                        <table>
                                            <tbody><tr>

                                                <td>
                                                    <i id="" className="glyphicon glyphicon-chevron-right"></i>
                                                </td>
                                            </tr>
                                            </tbody></table>
                                    </a>
                                </div>

                                <div className="DcButton DcActionSubmit" id="submitActionCenterBtn" style={{ display: 'none' }}>
                                    <a href="#"
                                    //onclick="gm.actioncentre.submit()"
                                    >
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span id="" className="bold">Submit</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </a>
                                </div>
                            </div>
                        </div>



                    </div>
                    {/* body */}
                    <div className="LayoutPageBody">
                        <div className="LayoutPageThumbnails" style={{ display: 'none' }}>
                            <div>
                                <div id="thumbnailFirst" className="activeThumbnail">
                                    <span>1</span>
                                </div>
                                <div id="thumbnailThirdLast">
                                    <span>2</span>
                                </div>
                                <div id="thumbnailSecondLast">
                                    <span>3</span>
                                </div>
                                <div id="thumbnailLast">
                                    <span>4</span>
                                </div>
                            </div>
                        </div>
                        <div className="LayoutPages">
                            <div>
                                <div id="pageFirst" className="fixedPage">
                                    <div
                                        id="ActionValue"
                                        className="modal-body fixedPageContent">
                                    </div>
                                    <div id="actionBody" className="modal-body fixedPageContent">
                                        <div className="form-group NewActionValue">
                                            <label>Title</label>
                                            <input
                                                className="show amendmentFeild"
                                                id="titlefeild"
                                                data-bind="value:title"
                                                value='Vendor Fresh IT-17/02/2025 02:13 PM'
                                                readOnly
                                            />
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:title"
                                            ></div>
                                        </div>
                                        <div className="form-group NewActionValue">
                                            <label>Name</label>
                                            <span
                                                className="show amendmentFeild"
                                                data-bind="text:name">Vendor Fresh IT</span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:name"
                                            ></div>
                                        </div>
                                        <div className="form-group NewActionValue">
                                            <label>Description</label>
                                            <span
                                                className="show amendmentFeild"
                                                data-bind="text:taskDescription">Vendor Fresh IT
                                            </span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:taskDescription"
                                            ></div>
                                        </div>
                                        <div className="form-group NewActionValue">
                                            <label>ReferenceNumber</label>
                                            <span
                                                className="show amendmentFeild"
                                                data-bind="text:referenceNumber">E20250217136477
                                            </span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:referenceNumber"
                                            ></div>
                                        </div>

                                        <div
                                            className="form-group  item policy-process"
                                            id="policydiv"
                                            style={{ display: "none" }}>
                                            <label> Policy</label>
                                            <select
                                                id="policy"
                                                style={{ width: "100%" }}
                                                className="all-entities policy-process"
                                                data-placeholder="Select Policy"
                                                disabled
                                            >
                                                <option></option>
                                            </select>
                                            <div
                                                id="policy-text"
                                                className="form-group col-md-6"
                                            ></div>
                                        </div>

                                        <div
                                            className="form-group item policy-process"
                                            id="clausediv"
                                            style={{ display: "none" }}
                                        >
                                            <label> Clauses</label>
                                            <select
                                                id="clauses"
                                                style={{ width: "100%" }}
                                                multiple
                                                className="all-entities policy-process"
                                                data-placeholder="Select Clauses"
                                                disabled
                                            ></select>
                                        </div>

                                        <div
                                            className="form-group item policy-process"
                                            id="processdiv"
                                            style={{ display: "none" }}
                                        >
                                            <label> Business Process</label>
                                            <select
                                                id="process"
                                                style={{ width: "100%" }}
                                                multiple
                                                className="all-entities policy-process"
                                                data-placeholder="Select Business Process"
                                                disabled
                                            ></select>
                                            <div
                                                id="process-text"
                                                className="form-group col-md-12"
                                            ></div>
                                        </div>

                                        <div
                                            className="form-group item policy-process"
                                            id="controldiv"
                                            style={{ display: "none" }}
                                        >
                                            <label>Controls</label>
                                            <select
                                                id="control"
                                                name="control"
                                                style={{ width: "100%" }}
                                                multiple
                                                className="control"
                                                disabled
                                            ></select>
                                        </div>

                                        <div
                                            className="form-group item policy-process"
                                            id="riskdiv"
                                            style={{ display: "none" }}
                                        >
                                            <label>Risks</label>
                                            <select
                                                id="risk"
                                                name="risk"
                                                style={{ width: "100%" }}
                                                multiple
                                                className="risk"
                                                disabled
                                            ></select>
                                        </div>
                                        {/* <!-- ko if: unitofMeasurement() != null --> */}
                                        {/* <div className="form-group">
                                            <label>Unit Of Measurement</label>
                                            <span
                                                className="show amendmentFeild"
                                                data-bind="text:unitofMeasurement"
                                            ></span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:unitofMeasurement"
                                            ></div>
                                        </div> */}


                                        <div className="form-group" style={{ display: 'none' }}>
                                            <label id="selfAttestationLabel">SelfAttestation</label>
                                            <span
                                                className="show "
                                                id="selfAttestationPreview"
                                                data-bind="text:selfAttestationName"
                                            ></span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:selfAttestationName"
                                            ></div>
                                        </div>

                                        <div className="form-group" style={{ display: 'none' }} id="divSelfAttestation">
                                            <label id="lblSelfAttestation">Certificate</label>
                                            <select
                                                id="selfAttestationList"
                                                name="selfAttestationList"
                                                style={{ width: "100%" }}
                                                className="form-control"
                                            ></select>
                                        </div>

                                        <div className="form-group" style={{ display: 'none' }} >
                                            <label>ControlName</label>
                                            <span
                                                className="show"
                                                data-bind="text:controlName"
                                            ></span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:controlName"
                                            ></div>
                                        </div>

                                        <div className="form-group" style={{ display: 'none' }}>
                                            <label>RiskName</label>
                                            <span className="show" data-bind="text:riskName"></span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:riskName"
                                            ></div>
                                        </div>

                                        <div
                                            id="riskdetails"
                                            className="initiator_detalis"
                                            style={{
                                                border: "1px solid grey",
                                                borderRadius: "10px",
                                                margin: "2vw",
                                                display: "none",
                                            }}
                                        >
                                            <br />
                                            <div
                                                className="form-group"
                                                style={{
                                                    width: "33%",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}
                                            >
                                                <label style={{ marginBottom: "5px" }}>RiskScore</label>
                                                <br />
                                                <span id="riskscore"></span>
                                            </div>

                                            <div
                                                className="form-group"
                                                style={{
                                                    width: "33%",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}
                                            >
                                                <label style={{ marginBottom: "5px" }}>
                                                    RiskInterpretation
                                                </label>
                                                <br />
                                                <span id="riskinter"></span>
                                            </div>
                                            <br />
                                        </div>

                                        <div className="form-group" style={{ display: 'none' }}>
                                            <label>ControlDescription</label>
                                            <span
                                                className="show"
                                                data-bind="text:controlDescription"
                                            ></span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:controlDescription"
                                            ></div>
                                        </div>

                                        <div className="form-group" style={{ display: 'none' }}>
                                            <label>ITSystemName</label>
                                            <span
                                                className="show"
                                                data-bind="text:itSystemName"
                                            ></span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:itSystemName"
                                            ></div>
                                        </div>

                                        <div className="form-group" id="processName" style={{ display: 'none' }}>
                                            <label>ProcessName</label>
                                            <select
                                                id="referencecListRCSA"
                                                name="referencecListRCSA"
                                                className="form-control"
                                                style={{ width: "100%" }}
                                            ></select>
                                        </div>

                                        <div className="modal-body form-group"
                                            id="viewprocessdetails" style={{ display: 'none' }}
                                        >
                                            <a target="_blank" id="processUrl" href="#">
                                                ViewProcess
                                            </a>
                                            <br />
                                            <label>Status:</label>
                                            <label></label>
                                        </div>

                                        <div className="form-group" style={{ display: 'none' }} id="processName">
                                            <label>ProcessName</label>
                                            <select
                                                id="referencecListRCSA"
                                                name="referencecListRCSA"
                                                className="form-control"
                                                style={{ width: "100%" }}
                                            ></select>
                                        </div>

                                        <div
                                            className="modal-body form-group"
                                            id="viewprocessdetails" style={{ display: 'none' }}
                                        >
                                            <a target="_blank" id="processUrl" href="#">
                                                ViewProcess
                                            </a>
                                            <br />
                                            <label>Status:</label>
                                            <label></label>
                                        </div>

                                        <div className="form-group" style={{ display: 'none' }}>
                                            <label>PolicyName</label>
                                            <span className="show" data-bind="text:policyName"></span>
                                            <div
                                                className="printTextBox"
                                                style={{ display: "none" }}
                                                data-bind="text:policyName"
                                            ></div>
                                        </div>

                                        <div className="form-group" id="processurlreadOnly" style={{ display: 'none' }}>
                                            <a
                                                data-bind="attr: { href: url() }"
                                                target="_blank"
                                                id="processurlRCSA"
                                            >
                                                ViewProcessImage
                                            </a>
                                            <br />
                                            <label>Status:</label>
                                            <label data-bind="text: urlStatus"></label>
                                        </div>

                                        <div
                                            id="rejectProcessRCSA"
                                            className="form-group"
                                            style={{ display: "none", visibility: "hidden" }}
                                        >
                                            <label>RejectProcess</label>
                                            <input
                                                type="checkbox"
                                                id="chkRejectProcess"
                                                style={{ verticalAlign: "top", marginTop: "5px" }}
                                            />
                                            <div id="rejectProcessComment">
                                                <label>ProcessComment</label>
                                                <input
                                                    id="rejectProcessCommentTb"
                                                    placeholder="Enter Process Comment."
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            id="exceptionCountPreviewArea"
                                            className="material-datatables"
                                            style={{ display: "none" }}
                                        >
                                            <div className="table-responsive">
                                                <table
                                                    id="exceptionCountList"
                                                    className="table table-striped table-no-bordered table-hover"
                                                    style={{ width: "100%" }}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Name</th>
                                                            <th style={{ position: "relative", left: "0px" }}>
                                                                Type
                                                            </th>
                                                            <th
                                                                style={{ position: "relative", right: "20px" }}
                                                            >
                                                                Open
                                                            </th>
                                                            <th
                                                                style={{ position: "relative", right: "20px" }}
                                                            >
                                                                Closed
                                                            </th>
                                                            <th
                                                                style={{ position: "relative", right: "20px" }}
                                                            >
                                                                Total
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>

                                        {/* initialtor details */}

                                        <div
                                            id="initiatorDetails"
                                            className="initiator_detalis"
                                            style={{
                                                border: "1px solid grey",
                                                borderRadius: "10px",
                                                margin: "2vw",
                                            }}>
                                            <br />
                                            <div
                                                className="form-group"
                                                style={{
                                                    width: "33%",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}>
                                                <label style={{ marginBottom: "5px" }}>Initiator</label>
                                                <br />
                                                <span data-bind="text:initiatorName">Amar Patil</span>
                                            </div>
                                            <div
                                                className="form-group"
                                                style={{
                                                    width: "400px",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}>
                                                <label style={{ marginBottom: "5px" }}>
                                                    InitiatedDate
                                                </label>
                                                <br />
                                                <span data-bind="text:strDateOfRaise">17/02/2025 08:43:28 AM</span>
                                            </div>
                                            <div
                                                className="form-group"
                                                style={{
                                                    width: "200px",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}
                                            >
                                                <label style={{ marginBottom: "5px" }}>Role</label>
                                                <br />
                                                <span data-bind="text:initiatorRole">Testing Branches</span>
                                            </div>
                                            <br />
                                            <div
                                                className="form-group"
                                                style={{
                                                    display: 'none',
                                                    width: "33%",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}
                                            >
                                                <label style={{ marginBottom: "5px" }}>RiskName</label>
                                                <br />
                                                <span data-bind="text:kriRiskName"></span>
                                            </div>
                                            <div
                                                className="form-group"
                                                style={{
                                                    display: 'none',
                                                    width: "33%",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}
                                            >
                                                <label style={{ marginBottom: "5px" }}>
                                                    BaselLossType
                                                </label>
                                                <br />
                                                <span data-bind="text:baselLossType"></span>
                                            </div>
                                            <div
                                                className="form-group"
                                                style={{
                                                    display: 'none',
                                                    width: "21%",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}
                                            >
                                                <label style={{ marginBottom: "5px" }}>
                                                    BaselBusinessLine
                                                </label>
                                                <br />
                                                <span data-bind="text:baselBusinessLine"></span>
                                            </div>
                                            <br />
                                            <div
                                                className="form-group"
                                                style={{
                                                    display: 'none',
                                                    width: "33%",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}
                                            >
                                                <label style={{ marginBottom: "5px" }}>Target</label>
                                                <br />
                                                <span data-bind="text:targetValue"></span>
                                            </div>
                                            <div
                                                className="form-group"
                                                style={{
                                                    display: 'none',
                                                    width: "33%",
                                                    margin:
                                                        "calc(10 * 100vh / 910) calc(32 * 100vw / 1920)",
                                                }}
                                            >
                                                <label style={{ marginBottom: "5px" }}>Baseline</label>
                                                <br />
                                                <span data-bind="text:baselineValue"></span>
                                            </div>
                                        </div>

                                        {/* initialtor details end */}

                                        {/* Generated Page */}
                                        <FormRenderNew
                                                        data={data}
                                                        readOnly={false}
                                                        isComponentUpdate={true}
                                                      />
                                        
                                        <SummaryOfChanges/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default ActionCentreNewStyle