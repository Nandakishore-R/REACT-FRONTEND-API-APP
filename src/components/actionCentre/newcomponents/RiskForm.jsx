let newRiskIdContext = React.createContext(null);
let newParentRiskIdContext = React.createContext(null);
let newSidebarKey = React.createContext(null);
function RiskForm(props) {
    const { t, i18n } = useTranslation();
    const Form = window["antd"].Form;
    const [form] = Form.useForm();
    const Input = window["antd"].Input;
    const Select = window["antd"].Select;
    const Button = window["antd"].Button;
    const Row = window["antd"].Row;
    const Col = window["antd"].Col;
    const Tooltip = window["antd"].Tooltip;
    const Modal = window["antd"].Modal;
    /*************************************************************************************************************/
    //For Risk Modal
    const [linkRisk, setLinkRisk] = React.useState(false);
    //stores the risk hierarchy administrator
    const [selectedAdministrator, setSelectedAdministrator] = React.useState("00000000-0000-0000-0000-000000000000");
    const [selectedItem, setSelectedItem] = React.useState([
        {
            Id: "",
            Name: "",
            ParentLevelName: ""
        }
    ]);
    const [ParentLevelName, setParentLevelName] = React.useState("");

    /*Frequency Pattern*/
    const [edit, setEdit] = React.useState(!props.calledFromPanel);

    const [frequency, setFrequency] = React.useState("daily");
    const [notify, setNotify] = React.useState("");
    const [recur, setRecur] = React.useState("");
    const [oneTimeRecur, setOneTimeRecur] = React.useState(false);
    const [recurRange, setRecurRange] = React.useState("");
    const [noend, setNoend] = React.useState(false);
    const [weekValue, setWeekValue] = React.useState("");
    const [daysValue, setDaysValue] = React.useState("");
    const [monthNamesValue, setMonthNamesValue] = React.useState("");
    const [elementAccessData, setElementAccessData] = React.useState();
    const [disabledCond, setDisabledCond] = React.useState(false);
    const monthNames = [
        t('Label_January'),
        t('Label_February'),
        t('Label_March'),
        t('Label_April'),
        t('Label_May'),
        t('Label_June'),
        t('Label_July'),
        t('Label_August'),
        t('Label_September'),
        t('Label_October'),
        t('Label_November'),
        t('Label_December')
    ];
    var daysOfMonth = [];
    const [weekDays, setWeekDays] = React.useState([]);
    const [nextReviewDate, setReviewDate] = React.useState("");
    const [endAfter, setEndAfter] = React.useState("");
    /*---------------------------------------------------------------------------------------------------*/
    // Risk Form Field State
    //Name
    const [name, setName] = React.useState("");
    //Description
    const [desc, setDesc] = React.useState("");
    //personalID
    const [personalID, setpersonalID] = React.useState("");
    //Parent Risk
    const [parentRisk, setParentRisk] = React.useState("");
    const [parentRiskName, setParentRiskName] = React.useState("");
    //is child
    const [ifChild, setIfChild] = React.useState(false);
    //Risk Classification
    const [riskClassification, setRiskClassification] = React.useState([]);
    const [riskClassificationID, setRiskClassificationID] = React.useState("");
    //Risk Sub Classification
    const [riskSubClassification, setRiskSubClassification] = React.useState([]);
    const [riskSubClassificationID, setRiskSubClassificationID] = React.useState(
        ""
    );
    //Risk Type
    const [riskType, setRiskType] = React.useState([]);
    const [riskTypeID, setRiskTypeID] = React.useState("");
    //Approvers
    const [approverOptions, setApproverOptions] = React.useState([]);
    const [approverID, setApproverID] = React.useState("");
    //Risk ID
    const [riskID, setRiskID] = React.useState("");
    //To set panel
    const [panel, setPanel] = React.useState(true);
    // To handle button
    let allocNew= false;
    const [riskApi, setRiskApi] = React.useState("CreateRiskHierarchyDetails");
    const [checkUpd, setCheckUpd] = React.useState(false);
    var btnApi = false;
    var tick = false;
    //To make the form editable
    const [disableIcon, setDisableIcon] = React.useState(false);
    const [administratorEntities, setAdministratorEntities] = React.useState({
        Entities: [],
        IsCentralEntity: true
    });


    //To fetch the Risk administrators
    React.useEffect(() => {
        $.ajax({
            type: "GET",
            url: "/AccessRightsManagement/GetAdministringEntities",
            contentType: "application/json",
            success: function (response) {

                if (!props.riskGetDetails) {
                    setSelectedAdministrator(response.result.EntityDetails[0].Id);
                }
                else {
                    setSelectedAdministrator(props.riskGetDetails.RiskAdministrator);
                }
                setAdministratorEntities({
                    Entities: response.result.EntityDetails,
                    IsCentralEntity: response.result.IsCentralAdmin
                })

            },
            error: function (error) {
                toastr.error(error.Message);
            }
        });

        if (!props.riskGetDetails) {
            $.ajax({
                type: "GET",
                cache: false,
                url: "/RiskHierarchy/GetLatestId",
                async: false,
                contentType: "application/json",
                success: function (response) {
                    setpersonalID(response);
                },
                error: function (error) {
                    console.log("error of owner api is " + JSON.stringify(error));
                }
            });
        }
        else {
            setpersonalID(props.riskGetDetails.personalID);
        }
    }, [props.riskGetDetails])

    /*---------------------------------------------------------------------------------------------------- */
    //Risk Classification API CALL
    React.useEffect(() => {
        $.ajax({
            type: "GET",
            cache: false,
            url: "/DashboardDesigner/GetRiskClassificationModel",
            async: false,
            contentType: "application/json",
            success: function (response) {
                if (response.length === 0) {
                    console.log("no response in owner api");
                } else {
                    setRiskClassification(response.model);
                    console.log("Rissskkk Cllaassification", response.model);
                }
            },
            error: function (error) {
                console.log("error of owner api is " + JSON.stringify(error));
            }
        });
    }, []);
    function onRisk(data) {
        var oid;

        riskClassification.map(value => {
            if (value.label == data) {
                aid = value.value;
            }
        });
        setRiskClassificationID(data);
        setRiskSubClassificationID(" ");
    }
    /*---------------------------------------------------------------------------------------------------- */
    //Risk SubClassification API CALL

    React.useEffect(() => {
        newSidebarKey = React.createContext(props.keyAccess);
       
    }, []);

    if (linkRisk) {
        var currentIndex = props.masterId.indexOf(props.keyAccess);
    }
    function sub() {
        $.ajax({
            type: "GET",
            cache: false,
            url: "/RiskHierarchy/GetRiskSubClassification",
            data: { RiskClassificationID: riskClassificationID },
            async: false,
            contentType: "application/json",
            success: function (response) {
                if (response.length === 0) {
                    console.log("no response in owner api");
                } else {
                    setRiskSubClassification(response.result);
                }
            },
            error: function (error) {
                console.log("error of owner api is " + JSON.stringify(error));
            }
        });
    }

    function onRiskSub(data) {
        var sid;
        riskSubClassification.map(val => {
            if (val.Name == data) {
                sid = val.RiskSubClassificationID;
            }
        });
        setRiskSubClassificationID(data);
    }

    function deleteGetEntity(array) {
        let found = array.find((node) => {
            if (node.id === riskID) {
                /* delete node;*/
                node.isDelete = 1;
                deleteLastChildEntity(props.getEntity, node.parent_Id)
                return true;
            }
           
        })
        if (found == undefined) {
            array.find(
                (c) =>
                    c.children && c.children.length > 0 && deleteGetEntity(c.children)
            )
        }
    }

    function deleteLastChildEntity(array, prevNode) {
        //Removing arrow from parent , as last child was removed
        let found = array.find((item) => {
            if (item.id == prevNode) {
                if (item.children.length == 1) {
                    item.children = [];
                    item.isChildPresent = false;
                }
                else {
                    //one after other all entitities are deleted
                    let allChildrenDeleteFalse = true;
                    item.children && item.children.map((val) => {
                        if (val.isDelete == 0) {
                            allChildrenDeleteFalse = false
                        }
                    })
                    
                   if (allChildrenDeleteFalse == true) {
                        item.isChildPresent = false;
                        item.isKriPresent = false;
                        item.children = [];
                    }
                }
                return true;
            }

        })
        if (found == undefined) {
            array.find(
                (c) =>
                    c.children && c.children.length > 0 && deleteLastChildEntity(c.children, prevNode)
            )
        }
    }

    
    React.useEffect(
        () => {
            $.ajax({
                type: "GET",
                cache: false,
                url: "/RiskHierarchy/GetRiskSubClassification",
                data: { RiskClassificationID: riskClassificationID },
                async: false,
                contentType: "application/json",
                success: function (response) {
                    if (response.length === 0) {
                        console.log("no response in api");
                    } else {
                        setRiskSubClassification(response.result);
                    }
                },
                error: function (error) {
                    console.log("error of api is " + JSON.stringify(error));
                }
            });
        },
        [riskClassificationID]
    );

    /*---------------------------------------------------------------------------------------------------- */
    // Risk Type API CAll
    React.useEffect(() => {
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Risk/GetAllRiskType",
            async: false,
            contentType: "application/json",
            success: function (response) {
                if (response.length === 0) {
                    console.log("no response in owner api");
                } else {
                    setRiskType(response);
                }
            },
            error: function (error) {
                console.log("error of owner api is " + JSON.stringify(error));
            }
        });
    }, []);

    //To map owner id to owner label
    function onType(data) {
        var typeid;
        riskType.map(val => {
            if (val.label == data) {
                typeid = val.value;
            }
        });
        setRiskTypeID(data);
    }

    function closeForm() {
        props.setShowEntityForm(false);
        props.setAddParentEntity(false);
    }

    /*---------------------------------------------------------------------------------------------------- */
    // Approvers API Call
    onApproversChange = event => {
        var value = event.target.value;
        $.ajax({
            type: "GET",
            cache: false,
            url: "/User/FetchUsersAndRoles",
            data: {
                q: value
            },
            async: false,
            contentType: "application/json",
            success: function (response) {
                if (response.length === 0) {
                    console.log("no response in owner api");
                } else {
                    setApproverOptions(response);
                }
            },
            error: function (error) {
                console.log("error of owner api is " + JSON.stringify(error));
            }
        });
    };

    function approverFunction(data) {
        var aid;
        approverOptions.map(value => {
            if (value.label == data) {
                aid = value.id;
            }
        });
        setApproverID(data);
    }
    React.useEffect(() => {
        $.ajax({
            type: "GET",
            cache: false,
            url: "/User/FetchUsersAndRoles",
            data: {
                q: " "
            },
            async: false,
            contentType: "application/json",
            success: function (response) {
                if (response.length === 0) {
                    console.log("no response in owner api");
                } else {
                    setApproverOptions(response);
                }
            },
            error: function (error) {
                console.log("error of owner api is " + JSON.stringify(error));
            }
        });
    }, []);
    /*---------------------------------------------------------------------------------------------------- */
    var FrequencyPatterns = {
        frequencytype: frequency,
        frequencyrecur: recur,
        frequencymonth: monthNamesValue,
        frequencyday: daysValue,
        frequencyweek: weekValue,
        frequencyweekdays: weekDays,
        priornotificationdays: notify,
        isonetime: oneTimeRecur,
        enddate: nextReviewDate,
        noofrecurrences: endAfter,
        skipholiday: false,
        noend: noend
    };
    function updateRiskName(array) {
        let found = array.find((node) => {
            if ((node.riskHierarchyDetailsID === riskID && node.parent_Id != node.riskHierarchyDetailsID)) {


                (node.name = name)
                //IsActive will be updated here if any representation change for inactive entities kick in
                return found;
            }
        })
        if (found == undefined) {
            array.find(
                (c) =>
                    c.children && c.children.length > 0 && updateRiskName(c.children)
            )
        }
    }
    React.useEffect(
        () => {
            if (props.riskGetDetails) {
                setFrequency(
                    JSON.parse(props.riskGetDetails.FrequencyPattern).frequencytype
                ),
                    setRecur(
                        JSON.parse(props.riskGetDetails.FrequencyPattern).frequencyrecur
                    ),
                    setMonthNamesValue(
                        JSON.parse(props.riskGetDetails.FrequencyPattern).frequencymonth
                    ),
                    setDaysValue(
                        JSON.parse(props.riskGetDetails.FrequencyPattern).frequencyday
                    ),
                    setWeekValue(
                        JSON.parse(props.riskGetDetails.FrequencyPattern).frequencyweek
                    ),
                    setWeekDays(
                        JSON.parse(props.riskGetDetails.FrequencyPattern).frequencyweekdays
                    ),
                    setNotify(
                        JSON.parse(props.riskGetDetails.FrequencyPattern)
                            .priornotificationdays
                    ),
                    setOneTimeRecur(
                        JSON.parse(props.riskGetDetails.FrequencyPattern).isonetime
                    ),
                    setReviewDate(
                        JSON.parse(props.riskGetDetails.FrequencyPattern).enddate
                    ),
                    setEndAfter(
                        JSON.parse(props.riskGetDetails.FrequencyPattern).noofrecurrences
                    ),
                    setNoend(JSON.parse(props.riskGetDetails.FrequencyPattern).noend);

                if (JSON.parse(props.riskGetDetails.FrequencyPattern).noend == true) {
                    setRecurRange("No End Date");
                    setReviewDate("");
                    setEndAfter("");
                } else {
                    if (JSON.parse(props.riskGetDetails.FrequencyPattern).enddate) {
                        setRecurRange("End By");
                        setEndAfter("");
                    } else {
                        setRecurRange("End After");
                        setReviewDate("");
                    }
                    setNoend(false);
                }
               

                setRiskID(props.riskGetDetails.RiskHierarchyDetailsID);
                setName(props.riskGetDetails.Name);
                setDesc(props.riskGetDetails.Description);
                setpersonalID(props.riskGetDetails.personalID);
                setParentRisk(props.riskGetDetails.ParentRisk);
                setParentRiskName(props.riskGetDetails.ParentRiskName);
                newParentRiskIdContext = React.createContext(
                    props.riskGetDetails.ParentRisk
                );
                setRiskClassificationID(props.riskGetDetails.RiskClassificationID);
                setRiskSubClassificationID(
                    props.riskGetDetails.RiskSubClassificationID
                );
                setRiskTypeID(props.riskGetDetails.RiskTypeID);
                setSelectedAdministrator(props.riskGetDetails.RiskAdministrator);
                setApproverID(props.riskGetDetails.Approvers);
                setRiskApi("UpdateRiskHierarchyDetails");
                setEdit(false);
                setDisableIcon(true);
            } else {
                console.log("Risk Form Selected Id" + props.selectedId.Id)
                if (props.selectedId.Id == "") {
                    setParentRisk("");
                    newParentRiskIdContext = React.createContext("");
                    setIfChild(false);
                } else if (props.selectedId.Id !== 0) {
                    setParentRisk(props.selectedId.Id);
                    newParentRiskIdContext = React.createContext(props.selectedId.Id);
                    setIfChild(true);
                } else {
                    setParentRisk(props.selectedId.Id);
                    newParentRiskIdContext = React.createContext(props.selectedId.Id);
                    setIfChild(true);
                }
                setRiskID("");
                setName("");
                setDesc("");
                setParentRiskName("");
                setRiskClassificationID("");
                setRiskSubClassificationID("");
                setRiskTypeID("");
                setSelectedAdministrator("00000000-0000-0000-0000-000000000000");
                setApproverID("");
                setRiskApi("CreateRiskHierarchyDetails");
                setFrequency("daily"),
                    setRecur(""),
                    setMonthNamesValue(""),
                    setDaysValue(""),
                    setWeekValue(""),
                    setWeekDays(""),
                    setNotify(""),
                    setOneTimeRecur(""),
                    setReviewDate(""),
                    setEndAfter(""),
                    setNoend(false);
                setEdit(true);
                setDisableIcon(false);
            }
        },
        [props.riskGetDetails]
    );
    React.useEffect(
        () => {
            if (props.FrequencyData == true) {
                setEndAfter("");
                setReviewDate("");
                setRecurRange("");
            }
        },
        [props.FrequencyData]
    );
    /*---------------------------------------------------------------------------------------------------- */
    function viewElementAccess() {
        $.ajax({
            type: "GET",
            url: '/ElementAccessRights/GetElementAccessRightsDetails',
            data: { ElementID: props.selectedId.Id },
            async: false,
            contentType: "application/json",
            success: response => {
                setDisabledCond(false)
                setElementAccessData(response);
            }
        });
    }

    React.useEffect(() => {
        
        props.setParentriskid(selectedItem[0].Id);
            props.setParentriskname(selectedItem[0].Name);
            props.setParentlevelname(selectedItem[0].ParentLevelName);
            setParentLevelName(selectedItem[0].ParentLevelName);
        if (selectedItem[0].Id != "" && selectedItem[0].Id != null) {
            
            setParentRisk(selectedItem[0].Id);
        }
    }, [selectedItem])


    React.useEffect(() => {
        if (props.riskGetDetails.RiskHierarchyMaster) {
            setSelectedItem([{
                Id: props.riskGetDetails.ParentRisk,
                Name: props.riskGetDetails.ParentRiskName,
                ParentLevelName: props.riskGetDetails.RiskHierarchyMaster
            }])
        }
        //else {
        //    setSelectedItem([{
        //        Id: "",
        //        Name: "",
        //        ParentLevelName: ""
        //    }])

        //}
    }, [props.riskGetDetails])
    function updatecheck() {
        document.getElementById("allocateDept").style.height = "100%";
        document.querySelector(`.panel-header`).style.display = `none`;
        setPanel(false);
    }
    /*---------------------------------------------------------------------------------------------------- */
    const addApi = '/RiskHierarchy/CreateRiskHierarchyDetails';
    const updApi = '/RiskHierarchy/UpdateRiskHierarchyDetails';

    let risk_ID = "";
    const riskData = {
        RiskHierarchyDetailsID: riskID,
        Name: name,
        Description: desc,
        personalID: personalID,
        ParentRisk: parentRisk,
        IsChild: ifChild,
        RiskClassificationID: riskClassificationID,
        RiskSubClassificationID: riskSubClassificationID,
        RiskTypeID: riskTypeID,
        RiskHierarchyMasterID: props.keyAccess,
        FrequencyPattern: JSON.stringify(FrequencyPatterns),
        Order: "string",
        Approvers: approverID,
        IsDelete: false,
        IsActive: true,
        CreatedBy: "string",
        CreatedDate: "2021-01-16T10:13:31.759Z",
        ModifiedBy: "string",
        ModifiedDate: "2021-01-16T10:13:31.759Z",
        ErrorMessage: "string",
        RiskAdministrator: selectedAdministrator
    };

    function AddRisk() {
        let errorMessage = "";
        if (riskData.Name == "") {
            errorMessage = `${t('Error_PleaseEnterRiskName')}` +"</br>"
        }

        if (riskData.RiskClassificationID == "") {
            errorMessage += `${t('Error_PleaseSelectRiskClassification')}` + "</br>"
        }

        //if (riskData.RiskTypeID == "") {
        //    errorMessage += `${t('Error_PleaseSelectRiskType')}`
        //}
        if (FrequencyPatterns.frequencytype == "") {
            errorMessage += `${t('Error_PleaseEnterFrequencyPattern')}` + "</br>"
        }
        if (FrequencyPatterns.frequencyrecur == "") {
            errorMessage += `${t('Error_PleaseEnterFrequencyRecur')}` + "</br>"
        }
        if (FrequencyPatterns.frequencyrecur < 1) {
            errorMessage += `${t('Error_PleaseEnterValidFrequencyRecur')}` + "</br>";
        }

        if (FrequencyPatterns.priornotificationdays == "") {
            errorMessage += `${t('Error_PleaseEnterPriorNotificationDays')}` + "</br>"
        }
        if (FrequencyPatterns.priornotificationdays < 1) {
            errorMessage += `${t('Error_PleaseEnterValidPriorNotificationDays')}` + "</br>";
        }
        if (errorMessage) {
            setDisabledCond(false)
            toastr.error(errorMessage);
        } else {
            setEdit(!props.calledFromPanel);
            $.ajax({
                type: "POST",
                async: false,
                url: props.calledFromPanel || checkUpd ? updApi : addApi,
                data: JSON.stringify(riskData),
                contentType: "application/json",
                success: function (response) {
                    setDisabledCond(false)
                    console.log("status api working = " + JSON.stringify(response));
                    if (response.StatusCode == true) {
                        toastr.success(`${t('Label_Success')}`);
                        if (btnApi == false && props.calledFromPanel == true) {
                            toggleEdit();
                        }
                        if (response.Message != "Success") {

                            risk_ID = response.Message;
                            newRiskIdContext = React.createContext(risk_ID);
                            setRiskID(risk_ID);
                        }

                        if (btnApi == true) {

                            document.getElementById("allocateDept").style.height = "100%";
                            document.querySelector(`.panel-header`).style.display = `none`;
                            setPanel(false);
                            props.setReRenderForm(!props.reRenderForm);
                        }
                        else if (props.riskGetDetails.IsChild == true) {

                            updateRiskName(props.getEntity);

                        }
                        else {
                            updateRiskName(props.getEntity);
                            props.setReRenderForm(!props.reRenderForm);
                        }
                        if (tick == true) {
                            closeForm();
                            if (props.selectedId.Id =="") {
                                props.setSelectedId({ Id: props.selectedId.Id, selection: false, expansion: true, level: 0, type: "risk" })
                                props.setParentRender(!props.parentRender);
                            }
                            if (props.selectedId.expansion != true) {
                                    props.setSelectedId({ Id: props.selectedId.Id, selection: false, expansion: true, level: props.selectedId.level,type:"Risk" })
                                    let index = props.entityExpSel.findIndex((obj => obj.Id == props.selectedId.Id));
                                    props.entityExpSel[index].expansion = true;
                                    props.entityExpSel[index].selection = false;
                                }
                            
                        }
                        //If addition/updation happen
                        if (props.term && props.term != '' && allocNew!=true)
                            props.onSearchSubmit(props.term)
                    } else {
                        
                        toastr.error(response.Message);
                        /* props.setDisable(false);*/
                    }
                },
                error: function (error) {
                    setDisabledCond(false)
                    setStatus(error);
                    console.log("error is " + error);
                    toastr.error(error.Message);
                    props.setDisable(false);
                }
            });
        }

    }
    /*---------------------------------------------------------------------------------------------------- */

    const [check, setCheck] = React.useState(false);
    function OnCross() {
        setFrequency(
            JSON.parse(props.riskGetDetails.FrequencyPattern).frequencytype
        ),
            setRecur(
                JSON.parse(props.riskGetDetails.FrequencyPattern).frequencyrecur
            ),
            setMonthNamesValue(
                JSON.parse(props.riskGetDetails.FrequencyPattern).frequencymonth
            ),
            setDaysValue(
                JSON.parse(props.riskGetDetails.FrequencyPattern).frequencyday
            ),
            setWeekValue(
                JSON.parse(props.riskGetDetails.FrequencyPattern).frequencyweek
            ),
            setWeekDays(
                JSON.parse(props.riskGetDetails.FrequencyPattern).frequencyweekdays
            ),
            setNotify(
                JSON.parse(props.riskGetDetails.FrequencyPattern).priornotificationdays
            ),
            setOneTimeRecur(
                JSON.parse(props.riskGetDetails.FrequencyPattern).isonetime
            ),
            setReviewDate(JSON.parse(props.riskGetDetails.FrequencyPattern).enddate),
            setEndAfter(
                JSON.parse(props.riskGetDetails.FrequencyPattern).noofrecurrences
            ),
            setNoend(JSON.parse(props.riskGetDetails.FrequencyPattern).noend);

        if (JSON.parse(props.riskGetDetails.FrequencyPattern).noend == true) {
            setRecurRange("No End Date");
            setReviewDate("");
            setEndAfter("");
        } else {
            if (JSON.parse(props.riskGetDetails.FrequencyPattern).enddate) {
                setRecurRange("End By");
                setEndAfter("");
            } else {
                setRecurRange("End After");
                setReviewDate("");
            }
            setNoend(false);
        }
        props.setParentriskid(props.riskGetDetails.ParentRisk);
        props.setParentriskname(props.riskGetDetails.ParentRiskName);
        props.setParentlevelname(props.riskGetDetails.RiskHierarchyMaster);
        setParentLevelName(props.riskGetDetails.RiskHierarchyMaster);
        setRiskID(props.riskGetDetails.RiskHierarchyDetailsID);
        setName(props.riskGetDetails.Name);
        setDesc(props.riskGetDetails.Description);
        setpersonalID(props.riskGetDetails.personalID);
        setParentRisk(props.riskGetDetails.ParentRisk);
        newParentRiskIdContext = React.createContext(
            props.riskGetDetails.ParentRisk
        );
        setRiskClassificationID(props.riskGetDetails.RiskClassificationID);
        setRiskSubClassificationID(props.riskGetDetails.RiskSubClassificationID);
        setRiskTypeID(props.riskGetDetails.RiskTypeID);
        setSelectedAdministrator(props.riskGetDetails.RiskAdministrator);
        setApproverID(props.riskGetDetails.Approvers);
        setRiskApi("UpdateRiskHierarchyDetails");
        setCheck(!check);
    }

    /*---------------------------------------------------------------------------------------------------- */
    //Delete Risk Url
    //Delete Risk Api Call
    const deleteobj = {
        RiskHierarchyDetailsID: riskID,
        IsDelete: true,
        IsChild: ifChild
    };
    function deletedata() {
        $.ajax({
            type: "POST",
            url: '/RiskHierarchy/DeleteRiskHierarchyDetails',
            data: JSON.stringify(deleteobj),
            contentType: "application/json",
            success: function (response) {
                if (response.StatusCode == true) {
                    toastr.success(response.Message);
                        closeForm();
                    if (props.selectedId.Id == "") {
                        props.setParentRender(!props.parentRender);
                    }
                    else {
                        deleteGetEntity(props.getEntity)
                        props.forceUpdate();
                    }
                    //If deletion happen
                    if (props.term && props.term != '')
                        props.onSearchSubmit(props.term)
                }
                else {
                    toastr.error(response.Message);
                }

            },
            error: function (error) {
                console.log("error is " + JSON.stringify(error));
                toastr.error(error.Message);
            }
        });
    }
    //To close the delete modal
    const [deletemodal, setDeleteModel] = React.useState(false);
    function onclickdelete(deletemodal) {
        setDeleteModel(deletemodal);
    }

    const messagePopup = (currentActiveTab) => {
        let hasChildren = props.hasChildren;
        let hasChildPresent = props.hasChildPresent;

        if ((currentActiveTab == "Enterprise" || currentActiveTab == "Business") && hasChildren) {
            return (
                <div>
                    <Row justify="center">
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            {t('Alert_PleaseReassignParentBeforeDelete')}
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            <b>{props.riskGetDetails.Name}</b>{t('Label_Risk')}!
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'right' }}>
                            <Button className="delbutton" onClick={() => onclickdelete(false)}>Ok</Button></Col>
                        <Col></Col>
                    </Row>
                </div>
            );
        }
        else if (currentActiveTab == "Execution" && (hasChildren || hasChildPresent)) {
            return (
                <div>
                    <Row justify="center">
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            {t('Alert_ThisWillDeleteAllChildRisksAssociatedTo')} <b>{props.riskGetDetails.Name}</b>{t('Label_Risk')}.</Col>
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            {t('Alert_AlsoItWillRemoveItFromRegistersAndAllReports')}</Col>
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            {t('Alert_AreYouSureYouWantToContinue')}</Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'left' }}>
                            <Button className="delbutton" onClick={() => { deletedata(); onclickdelete(false); }}>{t('Label_SmallYes')}</Button></Col>
                        <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'right' }}>
                            <Button className="delbutton" onClick={() => onclickdelete(false)}>{t('Label_SmallNo')}</Button></Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <div>
                    <Row justify="center">
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            {t('Alert_DeletingThisRiskWillRemoveItFromRegistersAndReports')}
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            {t('Alert_AreYouSureWantToDelete')}<b>{props.riskGetDetails.Name}</b> {t('Label_Risk')}?
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'left' }}>
                            <Button className="delbutton" onClick={() => { deletedata(); onclickdelete(false); }}>{t('Label_SmallYes')}</Button></Col>
                        <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'right' }}>
                            <Button className="delbutton" onClick={() => onclickdelete(false)}>{t('Label_SmallNo')}</Button></Col>
                    </Row>
                </div>
            );
        }
    }

    /*---------------------------------------------------------------------------------------------------- */
    //To toggle the disabling of the input fields
    function toggleEdit() {
        props.disable ? props.setDisable(false) : props.setDisable(true);
        disableIcon ? setDisableIcon(false) : setDisableIcon(true);
    }
    function closeForm() {
        Object.keys(props.entityExpSel).forEach((i) => props.entityExpSel[i].selection = false);
        props.setShowRiskForm(false);
    }
    /*---------------------------------------------------------------------------------------------------- */


    return (
        <div className="risk-details">
            <div id="allocateDept" className="overlay">
                <TabContainer
                    showLevel="current"
                    showLevelDescription={false}
                    elementAccessData={elementAccessData}
                    setElementAccessData={setElementAccessData}
                    urls={props.urls}
                    setShowRiskForm={props.setShowRiskForm}
                    panel={panel}
                    setPanel={setPanel}
                    checkUpd={checkUpd}
                    setCheckUpd={setCheckUpd}
                    disable={props.disable}
                    allocNew={allocNew}
                    calledFromPanel={props.calledFromPanel}
                    riskID={riskID}
                    keyAccess={props.keyAccess}
                    riskName={name}
                    calledFrom="RiskEntity"
                    elementType="Risk"
                />
            </div>
            <div
                id="Rclass"
                className={panel &&
                    props.keyAccess == props.masterId[2] &&
                    props.linkParent == true || (props.riskGetDetails.IsChild == false && props.keyAccess == props.masterId[2]) ? "rh-header-execlevel1" : panel ? "rh-header-panel1" : "rh-header-hide"}
            >
                <Row>
                    <Col span={2}>
                        <img src="/Views/Risk/icons/Risk.svg" className="svg-risk-icon" />
                    </Col>
                    <Col span={5}>
                        <b className="risk-texticon">{t('Label_Risk')}</b>
                    </Col>
                    <Col span={13}>
                        {!props.riskGetDetails && <b className="text-risk">{t('Label_NewRisk')}</b>}
                        {props.riskGetDetails && (
                            <b className="text-risk">
                                <Tooltip title={name} placement="topRight">
                                    {name}
                                </Tooltip>
                            </b>
                        )}
                    </Col>
                    {props.riskGetDetails && (
                        <React.Fragment>
                            <Col span={2}>
                                {props.disable && (
                                    <img
                                        src="\Views\Risk\icons\Action_Edit.svg"
                                        className="rh-edit-pen"
                                        onClick={() => {
                                            toggleEdit();
                                            setEdit(true); 
                                        }}
                                    />
                                )}
                                {!props.disable && (
                                    <img
                                        src="/Views/Risk/icons/CloseIcon.svg"
                                        className="svg-close-icon-risk"
                                        onClick={() => {
                                            if (props.calledFromPanel) {
                                                setEdit(false);
                                            }
                                            if (!props.calledFromPanel || (props.calledFromPanel && props.riskGetDetails.ParentRisk == null)) {
                                                props.setParentriskname("");
                                                props.setParentriskid("");
                                                setParentLevelName("");
                                                props.setParentlevelname("");
                                                setParentRisk("");
                                                setSelectedItem([{
                                                    Id: "",
                                                    Name: "",
                                                    ParentLevelName: ""
                                                }])
                                            }
                                            OnCross();

                                            toggleEdit();
                                        }}
                                    />
                                )}
                            </Col>
                            <Col span={2}>
                                {!props.disable && (
                                    <Button
                                        form="riskForm"
                                        key="submit"
                                        htmlType="submit"
                                        style={{
                                            backgroundColor: "var(--unnamed-color-afb3c7)",
                                            border: "none",
                                            marginTop: "-50%",
                                            padding: "5%"
                                        }}
                                    >
                                        {" "}
                                        <img
                                            src="/Views/Risk/icons/Misc_Check.svg"
                                            className="svg-check-icon-risk"
                                            onClick={() => {
                                                //if ((response.StatusCode == false) && riskData.Name !== "" && riskData.Name !== null && FrequencyPatterns.frequencytype !== "" && FrequencyPatterns.frequencyrecur !== "" && riskData.RiskClassificationID !== "") {
                                                        closeForm();    
                                                
                                                btnApi = false;
                                                //toggleEdit();
                                                AddRisk();

                                            }}
                                        />{" "}
                                    </Button>
                                )}
                                {props.disable && (
                                    <img
                                        src="\Views\Risk\icons\Action_Delete.svg"
                                        className="delete-risk"
                                        onClick={() => onclickdelete(true)}
                                    />
                                )}
                            </Col>
                        </React.Fragment>
                    )}
                    {!props.riskGetDetails && (
                        <React.Fragment>
                            <Col span={2}>
                                <img
                                    src="/Views/Risk/icons/CloseIcon.svg"
                                    className="svg-close-icon-risk"
                                    onClick={() => {
                                        closeForm();

                                    }}
                                />
                            </Col>
                            <Col span={2}>
                                <Button
                                    form="riskForm"
                                    key="submit"

                                    htmlType="submit"
                                    style={{
                                        backgroundColor: "var(--unnamed-color-afb3c7)",
                                        border: "none",
                                        marginTop: "-50%",
                                        padding: "5%"
                                    }}
                                    onClick={() => {
                                        btnApi = false;
                                        tick = true;
                                        AddRisk();
                                    }}
                                >
                                    {" "}
                                    <img
                                        src="/Views/Risk/icons/Misc_Check.svg"
                                        className="svg-check-icon-risk"
                                    />{" "}
                                </Button>
                            </Col>
                        </React.Fragment>
                    )}
                </Row>
            </div>

            <div className="risk-form-add">
                <Form
                    id="riskForm"
                    layout="vertical"
                    form={form}
                    scrollToFirstError
                    initialValues={{
                        remember: true
                    }}
                >
                    <p className="risk-label">ID</p>
                    <Form.Item>
                        <Tooltip
                            title={personalID}
                            key={props.riskGetDetails.personalID}
                            placement="topLeft"
                        >
                            <Input
                                onChange={e => setpersonalID(e.target.value)}
                                defaultValue={personalID}
                                value={personalID}
                                key={props.riskGetDetails.personalID}
                                className="input-name-rh-detail"
                                disabled={true}
                            />
                        </Tooltip>
                    </Form.Item>

                    <p className="risk-label">
                        {" "}
                        {t('Label_Name')} <i className="fa fa-circle asterisk-dot"></i>
                    </p>

                    <Form.Item>
                        <Tooltip
                            title={name}
                            key={props.riskGetDetails.Name}
                            placement="topLeft"
                        >
                            <Input
                                onChange={e => setName(e.target.value)}
                                defaultValue={name}
                                value={name}
                                key={props.riskGetDetails.Name}
                                className="input-name-rh-detail"
                                disabled={props.disable}
                            />
                        </Tooltip>
                    </Form.Item>

                    <p className="risk-label">{t('Label_Description')}</p>
                    <Form.Item>
                        <Tooltip
                            title={desc}
                            key={props.riskGetDetails.Description}
                            placement="topLeft"
                        >
                            <Input
                                onChange={e => setDesc(e.target.value)}
                                defaultValue={desc}
                                value={desc}
                                key={props.riskGetDetails.Description}
                                className="input-name-rh-detail"
                                disabled={props.disable}
                            />
                        </Tooltip>
                    </Form.Item>
                    {((props.riskGetDetails.IsChild == false && props.keyAccess != props.masterId[0]) || props.keyAccess != props.masterId[0] &&
                        props.linkParent == true) && (
                            <Form.Item>
                            <b className="risk-label">{t('Label_LinkToParentRisk')}</b>

                                <div
                                    className={
                                        disableIcon ? "LinkParent-div-disable" : "LinkParent-div"
                                    }
                                    style={disableIcon ? { backgroundColor: "#F2F3FA" } : {}}
                                >
                                    <Row>
                                        {selectedItem[0].Id == "" && <Col span={20}> </Col>}

                                        <Col span={19} defaultValue={selectedItem[0].Name}>
                                            <Tooltip title={selectedItem[0].Name} key={parentRisk}>
                                                <span id="riskTitle">
                                                    {((ParentLevelName && props.Parentriskname) && ParentLevelName) + " " + (props.Parentriskname && "::") + " " + props.Parentriskname}
                                                </span>
                                            </Tooltip>
                                        </Col>

                                        {!disableIcon && (
                                            <Col span={5} className="linkButtonRisk">
                                                <p
                                                    className="LinkParent-modal"
                                                    onClick={() => {
                                                        setLinkRisk(true);
                                                    }}
                                                >
                                                {t('Label_CapsLink')}
                        </p>
                                            </Col>
                                        )}
                                    </Row>
                                </div>
                            </Form.Item>
                        )}

                    <p className="risk-label">
                        {" "}
                        {t('Label_RiskClassification')} <i className="fa fa-circle asterisk-dot"></i>{" "}
                    </p>
                    <Form.Item>
                        <Select
                            style={{
                                marginLeft: "-6vh",
                                marginBottom: "-20%",

                            }}
                            dropdownClassName="dropdownOverflow"
                            className="rh-riskClassification-detail"
                            defaultValue={riskClassificationID}
                            showSearch="true"
                            disabled={props.disable}
                            value={riskClassificationID}
                            getPopupContainer={trigger => trigger.parentNode}
                            onChange={e => {
                                onRisk(e);
                            }}
                        >
                            {riskClassification &&
                                riskClassification.map(({ label, value }) => (
                                    <Option key={value}>
                                        <span>{label}</span>
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <p className="risk-label"> {t('Label_RiskSubClassification')}</p>
                    <Form.Item>
                        <Select
                            style={{
                                marginLeft: "-6vh",
                                marginBottom: "-20%",

                            }}
                            className="rh-riskClassification-detail"
                            disabled={props.disable}
                            showSearch="true"
                            getPopupContainer={trigger => trigger.parentNode}
                            dropdownClassName="dropdownOverflow"
                            defaultValue={riskSubClassificationID}
                            value={riskSubClassificationID}
                            onChange={e => {
                                onRiskSub(e);
                            }}
                        >
                            {riskSubClassification &&
                                riskSubClassification.map(
                                    ({ Name, RiskSubClassificationID }) => (
                                        <Option key={RiskSubClassificationID}>
                                            <span>{Name}</span>
                                        </Option>
                                    )
                                )}
                        </Select>
                    </Form.Item>

                    <p className="risk-label">
                        {t('Label_RiskType')} {/*<i className="fa fa-circle asterisk-dot"></i>{" "}*/}
                    </p>
                    <Form.Item>
                        <Select
                            style={{
                                marginLeft: "-6vh",
                                marginBottom: "-20%",

                            }}
                            dropdownClassName="dropdownOverflow"
                            className="rh-riskClassification-detail"
                            disabled={props.disable}
                            defaultValue={riskTypeID}
                            value={riskTypeID}
                            getPopupContainer={trigger => trigger.parentNode}
                            showSearch="true"
                            onChange={e => {
                                onType(e);
                            }}
                        >
                            {riskType &&
                                riskType.map(({ label, value }) => (
                                    <Option key={value}>
                                        <span>{label}</span>
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <hr
                        style={{
                            height: "1.5px",
                            backgroundColor: "darkgray",
                            width: "139%",
                            marginLeft: "-18%",
                            marginTop: "5vh"
                        }}
                    />

                    <FrequencyPattern
                        calledFrom="RiskHierarchy"
                        risk={true}
                        edit={edit}
                        noend={noend}
                        setNoend={setNoend}
                        frequency={frequency}
                        setFrequency={setFrequency}
                        weekValue={weekValue}
                        setWeekValue={setWeekValue}
                        daysValue={daysValue}
                        setDaysValue={setDaysValue}
                        monthNames={monthNames}
                        daysOfMonth={daysOfMonth}
                        notify={notify}
                        setNotify={setNotify}
                        recur={recur}
                        setRecur={setRecur}
                        monthNamesValue={monthNamesValue}
                        setMonthNamesValue={setMonthNamesValue}
                        oneTimeRecur={oneTimeRecur}
                        setOneTimeRecur={setOneTimeRecur}
                        recurRange={recurRange}
                        setRecurRange={setRecurRange}
                        weekDays={weekDays}
                        setWeekDays={setWeekDays}
                        nextReviewDate={nextReviewDate}
                        setReviewDate={setReviewDate}
                        setEndAfter={setEndAfter}
                        endAfter={endAfter}
                        form={form}
                        calledFromPanel={props.calledFromPanel}
                    />

                    {/*<p className="risk-label">*/}
                    {/*  Approvers<i className="fa fa-circle asterisk-dot"></i>*/}
                    {/*</p>*/}
                    {/*<Form.Item>*/}
                    {/*  <Select*/}
                    {/*    style={{*/}
                    {/*      marginLeft: "-10%",*/}
                    {/*      marginBottom: "-20%",*/}
                    {/*      width: "123%"*/}
                    {/*    }}*/}
                    {/*    showSearch="true"*/}
                    {/*    className="rh-riskClassification-detail"*/}
                    {/*    disabled={props.disable}*/}
                    {/*    onInputKeyDown={onApproversChange}*/}
                    {/*    onChange={approverFunction}*/}
                    {/*    defaultValue={approverID}*/}
                    {/*    value={approverID}*/}
                    {/*    placeholder="Please enter 2 or more characters"*/}
                    {/*  >*/}
                    {/*    {approverOptions &&*/}
                    {/*      approverOptions.map(value => (*/}
                    {/*        <Option key={value.id}>*/}
                    {/*          <Tooltip title={value.label} key={value.id}>*/}
                    {/*            <span>{value.label} </span>*/}
                    {/*          </Tooltip>{" "}*/}
                    {/*        </Option>*/}
                    {/*      ))}*/}
                    {/*  </Select>*/}
                    {/*</Form.Item>*/}
                    <p className="risk-label">
                        {t('Label_RiskAdministrator')}
                    </p>
                    <Form.Item>

                        <Select style={{
                            marginLeft: "-6vh",
                            marginBottom: "-20%",

                        }}
                            defaultValue={selectedAdministrator}
                            value={selectedAdministrator}
                            showSearch="true"
                            onChange={(event) => {
                                setSelectedAdministrator(event)
                            }}
                            disabled={administratorEntities.IsCentralEntity || !edit}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.includes(input.toLowerCase())

                            }

                            dropdownClassName="dropdownOverflow"
                            className="rh-riskClassification-detail"
                            getPopupContainer={trigger => trigger.parentNode}
                        >
                            <Option key="00000000-0000-0000-0000-000000000000">{t('Label_NoRiskAdministrator')}</Option>
                            {
                                administratorEntities.Entities &&
                                administratorEntities.Entities.map((item, index) => {
                                    return (
                                        <Option value={item.Id} key={item.Id}>
                                            {item.label}
                                        </Option>
                                    )
                                }
                                )
                            }
                        </Select>

                    </Form.Item>
                    <hr
                        style={{
                            height: "1.5px",
                            backgroundColor: "darkgray",
                            width: "139%",
                            marginLeft: "-18%",
                            marginTop: "4vh",
                            marginBottom: "4vh"
                        }}
                    />
                    {!props.disable && (
                        <React.Fragment>
                            <Button
                                type="primary"
                                key="submit"
                                htmlType="submit"
                                form="riskForm"
                                className="allocDeptBtn"
                                disabled = {disabledCond}                                
                                onClick={() => {
                                    setDisabledCond(true)
                                    if (checkUpd) {
                                        allocNew = true;
                                        viewElementAccess();
                                        btnApi = true;
                                        tick = false;
                                    } else if (props.calledFromPanel) {
                                        allocNew = true;
                                        viewElementAccess();
                                        btnApi = true;
                                        tick = false;
                                    } else {
                                        btnApi = true;
                                        tick = false;
                                    }
                                    AddRisk();
                                }}
                            >
                                {t('Label_AllocateEntityAndAccess')}{" "}
                            </Button>
                        </React.Fragment>
                    )}
                    {props.disable && (
                        <React.Fragment>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="allocDeptBtn"
                                disabled={disabledCond}  
                                onClick={() => {
                                    setDisabledCond(true)
                                    updatecheck();
                                    viewElementAccess();
                                }}
                            >
                                {t('Label_ViewEntiyAndAccess')}
              </Button>
                        </React.Fragment>
                    )}

                    <br />
                    <br />
                </Form>
            </div>

            <Modal
                centered={true}
                visible={deletemodal}
                footer={null}
                closable={null}
                className="del-modal"
            >
                <Row justify="center">
                    <Col
                        xs={2}
                        sm={4}
                        md={6}
                        lg={8}
                        xl={10}
                        style={{ marginTop: "5vh", textAlign: "center" }}
                    >
                        <img
                            src="\Views\Risk\icons\Action_Delete.svg"
                            className="del-icon"
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col
                        xs={18}
                        sm={20}
                        md={22}
                        lg={24}
                        xl={26}
                        style={{
                            marginTop: "2vh",
                            textAlign: "center",
                            marginBottom: "3vh"
                        }}
                    >
                        <b style={{ fontSize: "2.8vh" }}>{t('Label_DeleteConfirmation')}</b>
                    </Col>
                </Row>

                {/*Showing Delete pop-up based on the Level and Parent/child relationship*/}
                {messagePopup(props.currentActiveTab)}

            </Modal>
            <div>
                {linkRisk == true && (
                    <RoleandUserModal
                        {...props}
                        url={props.urls}
                        currentMasterRiskModalId={props.keyAccess}
                        linkRisk={linkRisk}
                        setLinkRisk={setLinkRisk}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        selectionType="single"
                        showRisksOnly={true}
                        selection="risks"
                        showLineInModal={true}
                        showLevel="higher"
                    />
                )}
            </div>
        </div>
    );
}
