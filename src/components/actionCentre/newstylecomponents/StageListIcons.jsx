import React from 'react'

function StageListIcons({ stagesHistory }) {
    return (
        <div id="stages-list-icons">
            <ul className="stages-modal-icons"
             style={{
                listStyle: 'none',
                padding: '0',
            }}
            >
                {stagesHistory.map((history, index) => (
                    <li
                        key={index}
                        className={`history-stages-complete ${history.stageNumber === 0 ? 'initiator-stage' : ''}`}
                        title={history.userName}
                    ></li>
                ))}
            </ul>
        </div>
    )
}

export default StageListIcons