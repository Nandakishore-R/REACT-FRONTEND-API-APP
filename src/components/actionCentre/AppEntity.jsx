import { useTranslation } from "react-i18next";
import React from "react";
import $ from "jquery";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { toastr } from "react-redux-toastr";
import SidebarEntity from "./SidebarEntity";

function AppEntity({
    data,
    component,
    bscProps,
    keystate,
    calledFrom,
    openRiskModal,
    membershipsData,
    allDisplay,
    linkRisk,
    Remediation,
    setLinkRisk,
    type,
    currentMasterRiskModalId,
    selectedRiskHeatmap,
    preSelectedElement,
    selectedItem, setSelectedItem,
    searchingURL, searchTypeList,
    /*Pre-Requisites*/
    selectionType, selection,
    showForm, showEntityRoles,
    showEntitiesOnly, showEntityRolesUsers,
    showRisksKri, parentVisible, showRisksOnly, checkPreSelection, additionAllowed,
    showLevelDescription, fetchParentRisks,
    showLevel, showLineInModal, openInModal, formDisplayInModal, openInScreen, showRiskDescription, fetchHeatmapAssociatedEntities


}) {
    const { t, i18n } = useTranslation();


    const [entityExpSel, setEntityExpSel] = useState([]);
    //handle id of children in Panel
    const [selectedId, setSelectedId] = useState({
        Id: "",
        expansion: false,
        selection: false,
        level: 1,
        type: ""
    });

    const [value, setValue] = useState(0);
    const forceUpdate = () => {
        return setValue(value + 1);
    }
    const [reload, setReload] = useState(false);
    const [FrequencyData, setFrequencyData] = useState(false);
    //stores entity
    const [getEntity, setGetEntity] = useState([]);
    //to add entity at level 0
    const [addParentEntity, setAddParentEntity] = useState(false);
    //add entity
    const [addChildEntity, setAddChildEntity] = useState(false);
    //check which level is set to current selected level
    const [currentActiveTab, setCurrentActiveTab] = useState("");
    //handle add entity form
    const [showEntityForm, setShowEntityForm] = useState(false);
    //manages the refresh of the component
    const [reRenderForm, setReRenderForm] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [master, setMaster] = useState([]);
    const [masterId, setMasterId] = useState([]); //(FOR MASTERID)Get the main bscmasterid and other required parameters required for other components
    const [description, setDescription] = useState([]);
    const [hasChildren, sethasChildren] = useState(false);
    const [hasPrimaryChildren, sethasPrimaryChildren] = useState(false);
    const [hasChildPresent, sethasChildPresent] = useState(false);
    const [keyAccess, setKeyAccess] = useState(""); // to access the level , the key is set here
    const handleOnSideNavItemClicked = item => {
        setCurrentActiveTab(item);
    };
    /*panel display state*/

    /*to check user state for panel display and send data*/
    const [userstatedata, setUserstatedata] = useState([]);
    const handleOnPanelClicked = item => setCurrentPannelId(item);
    //getEntityDetails Data
    const [entityDetails, setEntityDetails] = useState("");
    //getRoleDetais Data
    const [roleDetails, setRoleDetails] = useState("");
    //getUserDetails Data
    const [userDetails, setuserDetails] = useState("");
    //handle Role form
    const [showRoleForm, setShowRoleForm] = useState(false);
    //handle User Form
    const [showUserForm, setshowUserForm] = useState(false);
    const [showUserFormModel, setshowUserFormModel] = useState(false);
    //For setting the state of the input fields (make it editable or non-editable)
    const [disable, setDisable] = useState(true);
    const [parentRender, setParentRender] = useState(true);
    const [userCheck, setUserCheck] = useState(false);
    const [userCall, setUserCall] = useState(false);
    //state for opening assign users modal
    const [assignUsersModal, setAssignUsersModal] = useState(false);
    //selected users 
    const [selectedUsersKeyAccess, setSelectedUsersKeyAccess] = useState("");

    /* ---------------STATES OF RISK HIERARCHY------------------ */

    const [Parentriskname, setParentriskname] = useState("");
    const [Parentriskid, setParentriskid] = useState("");
    const [Parentlevelname, setParentlevelname] = useState("");
    // handle risk form
    const [currentLevelID, setCurrentLevelID] = useState("");
    const [showRiskForm, setShowRiskForm] = useState(false);
    const [calledFromPanel, setCalledFromPanel] = useState(true);
    const [riskGetDetails, setRiskGetDetails] = useState("");
    //to check whether the risk added is Parent risk or not
    const [addParentRisk, setAddParentRisk] = useState(true);
    const [linkParent, setLinkParent] = useState(false);
    //manages the refresh of the component
    const [showKriForm, setShowKriForm] = useState(false);
    const [kriDetails, setKriDetails] = useState("");
    //sidebar for risk hierarchy
    const [sidebarIndex, setSidebarIndex] = useState(
        masterId.indexOf(keyAccess)
    );

    //to Prevent Panel collapse after Updating a Role
    const [preventPanelcollapse, setpreventPanelcollapse] = useState("");
    const [UsersUnderRole, setUsersUnderRole] = useState([]);

    //Handling multiselect roles and users for balanacedscorecard
    const [multiSelectBsc, setMultiSelectBsc] = useState([]);
    var handleuser = null;

    /*------------FILTER AND SEARCH----------*/
    const [term, setTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState(searchTypeList ? searchTypeList : ["None"]);
    const [itemList, setItemList] = useState([])
    const [sortType, setSortType] = useState({ type: 'modifiedDate', order: 'desc' })


    const clearSelections = () => {
        //To remove all the selection , when clicked on Add at Parent Level
        Object.keys(entityExpSel).forEach((i) => { entityExpSel[i].selection = false, entityExpSel[i].expansion = false })
        setSelectedId({
            Id: "",
            expansion: false,
            selection: false,
            level: 1,
            type: ""
        })
    }
    //function called on clicking on add risk/entity
    function closeOtherForms() {
        setDisable(false);
        setShowKriForm(false);
        setAddParentRisk(false);
        setRiskGetDetails("");
        setCalledFromPanel(false);
        setParentriskid("");
        setParentriskname("");
        setAddChildEntity(false);
        setEntityDetails("");
        clearSelections()
    }
    function closeAllForms() {
        setShowEntityForm(false);
        setshowUserForm(false);
        setShowRoleForm(false);
        setEntityDetails("");
        setShowRiskForm(false);
        setRiskGetDetails("");
        setShowKriForm(false);
        setUserCheck(false);
        setUserstatedata("");
    }
    const updateEntitySelectionList = (response) => {
        //Addon in the existing list.
        //This is because the selection and deselection depends on entityExpSel state
        let arrayOfItems = entityExpSel;
        response.map((tab) => {
            const index = arrayOfItems.findIndex(x => x.Id == tab.id);
            if (index === -1) {
                arrayOfItems = [
                    ...arrayOfItems,
                    {
                        Id: tab.id,
                        selection: false,
                        expansion: false,
                        level: tab.level,
                        type: tab.entityType
                    },
                ]
            }
            else {
                /*update the level , because during search if any data is added 
                to entityExpSel it would have level as 0*/
                arrayOfItems[index].level = tab.level;
            }
        });
        setEntityExpSel(arrayOfItems);
    }


    // //Fetching Sidebar
    // useEffect(() => {
    //     let masterapi;
    //     if (showRiskDescription){
    //         masterapi = '/RiskHierarchy/GetRiskHierarchyMaster';
    //     }
    //     else {
    //         masterapi = '/EntityAndRoleHierarchy/GetEntityHierarchyMaster';
    //     }
    //     $.ajax({
    //         type: "GET",
    //         async: false,
    //         url: masterapi,
    //         contenttype: "application/json",
    //         success: function (response) {
    //             console.log
    //             let desc;
    //             let object = response.map(function (value) {
    //                 return value.Name;
    //             });
    //             if (calledFrom != "RiskHierarchy") {
    //                 desc = response.map(function (value) {
    //                     return value.EntityHierarchyDescription;
    //                 });

    //             } else if (calledFrom == "RiskHierarchy") {
    //                 desc = response.map(function (value) {
    //                     return value.RiskHierarchyDescription;
    //                 });
    //             }
    //             let key = response.map(function (value) {
    //                 return value.BscMasterID;
    //             });
    //             setCurrentActiveTab(response[0].Name);
    //             setDescription(desc);
    //             setMaster(object);
    //             setMasterId(key);
    //             setKeyAccess(response[0].BscMasterID);
    //             setCurrentLevelID(response[0].BscMasterID);
    //         },
    //         error: function (error) {
    //             toastr.error(error);
    //         }
    //     });
    // }, []);



    //Fetching Parents of Entities At Every Level

    useEffect(
        () => {
            if (keyAccess) {
                //defining url
                if (fetchHeatmapAssociatedEntities) {
                    getParentUrl = "/HeatmapDesigner/GetParentEntitiesForHeatmap";
                }
                else if (fetchParentRisks) {
                    getParentUrl = "/RiskHierarchy/GetRisksForRiskHierarchybyMaster"
                }
                else {
                    //get parent entities
                    getParentUrl = '/EntityAndRoleHierarchy/GetParentEntities';
                }
                //defining payload
                let data;
                if (calledFrom == "RiskEntity" && type != "control") {
                    if (component != "Heatmap" && component != "HeatmapCheck") {
                        data = {
                            EntityHierarchyMasterId: currentMasterRiskModalId
                        };
                    }
                    else if (component == "Heatmap") {
                        data = {
                            EntityHierarchyMasterId: keyAccess
                        };
                    }
                    else {
                        data = {
                            RiskId: selectedRiskHeatmap
                        }
                    }

                } else if ((calledFrom == "Workflow" && Remediation == true) || (calledFrom != "RiskHierarchy")) {
                    data = {
                        EntityHierarchyMasterId: keyAccess
                    };
                } else if (
                    calledFrom == "RiskHierarchy" &&
                    !openRiskModal &&
                    !linkRisk
                ) {
                    data = {
                        RiskHierarchyMasterID: keyAccess
                    };
                } else if (calledFrom == "RiskHierarchy" && linkRisk) {
                    data = {
                        RiskHierarchyMasterID: currentLevelID
                    };
                } else if (calledFrom == "RiskHierarchy" & openRiskModal) {
                    if (component != "Heatmap") {
                        data = {
                            RiskHierarchyMasterID: currentMasterRiskModalId
                        };
                    }
                    else {
                        data = {
                            RiskHierarchyMasterID: keyAccess
                        };
                    }

                } else if (
                    calledFrom == "RiskHierarchy" &&
                    linkRisk &&
                    currentLevelID != ""
                ) {
                    data = {
                        RiskHierarchyMasterID: currentLevelID
                    };
                } $.ajax({
                    type: "GET",
                    async: false,
                    data: data,
                    url: getParentUrl,
                    contenttype: "application/json",
                    success: function (response) {
                        setGetEntity(response);
                        let arrayOfItems = []
                        response.map((tab) => {
                            arrayOfItems.push({
                                Id: tab.id,
                                selection: false,
                                expansion: false,
                                level: 0,
                                type: tab.entityType
                            })
                        });
                        setEntityExpSel(arrayOfItems);
                    },
                    error: function (response) {
                        console.log(response);
                    }
                });
            }
        },
        [keyAccess, currentLevelID, parentRender, selectedRiskHeatmap]
    );



    //Fetching the Entities
    useEffect(
        () => {
            let id = selectedId.Id;
            if (keyAccess && id && (selectedId.expansion == true || preventPanelcollapse == "UpdatedRole")) {
                const newData = removeData(getEntity, selectedId.level);
                //url definition
                if (calledFrom != "RiskHierarchy" && component != "HeatmapCheck") {
                    getEntities = '/EntityAndRoleHierarchy/GetEntityRole';
                } else if (calledFrom == "RiskHierarchy" && component != "HeatmapCheck") {
                    getEntities = '/RiskHierarchy/GetChildRisks';
                }
                else {
                    getEntities = "/HeatmapDesigner/GetChildrenEntitiesForHeatmap";
                }
                //payload definition
                let data;
                if (preventPanelcollapse == "UpdatedRole") {
                    data = {
                        EntityHierarchyMasterId: keyAccess,
                        ParentEntityId: roleDetails.EntityDetailsId,
                        EntityType: null,
                        Level: selectedId.level
                    };
                } else if (calledFrom != "RiskHierarchy") {

                    if (component != "HeatmapCheck") {
                        data = {
                            EntityHierarchyMasterId: currentMasterRiskModalId || keyAccess,
                            ParentEntityId: id,
                            EntityType: handleuser,
                            Level: selectedId.level
                        };
                    }
                    else {

                        data = {
                            ParentEntityId: id,
                            RiskID: selectedRiskHeatmap
                        }
                    }
                } else if (calledFrom == "RiskHierarchy" && !openRiskModal) {
                    data = {
                        RiskHierarchyMasterID: keyAccess,
                        ParentRiskID: id
                    };
                } else if (calledFrom == "RiskHierarchy" && openRiskModal) {
                    if (component == "Heatmap") {
                        data = {
                            RiskHierarchyMasterID: keyAccess,
                            ParentRiskID: id
                        };
                    }
                    else {
                        data = {
                            RiskHierarchyMasterID: currentMasterRiskModalId,
                            ParentRiskID: id
                        };
                    }

                }

                $.ajax({
                    type: "GET",
                    async: true,
                    data: data,
                    url: getEntities,
                    contenttype: "application/json",
                    success: function (response) {
                        updateEntitySelectionList(response)
                        setpreventPanelcollapse("");
                        if (response.length > 0) {
                            const data = checkData(newData, response);
                            setGetEntity(data);
                            handleuser = null;
                        }
                        forceUpdate();
                    },
                    error: function (response) {
                        toastr.error(response);
                    }
                });
            }
        },
        [reRenderForm, selectedId]
    );
    // to remove the children of the entity
    function removeData(data, level) {
        for (let i = 0; i < data.length; i++) {
            const currentItem = data[i];
            if (data[i].children) {
                var child = data[i].children;
                if (child.length > 0 && child[0].level > level) {
                    currentItem.children = [];
                }
                else if (currentItem.children && currentItem.children.length > 0) removeData(currentItem.children, level);
            }
        }
        return data;
    }
    /*function for nest PanelEntity Component Data*/
    function checkData(data, child) {
        if (child.length > 0) {
            let isFound = false;
            for (let i = 0; i < data.length; i++) {
                const currentItem = data[i];
                const currentItemId = currentItem.id;
                const currentChild = child[0];
                const currentChildItemId = currentChild.id;
                const currentChildParentId = currentChild.parent_Id;
                if (currentItem.children) checkData(currentItem.children, child);
                if (currentChildParentId === currentItemId) {
                    currentItem["children"] = child;
                    isFound = true;
                    return data;
                }
            }
        }
        return data;
    }

    //API call to get Entity details
    useEffect(
        () => {
            let id = selectedId.Id;
            if (showForm && id && selectedId.hasOwnProperty('type') && selectedId.type && selectedId.type != `${t('Label_Risk')}` && selectedId.type.toLowerCase() != "role" && selectedId.type != `${('Label_KRI')}`) {
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "/EntityAndRoleHierarchy/GetEntityHierarchyDetails",
                    data: { EntityDetailsId: id },
                    contenttype: "application/json",
                    success: function (response) {
                        setEntityDetails(response);
                        setAddChildEntity(false);
                        setAddParentEntity(false);
                    },
                    error: function (error) { }
                });
            }
        },
        [selectedId, showEntityForm]
    );

    // Api for fetching Users
    useEffect(() => {
        if (selectedId.expansion == true && selectedId.hasOwnProperty('type') && selectedId.type && selectedId.type.toLowerCase() == "role") {
            $.ajax({
                type: "GET",
                data: {
                    RoleId: selectedId.Id,
                    order: "FirstName",
                    orderType: "asc",
                    row: 1000,
                    offset: 0,
                    searchKey: ""
                },
                url: "/EntityAndRoleHierarchy/GetUsers",
                contentType: 'application/json',
                success: function (response) {
                    setUserstatedata(response);
                    setUsersUnderRole(response);

                },
                error: function (error) {
                    toastr.error(error)
                }
            });
        }
    }, [userCall, selectedId, showUserForm]);



    //API to get Role Details
    useEffect(
        () => {
            if (userCheck == true && selectedId.hasOwnProperty('type') && selectedId.type && selectedId.type.toLowerCase() == "role") {
                $.ajax({
                    type: "GET",
                    data: {
                        RoleId: selectedId.Id,
                        order: "FirstName",
                        orderType: "asc",
                        row: 1000,
                        offset: 0,
                        searchKey: ""
                    },
                    url: "/EntityAndRoleHierarchy/GetUsers",
                    contentType: 'application/json',
                    success: function (response) {
                        setUserstatedata(response);
                        setUsersUnderRole(response);

                    },
                    error: function (error) {
                        toastr.error(error)
                    }
                });
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "/EntityAndRoleHierarchy/GetRoleDetails",
                    data: { Id: selectedId.Id },
                    contenttype: "application/json",
                    success: function (response) {
                        setRoleDetails(response);
                        roleSelectionDetails = response;
                    },
                    error: function (error) { toastr.error(error) }
                });

            }
        },
        [userCheck, selectedId]
    );

    //API to get Risk Details
    useEffect(
        () => {

            if (selectedId.selection == true && selectedId.hasOwnProperty('type') && selectedId.type && selectedId.type == `${t('Label_Risk')}`) {
                let id = selectedId.Id;
                $.ajax({
                    type: "GET",
                    async: false,
                    url: '/RiskHierarchy/GetRiskDetails',
                    data: { RiskHierarchyDetailsID: id },
                    contenttype: "application/json",
                    success: function (result) {
                        setRiskGetDetails(result.result);
                        setFrequencyData(false);
                        if (result.result.ParentRisk) {
                            setParentriskid(result.result.ParentRisk);
                            setParentriskname(result.result.ParentRiskName);
                            setParentlevelname(result.result.RiskHierarchyMaster);

                        }
                        if (result.result.ParentRisk == null) {
                            setParentriskid("");
                            setParentriskname("");
                            setParentlevelname("");
                        }

                        setCalledFromPanel(true);
                    },
                    error: function (error) {
                        toastr.error(error)
                    }
                });
            }
        },
        [selectedId]
    );

    //API to get KRI Details
    useEffect(
        () => {
            if (showKriForm && selectedId.hasOwnProperty('type') && selectedId.type && selectedId.type == `${t('Label_KRI')}`) {
                let id = selectedId.Id;
                $.ajax({
                    type: "GET",
                    async: false,
                    url: '/RiskHierarchy/GetKriDetails',
                    data: { KRIDetailsID: id },
                    contenttype: "application/json",
                    success: response => {
                        setKriDetails(response.result);
                        setCalledFromPanel(true);
                    },
                    error: err => { toastr.error(err) }
                });
            }
        },
        [selectedId]
    );

    useEffect(
        () => {
            if (allDisplay) {
                clearSelections()
                setshowUserForm(false);
                setUserCheck(false);
                setUserstatedata("");
                handleuser = null;
                setSelectedItem ? setSelectedItem([]) : "";
            }
        },
        [allDisplay]
    );

    /*BalancedScorecard Multiple Selection */
    var headerobj = {
        multiselectData: multiSelectBsc,
        /*userId: selection =="rolesusers" ? selectedUsersKeyAccess : ""*/
    };

    if (keystate) {
        keystate(headerobj);
    }
    if (membershipsData && bscProps) {
        //remove the object from userlist
        membershipsData(multiSelectBsc);
    }


    //To set Entity keyAccess in case of bsc
    useEffect(
        () => {
            if (bscProps) {
                setKeyAccess(bscProps.bsc);
            }
            setSidebarIndex(masterId.indexOf(keyAccess));
        },
        [keyAccess]
    );
    useEffect(() => {
        if (showRoleForm) {
            handleuser = "Role";
        }
        else {
            handleuser = null;
        }
    }, [showRoleForm])

    /* Filter Functionality*/
    /*Search Functionality*/
    const onSearchSubmit = async term => {
        let masterId = keyAccess;
        //For allocation in Risk Hierarchy , as Sidebar updation of keyAccess is'nt working correctly
        // If sidebar is corrected ,this code can be removed.
        if (calledFrom == "RiskEntity" && type != "control" &&
            component != "Heatmap" && component != "HeatmapCheck") {
            masterId = currentMasterRiskModalId;
        }
        if (term != '' && term.length > 0) {
            const res = await fetch(`${searchingURL}?Term=${term}&MasterId=${masterId}`);
            const response = await res.json();
            if (response.length > 0) {
                updateEntitySelectionList(response)
                setItemList(response)
            }
            else {
                setItemList(["NO_RESULT_FOUND"]);
            }
        }
        else {
            setItemList([]);
        }
        if (selectionType.toLowerCase() == "single") {
            clearSelections();
            closeAllForms();
        }
    }

    const clearResults = () => {
        clearSelections();
        setItemList([])
        closeAllForms();
    };

    /*End of Search Functionality*/

    return (
        <div>
            <div >

                {assignUsersModal && <UserAssignment
                    //as childKeyAccess , cuz in workflow it's sent in this manner 
                    getEntity={getEntity}
                    childKeyAccess={selectedId.Id}
                    entityExpSel={entityExpSel}
                    setShowRoleForm={setShowRoleForm}
                    selectedId={selectedId}
                    setUserCheck={setUserCheck}
                    setUserCall={setUserCall}
                    userCheck={userCheck}
                    userCall={userCall}
                    url={data}
                    setUsersUnderRole={setUsersUnderRole}
                    UsersUnderRole={UsersUnderRole}
                    setAssignUsersModal={setAssignUsersModal}
                    assignUsersModal={assignUsersModal}
                    setReload={setReload}
                    reload={reload}
                    setshowUserForm={setshowUserForm}
                    showUserForm={showUserForm}
                    setSelectedUsers={setSelectedUsers}
                    selectedUsers={selectedUsers}
                    roleDetails={roleDetails}
                    setshowUserFormModel={setshowUserFormModel}
                />
                }
                {showUserFormModel && (
                    <UserformRU
                        {...{
                            roleDetails,
                            setReRenderForm,
                            reRenderForm,
                            component,
                            userDetails,
                            setshowUserForm
                        }}
                        setReload={setReload}
                        reload={reload}
                        createcheck={true}
                        setUserCheck={setUserCheck}
                        setSelectedUsers={setSelectedUsers}
                        selectedUsers={selectedUsers}
                        setUserCall={setUserCall}
                        userCheck={userCheck}
                        userCall={userCall}
                        setshowUserFormModel={setshowUserFormModel}

                    />
                )}
            </div>
            <div className="body">
                <Row>
                    {(bscProps) && <Col />}
                    {component != "HeatmapCheck" && (<SidebarEntity
                        {...{
                            setEntityExpSel, setUserstatedata,
                            handleOnSideNavItemClicked, currentActiveTab,
                            description, masterId, setSelectedId,
                            setEntityDetails, bscProps, component,
                            calledFrom, setRiskGetDetails, currentMasterRiskModalId,
                            openRiskModal, sidebarIndex, linkRisk, linkParent,
                            setLinkParent, currentLevelID, setCurrentLevelID,
                            type, parentRender, setParentRender,
                            selectionType, closeAllForms, showLevelDescription,
                            showLevel, openInModal, Remediation
                        }}
                        urls={data}
                        data={master}
                        keyAccess={setKeyAccess}
                        keyId={keyAccess}
                    />)}
                    
                </Row>
            </div>

        </div>
    );
}
export default AppEntity;
