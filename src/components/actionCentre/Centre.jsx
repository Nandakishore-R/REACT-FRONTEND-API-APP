import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import './DataTables/datatables.min.css'
import './DataTables/datatables.css'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import ActionHeader from './ActionHeader';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
function Centre() {
    const [checkedOptions, setCheckedOptions] = useState({ 'options-all': true }); // State for checked checkboxes
    const [activeTab, setActiveTab] = useState('Due'); // State to track active tab

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target; // Get id and checked state
        setCheckedOptions({ ...checkedOptions, [id]: checked }); // Update state
    };

    const tabs = [
        { id: "Due", label: "Due", target: "DueTable", table: "DueList_Task" },
        { id: "Overdue", label: "Overdue", target: "OverdueTable", table: "OverdueList_Task" },
        { id: "Upcoming", label: "Upcoming", target: "Upcoming", table: "UpcomingList_Task" },
        { id: "Inprogress", label: "In Progress", target: "Inprogress", table: "InprogressList_Task" },
        { id: "Completed", label: "Completed", target: "Completed", table: "CompletedList_Task" },
    ];

    const workFlowTypes = [
        { Name: "Vendor Rating Review" },
        { Name: "Risk Review" },
        { Name: "KPI" },
    ];

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
    // State to hold the selected row
    const [selectedRow, setSelectedRow] = useState(null);

    // Example function to update the selected row
    const handleRowSelection = (row) => {
        setSelectedRow(row);
    };
    // console.log(activeTab);
    // Function to initialize DataTables
    const initializeDataTable = (columns) => {
        const tabId = tabs.find(tab => tab.id === activeTab).table;

        const tableElement = $(`#${tabId}`);
        // console.log("Table Element:", tableElement);
        tableElement.DataTable({
            destroy: true,
            columns,
            // ajax : {
            //     url : 'https://riskcentraltest.gieom.com/ActionCentre/Fetch?actionType=completed&selWorFlowTypeKeys=',
            //     type : "POST",
            // },
        });
    };

    useEffect(() => {
        document.querySelectorAll(".nav-tabs a").forEach((tab) => {
            tab.addEventListener("click", function (e) {
                e.preventDefault();
                let targetId = this.getAttribute("href").substring(1);

                // Hide all tabs
                document.querySelectorAll(".tab-pane").forEach((pane) => {
                    pane.style.display = "none";
                });

                // Show only the selected tab
                document.getElementById(targetId).style.display = "";
            });
        });
        // Initialize DataTable for the active tab
        initializeDataTable(columns[activeTab]);

        // Cleanup function to destroy DataTable when the component unmounts or tab changes
        return () => {
            $(`#${activeTab}_Task`).DataTable().destroy();
        };
    }, [activeTab]);

    useEffect(() => {

    }, [activeTab]);

    const [tabCounts, setTabCounts] = useState({
        due: 0,
        overdue: 0,
        upcoming: 0,
        inprogress: 0,
        completed: 0
    });

    useEffect(() => {
        // fetch("https://api.example.com/tab-counts") // Replace with actual API
        //     .then((response) => response.json())
        //     .then((data) => {
            let data = {due:0,overdue:935,upcoming:0,inprogress:934,completed:384};
            // data = data.json();
                setTabCounts(data);
            // })
            // .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
            <div className="panel-header">
                <Header />
                <div className="action-centre-nav">
                    <ul className="nav nav-tabs action-tabs">
                        <li className="active">
                            <a id="dueId" className="" data-toggle="tab" href="#DueTable"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab("Due");
                                }}
                            >
                                <span className="tab-num">{tabCounts.due}</span><br />Due</a>
                        </li>
                        <li>
                            <a id="overdueId" className="" data-toggle="tab" href="#OverdueTable"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab("Overdue");
                                }}><span className="tab-num">{tabCounts.overdue}</span><br />Overdue</a>
                        </li>
                        <li>
                            <a id="upcomingId" className="" data-toggle="tab" href="#Upcoming"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab("Upcoming");
                                }}><span className="tab-num">{tabCounts.upcoming}</span><br />Upcoming</a>
                        </li>
                        <li>
                            <a id="inprogressId" className="" data-toggle="tab" href="#Inprogress"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab("Inprogress");
                                }}><span className="tab-num">{tabCounts.inprogress}</span><br />In Progress</a>
                        </li>
                        <li>
                            <a id="completedId" className="" data-toggle="tab" href="#Completed"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab("Completed");
                                }}><span className="tab-num">{tabCounts.completed}</span><br />Completed</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-container">

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
                                                    <table id="DueList_Task" className="table row-border order-column" style={{ width: "100%" }}></table>
                                                    <div className="inner-tooltip"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="OverdueTable" className="tab-pane fade in">
                                        <div className="base-table">
                                            <div>
                                                <div className="material-datatables">
                                                    <table id="OverdueList_Task" className="table row-border order-column" style={{ width: "100%" }}></table>
                                                    <div className="inner-tooltip"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="Upcoming" className="tab-pane fade in">
                                        <div className="base-table">
                                            <div>
                                                <div className="material-datatables">
                                                    <table id="UpcomingList_Task" className="table row-border order-column" style={{ width: "100%" }}></table>
                                                    <div className="inner-tooltip"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="Inprogress" className="tab-pane fade in">
                                        <div className="base-table">
                                            <div>
                                                <div className="material-datatables">
                                                    <table id="InprogressList_Task" className="table row-border order-column" style={{ width: "100%" }}></table>
                                                    <div className="inner-tooltip"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="Completed" className="tab-pane fade in">
                                        <>
                                            <div className="base-table">
                                                <div>
                                                    <div className="material-datatables">
                                                        <table id="CompletedList_Task" className="table row-border order-column" style={{ width: "100%" }}></table>
                                                        <div className="inner-tooltip"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>

                                    <div id="Draft" className="tab-pane fade in">
                                        <div className="base-table">
                                            <div className="material-datatables">
                                                <table id="DraftList_Task" className="table row-border order-column" style={{ width: "100%" }}></table>
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

                <div
                    className="modalComment modal fade"
                    id="divCommentPopUp"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="myModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog-background" data-dismiss="modal"></div>
                    <div className="modal-dialog modal-lg">
                        <div
                            className="modal-content"
                            id="history_Div"
                            style={{ backgroundColor: "#eee" }}
                        >
                            <div className="modal-header" id="history_Divheader">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-hidden="true"
                                >
                                    <img
                                        className="request-navbar-cross"
                                        style={{ height: "3vh" }}
                                        src="\Views\Risk\icons\CloseIcon.svg"
                                    />
                                </button>
                                <h4 className="modal-title">FieldHistory</h4>
                            </div>
                            <div className="modal-body" id="actionFormCommentHistory"></div>
                            <div className="modal-body">
                                <input
                                    rows="1"
                                    className="form-control"
                                    type="text"
                                    //value=""
                                    id="CommentTextArea"
                                />
                                <button type="button" id="SaveCommentBtn">
                                    <svg viewBox="0 0 16 22">
                                        <use xlinkHref="#action-save-comment" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="approvalHistoryModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-header-title">
                                    <button type="button" className="close" data-dismiss="modal">
                                        <svg width="25" height="25" viewBox="0 0 25 20">
                                            <use xlinkHref="#close-modal" />
                                        </svg>
                                    </button>
                                    <h4 className="modal-title">ApprovalHistory</h4>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div id="no-stages-wrapper"></div>
                                <div className="row">
                                    <div className="col-md-3 modal-stages-wrapper">
                                        <div id="stages-list-icons"></div>
                                        <div id="stages-list-stage-names"></div>
                                    </div>
                                    <div className="col-md-9" id="stages-details"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="amendment_popup">
                    <div id="top_menu">
                        <div className="center-cell">
                            <div id="tab" className="btn-group" data-toggle="buttons">
                                <a
                                    href="#form"
                                    id="show_form"
                                    className="btn active"
                                    data-toggle="tab"
                                >
                                    <input type="radio" />
                                    Form
                                </a>
                                <a
                                    href="#stages"
                                    id="show_stages"
                                    className="btn"
                                    data-toggle="tab"
                                >
                                    <input type="radio" />
                                    Stakeholders
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="LayoutPage"
                        data-bind="with: gm.actioncentre.selectedRow()"
                    >
                        <div className="LayoutPageBody">
                            <div className="LayoutPageThumbnails">
                                <div>
                                    <div
                                        id="thumbnailFirst"
                                        className="activeThumbnail"
                                    //onclick"gm.actioncentre.pageThumbnailClick(this, 'pageFirst');"
                                    >
                                        <span>1</span>
                                    </div>
                                    <div
                                        id="thumbnailLast"
                                    //onclick"gm.actioncentre.pageThumbnailClick(this, 'pageLast');"
                                    >
                                        <span>2</span>
                                    </div>
                                </div>
                            </div>
                            <div className="LayoutPages">
                                <div>
                                    <div id="pageFirst" className="fixedPage">
                                        <div id="actionBody" className="modal-body fixedPageContent">
                                            <div className="form-group">
                                                <label>Title</label>
                                                <span className="show" data-bind="text:title" />
                                            </div>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <span className="show" data-bind="text:name" />
                                            </div>
                                            <div className="form-group">
                                                <label>ReferenceNumber</label>
                                                <span className="show" data-bind="text:referenceNumber" />
                                            </div>
                                            <div className="form-group hidden" id="originTaskDataArea">
                                                <label>OriginTask</label>
                                                <a
                                                    className="show btn btn-info"
                                                    href="#"
                                                    style={{ width: "300px" }}
                                                ></a>
                                            </div>
                                            <div
                                                className="form-group hidden"
                                                id="amendmentTaskDataArea"
                                            >
                                                <label>AmendmentTask</label>
                                                <a
                                                    className="show btn btn-info"
                                                    href="#"
                                                    style={{ width: "300px" }}
                                                ></a>
                                            </div>

                                            <div className="form-group">
                                                <label id="selfAttestationLabel">SelfAttestation</label>
                                                <span className="show" id="selfAttestationPreview" />
                                            </div>

                                            <div className="form-group" id="divSelfAttestation">
                                                <label id="lblSelfAttestation">Certificate</label>
                                                <select
                                                    id="selfAttestationList"
                                                    name="selfAttestationList"
                                                    style={{ width: "100%" }}
                                                    className="form-control"
                                                ></select>
                                            </div>

                                            <div className="form-group">
                                                <label>ControlName</label>
                                                <span className="show" data-bind="text:controlName" />
                                            </div>
                                            <div className="form-group">
                                                <label>RiskName</label>
                                                <span className="show" data-bind="text:riskName"></span>
                                                <div
                                                    className="printTextBox"
                                                    style={{ display: "none" }}
                                                    data-bind="text:riskName"
                                                ></div>
                                            </div>
                                            <div className="form-group">
                                                <label>ControlDescription</label>
                                                <span
                                                    className="show"
                                                    data-bind="text:controlDescription"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>ITSystemName</label>
                                                <span className="show" data-bind="text:itSystemName" />
                                            </div>
                                            <div className="form-group">
                                                <label>ProcessName</label>
                                                <span className="show" data-bind="text:processName" />
                                            </div>
                                            <div className="form-group">
                                                <label>PolicyName</label>
                                                <span className="show" data-bind="text:policyName" />
                                            </div>
                                            <div className="form-group">
                                                <a data-bind="attr: { href: url() }" target="_blank">
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
                                        </div>
                                    </div>
                                    <div id="pageLast" className="fixedPage edit-form">
                                        <div className="form-group" id="divAction">
                                            <div className="row">
                                                <div className="radioGroup col-md-6">
                                                    <label style={{ display: "block" }}>Action:</label>
                                                    <div className="radio">
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="radioAction2"
                                                                id="radioApprove2"
                                                            //value="NEXT"
                                                            />
                                                            Approve
                                                        </label>
                                                    </div>
                                                    <div className="radio">
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="radioAction2"
                                                                id="radioReject2"
                                                            //value="ZERO"
                                                            />
                                                            Reject
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6"></div>
                                            </div>

                                            <div className="form-group row" id="divReject">
                                                <label>RejectTo</label>
                                                <div className="radioGroup">
                                                    <div className="radio">
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="radioReject"
                                                                id="radioInitiator"
                                                            //value="Initiator"
                                                            />
                                                            Initiator
                                                        </label>
                                                    </div>
                                                    <div className="radio radioStage">
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="radioReject"
                                                                id="radioStage"
                                                            //value="PreviousStage"
                                                            />
                                                            PreviousStage
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="divPreviousStage">
                                                <div className="row">
                                                    <div className="form-group col-md-6 required">
                                                        <label>SelectStage</label>
                                                        <select
                                                            className="form-control"
                                                            id="lstStages"
                                                            style={{ width: "100%" }}
                                                            name="lstStages"
                                                        ></select>
                                                    </div>
                                                </div>
                                                <div className="row" id="assignedUserFormStagesWrapper">
                                                    <div id="assignedUserFormStages">
                                                        <div>
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div
                                                    className="form-group required col-md-6"
                                                    id="divAssignUsers"
                                                >
                                                    <label>AssignNewUsers</label>
                                                    <select
                                                        id="referBackUser"
                                                        name="referBackUser"
                                                        multiple
                                                        style={{ width: "100%" }}
                                                        data-placeholder="StartTypingUsername"
                                                    ></select>
                                                </div>

                                                <div
                                                    className="form-group required col-md-6"
                                                    id="divSelectForm"
                                                >
                                                    <label>SelectForm:</label>
                                                    <select
                                                        id="referBackUserForm"
                                                        name="referBackUserForm"
                                                        style={{ width: "100%" }}
                                                        data-placeholder="AssignAForm"
                                                    ></select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div
                                                    className="form-group col-md-6"
                                                    id="divAssignUserBtn"
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn btn-block"
                                                        data-bind="click:gm.actioncentre.assignUserForm"
                                                        id="assignUserForm"
                                                        tabIndex="8"
                                                    >
                                                        AddNewUser
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <svg style={{ display: "none" }}>
                    <symbol
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        id="action-open-view"
                    >
                        <g
                            id="Group_4225"
                            data-name="Group 4225"
                            transform="translate(-1676.34 -958.973)"
                        >
                            <path
                                id="Path_1306"
                                data-name="Path 1306"
                                d="M1696.335,958.972h-14.969a.992.992,0,0,0-1.025.954v17.1a.992.992,0,0,0,1.025.954h3.084V964.075l11.885-4.026v17.1l-2.457.832h2.457a.992.992,0,0,0,1.025-.954v-17a.992.992,0,0,0-1.025-.954Z"
                                transform="translate(0 0)"
                            />
                            <path
                                id="Path_1307"
                                data-name="Path 1307"
                                d="M1689.172,983.972a1.184,1.184,0,0,1-.672-.209,1.152,1.152,0,0,1-.5-.947V964.451a1.157,1.157,0,0,1,.771-1.086l12.049-4.324a1.186,1.186,0,0,1,1.073.14,1.151,1.151,0,0,1,.5.947v18.365a1.157,1.157,0,0,1-.771,1.086l-12.049,4.324A1.18,1.18,0,0,1,1689.172,983.972Zm1.172-18.711v15.9l9.7-3.482v-15.9Zm10.877,13.232h0Z"
                                transform="translate(-4.912 0)"
                            />
                        </g>
                    </symbol>

                    <symbol width="25" height="25" viewBox="0 0 25 25" id="action-save">
                        <g id="Action_Save" clipPath="url(#clip-Action_Save)">
                            <path
                                id="DISKETTE"
                                d="M237,2476.047a1.172,1.172,0,0,1-1.172,1.172H213.172a1.172,1.172,0,0,1-1.172-1.172v-21.875a1.172,1.172,0,0,1,1.172-1.171h3.516v1.563h0v4.3h0v3.516a2.344,2.344,0,0,0,2.288,2.344h10.269a2.343,2.343,0,0,0,2.287-2.344v-3.516h0v-4.3h0V2453h.781a1.166,1.166,0,0,1,.829.343h0l3.516,3.516h0a1.168,1.168,0,0,1,.343.829Zm-6.641-13.672a1.173,1.173,0,0,1-1.172,1.175h-1.563v0h-7.031v0h-1.562a1.173,1.173,0,0,1-1.172-1.175v-2.344h0V2453h12.5v7.031h0Zm-2.344-7.812H224.5v7.422h3.516Z"
                                transform="translate(-211.777 -2452)"
                                fillRule="evenodd"
                            />
                        </g>
                    </symbol>

                    <symbol width="25" height="25" viewBox="0 0 25 25" id="action-submit">
                        <g id="Action_Submit" clipPath="url(#clip-Action_Submit)">
                            <path
                                id="DOCUMENT__x2F__UPLOAD_1_"
                                d="M20.565,19.355a1.1,1.1,0,0,1-.847-.363l-.766-.766V23.79a1.21,1.21,0,0,1-2.419,0V18.226l-.766.766a1.1,1.1,0,0,1-.847.363,1.188,1.188,0,0,1-1.21-1.21,1.1,1.1,0,0,1,.363-.847L16.9,14.476a1.257,1.257,0,0,1,.847-.363,1.1,1.1,0,0,1,.847.363L21.411,17.3a1.257,1.257,0,0,1,.363.847A1.188,1.188,0,0,1,20.565,19.355Zm-7.339-2.9a2.276,2.276,0,0,0-.726,1.694,2.426,2.426,0,0,0,2.419,2.419,1.372,1.372,0,0,0,.4-.04v2.863H1.21A1.188,1.188,0,0,1,0,22.177V1.21A1.188,1.188,0,0,1,1.21,0H7.661V6.855a2.426,2.426,0,0,0,2.419,2.419h7.661V12.9a2.276,2.276,0,0,0-1.694.726ZM10.081,8.065a1.188,1.188,0,0,1-1.21-1.21V0h0l8.871,8.065H10.081Z"
                                transform="translate(2)"
                                fillRule="evenodd"
                            />
                        </g>
                    </symbol>

                    <symbol width="25" height="25" viewBox="0 0 25 25" id="action-review">
                        <g id="Action_Review" clipPath="url(#clip-Action_Review)">
                            <path
                                id="BOOK"
                                d="M1023.259,1136h-1.293v-25h1.293a1.293,1.293,0,0,1,1.293,1.293v22.414A1.293,1.293,0,0,1,1023.259,1136Zm-17.672-1.293v-1.293h2.155a2.586,2.586,0,0,0,0-5.173h-2.155v-2.155h2.155a2.586,2.586,0,0,0,0-5.172h-2.155v-2.155h2.155a2.586,2.586,0,1,0,0-5.172h-2.155v-1.293a1.293,1.293,0,0,1,1.293-1.293h13.793v25h-13.793A1.293,1.293,0,0,1,1005.586,1134.707Zm3.448-18.534a1.293,1.293,0,0,1-1.293,1.293h-3.448a1.293,1.293,0,1,1,0-2.586h3.448A1.293,1.293,0,0,1,1009.034,1116.173Zm-4.741,6.034h3.448a1.293,1.293,0,0,1,0,2.586h-3.448a1.293,1.293,0,0,1,0-2.586Zm0,7.328h3.448a1.293,1.293,0,1,1,0,2.586h-3.448a1.293,1.293,0,1,1,0-2.586Z"
                                transform="translate(-1001 -1111)"
                                fillRule="evenodd"
                            />
                        </g>
                    </symbol>
                </svg>

                <svg
                    style={{ display: "none" }}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                >
                    <symbol
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        id="close-modal"
                        fill="#ffffff"
                    >
                        <g id="Misc_Close" clipPath="url(#clip-Misc_Close)">
                            <rect
                                id="Rectangle_664"
                                data-name="Rectangle 664"
                                width="3"
                                height="23"
                                transform="translate(0.999 3.12) rotate(-45)"
                            />
                            <rect
                                id="Rectangle_665"
                                data-name="Rectangle 665"
                                width="3"
                                height="23"
                                transform="translate(17.264 1) rotate(45)"
                            />
                        </g>
                    </symbol>
                </svg>

                <svg
                    style={{ display: "none" }}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 16 22"
                >
                    <symbol
                        width="16"
                        height="22"
                        viewBox="0 0 16 22"
                        id="action-save-comment"
                    >
                        <g>
                            <path
                                d="M1,1 15,11.5 1,21Z"
                                stroke="#4D94FF"
                                strokeWidth="2"
                                fill="transparent"
                            />
                        </g>
                    </symbol>
                </svg>

                <div className="modal fade" id="printDialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-header-title">
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="modal-title">Print</h5>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        //onchange="printModal.toggleComments()"
                                        id="toggleComments"
                                    />
                                    <label className="form-check-label" htmlFor="toggleComments">
                                        IncludeSummaryOfComments
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        //onchange="printModal.toggleSummary()"
                                        id="toggleSummary"
                                    />
                                    <label className="form-check-label" htmlFor="toggleSummary">
                                        IncludeSummaryOfChanges
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        //onchange="printModal.toggleApproval()"
                                        id="toggleApproval"
                                    />
                                    <label className="form-check-label" htmlFor="toggleApproval">
                                        IncludeApprovalHistory
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                //onclick"printModal.print()"
                                >
                                    Print
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>


        </>
    )
}

export default Centre