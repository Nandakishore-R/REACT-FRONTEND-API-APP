import React from 'react'
import StagesListNames from './StagesListNames'
import StageListIcons from './StageListIcons';
import StagesDetails from './StagesDetails';
import '../styles/ApprovalHistoryModal.css'
function ApprovalHistoryModal({onClose}) {
    const stagesData = {
        stages: [
            {
                approvers: [
                    "andrew"
                ],
                stageNumber: 1,
                dueDate: "2025-02-20T00:00:00",
                stageName: "Due diligence"
            },
            {
                approvers: [
                    "Mark"
                ],
                stageNumber: 2,
                dueDate: "2025-02-19T00:00:00",
                stageName: "Infosec clearance"
            },
            {
                approvers: [
                    "andrew"
                ],
                stageNumber: 3,
                dueDate: "2025-02-19T00:00:00",
                stageName: "Materiality Statement preparation"
            },
            {
                approvers: [
                    "Derek"
                ],
                stageNumber: 4,
                dueDate: "2025-02-19T00:00:00",
                stageName: "Materiality Statement review"
            },
            {
                approvers: [
                    "Kenny"
                ],
                stageNumber: 5,
                dueDate: "2025-02-19T00:00:00",
                stageName: "Materiality issuance and vendor creation"
            },
            {
                approvers: [
                    "andrew"
                ],
                stageNumber: 6,
                dueDate: "2025-02-20T00:00:00",
                stageName: "RMCE Note"
            }
        ],
        stagesHistory: [
            {
                userName: "amar",
                action: "Submit",
                stage: "Initiator",
                stageNumber: 0,
                stageName: "Initiator",
                lastUpdate: "2025-02-17T08:44:36.5127206",
                targetDate: "2025-02-17T08:43:28.883",
                remarks: "",
                remarkText: ""
            },
            {
                userName: "andrew",
                action: "Approve",
                stage: "Due diligence",
                stageNumber: 1,
                stageName: "Due diligence",
                lastUpdate: "2025-02-17T08:47:02.6693969",
                targetDate: "2025-02-20T00:00:00",
                remarks: "Approved",
                remarkText: "Approved"
            },
            {
                userName: "Mark",
                action: "Approve",
                stage: "Infosec clearance",
                stageNumber: 2,
                stageName: "Infosec clearance",
                lastUpdate: "2025-02-17T08:49:30.8171425",
                targetDate: "2025-02-19T00:00:00",
                remarks: "Approved",
                remarkText: "Approved"
            },
            {
                userName: "andrew",
                action: "Approve",
                stage: "Materiality Statement preparation",
                stageNumber: 3,
                stageName: "Materiality Statement preparation",
                lastUpdate: "2025-02-17T08:56:56.2435104",
                targetDate: "2025-02-19T00:00:00",
                remarks: "Approved",
                remarkText: "Approved"
            },
            {
                userName: "Derek",
                action: "Approve",
                stage: "Materiality Statement review",
                stageNumber: 4,
                stageName: "Materiality Statement review",
                lastUpdate: "2025-02-17T09:01:02.4552311",
                targetDate: "2025-02-19T00:00:00",
                remarks: "Approved",
                remarkText: "Approved"
            },
            {
                userName: "Kenny",
                action: "Approve",
                stage: "Materiality issuance and vendor creation",
                stageNumber: 5,
                stageName: "Materiality issuance and vendor creation",
                lastUpdate: "2025-02-17T09:02:22.9327167",
                targetDate: "2025-02-19T00:00:00",
                remarks: "Approved",
                remarkText: "Approved"
            },
            {
                userName: "andrew",
                action: "Approve",
                stage: "RMCE Note",
                stageNumber: 6,
                stageName: "RMCE Note",
                lastUpdate: "2025-02-17T09:06:22.2513706",
                targetDate: "2025-02-20T00:00:00",
                remarks: "Apprved",
                remarkText: "Apprved"
            }
        ],
        isCompleted: true,
        isRejected: false,
        inProgressStageNo: 7,
        approverActions: [
            {
                name: "Approve",
                actionId: "0b72943f-a4ff-4730-a2f6-85dd8e622293",
                nextStage: null
            }
        ]
    };
    return (
        <div className="modal fade in" id="approvalHistoryModal" style={{
            display: 'block', paddingRight: '7px', overflowX: 'hidden',
            overflowY: 'auto'
        }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-header-title">
                            <button type="button" className="close" data-dismiss="modal"  onClick={onClose}>
                                <svg width="25" height="25" viewBox="0 0 25 20" >
                                    <use xlinkHref="#close-modal"/>   
                                </svg>
                            </button>
                            <h4 className="modal-title">Approval History</h4>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div id="no-stages-wrapper" style={{display:'none'}}></div>
                        <div className="row">
                            <div className="col-md-3 modal-stages-wrapper ps-container ps-theme-default">
                                <StageListIcons stagesHistory={stagesData.stagesHistory} />
                                <StagesListNames stages={stagesData.stages} />
                                <div className="ps-scrollbar-x-rail" style={{ left: '0px', bottom: '0px' }}>
                                    <div className="ps-scrollbar-x" tabIndex="0" style={{ left: '0px', width: '0px' }}></div>
                                </div>
                                <div className="ps-scrollbar-y-rail" style={{ top: '0px', right: '0px' }}>
                                    <div className="ps-scrollbar-y" tabIndex="0" style={{ top: '0px', height: '0px' }}></div>
                                </div>
                            </div>
                            <StagesDetails stagesData={stagesData} />
                        </div>
                    </div>
                </div>
            </div>
            <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
                <symbol width="25" height="25" viewBox="0 0 25 25" id="close-modal" fill="#ffffff">
                    <g id="Misc_Close" clipPath="url(#clip-Misc_Close)">
                        <rect id="Rectangle_664" dataname="Rectangle 664" width="3" height="23" transform="translate(0.999 3.12) rotate(-45)" />
                        <rect id="Rectangle_665" dataname="Rectangle 665" width="3" height="23" transform="translate(17.264 1) rotate(45)" />
                    </g>
                </symbol>
            </svg>
        </div>

    )
}

export default ApprovalHistoryModal