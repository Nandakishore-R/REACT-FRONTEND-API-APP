import React from 'react'
import { Tabs, Steps, Button, Typography } from "antd";
import { PrinterOutlined, CloseOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Step } = Steps;
const { Text } = Typography;

function LayoutPageHeader({ handleViewAllClick }) {
    const stages = [
        { title: "Initiator" },
        { title: "Stage 3: Materiality Statement" },
        { title: "Stage 4: Materiality Statement" },
        { title: "Stage 5: Materiality Issuance" },
        { title: "Stage 6: RMCE Note" }
    ];
    return (
        // <div style={{ padding: "10px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        //     {/* Tabs Section */}
        //     <Tabs defaultActiveKey="1" type="card">
        //         <TabPane tab="Form" key="1" />
        //         {/* <TabPane tab="Reviewer's Action" key="2" /> */}
        //     </Tabs>

        //     {/* Status Steps */}
        //     <div style={{ flex: 1, marginLeft: "20px" }}>
        //         <Text strong>Status:</Text>
        //         <Steps size="small" current={stages.length - 1}>
        //             {stages.map((stage, index) => (
        //                 <Step key={index} title={stage.title} />
        //             ))}
        //         </Steps>
        //         <Button type="link" onClick={handleViewAllClick}>View All</Button>
        //     </div>

        //     {/* Action Buttons */}
        //     <div style={{ display: "flex", gap: "10px" }}>
        //         <Button icon={<PrinterOutlined />} />
        //         <Button type="primary" icon={<CloseOutlined />} style={{ background: "#4e4e4e", border: "none" }}>
        //             Close
        //         </Button>
        //     </div>

        // </div>

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
                        <div className="all-stages-link" style={{}} data-bind="click:gm.actioncentre.viewApprovalHistory" id="actionFormShowStagesHistory" tabIndex="8" data-show="true"
                            onClick={handleViewAllClick}>
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
    )
}

export default LayoutPageHeader