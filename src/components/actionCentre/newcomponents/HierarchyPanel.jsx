function HierarchyPanel(props) {
    const { t, i18n } = useTranslation();
    const Row = window["antd"].Row;
    const Col = window["antd"].Col;
    const Tooltip = window["antd"].Tooltip;
    const Popover = window["antd"].Popover;
    const [childhoverData, setchildhoverData] = React.useState([]);
    const [parenthoverData, setparenthoverData] = React.useState([]);;


    var singleSelect = (props.selectionType).toLowerCase() == "single";
    var multiSelect = (props.selectionType).toLowerCase() == "multiple";
    var multiUserSelect = multiSelect && (props.selection).toLowerCase() == "users";
    var multiRiskSelect = multiSelect && (props.selection).toLowerCase() == "risks";
    var multiEntityRoleSelect = multiSelect && (props.selection).toLowerCase() == "entityroles";
    var multiEntitySelect = multiSelect && (props.selection).toLowerCase() == "entities";
    var multiRoleSelect = multiSelect && (props.selection).toLowerCase() == "roles";

    function panelClick(tab, checkUser) {
        //Find the index of the current selection from the list
        var index = props.entityExpSel.findIndex(function (o) {
            return (o.Id === tab.id);
        });
        if (singleSelect) {

            //To select if initially not selected and vice-a-versa
            props.entityExpSel[index].selection = !props.entityExpSel[index].selection;
            //To make all other selections false except for the current selection
            props.entityExpSel.map((val, i) => {
                if (val.Id != tab.id) {
                    props.entityExpSel[i].selection = false;
                }
                //If an arrow of one item is clicked and we select another item and add some child to it , the previous selected item arrow should also be collapsed . So on selection of item at same level the other items expansion will be made false to overcome the issue
                if (val.level == tab.level && val.Id != tab.id) {
                    props.entityExpSel[i].expansion = false;
                }
            })
            //If any model is opened , which is single select (selectedItem state needs to be sent)
            if (props.setSelectedItem) {
                props.setSelectedItem([{
                    Id: tab.id,
                    Name: tab.name,
                    Type: tab.entityType,
                    IconName: tab.entityTypeIconName,
                    ParentLevelName: tab.riskLevel
                }]);
                props.entityExpSel.map((val, i) => {
                    if (val.Id == props.selectedItem.Id) {
                        props.entityExpSel[i].selection = true;
                    }
                })
            }
        }

        if (multiRiskSelect) {
            handleMultiSelectRisksSelection(tab);
        }
        if (multiEntityRoleSelect) {
            handleMultiEntityRoleSelection(tab);
        }
        if (multiEntitySelect) {
            let checkIndex = -1;
            //When an model is opened and the element is clicked which was already present in the selection , there are three ways to handle that(show preselection, override the latest selection and do not allow the click). To handle it via last method the following function is written.(E.g in allocation of entities at risk hierarchy and control library)
            if (props.checkPreSelection) {
                checkIndex = props.preSelectedElement.findIndex(function (o) {
                    return (o.Id === tab.id);
                })
                if (checkIndex == -1) {
                    handleMultiEntitySelection(tab);
                }
                else {
                    toastr.error(`${t('Error_ItemAlreadyExists')}`)
                }
            }
            else {
                handleMultiEntitySelection(tab);
            }
        }

        if (multiRoleSelect) {
            handleMultiRoleSelection(tab);
        }
        props.setSelectedId({
            Id: tab.id,
            expansion: props.entityExpSel[index].expansion,
            selection: true,
            level: tab.level,
            type: tab.entityType
        });

        //To close all the elements that are below the currently clicked element 
        props.entityExpSel.map((val, i) => {
            if (val.level > tab.level) {
                props.entityExpSel[i].expansion = false;
            }
        })

        //To close all the forms if no selection is true
        closeAllForms();
    }

    function handleMultiEntityRoleSelection(tab) {
        let index = props.selectedItem.findIndex(function (o) {
            return (o.Id === tab.id);
        })
        if (index !== -1) {
            const filteredArray = props.selectedItem.filter((ele) => {
                return ele.Id != tab.id;
            });
            props.setSelectedItem(filteredArray);
        }
        else {
            props.selectedItem.push({
                Id: tab.id,
                Name: tab.name,
                Type: tab.entityType,
                IconName: tab.entityTypeIconName
            })
        }
    }
    function handleMultiSelectRisksSelection(tab) {
        let index = props.selectedItem.findIndex(function (o) {
            return (o.RiskID === tab.id);
        })
        if (index !== -1) {
            const filteredArray = props.selectedItem.filter((ele) => {
                return ele.RiskID != tab.id;
            });
            props.setSelectedItem(filteredArray);
        }
        else {
            props.selectedItem.push({
                RiskID: tab.id,
                Name: tab.name,
                RiskHierarchyDetailsID: tab.id
            })
        }
    }

    function handleMultiEntitySelection(tab) {
        let index = props.selectedItem.findIndex(function (o) {
            return (o.Id === tab.id);
        })
        if (index !== -1) {
            const filteredArray = props.selectedItem.filter((ele) => {
                return ele.Id != tab.id;
            });
            props.setSelectedItem(filteredArray);
        }
        else {
            props.selectedItem.push({
                Id: tab.id,
                RiskID: props.selectedRiskHeatmap //For heatmapbyrisk , to check the entities allocated to which risk
            })
        }
    }

    function handleMultiRoleSelection(tab) {
        if (tab.entityType.toLowerCase() == "role") {
            let index = props.selectedItem.findIndex(function (o) {
                return (o.Id === tab.id);
            })
            if (index !== -1) {
                const filteredArray = props.selectedItem.filter((ele) => {
                    return ele.Id != tab.id;
                });
                props.setSelectedItem(filteredArray);
            }
            else {
                props.selectedItem.push({
                    Id: tab.id,
                    RoleId: tab.id,
                    EntityDetailsId: tab.parent_Id
                })
            }
        }
    }

    function handleUserSelection(tab) {
        let array = []; let setArray;
        if (props.bscProps) {
            array = props.multiSelectBsc;
            setArray = props.setMultiSelectBsc
        }
        else {
            array = props.selectedItem;
            setArray = props.setSelectedItem
        }

        var index = array.findIndex(function (o) {
            return (o.RoleId === tab.roleId);
        });
        if (index !== -1) {
            const filteredArray = array.filter((ele) => {
                return ele.RoleId != tab.roleId;
            });
            setArray(filteredArray);
        }
        else {
            array.push({
                EntityDetailsId: tab.entityId,
                RoleId: tab.roleId,
                /*                        UserIds: [],*/
                entityid: tab.entityId,
                EntityName: tab.entityName,
                RoleName: tab.role,
                roleid: tab.roleId,
                UsersList: []
            })
        }
    }

    function handleDownArrowClick(tab) {
        let index = props.entityExpSel.findIndex((obj => obj.Id == tab.id));

        //make the expansion true of the currently clicked arrow
        props.entityExpSel[index].expansion = true;
        Object.keys(props.entityExpSel).forEach((val, i) => {
            //make all other expansions false at the same level
            if (props.entityExpSel[i].level == tab.level && props.entityExpSel[i].Id != tab.id) {
                props.entityExpSel[i].expansion = false
            }
            //remove any previous selection made on the previous levels (prev to which the arrow is clicked) or same level
            if (singleSelect) {
                if ((props.entityExpSel[i].level >= tab.level || props.entityExpSel[i].level <= tab.level) && props.entityExpSel[i].Id != tab.id) {
                    props.entityExpSel[i].selection = false
                }
            }
        });
        //To remove all previous elements of the array which are a level up, if arrow is clicked at another element of previous level . E.g. Element 0 from level 0 arrow was clicked and then element 1 from level 0 arrow was clicked , all the children of element 0 will be removed from the array.
        const filteredArray = props.entityExpSel.filter((ele, i) => {
            return props.entityExpSel[index].level >= ele.level;
        });
        props.setEntityExpSel(filteredArray);
        //Update the Selected Id state with the latest values
        props.setSelectedId({
            Id: props.entityExpSel[index].Id,
            expansion: props.entityExpSel[index].expansion,
            selection: props.entityExpSel[index].selection,
            level: props.entityExpSel[index].level,
            type: props.entityExpSel[index].type
        });

        //To close all the forms if no selection is true
        closeAllForms(filteredArray);
    }

    function handleUpArrowClick(tab) {
        let index = props.entityExpSel.findIndex((obj => obj.Id == tab.id));
        //To make the expansion false of the currently selected arrow
        props.entityExpSel[index].expansion = false;
        //To remove all the children of the element whose arrow is clicked
        const filteredArray = props.entityExpSel.filter((ele) => {
            return ele.level <= tab.level;
        });
        props.setEntityExpSel(filteredArray);


        //To update the values of the Id whose arrow is clicked
        props.setSelectedId({
            Id: props.entityExpSel[index].Id,
            expansion: props.entityExpSel[index].expansion,
            selection: props.entityExpSel[index].selection,
            level: props.entityExpSel[index].level,
            type: props.entityExpSel[index].type
        });

        //To close all the forms if no selection is true
        closeAllForms(filteredArray);
    }

    function addEntityForm() {
        props.setDisable(false);
        props.setShowEntityForm(true);
        props.setAddParentEntity(false);
        props.setAddChildEntity(true);
        props.setEntityDetails("");
    }

    function displayEntityForm() {
        props.setDisable(true);
        props.setShowEntityForm(true);
        props.setShowRoleForm(false);
        props.setshowUserForm(false);

    }

    function addRiskForm() {
        props.setDisable(false);
        props.setShowRiskForm(true);
        props.setCalledFromPanel(false);
        props.setShowKriForm(false);
        props.setFrequencyData(true);
        props.setEntityDetails("");
        props.setRiskGetDetails("");
        props.setAddParentRisk(false);
        props.setLinkParent(false);
    }
    function displayRiskForm() {
        props.setDisable(true);
        props.setShowRiskForm(true);
        props.setAddParentRisk(false);
        props.setShowKriForm(false);
    }
    function displayChildRiskFormInModal(tab) {
        displayChildRiskForm()
    }
    function displayChildRiskForm() {
        props.setDisable(true);
        props.setShowRiskForm(true);
        props.setLinkParent(false);
        props.setShowKriForm(false);
        props.setCalledFromPanel(true);
        /* props.setAddParentRisk(true);*/
    }
    function addRoleForm() {
        props.setDisable(false);
        props.setShowEntityForm(false);
        props.setAddParentEntity(false);
        props.setShowRoleForm(true);
        props.setshowUserForm(false);
        props.setRoleDetails("");
    }
    function displayChildRoleForm(tab) {
        props.setDisable(true);
        props.setShowRoleForm(true);
        props.setShowEntityForm(false);
        props.setshowUserForm(false);
    }
    function addKriForm() {
        props.setDisable(false);
        props.setShowRiskForm(false);
        props.setShowKriForm(true);
        props.setAddParentRisk(false);
        props.setCalledFromPanel(false);
        props.setRiskGetDetails("");
        props.setEntityDetails("");
        props.setKriDetails("");
    }
    function closeAllForms(filteredarray) {
        let array = filteredarray || props.entityExpSel;
        let allSelection = array.every(item => item['selection'] == false)
        if (allSelection) {
            props.setShowEntityForm(false);
            props.setShowRoleForm(false);
            props.setShowRiskForm(false);
            props.setShowKriForm(false);
            props.setAddParentEntity(false);
            props.setAddParentRisk(false);
        }
        props.setUserstatedata("")
        props.setshowUserForm(false);

    }

    function UserClickFunction(tab) {
        if (multiUserSelect) {
            handleUserSelection(tab)
        }
        /* for user selection in role user */
        if (singleSelect) {
            //To make all other selections false except for the current selection
            Object.keys(props.entityExpSel).forEach((i) => props.entityExpSel[i].selection = false);
        }
        props.setShowRiskForm(false);
        props.setshowUserForm(!props.showUserForm);
        props.setAddParentEntity(false);
        props.setShowEntityForm(false);
        props.setShowRoleForm(false);
    }

    function handlechildForms(tab, checkUser) {
        /*Below code snippet for checking if there is any child in 
        Entity Hierarchy / Risk Hierarchy */
        //Here isPrimaryChildPresent is true when Parent and Child have same Entity Type down the parent level
        //isNonPrimaryChildPresent is true when Parent and Child have different Entity Type down the parent level
        props.sethasPrimaryChild(tab.isPrimaryChildPresent || tab.isNonPrimaryChildPresent);

        //isChildPresent is true when there is any child down the parent level
        props.setChildrenPresent(tab.isChildPresent);
        if ((!tab.isPrimaryChildPresent || !tab.isNonPrimaryChildPresent) || !tab.isChildPresent) {
            props.setChildren(false);
        }
        let index = props.entityExpSel.findIndex((obj => obj.Id == tab.id));
        if ((singleSelect && index != -1 && props.entityExpSel[index].selection == true) /*|| checkUser*/) {
            setOtherLevelTypes(tab, checkUser)//(arrowclick,checkUser)
        }
        if (
            props.calledFrom == "RiskHierarchy" &&
            props.openRiskModal &&
            tab.entityType == `${t('Label_Risk')}`
        ) {
            displayChildRiskFormInModal(tab)
        }

        if (tab.entityType != "Role") { props.setUserCheck(false) };
    }

    function setOtherLevelTypes(tab, checkUser) {
        if (props.showForm) {
            if (!checkUser && tab.entityType != `${t('Label_Risk')}` &&
                tab.entityType != `${t('Label_KRI')}` && tab.entityType != 'Role') {
                displayEntityForm();
            }
            else if (!checkUser && tab.entityType == `${t('Label_Risk')}`) {
                displayRiskForm();
                props.setLinkParent(false);
            }
            else if (tab.entityType == "Role") {
                displayChildRoleForm(tab);
            }
            else if (tab.entityType == `${t('Label_KRI')}`) {
                props.setShowRiskForm(false);
                props.setShowKriForm(true);

            }
            props.setUserCheck(true);
        }
    }
    function add3Dots(string, limit) {
        var dots = "...";
        if (string.length > limit) {
            string = string.substring(0, limit) + dots;
        }
        return string;
    }


    /*Styling to be added , when a thing is Inactive*/
    var InactiveText = {
        color: "#AFB3C7",
        marginTop: "1.5vh",
        marginLeft: "0.3vw",
        marginRight: "0.5vw",
        font: "normal normal normal 0.9vw Montserrat"
    };

    var entityTypes = {
        textAlign: "end",
        fontWeight: "bold",
        opacity: "0.5",
        width: "25%"
    }

    var entityTitle = {
        width: "75%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
    }

    var tempResponse = [];
    let tempResponse_len = 0;
    function recuringHierarchy(tab) {
        if (props.showEntitiesOnly || props.calledFrom == 'RolesHierachy') {
            for (var i = 0; i < tempResponse.length; i++) {
                if (tab['EntityDetailsId'] == tempResponse[i]['ParentEntityId']) {
                    childhoverData.push(tempResponse[i]);
                    recuringHierarchy(tempResponse[i]);
                }

                else {
                    continue;
                }
            }
        }
        else if (props.calledFrom == "RiskHierarchy") {
            for (var i = 0; i < tempResponse.length; i++) {
                if (tab['RiskHierarchyDetailsID'] == tempResponse[i]['ParentRisk']) {
                    childhoverData.push(tempResponse[i]);
                    recuringHierarchy(tempResponse[i]);
                }
                else {
                    continue;
                }
            }
        }
    }


    function getChild(parentId) {
        //Fetching the child of selected Item
        if (props.showEntitiesOnly || props.calledFrom == 'RolesHierachy') {
            data = {
                ParentEntityId: parentId,
                EntityHierarchyMasterId: props.keyAccess
            };
        }
        else {
            data = {
                ParentRiskId: parentId,
                RiskHierarchyMasterID: props.keyAccess
            };
        }
        $.ajax({
            type: "GET",
            async: true,
            data: data,
            url: props.calledFrom == "RiskHierarchy" ? '/RiskHierarchy/GetRiskHierarchyChildDetails' : '/EntityAndRoleHierarchy/GetEntityHierarchyChildDetails',
            contenttype: "application/json",
            success: function (response) {
                if (response.length != 0) {
                    childhoverData.length = 0;
                    tempResponse.length = 0;
                    tempResponse_len = 0;
                    response.map(tab => {
                        tempResponse.push(tab);
                    });
                    tempResponse_len = tempResponse.length;
                    for (var i = 0; i < tempResponse.length; i++) {
                        if (tempResponse[i]['Generation'] == 0) {
                            childhoverData.push(tempResponse[i]);
                            tempResponse_len -= 1;
                            if (tempResponse_len == 0) {
                                break;
                            } else {
                                recuringHierarchy(tempResponse[i]);

                            }
                        }
                    }
                    //To show custom messages on deleting entities basis on if children are present or not
                    if (childhoverData.length) {
                        //When the main parent have child(ren) then we set it to true
                        props.setChildren(true);
                        //When the main parent have child(ren) then we need to set inner child(ren) value as false
                        props.sethasPrimaryChild(false);

                    }
                    else {
                        props.setChildren(false);
                        props.sethasPrimaryChild(false);
                    }
                }
                else {
                    setchildhoverData([]);
                    props.setChildren(false);
                    props.sethasPrimaryChild(false);
                }
            },
            error: function (response) {
                console.log('failed AJAX');
            }
        });

    }

    /*Handle Sort*/
    const customSort = (a, b) => {
        if (props.sortType.order === "desc") {
            //swap the variable
            const c = a;
            a = b;
            b = c
        };
        if (props.sortType.type === 'name') {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());

        }
        return new Date(a.modifiedDate).getTime() -
            new Date(b.modifiedDate).getTime();

    }

    const contentChildDiv = (
        <div>
            <div style={{ width: "30vw", textAlign: "end" }}>
                <small style={{ fontSize: "11px", opacity: "0.5" }}><b>{props.calledFrom == "EntityHierachy" ? `${t('Label_ChildEntities')}` : `${t('Label_ChildRisks')}`} &nbsp;</b></small>
            </div>
            <div className="child-div-entities" style={{ overflowY: "auto", maxHeight: "70vh" }}>
                {
                    childhoverData.map(tab => {
                        var level = tab.Generation;
                        var panelwidtth = 100 - (level * 5);
                        return (
                            <div
                                className="hover-primary-panel" style={{ width: panelwidtth + "%" }}
                            >
                                <div className="row col-md-12 card-row-padding">
                                    <Tooltip placement="topLeft" title={tab.EntityName || tab.ParentRiskName}>
                                        <div style={entityTitle}>{tab.EntityName || tab.ParentRiskName}</div>
                                    </Tooltip>
                                    <div style={entityTypes}>{tab.ParentEntity || tab.ParentLevelName}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );


    function getParent(keyId, entityType) {

        //Fetching the Parent
        if (props.isSearching && entityType && entityType === "Role") {
            url = '/EntityAndRoleHierarchy/GetRoleParents'
            data = {
                RoleId: keyId
            };
        }
        else if (props.isSearching && entityType && entityType === `${t('Label_KRI')}`) {
            url = '/RiskHierarchy/GetKriParents'
            data = {
                KriId: keyId
            };
        }
        else if (props.showEntitiesOnly || props.calledFrom == 'RolesHierachy') {
            url = '/EntityAndRoleHierarchy/GetEntityHierarchyParentDetails'
            data = {
                EntityDetailsId: keyId
            };
        }
        else {
            //called from riskhierarchy
            url = '/RiskHierarchy/GetRiskHierarchyParentDetails'
            data = {
                riskHierarchyDetailsID: keyId
            };
        }
        $.ajax({
            type: "GET",
            async: true,
            data: data,
            url: url,
            contenttype: "application/json",
            success: function (response) {
                parenthoverData.length = 0;
                setparenthoverData(response);
            },
            error: function (response) {
                console.log('failed AJAX');
            }
        });

    }

    const contentParentDiv = (
        <div>
            <div style={{ width: "30vw", textAlign: "end" }}>
                <small style={{ fontSize: "11px", opacity: "0.5" }}><b>{props.calledFrom == "EntityHierachy" ? `${t('Label_ParentEntity')}` : `${t('Label_ParentRisk')}`} &nbsp;</b></small>
            </div>
            <div className="child-div-entities">
                {parenthoverData.length != 0 && (
                    parenthoverData.map((tab, index) => {
                        var level = 0;
                        var panelwidtth = 100 - ((parenthoverData.length - (index + 1)) * 5);
                        return (
                            <div
                                className="hover-primary-panel" style={{ width: panelwidtth + "%" }}
                            >
                                <div className="row col-md-12 card-row-padding">
                                    <Tooltip placement="topLeft" title={tab.EntityName || tab.ParentRiskName}>
                                        <div style={entityTitle}>{tab.EntityName || tab.ParentRiskName}</div>
                                    </Tooltip>
                                    <div style={entityTypes}>{tab.ParentEntity || tab.ParentLevelName}</div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );

    const Panel = ({ eventKey, name, tab, onClick, checkUser }) => {

        let currentId = props.entityExpSel.findIndex((obj => obj.Id == tab.id));

        var isChildPresentCondition =
            (tab.isChildPresent == true || (tab.children && tab.children.length > 0 && tab.children != []) ||
                (!checkUser &&
                    (props.component == "Roles" && (tab.isRolePresent == true || tab.isPrimaryChildPresent == true)) ||
                    (props.component != "Roles" && (tab.isPrimaryChildPresent == true || tab.isNonPrimaryChildPresent == true)) ||
                    (!props.showRisksOnly && tab.isKriPresent == true)));

        var bscMultiSelection = props.bscProps;
        var elem_index = -1;
        var multiSelectIndex = -1;
        var multiSelectIndexEntity = -1;
        var singleSelectIndex = -1;
        //Balancescorecard user select while creating/editing/duplicating bsc
        if (bscMultiSelection && props.multiSelectBsc && multiUserSelect) {
            elem_index = props.multiSelectBsc.findIndex(function (o) {
                return (o.RoleId === tab.roleId);
            });
        }
        //Multi-User Select Except for that in BalancedScorecard
        if (!bscMultiSelection && multiUserSelect) {
            multiSelectIndex = props.selectedItem.findIndex(function (o) {
                return (o.RoleId === tab.roleId);
            });
        }

        //Multi-Entity Select 
        if (multiEntitySelect && props.preSelectedElement) {
            multiSelectIndexEntity = props.preSelectedElement.findIndex(function (o) {
                return (o.Id === tab.id);
            });
        }

        //Multi-Risk Select
        if (props.selectedItem && props.selectedItem.length > 0 && multiRiskSelect) {
            multiSelectIndex = props.selectedItem.findIndex(function (o) {
                return (o.RiskID == tab.id || o.RiskHierarchyDetailsID == tab.id);
            });
        }
        //Any Other type of multi-select except for user-multi-select and risk-multi-select
        if (!multiUserSelect && props.selectedItem && multiSelect && !multiRiskSelect) {
            multiSelectIndex = props.selectedItem.findIndex(function (o) {
                return (o.Id == tab.id);
            });
        }

        if (singleSelect && props.selectedItem) {
            singleSelectIndex = props.selectedItem.findIndex(function (o) {
                return (o.Id == tab.id);
            });
        }

        var selectCondition =
            (singleSelect && (currentId != -1 && props.entityExpSel[currentId].selection == true))
            ||
            (singleSelect && props.selectedItem && singleSelectIndex > -1)
            ||
            (singleSelect && props.showUserForm && checkUser)
            ||
            (bscMultiSelection && elem_index > -1)
            ||
            (multiEntitySelect && multiSelectIndexEntity > -1)
            ||
            (!bscMultiSelection && multiSelectIndex > -1)
            ;

        var isUser = tab.children == undefined && tab.entityType == "Role" && props.userstatedata.length > 0 && tab.id == props.selectedId.Id && !props.showEntityRoles;
        //To show the form of user in multiuser select if the user panel was clicked earlier
        if (selectCondition && multiUserSelect && tab.entityType == "User" && checkUser && props.userstatedata) {
            props.setshowUserForm(true);
        }
        return (
            <div key={tab.id}>
                <div className={
                    `panel-basic-condition ${selectCondition
                        ? checkUser
                            ? "user-panel-sel"
                            : tab.entityType == "Role"
                                ? "role-panel-sel"
                                : tab.primary
                                    ? "primary-panel-sel"
                                    : tab.entityType == `${t('Label_Risk')}`
                                        ? "rh-categorypanel-clicked"
                                        : tab.entityType == `${t('Label_KRI')}`
                                            ? "kri-categorypanel-clicked"
                                            : "sub-panel-sel " : checkUser
                            ? "user-selected"
                            : tab.entityType == "Role"
                                ? "role-selected"
                                : tab.primary
                                    ? "primary-panel"
                                    : tab.entityType == `${t('Label_Risk')}` /*&& !props.openRiskModal*/
                                        ? "rh-categorypanel"
                                        /*: tab.entityType == "Risk" && props.openRiskModal
                                            ? "rhModelpanel"*/
                                        : tab.entityType == `${t('Label_KRI')}`
                                            ? "kri-categorypanel"
                                            : "sub-selected"
                    }`
                }>
                    <Row className="addpointer" onClick={() => { onClick() }} >
                        <Row className="main-row-panel"
                        >
                            <Col className="no-margin-top">
                                <img className="svg-color"
                                    src={
                                        checkUser
                                            ? "/Images/svg/UserIcon.svg"
                                            : tab.entityTypeIconName == "RoleIcon"
                                                ? "/Images/svg/Entity_Business.svg"
                                                : tab.entityTypeIconName == "RiskIcon"
                                                    ? "/Views/Risk/icons/Risk.svg"
                                                    : tab.entityTypeIconName == "KriIcon"
                                                        ? "/Views/Risk/icons/KRI.svg"
                                                        : `/Images/svg/${tab.entityTypeIconName}.svg`
                                    }
                                />
                            </Col>
                            <Col
                                className="item-type"
                                id={checkUser || tab.entityType.length > 5 ? 'more-type-width' : 'less-type-width'}
                            /*style={props.openInModal && tab.entityType.length > 5  ? {minWidth : '40%'}:""}*/
                            >
                                {checkUser == true ? <p>{t('Label_Users')}</p> : <p><Tooltip placement="topLeft" title={tab.entityType}>{tab.entityType} </Tooltip></p>}
                            </Col>
                            <Col
                                className="item-name" >
                                <Tooltip placement="topLeft" title={name}>
                                    {name}
                                </Tooltip>
                            </Col>
                        </Row>
                        <Row className={/*props.calledFrom == "EntityHierarchy" ? "entity-right-side-row" :*/ "entity-right-side-row-risk-hierarchy"}>
                            {
                                ((tab.level == 0 || (props.isSearching && !checkUser)) && selectCondition) &&
                                <Col >

                                    {(props.masterId[0] != props.keyAccess || props.isSearching) && parenthoverData.length > 0 && (
                                        <Popover content={contentParentDiv} placement="bottomRight">
                                            <img src="/Images/svg/Parent.svg" style={{ height: "2.5vh" }} />
                                        </Popover>
                                    )}
                                    &nbsp;&nbsp;
                                    {childhoverData.length > 0 && (
                                        <Popover content={contentChildDiv} placement="bottomRight">
                                            <img src="/Images/svg/Child.svg" style={{ height: "2.5vh" }} />
                                        </Popover>
                                    )}
                                    &nbsp;&nbsp;
                                </Col>
                            }

                            {props.selection.toLowerCase() == "entityroleusers" && props.showForm &&
                                tab.primary && tab.entityType != "Role" && selectCondition &&
                                (
                                    <Col
                                        className="entity-child-col-data-clicked"
                                        onClick={(e) => { e.stopPropagation(); addRoleForm() }}
                                    >
                                        <Tooltip placement="topLeft" title={t('Label_AddRole')}>
                                            <button className="panel-button">{t('Label_AddRole')}</button>
                                        </Tooltip>
                                    </Col>
                                )}
                            {props.selection.toLowerCase() == "entities" && props.showForm && tab.primary == true && selectCondition && props.masterId[props.masterId.length - 1] == props.keyAccess && (
                                <Col
                                    id="entity-margin"
                                    className="entity-child-col-data-clicked"
                                    onClick={(e) => { e.stopPropagation(); addEntityForm() }}
                                >
                                    <Tooltip placement="topLeft" title={t('Label_AddChildEntity')}>
                                        <button className="panel-button">{t('Label_AddChildEntity')}</button>
                                    </Tooltip>
                                </Col>
                            )}
                            {props.selection.toLowerCase() == "entityroleusers" && props.showForm && tab.entityType == "Role" &&
                                selectCondition &&
                                (
                                    <Col
                                        className="entity-child-col-data-clicked"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            props.setShowEntityForm(false);
                                            props.setAddParentEntity(false);
                                            props.setAssignUsersModal(true);
                                            props.setuserDetails("");
                                        }}
                                    >
                                        <Tooltip placement="topLeft" title={t('Label_AssignUsers')}>
                                            <button className="panel-button">{t('Label_AssignUsers')}</button>
                                        </Tooltip>
                                    </Col>
                                )}
                            {props.selection.toLowerCase() == "riskskri" && props.showForm && selectCondition && props.masterId[props.masterId.length - 1] == props.keyAccess && tab.entityType == `${t('Label_Risk')}` &&
                                (
                                    <Col
                                        className="entity-main-col-clicked-risk-panel"
                                        onClick={(e) => { e.stopPropagation(); addRiskForm() }}
                                    >
                                        <Tooltip placement="topLeft" title={t('Label_AddChildRisk')}>
                                            <button className="panel-button">{t('Label_AddChildRisk')}</button>
                                        </Tooltip>
                                    </Col>
                                )}
                            {props.selection.toLowerCase() == "riskskri" && props.showForm && selectCondition && tab.entityType == `${t('Label_Risk')}` &&
                                (
                                    <Col
                                        className="entity-main-col-clicked"
                                    onClick={(e) => { e.stopPropagation(); addKriForm() }}
                                    >
                                        <Tooltip placement="topLeft" title={t('Label_AddKRI')}>
                                        <button className="panel-button"> {t('Label_AddKRI')} </button>
                                        </Tooltip>
                                    </Col>)}
                            {/*(props.showEntityRoles && tab.entityType != "Role")
                                 meaning not to show arrow when we on role as users are not to be shown*/}
                            {(!props.isSearching || (props.isSearching && tab.entityType == "Role"))  /*If the search is not happening or search is there but the entity type is role*/
                                && !checkUser && currentId != -1 && eventKey == props.entityExpSel[currentId].Id && isChildPresentCondition == true && ((props.showEntityRoles && tab.entityType != "Role") || !props.showEntityRoles) &&
                                [props.entityExpSel[currentId].expansion == true ?
                                    (<Col className="no-margin-top no-margin-right" onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpArrowClick(tab);
                                    }}>
                                        <img id="up-arrow-transform" 
                                            className="arrow-up"
                                            src="\Views\Risk\icons\Arrow_Down.svg" />
                                    </Col>)
                                    :
                                    (<Col className="no-margin-top no-margin-right" onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownArrowClick(tab);
                                    }}>
                                        <img
                                            className="arrow-down"
                                            src="\Views\Risk\icons\Arrow_Down.svg" />
                                    </Col>)
                                ]

                            }

                        </Row>
                    </Row>

                </div>
                {((tab.children != undefined && tab.children != [] && tab.children != null && tab.children != "") || isUser)
                    &&
                    /*To hide the children when up arrow is clicked i.e expansion is closed*/
                    currentId != -1 && props.entityExpSel[currentId].expansion == true &&
                    (
                        <div style={{ marginLeft: "3%" }}>
                            {
                                isUser && (<Panel
                                    checkUser={true}
                                    key={props.userstatedata[0]}
                                    eventKey={props.userstatedata[0]}
                                    name={""}
                                    tab={props.userstatedata[0]}
                                    onClick={() => {
                                        UserClickFunction(props.userstatedata[0]);
                                    }}
                                />)
                            }

                            {
                                !isUser && tab.children
                                    .filter((item) => {
                                        if (props.isSearching) {
                                            return props.selectedItems.includes(item.entityType);
                                        }
                                        return item;
                                    })
                                    .sort((a, b) => customSort(a, b))
                                    .map(tab => {
                                        if (
                                            ((props.showEntityRolesUsers && (tab.primary == true || tab.entityType == "Role")) ||
                                                (props.showEntitiesOnly && tab.entityType != "Role") ||
                                                (props.showRisksKri) || (props.showEntityRoles) ||
                                                (props.showRisksOnly && tab.entityType != "KRI")) && tab.isDelete == 0
                                        ) {
                                            return (
                                                <Panel
                                                    checkUser={false}
                                                    key={tab.id}
                                                    eventKey={tab.id}
                                                    name={tab.name}
                                                    tab={tab}
                                                    onClick={() => {

                                                        if (props.parentVisible) {
                                                            //To show the parent and child icons to all the recoreds , even if its a child
                                                            getParent(tab.id);
                                                            getChild(tab.id);
                                                        }
                                                        panelClick(tab, false)
                                                        if (props.showForm) {
                                                            handlechildForms(tab, false);
                                                        }
                                                    }}
                                                />
                                            );
                                        }
                                    })}
                        </div>
                    )
                }
            </div>
        );
    }
    const customFilterSort = props.itemList.filter((item) => {
        if (props.isSearching) {
            return props.selectedItems.includes(item.entityType);
        }
        return item;
    })
        .sort((a, b) => customSort(a, b))



    return (
        <React.Fragment>
            {
                //On search if no result found or if the filter of the types checked does'nt maatch
                ((props.itemList && props.itemList[0] && props.itemList[0] === "NO_RESULT_FOUND") || (customFilterSort.length == 0)) ?
                    <p className="noResultFound">{t('Error_NoResultsFound')}</p>

                    :
                    customFilterSort.map((tab) => {
                        if (tab.isDelete == 0) {
                            return (
                                <Panel key={tab.id}
                                    checkUser={false}
                                    eventKey={tab.id}
                                    name={tab.name}
                                    tab={tab}
                                    onClick={() => {
                                        if (props.parentVisible) {
                                            getParent(tab.id);
                                            getChild(tab.id);
                                        }
                                        panelClick(tab, false)
                                        if (props.showForm) {
                                            handlechildForms(tab, false);
                                        }
                                        if (props.isSearching) {
                                            getParent(tab.id, tab.entityType);
                                        }
                                    }}
                                />

                            )
                        }
                    })

            }
        </React.Fragment>
    )
}
