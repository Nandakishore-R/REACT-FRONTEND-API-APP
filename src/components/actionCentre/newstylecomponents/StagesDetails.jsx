import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/StagesDetails.css'
function StagesDetails({ stagesData }) {
    console.log(stagesData.stagesHistory);
    return (
        // <PerfectScrollbar>
        <div className="col-md-9 ps-container ps-theme-default ps-active-y" id="stages-details" style={{ height: '483px' }}>
            {stagesData.stagesHistory.map((history, index) => (
                <React.Fragment key={index}>
                    <div key={index} className={`stage-detail${history.remarks ? ' stage-with-remarks' : ''}`}>
                        <div className="stages-username-date historyUserNameEllipse">
                            <span className="username historyUserNameEllipsis" title={history.userName}>{history.userName}</span>
                            <span className="date">{new Date(history.lastUpdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="stages-stage">{history.stageName}</div>
                        <div className="stages-action"><strong>Action:&nbsp;</strong>{history.action}</div>
                    </div>
                    {history.remarks && <div className="stages-remarks"><strong>Remark:&nbsp;</strong>{history.remarks}</div>}
                </React.Fragment>
            ))}
            <div className="ps-scrollbar-x-rail" style={{ left: '0px', bottom: '-251.2px' }}><div className="ps-scrollbar-x" tabIndex="0" style={{ left: '0px', width: '0px' }}></div></div>
            <div className="ps-scrollbar-y-rail" style={{ top: '251.2px', height: '483px', right: '0px' }}><div className="ps-scrollbar-y" tabIndex="0" style={{ top: '165px', height: '317px' }}></div></div>
        </div>
        // </PerfectScrollbar>
    )
}

export default StagesDetails