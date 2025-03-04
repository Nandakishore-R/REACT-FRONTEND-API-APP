import React from 'react'

function StagesListNames({stages}) {
    return (
        <div id="stages-list-stage-names" style={{ height: '351px' }}>
            <div className="stages-desc-modal">Initiator</div>
            {stages.map((stage) => (
                <div key={stage.stageNumber} className="stages-desc-modal">
                    <div className="stage-complete">
                        Stage{stage.stageNumber}
                        <br />
                        <span>{stage.stageName}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StagesListNames