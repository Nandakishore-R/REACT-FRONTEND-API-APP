import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {Form, Input, InputNumber, Button, Radio, Switch, Divider, Row, Col, Select, Layout, Tooltip, Modal} from 'antd';

function KriForm(props) {
    const { t, i18n } = useTranslation();
    const { Option } = Select;
    const [form] = Form.useForm();
    const [image, setImage] = useState(true);
    const [unitOfMeasurement, setUnitOfMeasurement] = useState();
    const [owner, setOwner] = useState([]);
    const [date, setDate] = useState("");
    const [KriActive, setKriActive] = useState(true);
    const [kriId, setKriId] = useState("");
    const [name, setName] = useState("");
    const [personalID, setpersonalID] = useState("");
    const [edit, setEdit] = useState(!props.calledFromPanel);
    const [openNotificationModal, setOpenNotificationModal] = useState(false);
    const [NotificationRulecheck, setNotificationRulecheck] = useState(
        false
    );
    const [notificationViewMode, setNotificationViewMode] = useState(false);

    //when called by edit , set it to the value received
    /*Frequency Pattern*/
    const [frequency, setFrequency] = useState("daily");
    const [notify, setNotify] = useState("");
    const [recur, setRecur] = useState("");
    const [weekValue, setWeekValue] = useState("");

    //To set the next review date
    const [nextReviewDate, setReviewDate] = useState("");
    const [endAfter, setEndAfter] = useState("");
    const [noend, setNoend] = useState(false);
    //To set the range of recur date
    const [daysValue, setDaysValue] = useState("");
    const [monthNamesValue, setMonthNamesValue] = useState("");
    const [weekDays, setWeekDays] = useState([]);
    const [thresholdcheck, setThresholdcheck] = useState(false);

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
    const [oneTimeRecur, setOneTimeRecur] = useState(false);
    const [recurRange, setRecurRange] = useState("");
    const labelTo = `${t('Label_Currency')}`;
    /*End Frequency Pattern*/

    // variable for present date
    var currentDate = new Date();
    //To disable current date
    currentDate.setDate(currentDate.getDate() + 1);
    const [countAbove, setCountAbove] = useState();
    const [countBelow, setCountBelow] = useState();
    const [countButtonCLicked, setCountButtonClicked] = useState(0);
    const [ownerentity, setOwnerEntity] = useState("");
    const [ownerrole, setOwnerRole] = useState("");
    const [owneruser, setOwnerUser] = useState("");
    const [approverentity, setApproverEntity] = useState("");
    const [approverrole, setApproverRole] = useState("");
    const [approveruser, setApproverUser] = useState("");
    const [KPICaptureMethods, setKPICaptureMethods] = useState([]);
    const [
        unitOfMeasurementOptions,
        setUnitOfMeasurementOptions
    ] = useState([]);
    
    const [
        BaselLossTypeOptions,
        setBaselLossTypeOptions
    ] = useState([]);
    const [
        BaselBusinessLineOptions,
        setBaselBusinessLineOptions
    ] = useState([]);
    const [
        BaselLossType,
        setBaselLossType
    ] = useState([]);
    const [
        BaselBusinessLine,
        setBaselBusinessLine
    ] = useState([]);
    const ownerapi = '/User/FetchUsersAndRoles';

    const ownerclick = event => {
        let value = event ? event.target.value : "";
        $.ajax({
            type: "GET",
            cache: false,
            url: "/User/FetchAllUsersAndRoles",
            data: {
                q: value
            },
            async: false,
            contentType: "application/json",
            success: function (response) {
                debugger
                setOwner(response);
            },
            error: function (error) {
                console.log("error of owner api is " + JSON.stringify(error));
            }
        });
    };

    function ownerdatafunction(data) {

        owner.map(value => {
            if ((value.id + value.roleId == data && value.isUser == true)) {
                setOwnerEntity(value.entityId);
                setOwnerRole(value.roleId);
                setOwnerUser(value.id);

            }
            else if ((value.id == data && value.isUser == false)) {
                setOwnerRole(value.id);
                setOwnerEntity("");
                setOwnerUser("");
            }
        });

    }
    function approverdatafunction(data) {

        owner.map(value => {
            if ((value.id + value.roleId == data && value.isUser == true)) {
                setApproverEntity(value.entityId);
                setApproverRole(value.roleId);
                setApproverUser(value.id);

            }
            else if ((value.id == data && value.isUser == false)) {
                setApproverRole(value.id);
                setApproverEntity("");
                setApproverUser("");
            }
        });

    }
    let KRIDetailsList = props.kriDetails;
    let KRIDetailsID = KRIDetailsList.KRIDetailsID;
    const [deleteModal, setDeleteModal] = useState(false);
    function onclickdelete(deletemodal) {
        setDeleteModal(deletemodal);
    }
    function formatDate(date) {
        if (!date || !date.length) return date;

        let checkdate = date.split("T")[0];
        return checkdate;
    }

    useEffect(
        () => {
            if (props.kriDetails != "" && !thresholdcheck) {
                setCountAbove(props.kriDetails.TresholdAbove);
                setCountBelow(props.kriDetails.TresholdBelow);
            }
            if (props.kriDetails != "") {
                var Obj = {
                    label: props.kriDetails.UnitOfMeasurement,
                    value: props.kriDetails.UnitofMeasurementID
                };
                setUnitOfMeasurement(Obj);
            }

          setImage(!(props.kriDetails.SwitchColorFlag))
    },
    [props.kriDetails]
  );
  const populateFormFromProps = () => {
    setEdit(!props.calledFromPanel);
    if (props.calledFromPanel && Object.keys(KRIDetailsList).length) {
        let obj = {};
       
      if (KRIDetailsList.FrequencyPattern) {
        //obj = JSON.parse(KRIDetailsList.FrequencyPattern);
        KRIDetailsList = {
          ...KRIDetailsList,
          FrequencyPattern: JSON.parse(KRIDetailsList.FrequencyPattern)
        };
       
        const isOneTimeValue =
          KRIDetailsList.FrequencyPattern.isonetime === undefined
            ? false
            : KRIDetailsList.FrequencyPattern.isonetime;
        if (KRIDetailsList.FrequencyPattern.noend == true) {
          setRecurRange("No End Date");
          setReviewDate("");
          setEndAfter("");
          setNoend(true);
        } else if (KRIDetailsList.FrequencyPattern.enddate != null) {
          setRecurRange("End By");
          setEndAfter("");
          setNoend(false);
        } else if (KRIDetailsList.FrequencyPattern.noofrecurrences != null) {
          setRecurRange("End After");
          setReviewDate("");
          setNoend(false);
          }
          setKriId(KRIDetailsList.KRIDetailsID);
          setName(KRIDetailsList.Name);
          setpersonalID(KRIDetailsList.personalID);
        setOneTimeRecur(isOneTimeValue);
          KRIDetailsList.FrequencyPattern.isonetime = isOneTimeValue;
          setNotify(KRIDetailsList.FrequencyPattern.priornotificationdays);
          setRecur(KRIDetailsList.FrequencyPattern.frequencyrecur);
        setFrequency(KRIDetailsList.FrequencyPattern.frequencytype);
        setWeekDays(KRIDetailsList.FrequencyPattern.frequencyweekdays);
        setEndAfter(KRIDetailsList.FrequencyPattern.noofrecurrences);
        setReviewDate(KRIDetailsList.FrequencyPattern.enddate);
      }
      
      if (KRIDetailsList != undefined) {
        obj.NextReviewDate = formatDate(KRIDetailsList.NextReviewDate);

        if (KRIDetailsList.enddate != undefined) {
          obj.enddate = formatDate(KRIDetailsList.enddate);
        }
      }
        setOwnerEntity(KRIDetailsList.OwnerEntity);
        setOwnerRole(KRIDetailsList.OwnerRole);
        setOwnerUser(KRIDetailsList.OwnerUser);
        setApproverEntity(KRIDetailsList.ApproverEntity);
        setApproverRole(KRIDetailsList.ApproverRole);
        setApproverUser(KRIDetailsList.ApproverUser);
        setImage(!(props.kriDetails.SwitchColorFlag))
      KRIDetailsList = { ...KRIDetailsList, ...obj };
      

      form.setFieldsValue(KRIDetailsList);
    }
  };
  useEffect(populateFormFromProps, [
    props.calledFromPanel,
    KRIDetailsList
  ]);
  const {
    keyAccess: RiskHierarchyMasterID,
    riskID: riskID,
    entityKeyAccess: entityKeyAccess
  } = props;

    useEffect(() => {
        $.ajax({
            type: "GET",
            url: '/BalanceScorecard/GetKPICaptureMethod',
            success: responseJSON => setKPICaptureMethods(responseJSON),
            error: error => console.log(JSON.stringify(error, null, 2))
        });

        $.ajax({
            type: "GET",
            url: '/BalanceScorecard/GetUnitofMeasurement',
            success: responseJSON => setUnitOfMeasurementOptions(responseJSON),
            error: error => console.log(JSON.stringify(error, null, 2))
        });
        $.ajax({
            type: "GET",
            url: '/BalanceScorecard/GetBaselBusinessLine',
            success: responseJSON => setBaselBusinessLineOptions(responseJSON),
            error: error => console.log(JSON.stringify(error, null, 2))
        });
        $.ajax({
            type: "GET",
            url: '/BalanceScorecard/GetBaselLossType',
            success: responseJSON => setBaselLossTypeOptions(responseJSON),
            error: error => console.log(JSON.stringify(error, null, 2))
        });

        $.ajax({
            type: "GET",
            url: "/User/FetchAllUsersAndRoles",
            data: {
                q: ""
            },
            async: false,
            contentType: "application/json",
            success: response => console.log(response),
            error: error => console.log(JSON.stringify(error, null, 2))
        });

        ownerclick();
    }, []);
    const errorValidations = (values,ownerrole, nextReviewDate, recurRange, oneTimeRecur, endAfter, recur, notify) => {
        let errorMessage = "";
        if (
            values.Name == "" ||
            values.Name == undefined
        ) {
            errorMessage += `${t('Error_PleaseEnterKRIName')}</br >`;
        }

        if (
            ownerrole == "" ||
            ownerrole == undefined
        ) {
            errorMessage += `${t('Error_PleaseSelectOwner')}</br >`;
        }

        if (
            values.NextReviewDate == "" ||
            values.NextReviewDate == undefined
        ) {
            errorMessage += `${t('Error_PleaseSelectNextReviewDate')}</br >`;
        }

        if (
            values.UnitofMeasurementID == "" ||
            values.UnitofMeasurementID == undefined
        ) {
            errorMessage += `${t('Error_PleaseSelectUnitOfMeasurement')}</br >`;
        }

        if (
            (values.KPICaptureMethodID == "" ||
                values.KPICaptureMethodID == undefined)
        ) {
            errorMessage += `${t('Error_PleaseChooseKRICaptureMethod')}</br >`;
        }
        if (
            recur == "" ||
            recur == undefined
        ) {
            errorMessage = `${t('Error_RecurEveryIsRequired')}</br>`;
        }
        if (
            notify == "" ||
            notify == undefined
        ) {
            errorMessage = errorMessage + `${t('Error_PriorNotificationDaysIsRequired')}</br>`;
        }
        if (notify < 1) {
            errorMessage = errorMessage + `${t('Error_PleaseEnterValidNotifyInDays')}</br>`;
        }
        if (
            values.FrequencyPattern.frequencytype == "weekly" &&
            (weekDays == undefined || weekDays.length == 0)
        ) {
            errorMessage = errorMessage + `${t('Error_DaysOfTheWeekNeedsToBeSelected')}</br>`;
        }
        if (values.FrequencyPattern.frequencytype == "monthly") {
            if (
                (values.FrequencyPattern.frequencyday == "" ||
                    values.FrequencyPattern.frequencyday == undefined) &&
                (values.FrequencyPattern.frequencyweek == "" ||
                    values.FrequencyPattern.frequencyweek == undefined)
            ) {
                errorMessage =
                    errorMessage + `${t('Error_DaysWeeksOfTheMonthNeedsToBeSelected')}</br>`;
            }
            if (
                values.FrequencyPattern.frequencyweek != "" &&
                values.FrequencyPattern.frequencyweek != undefined &&
                (weekDays == undefined || weekDays.length == 0)
            ) {
                errorMessage =
                    errorMessage + `${t('Error_DaysOfTheWeekNeedsToBeSelected')}</br>`;
            }
        }
        if (values.FrequencyPattern.frequencytype == "anually") {
            if (
                values.FrequencyPattern.frequencymonth == "" ||
                values.FrequencyPattern.frequencymonth == undefined
            ) {
                errorMessage =
                    errorMessage + `${t('Error_MonthOfTheYearNeedsToBeSelected')}</br>`;
            }
            if (
                values.FrequencyPattern.frequencymonth != "" &&
                values.FrequencyPattern.frequencymonth != undefined
            ) {
                if (
                    (values.FrequencyPattern.frequencyday == "" ||
                        values.FrequencyPattern.frequencyday == undefined) &&
                    (values.FrequencyPattern.frequencyweek == "" ||
                        values.FrequencyPattern.frequencyweek == undefined)
                ) {
                    errorMessage =
                        errorMessage + `${t('Error_DaysWeeksOfTheMonthNeedsToBeSelected')}</br>`;
                }
                if (
                    values.FrequencyPattern.frequencyweek != "" &&
                    values.FrequencyPattern.frequencyweek != undefined &&
                    (weekDays == undefined || weekDays.length == 0)
                ) {
                    errorMessage =
                        errorMessage + `${t('Error_DaysOfTheWeekNeedsToBeSelected')}</br>`;
                }
            }
        }
        if (
            oneTimeRecur == false && (recurRange == "" ||
                recurRange == undefined)
        ) {
            errorMessage += `${t('Error_PleaseSelectRangeOfRecurrence')}</br>`;
        }
        if (
            oneTimeRecur == false &&
            recurRange == "End After" &&
            (endAfter == "" ||
                endAfter == undefined)
        ) {
            errorMessage = errorMessage + `${t('Error_NumberOfOccurrenceIsMandatory')}</br>`;
        }
        if (
            oneTimeRecur == false &&
            recurRange == "End By" &&
            (nextReviewDate ==
                "" || nextReviewDate == undefined)
        ) {
            errorMessage = errorMessage + `${t('Error_EndDateNeedsToBeSelected')}</br>`;
        }
        if (countAbove < 1 || countBelow < 1) {
            errorMessage += `${t('Error_PleaseEnterValidThresholdValues')}</br>`
        }
        return errorMessage;

    };
    console.log(labelTo);
    function deleteGetEntity(array) {
        let found = array.find((node) => {
           
            if (node.id === KRIDetailsID) {
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
                    item.isKriPresent = false;
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
    function makeIsChildTrue(array) {
        let found = array.find((node) => {
            if (node.id === props.selectedId.Id) {
                if (node.isChildPresent == false) {
                    node.isChildPresent = true;
                    return found;
                }

            }

        })
        if (found == undefined) {
            array.find(
                (c) =>
                    c.children && c.children.length > 0 && makeIsChildTrue(c.children)
            )
        }
    }

    const onFormSubmit = values => {
        var errorMessage = errorValidations(values,ownerrole,nextReviewDate, recurRange, oneTimeRecur, endAfter, recur, notify);

       
        if (errorMessage) {
            toastr.error(errorMessage);
        } else {
            values.KRIType = values.KRIType || "Decide Later"
            const payload = {
                ...values,
                RiskHierarchyMasterID,
                RiskHierarchyDetailsID: riskID || entityKeyAccess,
                TresholdAbove: countAbove,
                TresholdBelow: countBelow,
                OwnerEntity: ownerentity || "",
                OwnerRole: ownerrole || "",
                OwnerUser: owneruser || "",
                ApproverEntity: approverentity || "",
                ApproverRole: approverrole || "",
                ApproverUser: approveruser || "",
                FrequencyPattern: JSON.stringify({
                    ...values.FrequencyPattern,
                    ...(weekDays && weekDays.length ? { frequencyweekdays: weekDays } : {}),
                    ...(noend ? { noend } : {}), ...(nextReviewDate ? { enddate: nextReviewDate } : {}),
                    ...(endAfter ? { noofrecurrences: endAfter } : {}),
                    ...(notify ? { priornotificationdays: notify } : {}),
                    ...(recur ? { frequencyrecur: recur } : {}),
                })
            };
            let url = props.calledFromPanel || countButtonCLicked > 0 ? '/RiskHierarchy/UpdateKriDetails' : '/RiskHierarchy/CreateKriDetails';
            console.log(payload, "these are payloads")
            $.ajax({
                type: "POST",
                url: url,
                data: props.calledFromPanel || countButtonCLicked > 0
                    ? JSON.stringify({ ...payload, KRIDetailsID: (KRIDetailsID || kriId) })
                    : JSON.stringify(payload),
                contentType: "application/json",
                success: response => {
                    if (response.StatusCode == true && props.calledFromPanel) {
                        if (NotificationRulecheck == true) {
                            setOpenNotificationModal(true);
                            setCountButtonClicked(countButtonCLicked + 1);
                        }
                        else {
                            setEdit(!edit);
                        }
                        
                        props.setShowKriForm(true);
                        toastr.success(`${t('Label_Success')}`);
                    } else if (response.StatusCode == true) {
                        toastr.success(`${t('Label_Success')}`);
                        if (url == '/RiskHierarchy/CreateKriDetails') {
                            setKriId(response.Message);
                        }
                         if (NotificationRulecheck == true) {
                            setCountButtonClicked(countButtonCLicked + 1);
                            setOpenNotificationModal(true);
                        }
                        if (NotificationRulecheck == false) {
                            props.setShowKriForm(false);
                            props.setReRenderForm(!props.reRenderForm);
                            if (props.UsersUnderRole && props.UsersUnderRole.length == 0) {
                                makeIsChildTrue(props.getEntity)
                            }
                            if (props.selectedId.Id == "") {
                                props.setSelectedId({ Id: props.selectedId.Id, selection: false, expansion: true, level: 0 })
                                props.setParentRender(!props.parentRender);
                            }
                            else {
                                if (props.selectedId.expansion != true) {
                                    if (props.roleDetails) {
                                        props.setReRenderForm(!props.reRenderForm);
                                    }
                                    else {
                                        props.setSelectedId({ Id: props.selectedId.Id, selection: false, expansion: true, level: props.selectedId.level })
                                        let index = props.entityExpSel.findIndex((obj => obj.Id == props.selectedId.Id));
                                        props.entityExpSel[index].expansion = true;
                                        props.entityExpSel[index].selection = false;
                                    }
                                }
                            }
                        }
                        
                        //If addition/updation happen
                        if (props.term && props.term != '')
                            props.onSearchSubmit(props.term)
                    }
                    if (response.StatusCode == false) {
                        toastr.error(response.Message);
                    }
                    /*if (isError != "") {
                        toastr.error(isError);
                    }*/
                },
                error: () =>
                    function (error) {
                        console.log(error);
                    }
            });

        }
    };

  const del_data = {
    KRIDetailsID: KRIDetailsList.KRIDetailsID,
    IsDelete: true
  };
  function deleteKri() {
    $.ajax({
      type: "POST",
        url: '/RiskHierarchy/DeleteKriDetails',
      data: JSON.stringify(del_data),
      contentType: "application/json",
      success: function(response) {
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
        //  if (response.StatusCode == true) {
        //    props.setReRenderKpiForm(!props.reRenderKpiForm);
        //  }
        //},
      },
      error: function(error) {
        console.log("error is " + error);
      }
    });
  }
    function closeForm() {
        props.setShowKriForm(false);
    }
  const OccurenceComponent = () => (
    <Fragment>
      {unitOfMeasurement &&
              unitOfMeasurement.label == `${t('Label_Currency')}` && <p className="units">INR</p>}
      {unitOfMeasurement &&
              unitOfMeasurement.label == `${t('Label_Occurrence')}` && (
              <p className="occurence">{t('Label_Occurrence')}</p>
        )}
      {unitOfMeasurement &&
              unitOfMeasurement.label == `${t('Label_Days')}` && <p className="units">{t('Label_Days')}</p>}
      {unitOfMeasurement &&
              unitOfMeasurement.label == `${t('Label_Percentage')}` && <p className="units">%</p>}
      {unitOfMeasurement &&
              unitOfMeasurement.label == `${t('Label_Number')}` && <p className="units">{t('Label_Number')}</p>}
      {unitOfMeasurement &&
              unitOfMeasurement.label == `${t('Label_Hours')}` && <p className="units">{t('Label_Hours')}</p>}
      {unitOfMeasurement &&
              unitOfMeasurement.label == "Minutes" && <p className="units">Min</p>}
      {unitOfMeasurement &&
              unitOfMeasurement.label == `${t('Label_Amount')}` && <p className="units">{t('Label_Amount')}</p>}
    </Fragment>
  );
  return (
    <div>
      <div className="kri-nav">
        <Row>
          <Col span={2}>
            <img src="/Views/Risk/icons/KRI.svg" className="svg-KRI-icon" />
          </Col>
          <Col span={3} className="nav-kpi">
                      <b className="KRI-texticon">{t('Label_KRI')}</b>
          </Col>
          <Col span={15} className="nav-kpi">
            <b className="text-KPI">
                          {props.calledFromPanel ? name : `${t('Label_NewKRI')}`}
            </b>
          </Col>
          {/* 
                        <Col span={2} >
                            <img className="pen-icon" onClick={Editing} />
                        </Col>
                        <Col span={2}>
                            <img className="trash-icon " onClick={deleteKpi} />
                        </Col>*/}
                    <Col span={2} className="nav-kpi">
                        {!edit && (
                            <img
                              className="kri-pen"
                              onClick={() => { setEdit(true); setNotificationViewMode(false) }}
                                src="/Views/Risk/icons/Action_Edit.svg"
                            />
                        )}
                        {(!props.calledFromPanel || edit) && (
                            <img
                                onClick={() => {
                                    if (props.calledFromPanel) {
                                        setEdit(false);
                                        populateFormFromProps();
                                        if (edit) return;
                                    }
                                    props.setShowKriForm(false);
                                }}
                                src="/Views/Risk/icons/CloseIcon.svg"
                                className="kri-svg-cross"
                            />
                        )}
                    </Col>
                    <Col span={2} className="nav-kpi">
                        {!edit ? (
                            <img
                              src="/Views/Risk/icons/Action_Delete.svg"
                              className="kri-svg-del"
                              onClick={() => { onclickdelete(true) }}
                            />
                        ) : (
                            <img
                                  onClick={() => {
                                      form.submit();
                                      setNotificationRulecheck(false);
                                      
                                  }}
                                src="/Views/Risk/icons/Misc_Check.svg"
                                className="kri-svg-tick"
                            />
                        )}
                    </Col>
                </Row>
            </div>

            <Form
                layout="vertical"
                form={form}
                onFinish={onFormSubmit}
                className="kpi-form"
            >
                <p className="kpi-label" id="kpi-name">
                    {t('Label_RangeDirection')}
              </p>
                <Form.Item name="SwitchColorFlag" className="owner-formItem">
                    <Select
                        showArrow={edit}
                        disabled={!edit}
                        className="rh-riskClassification-detail-kpi"
                        dropdownClassName="ThreshDropdownKPI"
                        size={"small"}
                        defaultValue={false}
                        onChange={val => {
                            setImage(!val);
                        }}
                        getPopupContainer={trigger => trigger.parentNode}
                    >
                        <Option
                            style={{
                                backgroundColor: "white",
                            }}
                            value={false}>
                            {t('Label_IncreasingValueBetter')}
                  </Option>
                        <Option style={{
                            backgroundColor: "white",
                        }} value={true}>
                            {t('Label_DecreasingValueBetter')}
                  </Option>
                    </Select>
              </Form.Item>
              <p className="kpi-label" id="kpi-personalID">
                  ID
              </p>
              <Form.Item name="personalID">
                  <Input disabled={!edit} value={personalID} onChange={e => setpersonalID(e.target.value)} className="kri-manual-col" />
              </Form.Item>
                <p className="kpi-label" id="kpi-name">
                  {t('Label_Name')} <i className="fa fa-circle asterisk-dot"></i>
                </p>
                <Form.Item name="Name">
                  <Input disabled={!edit} value={name} onChange={e => setName(e.target.value)} className="kri-manual-col" />
                </Form.Item>
                <p className="kpi-label">{t('Label_Description')}</p>
                <Form.Item name="Description">
                    <Input disabled={!edit} className="kri-manual-col" />
                </Form.Item>
                <p className="kpi-label">
                  {t('Label_Owner')}  <i className="fa fa-circle asterisk-dot"></i>
                </p>
                <Form.Item className="owner-formItem">
                    <Select
                        disabled={!edit}
                        showSearch="true"
                        showArrow={edit}
                        className="rh-riskClassification-detail-kpi"
                        onInputKeyDown={ownerclick}
                        getPopupContainer={trigger => trigger.parentNode}
                        dropdownClassName="dropdownOverflow"
                        placeholder={`${t('Alert_EnterCharacters')}`}
                        optionFilterProp={"key"}
                        onChange={val => ownerclick()}
                        onSelect={ownerdatafunction}
                        value={(owneruser ? owneruser : "") + ownerrole}
                    >
                        {owner.map(value => (
                            <Option value={value.id + (value.roleId !== "00000000-0000-0000-0000-000000000000" ? value.roleId : "")} key={value.label}>
                                <Tooltip title={value.label} key={value.label}>
                                    <span>{value.label} </span>
                                </Tooltip>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <p className="kpi-label">
                  {t('Label_NextReviewDate')} <i className="fa fa-circle asterisk-dot"></i>
                </p>
                <Form.Item name="NextReviewDate">
                    <Input
                        disabled={!edit}
                        title={date}
                        type="date"
                        onChange={e => setDate(e.target.value)}
                        min={currentDate.toISOString().split("T")[0]}
                        className="date-input-kri"
                        defaultValue={date}
                        value={date}
                    />
                </Form.Item>
                <div className="radiokri">
                    <span className="kpi-label" style={{ marginBottom: "0" }}>
                      {t('Label_KRIType')}
          </span>
                    <Form.Item
                        name="KRIType"
                        style={{ marginLeft: "20px", marginBottom: "0" }}
                    >
                        <Radio.Group
                            disabled={!edit}
                          label="KRIType"
                          defaultValue={KRIDetailsList.KRIType || "Decide Later"}
                            className="radiolabelkpi"
                        >
                          <Radio value={"Lead"}>{t('Label_Lead')}</Radio>
                          <Radio value={"Lag"}>{t('Label_Lag')}</Radio>
                          <Radio value={"Decide Later"} className="threedotskritype"> <Tooltip placement="topLeft" title={t('Label_DecideLater')}>{t('Label_DecideLater')}</Tooltip></Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className="radiokpi2">
                    <span className="kpi-label" style={{ marginBottom: "0" }}>
                        {t('Label_Active')}
          </span>
                    <Form.Item
                        name="IsActive"
                        valuePropName={"checked"}
                        style={{ marginLeft: "20px", marginBottom: "0" }}
                        initialValue={KriActive}
                    >
                        <Switch
                            disabled={!edit}
                            className="activeButtonkpi"
                            onChange={value => {
                                setKriActive(value);
                            }}
                            checked={KriActive}
                        />
                    </Form.Item>
                </div>
                <hr

                    className="kri-form-divider"
                />

                <div>
                    <p className="kpi-label">
                      {t('Label_KRICaptureMethod')}<i className="fa fa-circle asterisk-dot"></i>
                    </p>
                    <Form.Item
                        name="KPICaptureMethodID"
                        style={{ marginLeft: "-2.2rem" }}
                    >
                        <Radio.Group
                            disabled={!edit}
                            options={KPICaptureMethods.map(
                                ({ Name, KPICaptureMethodID }) => ({
                                    label: Name,
                                    value: KPICaptureMethodID
                                })
                            )}
                        />
                    </Form.Item>
              </div>
              <p style={{ marginTop: "-2.8vh" }} className="kpi-label">
                  {t('Label_BaselLossType')}
              </p>
              {(edit || props.calledFromPanel) && (
                  <Form.Item name="BaselLossTypeId" className="owner-formItem">
                      <Select
                          disabled={!edit}
                          showArrow={edit}
                          className="rh-riskClassification-detail-kpi"
                          value={BaselLossType}
                          dropdownClassName="dropdownOverflow"
                          getPopupContainer={trigger => trigger.parentNode}
                          defaultValue=""
                          onChange={(value, rec) => {
                              setBaselLossType(rec);
                          }}
                          options={BaselLossTypeOptions.map(
                              ({ BaselLossTypeId, Name }) => ({
                                  label: Name,
                                  value: BaselLossTypeId
                              })
                          )}
                      />
                  </Form.Item>
              )}
              <p style={{ marginTop: "-2.8vh" }} className="kpi-label">
                  {t('Label_BaselBusinessLine')} 
              </p>
              {(edit || props.calledFromPanel) && (
                  <Form.Item name="BaselBusinessLineId" className="owner-formItem">
                      <Select
                          disabled={!edit}
                          showArrow={edit}
                          className="rh-riskClassification-detail-kpi"
                          value={BaselBusinessLine}
                          dropdownClassName="dropdownOverflow"
                          getPopupContainer={trigger => trigger.parentNode}
                          defaultValue=""
                          onChange={(value, rec) => {
                              setBaselBusinessLine(rec);
                          }}
                          options={BaselBusinessLineOptions.map(
                              ({ BaselBusinessLineId, Name }) => ({
                                  label: Name,
                                  value: BaselBusinessLineId
                              })
                          )}
                      />
                  </Form.Item>
              )}

                <p className="kpi-label">{t('Label_Approver')}</p>
                <Form.Item className="owner-formItem">
                    <Select
                        value={(approveruser ? approveruser : "") + approverrole
                            == "00000000-0000-0000-0000-000000000000" ? "" : (approveruser ? approveruser : "") + approverrole
                        }
                        showArrow={edit}
                        disabled={!edit}
                        showSearch="true"
                        className="rh-riskClassification-detail-kpi"
                        onInputKeyDown={ownerclick}
                        dropdownClassName="dropdownOverflow"
                        placeholder={`${t('Alert_EnterCharacters')}`}
                        getPopupContainer={trigger => trigger.parentNode}
                        onChange={val => ownerclick()}
                        onSelect={approverdatafunction}
                        optionFilterProp={"key"}
                    >
                        {owner.map(value => (
                            <Option value={value.id + (value.roleId !== "00000000-0000-0000-0000-000000000000" ? value.roleId : "")} key={value.label}>
                                <Tooltip title={value.label} key={value.label}>
                                    <span>{value.label} </span>
                                </Tooltip>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
              <FrequencyPattern
                  calledFrom="Kri"
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
                    noend={noend}
                    setNoend={setNoend}
                    setRecurRange={setRecurRange}
                    weekDays={weekDays}
                    endAfter={endAfter}
                    setWeekDays={setWeekDays}
                    nextReviewDate={nextReviewDate}
                    setReviewDate={setReviewDate}
                    setEndAfter={setEndAfter}
                    calledFromPanel={props.calledFromPanel}
                    edit={edit}
                    //frequencyweekdays={KRIDetailsList.frequencyweekdays}
                    //    FreqPattern={KRIDetailsList.FrequencyPattern || {}}
                    form={form}
                />
                <p style={{ marginTop: "-2.8vh" }} className="kpi-label">
                  {t('Label_UnitOfMeasurement')} <i className="fa fa-circle asterisk-dot"></i>
                </p>
                {(edit || props.calledFromPanel) && (
                    <Form.Item name="UnitofMeasurementID" className="owner-formItem">
                        <Select
                            disabled={!edit}
                            showArrow={edit}
                            className="rh-riskClassification-detail-kpi"
                            value={unitOfMeasurement}
                            dropdownClassName="dropdownOverflow"
                            getPopupContainer={trigger => trigger.parentNode}
                            defaultValue=""
                            onChange={(value, rec) => {
                                setUnitOfMeasurement(rec);
                            }}
                            options={unitOfMeasurementOptions.map(
                                ({ UnitofMeasurementID, Name }) => ({
                                    label: Name,
                                    value: UnitofMeasurementID
                                })
                            )}
                        />
                    </Form.Item>
                )}
                {(unitOfMeasurement ||
                    !edit ||
                    props.calledFromPanel ||
                    props.calledFromPanel) && (
                        <Form.Item>
                            <Row>
                                <Col span={18}>
                                <p className="kpi-label">{t('Label_Target')}</p>
                                    <Form.Item name="TargetValue">
                                        <InputNumber
                                        type="number"
                                        disabled={!edit}
                                        name="target"
                                        className="kpi-manual-col"
                                        pattern="[0-9]"
                                        title={`${t('Error_OnlyNumbersCanBeEntered')}`}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={1} />
                                <Col span={2} className="tarbasetype">
                                    <OccurenceComponent />
                                </Col>
                            </Row>
                        </Form.Item>
                    )}
                {(unitOfMeasurement ||
                    !edit ||
                    props.calledFromPanel ||
                    props.calledFromPanel) && (
                        <Form.Item>
                            <Row style={{ marginTop: "-2.8vh" }}>
                                <Col span={18}>
                                <p className="kpi-label">{t('Label_Baseline')}</p>
                                    <Form.Item name="BaselineValue">
                                        <InputNumber
                                            type="number"
                                            disabled={!edit}
                                            className="kpi-manual-col"
                                            pattern="[0-9]"
                                            title={`${t('Error_OnlyNumbersCanBeEntered')}`}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={1} />
                                <Col span={2} className="tarbasetype">
                                    <OccurenceComponent />
                                </Col>
                            </Row>
                        </Form.Item>
                    )}
                {(unitOfMeasurement || !edit || props.calledFromPanel) && (
                    <Form.Item>
                        <Row style={{ marginTop: "-2.8vh" }}>
                            <Col span={11}>
                                <p className="kpi-label">{t('Label_Min')}</p>
                                <Form.Item name="MinValue">
                                    <InputNumber
                                        type="number"
                                        disabled={!edit}
                                        className="kpi-manual-col-min"
                                        pattern="[0-9]"
                                        title={`${t('Error_OnlyNumbersCanBeEntered')}`}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={2} />
                            <Col span={11}>
                                <p className="kpi-label-max">{t('Label_Max')}</p>
                                <Form.Item name="MaxValue">
                                    <InputNumber
                                        type="number"
                                        disabled={!edit}
                                        className="kpi-manual-col-max"
                                        title={`${t('Error_OnlyNumbersCanBeEntered')}`}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                )}

                <hr

                    className="kri-form-divider"
                />
                {(unitOfMeasurement || !edit || props.calledFromPanel) && (
                    <Fragment>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span className="kpi-label-th">
                              {t('Label_Threshold')} <i className="fa fa-circle asterisk-dot"></i>
                            </span>


                        </div>
                        <Form.Item>
                            {
                                //above
                            }
                            <Row className="parentThreshold">
                                <Col>
                                    <img
                                        id="imgabove"
                                        src="\Views\Risk\icons\Threshold_Star.svg"
                                    />
                                </Col>
                                <Col>
                                    {/*unitOfMeasurement == "percentage" &&
                                            <Input readOnly={props.calledFromPanel} defaultValue={countBelow} min="1" key={countBelow} value={countBelow} onChange={e => {
                                               
                                            if (e.target.value <= 0) {
                                                setCountBelow(1)
                                            }
                                            else if (e.target.value >= 100) {
                                                setCountBelow(101)
                                            }
                                            else {
                                                setCountBelow(e.target.value)
                                            }
                                            }}
                                             />*/}
                                    {
                                        /*unitOfMeasurement != "percentage" &&*/
                                        <Form.Item name={image ? "TresholdFrom" : "TresholdTo"}>
                                            <Input
                                                type="number"
                                                readOnly={!edit}

                                                prefix={image ? `${t('Label_Below')}` : `${t('Label_Above')}`}
                                                min="0"
                                                className="inpthresh"
                                                value={image ? countBelow : countAbove}
                                                onChange={e => {
                                                    setThresholdcheck(true);
                                                    {
                                                        image
                                                            ? setCountBelow(e.target.value)
                                                            : setCountAbove(e.target.value);
                                                    }
                                                }}
                                            />
                                        </Form.Item>
                                    }
                                </Col>

                              <Col style={{ marginTop: "2vh" }}>
                                    <OccurenceComponent />
                                </Col>
                            </Row>
                            {
                                //intermediate threshold
                            }

                            <Row className="parentThreshold">
                                <Col>
                                    <img
                                        id="imgtriangle"
                                        src="\Views\Risk\icons\Threshold_Triangle.svg"
                                    />
                                </Col>
                                {/*id={checkUser || tab.entityType.length <= 5 ? 'less-type-width' : 'more-type-width'}*/}
                                <Col>
                                    <Form.Item>
                                        <Input
                                          readOnly={!edit}
                                          id={`${t('Label_To')}`.length > 1 ? "thresholdInter" : "thresholdInter2"}
                                            value={
                                                countBelow ||
                                                (KRIDetailsList && KRIDetailsList.TresholdBelow)
                                            }
                                            readOnly
                                            disabled
                                      />
                                    </Form.Item>
                                </Col>
                                <Col
                                    style={{
                                        marginRight: "4.2%",
                                        marginLeft: "4.2%",
                                        marginTop: "3%"
                                    }}
                                >
                                  {t('Label_To')}
                </Col>

                                <Col>
                                    <Form.Item>
                                        <Input
                                            readOnly={!edit}
                                          id={`${t('Label_To')}`.length > 1 ? "thresholdInter" : "thresholdInter2"}
                                            value={
                                                countAbove ||
                                                (KRIDetailsList && KRIDetailsList.TresholdAbove)
                                            }
                                            readOnly
                                            disabled
                                        />
                                    </Form.Item>
                                </Col>

                              <Col style={{ marginTop:"0.8vh" }}>
                                    <OccurenceComponent />
                                </Col>
                            </Row>

                            {
                                //below
                            }
                            <Row style={{ marginTop: "-3vh" }} className="parentThreshold">
                                <Col>
                                    <img
                                        id="imgabove"
                                        src="\Views\Risk\icons\Threshold_circle.svg"
                                    />
                                </Col>
                                <Col>
                                    {/*unitOfMeasurement == "percentage" &&
                                        <Input readOnly={props.calledFromPanel} defaultValue={countAbove} key={countAbove} min="0" value={countAbove}
                                        onChange={e => {
                                          
                                            if (e.target.value <= 0) {
                                                setCountAbove(0)
                                            }
                                            else if (e.target.value >= 100) {
                                                setCountAbove(99)
                                            }
                                            else {
                                                setCountAbove(e.target.value)
                                            }
                                        }}/>*/}
                                    {
                                        /*unitOfMeasurement != "percentage" &&*/
                                        <Form.Item name={image ? "TresholdTo" : "TresholdFrom"}>
                                            <Input
                                                type="number"
                                                readOnly={!edit}

                                                prefix={image ? `${t('Label_Above')}` : `${t('Label_Below')}`}
                                                min="0"
                                                className="inpthresh"
                                                value={image ? countAbove : countBelow}
                                                onChange={e =>
                                                    image
                                                        ? setCountAbove(e.target.value)
                                                        : setCountBelow(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                    }
                                </Col>
                              <Col style={{ marginTop: "2vh" }}>
                                    <OccurenceComponent />
                                </Col>
                            </Row>
                            <p className="threshStatement">
                                {t('Label_SetRAG')}
              </p>
                        </Form.Item>
                    </Fragment>
                )}
              <Form.Item onClick={form.submit}>
                {edit == true ? <Button
                  id="notification"
                      onClick={() => {
                          setNotificationRulecheck(true);
                          setNotificationViewMode(false);
                     
                  }}
              >
                      {t('Label_SetNotificationRules')}
          </Button> : <Button
                      id="notification"
                          onClick={() => {
                              setNotificationRulecheck(true);
                              setNotificationViewMode(true);
                      }}
                  >
                          {t('Label_ViewNotificationRules')}
                  </Button>}
              </Form.Item>
            </Form>
            <Modal
                centered={true}
                visible={deleteModal}
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
                <Row justify="center">
                    <Col
                        xs={15}
                        sm={17}
                        md={19}
                        lg={21}
                        xl={23}
                        style={{ textAlign: "center", fontSize: "2.2vh" }}
                    >
                        {t('Alert_AreYouSureWantToDelete')}
          </Col>
                </Row>
                <Row justify="center">
                    <Col
                        xs={15}
                        sm={17}
                        md={19}
                        lg={21}
                        xl={23}
                        style={{
                            marginBottom: "3vh",
                            textAlign: "center",
                            fontSize: "2.2vh"
                        }}
                    >
                        <b>{KRIDetailsList.Name} </b> {t('Label_KRI')}?
          </Col>
                </Row>
                <Row justify="center">
                    <Col
                        xs={6}
                        sm={6}
                        md={8}
                        lg={10}
                        xl={10}
                        style={{ marginTop: "2vh", marginBottom: "4vh", float: "left" }}
                    >
                        <Button
                            className="delbutton"
                            onClick={() => {
                                deleteKri();
                                onclickdelete(false);
                            }}
                        >
                            {" "}
                            {t('Label_SmallYes')}
            </Button>
                    </Col>
                    <Col
                        xs={6}
                        sm={6}
                        md={8}
                        lg={10}
                        xl={10}
                        style={{ marginTop: "2vh", marginBottom: "4vh", float: "right" }}
                    >
                        <Button className="delbutton" onClick={() => onclickdelete(false)}>
                            {t('Label_SmallNo')}
            </Button>
                    </Col>
                </Row>
            </Modal>
            {openNotificationModal && (
              <NotificationRule
                  StateCheck={edit}
                  /*false when only view*/

                  setOpenNotificationModal={setOpenNotificationModal}
                  ElementID={props.kriDetails.KRIDetailsID || kriId}
                  ElementType="KRI"
                  Name={props.kriDetails.Name||name}
                  url={props.urls}
                  KpiActive={KriActive}
              />
          )}
        </div>
    );
}
export default KriForm;