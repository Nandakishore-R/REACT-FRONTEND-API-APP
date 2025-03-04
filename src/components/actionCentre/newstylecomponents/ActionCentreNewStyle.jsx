import React, { useEffect } from 'react';
import { useState } from 'react';
import FormRenderNew from './FormRenderNew';
import parsedData from './formdata';
import newdata from './newdata';
import SummaryOfChanges from './SummaryOfChanges';
import ApprovalHistoryModal from './ApprovalHistoryModal';
import InitiatorDetails from './InitiatorDetails';
import Table2 from '../../../common/Table2';
import TaskDetails from './TaskDetails';
import LayoutPageHeader from './LayoutPageHeader';

function ActionCentreNewStyle() {

    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        console.log(showModal);
    }, [showModal]);
    const handleViewAllClick = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
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
    else {
        data = getData(parsedData);
    }
    return (
        <div className="main-container">
            <div
                id="myModal"
                className="quickview-wrapper fullWidth open"
                style={{ marginTop: " 8.2vh" }}>
                <div id="root"></div>
                <div className="LayoutPage" style={{ height: '593px' }}
                    data-bind="with: gm.actioncentre.selectedRow()">
                    
                    <LayoutPageHeader handleViewAllClick={handleViewAllClick}/>
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
                                    <div id="actionBody" className="modal-body fixedPageContent">
                                        {/* The Task Details Section */}
                                        <TaskDetails data={newdata} />
                                        
                                        <InitiatorDetails data={newdata} />

                                        {/* Generated Page */}
                                        {/* <FormRenderNew
                                                        data={data}
                                                        readOnly={false}
                                                        isComponentUpdate={true}
                                                      /> */}

                                        <SummaryOfChanges />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            {showModal && <ApprovalHistoryModal onClose={handleCloseModal} />}
        </div >
    )
}

export default ActionCentreNewStyle