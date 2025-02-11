import { Button, Col, Tooltip } from "antd";
import { useState } from "react";
function SidebarEntity(props) {
    /*
`
        Lattech changes
        - name for changing the value of the current active tab
    
    */
   console.log(props);
    const [name, setName] = useState(props.currentActiveTab);
    const handleClick = (e, data, id) => {
        if (e._dispatchInstances && e._dispatchInstances.hasOwnProperty('_debugOwner'))
            props.keyAccess(e._dispatchInstances._debugOwner.key)
        if (e._dispatchInstances[0] && e._dispatchInstances[0].hasOwnProperty('_debugOwner'))
            props.keyAccess(e._dispatchInstances[0]._debugOwner.key)
        if (props.Remediation == true) {
            props.keyAccess(id);
        }
        props.closeAllForms();

        props.setSelectedId({
            Id: "",
            expansion: false,
            selection: false,
            level: 0,
            type: ""
        });

        props.setEntityExpSel([]);
        props.setParentRender(!props.parentRender);
        if (props.linkRisk) {

            props.setCurrentLevelID(e._dispatchInstances[0]._debugOwner.key);
        }

    }


    if (props.linkRisk || (props.calledFrom && props.calledFrom.toLowerCase() == "riskentity") || props.openRiskModal) {

        var currentIndex = props.masterId.indexOf(props.currentMasterRiskModalId);


    }

    /*
        
        Lattech Changes
        - Function to handle click event of sidebar components
        - Function calls the GetRiskData with masterId as the parameter 
        - If condition to check and load where it is loaded from

    */

    const handleRiskClick = (e, masterId, data) => {
        GetRiskData(masterId);
        setName(data);
    }

    if (props.calledFrom == "RiskRegistry") {
        return (
            // <Col span={6} className='bsc-sidebar'>
            //     {props.data.map((tab, index) => {
            //         return (
            //             <Button
            //                 onClick={(e, data) => {
            //                     handleRiskClick(e, props.masterId[index], tab);
            //                 }
            //                 }
            //                 id={props.setStakeholderData || props.openRiskModal || props.linkRisk ? "initiativecheck-btn" : ""}
            //                 className={
            //                     `entity-sidebar-btn ${name == tab ? 'bsc-active' : ''}`}
            //                 key={props.masterId[index]}
            //             >
            //                 {tab}
            //                 <img id="entity-sidebar-dis-icon" src="\Views\Risk\icons\Arrow_Side.svg" />

            //                 {(props.setStakeholderData && !props.openRiskModal) || (props.openRiskModal) ? "" : <div className={
            //                     `bsc-desc ${name == tab ? 'activedesc' : ''}`}>
            //                     <Tooltip placement="topLeft" title={props.description[index]}>{props.description[index]}</Tooltip>
            //                 </div>}
            //             </Button>
            //         )
            //     })
            //     }
            // </Col>
            <h1>HELLO 1</h1>
        )
    } else {
        return (
            <Col span={props.openInModal ? 4 : 3} className='bsc-sidebar'>

                {props.data.map((tab, index) => {
                    if ((props.bscProps && !props.openRiskModal && tab == props.bscProps.headerKey && props.component == "Roles")
                        || (props.openRiskModal && index == currentIndex) || (props.linkRisk && index < currentIndex) || (props.calledFrom && props.calledFrom.toLowerCase() == "riskentity" && index == currentIndex) ||
                        props.showLevel.toLowerCase() == "all"
                    ) {

                        return (
                            <Button
                                onClick={(e, data) => {
                                    handleClick(e, data, props.masterId[index]);
                                    props.handleOnSideNavItemClicked(tab);
                                }
                                }
                                //If description is there the width of button will be more
                                id={props.showLevelDescription ? "" : "initiativecheck-btn"}
                                className={props.bscProps
                                    ?
                                    `entity-sidebar-btn ${props.bscProps.headerKey == tab ? 'bsc-active' : ''}`
                                    :
                                    props.openRiskModal && index == currentIndex
                                        ?
                                        'entity-sidebar-btn  bsc-active'
                                        :
                                        `entity-sidebar-btn ${props.currentActiveTab == tab ? 'bsc-active' : ''}`}
                                key={props.masterId[index]}
                            >
                                {tab}
                                <img id={!props.showLevelDescription ? "modal-sidebar-dis-icon" : "entity-sidebar-dis-icon"} src="\Views\Risk\icons\Arrow_Side.svg" />

                                {(props.showLevelDescription ?
                                    <div className={props.bscProps
                                        ?
                                        `entity-desc ${props.bscProps.headerKey == tab ? 'activedesc' : ''}`
                                        :
                                        `entity-desc ${props.currentActiveTab == tab ? 'activedesc' : ''}`}>
                                        <Tooltip placement="topLeft" title={props.description[index]}>{props.description[index]}</Tooltip>
                                    </div>
                                    : ""
                                )}
                            </Button>
                        )
                    }
                }

                )}
            </Col>)
            // <h1>HELLO 2</h1>)
    }


}

export default SidebarEntity