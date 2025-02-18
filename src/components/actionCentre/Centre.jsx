import React, { useState, useEffect } from 'react';
// import './styles/Centre.css'
import './js/test.js'
import $ from 'jquery';
import  'datatables.net';
import './DataTables/datatables.min.css'
import './DataTables/datatables.css'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import ActionHeader from './ActionHeader';
function Centre() {
    const [checkedOptions, setCheckedOptions] = useState({ 'options-all': true }); // State for checked checkboxes
    const [activeTab, setActiveTab] = useState('Due'); // State to track active tab

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target; // Get id and checked state
        setCheckedOptions({ ...checkedOptions, [id]: checked }); // Update state
    };

    const tabs = [
        { id: "Due", label: "Due", target: "DueTable" , table : "DueList_Task"},
        { id: "Overdue", label: "Overdue", target: "OverdueTable", table : "OverdueList_Task" },
        { id: "Upcoming", label: "Upcoming", target: "Upcoming", table : "UpcomingList_Task" },
        { id: "Inprogress", label: "In Progress", target: "Inprogress", table : "InprogressList_Task" },
        { id: "Completed", label: "Completed", target: "Completed", table : "CompletedList_Task" },
    ];

    const workFlowTypes = [
        { Name: "Vendor Rating Review" },
        { Name: "Risk Review" },
        { Name: "KPI" }
    ];
    // State to hold the selected row
    const [selectedRow, setSelectedRow] = useState(null);

    // Example function to update the selected row
    const handleRowSelection = (row) => {
        setSelectedRow(row);
    };
    console.log(activeTab);
    // Function to initialize DataTables
    const initializeDataTable = (columns) => {
        const tabId = tabs.find(tab=>tab.id === activeTab).table;
        
        const tableElement = $(`#${tabId}`);
        // console.log("Table Element:", tableElement);
        tableElement.DataTable({
            destroy : true,
            columns,
            // ajax : {
            //     url : 'https://riskcentraltest.gieom.com/ActionCentre/Fetch?actionType=completed&selWorFlowTypeKeys=',
            //     type : "POST",
            // },
        });
    };

    useEffect(() => {
        const columns = {
            Due: [
                { data: "title", title: "Title" },
                { data: "referenceNumber", title: "REFERENCE ID" },
                { data: "businessControlTypeName", title: "TYPE" },
                { data: "dueDate", title: "TARGET DATE" },
                { data: "actionType", title: "ACTION" },
                { data: "actionType", title: "STATUS" },
            ],
            Overdue: [
                { data: "title", title: "TITLE" },
                { data: "referenceNumber", title: "REFERENCE ID" },
                { data: "businessControlTypeName", title: "TYPE" },
                { data: "dueDate", title: "TARGET DATE" },
                { data: "actionType", title: "ACTION" },
                { data: "actionType", title: "STATUS" },
            ],
            Upcoming: [
                { data: "title", title: "TITLE" },
                { data: "referenceNumber", title: "REFERENCE ID" },
                { data: "businessControlTypeName", title: "TYPE" },
                { data: "dueDate", title: "TARGET DATE" },
                { data: "actionType", title: "ACTION" },
                { data: "actionType", title: "STATUS" },
            ],
            Inprogress: [
                { data: "title", title: "TITLE" },
                { data: "referenceNumber", title: "REFERENCE ID" },
                { data: "businessControlTypeName", title: "TYPE" },
                { data: "dueDate", title: "TARGET DATE" },
                { data: "actionType", title: "STATUS" },
            ],
            Completed: [
                { data: "title", title: "Title" },
                { data: "referenceNumber", title: "REFERENCE ID" },
                { data: "businessControlTypeName", title: "TYPE" },
                { data: "completedDate", title: "SUBMITTED DATE" },
                { data: "actionType", title: "STATUS" },
            ],
            Draft: [
                { data: "name", title: "NAME" },
                { data: "businessControlTypeName", title: "Type" },
                { data: "dueDate", title: "Created Date" },
                { data: "actionType", title: "Action" },
            ],
        };

        // Initialize DataTable for the active tab
        initializeDataTable(columns[activeTab]);

        // Cleanup function to destroy DataTable when the component unmounts or tab changes
        return () => {
            $(`#${activeTab}_Task`).DataTable().destroy();
        };
    }, [activeTab]);

    return (
        <>
            <div className="action-centre-nav">
                <ul className="nav nav-tabs action-tabs">
                    <li className="active">
                        <a id="dueId" className="" data-toggle="tab" href="#DueTable"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Due");
                            }}
                        >
                            <span className="tab-num"></span><br />Due</a>
                    </li>
                    <li>
                        <a id="overdueId" className="" data-toggle="tab" href="#OverdueTable"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Overdue");
                            }}><span className="tab-num"></span><br />Overdue</a>
                    </li>
                    <li>
                        <a id="upcomingId" className="" data-toggle="tab" href="#Upcoming"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Upcoming");
                            }}><span className="tab-num"></span><br />Upcoming</a>
                    </li>
                    <li>
                        <a id="inprogressId" className="" data-toggle="tab" href="#Inprogress"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Inprogress");
                            }}><span className="tab-num"></span><br />In Progress</a>
                    </li>
                    <li>
                        <a id="completedId" className="" data-toggle="tab" href="#Completed"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Completed");
                            }}><span className="tab-num"></span><br />Completed</a>
                    </li>
                </ul>
            </div>
            <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <symbol id="action-open-sa" width="25" height="25" viewBox="0 0 25 25" fill="#FFC35E">
                    <g transform="translate(549.668 215.332)">
                        <path d="M-418.739-159h-3.713v17.951a2.327,2.327,0,0,1-2.327,2.327h-9.554v.381a1.123,1.123,0,0,0,1.123,1.123h14.471a1.123,1.123,0,0,0,1.123-1.123v-19.535A1.123,1.123,0,0,0-418.739-159Z" transform="translate(-107.803 -53.115)" />
                        <path d="M-533.073-215.333h-14.471a1.123,1.123,0,0,0-1.123,1.123v19.535a1.123,1.123,0,0,0,1.123,1.123h14.471a1.123,1.123,0,0,0,1.123-1.123V-214.21A1.123,1.123,0,0,0-533.073-215.333Zm-1.352,15.575a.876.876,0,0,1-.876.876h-10.015a.876.876,0,0,1-.876-.876h0a.876.876,0,0,1,.876-.876H-535.3a.876.876,0,0,1,.876.876Zm0-4a.876.876,0,0,1-.876.876h-10.015a.876.876,0,0,1-.876-.876h0a.876.876,0,0,1,.876-.876H-535.3a.876.876,0,0,1,.876.876Zm0-4a.876.876,0,0,1-.876.876h-10.015a.876.876,0,0,1-.876-.876h0a.876.876,0,0,1,.876-.876H-535.3a.876.876,0,0,1,.876.876Zm0-4a.876.876,0,0,1-.876.876h-10.015a.876.876,0,0,1-.876-.876h0a.876.876,0,0,1,.876-.876H-535.3a.876.876,0,0,1,.876.876Z" />
                    </g>
                </symbol>
            </svg>

            <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" xmlnsXlink="http://www.w3.org/1999/xlink">
                <symbol id="action-delete-sa" width="25" height="25" viewBox="0 0 25 25" fill="#FF525A">
                    <g>
                        <g transform="translate(-42)">
                            <path d="M0,3.879A1.27,1.27,0,0,1,1.293,2.586H7.759V1.293A1.27,1.27,0,0,1,9.052,0h2.586a1.27,1.27,0,0,1,1.293,1.293V2.586H19.4A1.27,1.27,0,0,1,20.69,3.879V5.172H0ZM19.4,7.759V23.707A1.27,1.27,0,0,1,18.1,25H2.586a1.27,1.27,0,0,1-1.293-1.293V6.466H19.4ZM6.466,10.345a1.293,1.293,0,0,0-2.586,0V21.121a1.293,1.293,0,1,0,2.586,0Zm5.172,0a1.293,1.293,0,0,0-2.586,0V21.121a1.293,1.293,0,1,0,2.586,0Zm5.172,0a1.293,1.293,0,1,0-2.586,0V21.121a1.293,1.293,0,1,0,2.586,0Z" transform="translate(45)" fillRule="evenodd" />
                        </g>
                    </g>
                </symbol>
            </svg>
            <div className="page-container">
                <div className="row">
                    <div id="amendment_history_popup">
                        <div className="history_content">
                            <div className="head_container">
                                <span
                                    // onClick="closeAmendmentHistory()"
                                    style={{ cursor: 'pointer' }}>&#x2716;</span><strong style={{ paddingLeft: '13px' }}>
                                        {/* @Resources_Messages.Label_AmendmentHistory */}
                                        </strong>
                            </div><br />
                            <div className="amendment_history_popup_scrollableDiv">
                                <label id="amendment_popup_text" className="label-important" style={{ paddingLeft: '35px' }}></label>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="content ManageLeftPanel col-md-2">
                        <div className="panel">
                            <div className="panel-heading header">
                                <label>SHOW</label>
                                <span className="fa fa-filter pull-right" style={{ color: 'white', fontSize: '1vw' }}></span>
                            </div>
                            <div className="panel-body" id="filterContainer">
                                <div className="checkbox p-l-15">
                                    <input
                                        type="checkbox"
                                        name="optionsCheckboxes"
                                        value=""
                                        id="options-all"
                                        checked={checkedOptions['options-all']} // Bind to state
                                        onChange={handleCheckboxChange} // Add onChange handler
                                    />
                                    <label htmlFor="options-all">
                                        All
                                    </label>
                                </div>
                                {workFlowTypes.map((wft) => (
                                    <div className="checkbox p-l-15" key={wft.Name}>
                                        <input
                                            type="checkbox"
                                            name="optionsCheckboxes"
                                            value={wft.Name}
                                            id={wft.Name}
                                            checked={checkedOptions[wft.Name] || false} // Bind to state, default to false
                                            onChange={handleCheckboxChange} // Add onChange handler
                                        />
                                        <label htmlFor={wft.Name}>{wft.Name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <section className="content ManageTable col-md-10" id="actionsArea">
                        <div style={{ position: "relative" }}>
                            <div className="tab-content marginTop paddingLR paddingBottom10">
                                <div id="DueTable" className="tab-pane fade in active">
                                    <div className="base-table">
                                        <div>
                                            <div className="material-datatables">
                                                <table id="DueList_Task" className="table row-border order-column"></table>
                                                <div className="inner-tooltip"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="OverdueTable" className="tab-pane fade in">
                                    <div className="base-table">
                                        <div>
                                            <div className="material-datatables">
                                                <table id="OverdueList_Task" className="table row-border order-column"></table>
                                                <div className="inner-tooltip"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="Upcoming" className="tab-pane fade in">
                                    <div className="base-table">
                                        <div>
                                            <div className="material-datatables">
                                                <table id="UpcomingList_Task" className="table row-border order-column"></table>
                                                <div className="inner-tooltip"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="Inprogress" className="tab-pane fade in">
                                    <div className="base-table">
                                        <div>
                                            <div className="material-datatables">
                                                <table id="InprogressList_Task" className="table row-border order-column"></table>
                                                <div className="inner-tooltip"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="Completed" className="tab-pane fade in">
                                    <>
                                        heloo
                                        <div className="base-table">
                                            <div>
                                                <div className="material-datatables">
                                                    <table id="CompletedList_Task" className="table row-border order-column"></table>
                                                    <div className="inner-tooltip"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                </div>

                                <div id="Draft" className="tab-pane fade in">
                                    <div className="base-table">
                                        <div className="material-datatables">
                                            <table id="DraftList_Task" className="table row-border order-column"></table>
                                            <div className="inner-tooltip"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >
            </div >
            <div id="myModal" className="quickview-wrapper fullWidth" style={{ marginTop: '8.2vh' }}>
                <div id="root1">//check
                </div>
                {selectedRow && (
                    <div className="LayoutPage">
                        <div className="LayoutPageHeader">
                        </div>
                        <div className="LayoutPageBody">
                            <div className="LayoutPageThumbnails">
                                <div>
                                    <div id="thumbnailFirst" className="activeThumbnail"
                                    // onClick="gm.actioncentre.pageThumbnailClick(this, 'pageFirst');"
                                    >
                                        <span>1</span>
                                    </div>
                                    <div id="thumbnailThirdLast"
                                    // onClick="gm.actioncentre.pageThumbnailClick(this, 'pageThirdLast');"
                                    >
                                        <span>2</span>
                                    </div>
                                    <div id="thumbnailSecondLast"
                                    // onClick="gm.actioncentre.pageThumbnailClick(this, 'pageSecondLast');"
                                    >
                                        <span>3</span>
                                    </div>
                                    <div id="thumbnailLast"
                                    // onClick="gm.actioncentre.pageThumbnailClick(this, 'pageLast');"
                                    >
                                        <span>4</span>
                                    </div>
                                </div>
                            </div>
                            <div className="LayoutPages">
                                <div>
                                    <div id="pageFirst" className="fixedPage">
                                        <div id="actionFormStages">
                                            <div className="action-form-stages-container">
                                            </div>
                                            <div>
                                                {/* <div className="all-stages-link" style={{display: none}}
                                         data-bind="click:gm.actioncentre.viewApprovalHistory"
                                         id="actionFormShowStagesHistory" tabindex="8" data-show="true"
                                        ViewAll
                                    </div> */}
                                            </div>
                                        </div>
                                        <div id="ActionValue" className="modal-body fixedPageContent">
                                            {/* Dynamic fields populated from API response */}
                                        </div>
                                        <div id="actionBody" className="modal-body fixedPageContent">
                                            <div className="form-group NewActionValue">
                                                <label>
                                                    @Resources_Messages.Label_Title
                                                </label>
                                                {/* <input className="show amendmentFeild" id="titlefeild"
                                                data-bind="value:title" readonly /> */}
                                                {/* <div className="printTextBox" style="display: none;"
                                                data-bind="text:title">
                                            </div> */}
                                            </div>
                                            {/* uses knockout js - above */}
                                            {/* <div className="form-group">
                                            <label id="selfAttestationLabel">
                                                @Resources_Messages.Label_SelfAttestation
                                            </label>
                                            <span class="show " id="selfAttestationPreview" data-bind="text:selfAttestationName"></span>
                                            <div class="printTextBox" style="display: none;"
                                                data-bind="text:selfAttestationName"></div>
                                        </div> */}
                                            <div id="riskdetails" className="initiator_detalis" style={{ border: '1px solid grey', borderRadius: '10px', margin: '2vw', display: 'none' }}>
                                                <br />
                                                <div className="form-group" style={{ width: '33%', margin: 'calc(10 * 100vh / 910) calc(32 * 100vw / 1920)' }}>
                                                    <label style={{ marginBottom: '5px' }}>
                                                        @Resources_Messages.Label_RiskScore
                                                    </label><br />
                                                    <span id="riskscore"></span>
                                                </div>
                                                <div className="form-group" style={{ width: '33%', margin: 'calc(10 * 100vh / 910) calc(32 * 100vw / 1920)' }}>
                                                    <label style={{ marginBottom: '5px' }}>
                                                        @Resources_Messages.Label_RiskInterpretation
                                                    </label><br />
                                                    <span id="riskinter"></span>
                                                </div><br />
                                            </div>
                                        </div>
                                    </div>
                                    {/* here */}
                                    {/* pageThirdLast, SecondLast and Last not added */}
                                </div>
                            </div>
                        </div>
                        <div className="stages-tab" id="stage_container2" style={{ display: 'none' }}>
                        </div>
                    </div>
                )}
            </div>

            <div id="controlsListModal" className="quickview-wrapper fullWidth" style={{ marginTop: '8vh' }}>
                <div className="LayoutPage"
                //  data-bind="with: gm.actioncentre.selectedRow()"
                >
                    <div className="LayoutPageBody form-tab">
                        <div className="LayoutPageThumbnails">
                            <div>
                                <div
                                    id="thumbnailFirstDraft"
                                    className="activeThumbnail"
                                // onClick={}
                                //() => handleThumbnailClick("pageFirstDraft")
                                >
                                    <span>1</span>
                                </div>
                                <div
                                    id="thumbnailLastDraft"
                                // onClick={() => handleThumbnailClick("pageLastDraft")}
                                >
                                    <span>2</span>
                                </div>
                            </div>
                        </div>
                        <div className="LayoutPages">
                            <div>
                                <div id="pageFirstDraft" className="fixedPage modal-body fixedPageContent">
                                    <div className="form-group">
                                        <label>
                                            @Resources_Messages.Label_Name
                                        </label>
                                        <span className="show" id="controlNamePreview" />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            @Resources_Messages.Label_Description
                                        </label>
                                        <span className="show" id="controlDescriptionPreview" style={{ minHeight: '6.2vh' }} />
                                    </div>

                                    <div className="form-group">
                                        <label id="selfAttestationLabelDraft">
                                            @Resources_Messages.Label_SelfAttestation
                                        </label>
                                        <span className="show" id="selfAttestationPreviewDraft" />
                                    </div>

                                    <div className="form-group">
                                        <label id="lblTitle">@Resources_Messages.Label_Title</label>
                                        <input id="taskTitle" name="taskTitle" disabled placeholder="@Resources_Messages.Label_TitleWillBeAutoGenerated" style={{ width: '100% !important' }} type="text"
                                            className="form-control" />
                                    </div>

                                    <div className="form-group" id="divSelfAttestationDraft">
                                        <label id="lblSelfAttestationDraft">@Resources_Messages.Label_SelectCertificate</label>
                                        <select id="selfAttestationListDraft" name="selfAttestationListDraft" style={{ width: '100% !important' }}
                                            className="form-control" data-placeholder="@Resources_Messages.Label_SelectCertificate"></select>
                                    </div>

                                    {/* @*<div class="form-group">
                                    <label id="lblControl">Select</label>
                                    <select id="controlList" name="controlList" style="width:100% !important;"
                                        class="form-control" data-placeholder="Select"></select>
                                </div>

                                <div class="form-group">
                                    <label id="lblControlDescription">Control Description :</label>
                                    <p id="controlDescription"></p>
                                </div>*@ */}
                                    <div className="modal-body checkbox-radios" id="radioGroupsforcontrol">
                                        <div className="radio">


                                            <label id="controls"
                                                style={{ cursor: 'not-allowed', color: 'rgba(0, 0, 0, 0.26)!important' }}>
                                                @Resources_Messages.Label_Control
                                                <input id="radioCon" type="radio" value="con"
                                                    name="typecontrol" disabled />
                                            </label>
                                            <label id="risks"
                                                style={{ cursor: 'not-allowed', color: 'rgba(0, 0, 0, 0.26)!important' }}>
                                                @Resources_Messages.Label_Risk
                                                <input id="radioRisk" type="radio" value="risk"
                                                    name="typecontrol" disabled />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="modal-body form-group">
                                        <label id="lblControl">@Resources_Messages.Label_Select</label><span className="text-danger">*</span>
                                        <select id="controlList" name="controlList"
                                            style={{ width: '100% !important' }}
                                            className="form-control" placeholder="@Resources_Messages.Label_Select">
                                        </select>
                                    </div>
                                    <div className="checkbox-radios" id="radioGroups" style={{ position: 'relative', left: '1vw' }}>
                                        <div className="radio">
                                            <label id="itSystems" style={{ cursor: 'not-allowed', color: 'rgba(0, 0, 0, 0.26)!important' }}>
                                                @Resources_Messages.Label_ITSystems
                                                <input id="radioIts" type="radio" value="its" name="type" disabled />
                                            </label>
                                            <label id="policies" style={{ cursor: 'not-allowed', color: 'rgba(0, 0, 0, 0.26)!important' }}>
                                                @Resources_Messages.Label_Policies
                                                <input id="radioPol" type="radio" value="pol" name="type" disabled />
                                            </label>
                                            <label id="processes" style={{ cursor: 'not-allowed', color: 'rgba(0, 0, 0, 0.26)!important' }}>
                                                @Resources_Messages.Label_Processes
                                                <input id="radioPro" type="radio" value="pro" name="type" disabled />
                                            </label>

                                        </div>
                                    </div>

                                    {/* @*<div class="modal-body form-group">
                                    <label id="lblReference">Select</label>
                                    <select id="referenceList" name="referenceList"
                                        class="form-control" data-placeholder="Select" style="width:100% !important;"></select>
                                </div>*@ */}
                                    <div className="modal-body form-group">
                                        <label id="lblReference">@Resources_Messages.Label_Select</label>
                                        <label>
                                            <span className="text-danger"></span>
                                        </label>
                                        <select id="referenceList" name="referenceList"
                                            className="form-control" placeholder="@Resources_Messages.Label_Select"
                                            style={{ width: '100% !important' }}></select>
                                    </div><br />

                                    <div className="form-group">
                                        <a target="_blank" id="processUrl" href="#">@Resources_Messages.Label_ViewProcess</a>
                                        <br />
                                        <label>@Resources_Messages.Label_Status:</label>
                                        <label></label>
                                    </div>
                                </div>
                                <div id="pageLastDraft" className="fixedPage">
                                    <div className=" form-group">
                                        <label>
                                            @Resources_Messages.Label_TargetDateToCloseTask
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input type="text" className="datepicker form-control" placeholder="@Resources_Messages.Label_EnterTargetDateToCloseTheTask" id="taskTargetDate" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    {/* stages tab */}
                </div>
            </div>




        </>
    )
}

export default Centre