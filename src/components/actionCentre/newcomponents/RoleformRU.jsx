import { useEffect, useState } from "react";
import { Input, Form, Switch, Row, Col, Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import toastr from "toastr";
import $ from "jquery";
function RoleFormRU(props) {
    const { t, i18n } = useTranslation();
    const { TextArea } = Input;    
    //To set Status in the API call
    //Role form value State
    const [roleName, setroleName] = useState("");
    const [roleDescription, setroleDescription] = useState("");
    const [IsActive, setIsActive] = useState(true);
    const [RoleId, setRoleId] = useState("00000000-0000-0000-0000-000000000000");
    const [updateApiFlag, setUpdateApiFlag] = useState(false);
    const [apiState, setApiState] = useState("CreateRole");
    //state management
    useEffect(() => {
        if (props.roleDetails) {
            setRoleId(props.roleDetails.Id);
            setroleName(props.roleDetails.Name);
            setroleDescription(props.entityDetails.Description);
            setIsActive(props.roleDetails.IsActive);
            setApiState("UpdateRole");

        }
        else {
            setRoleId("00000000-0000-0000-0000-000000000000");
            setroleName('');
            setroleDescription('');
            setIsActive(true);
            setApiState("CreateRole");
        }
    }, [props.roleDetails]);
    function Addroles() {
        if (roleName == "" || roleName == null) {
            toastr.error(`${t('Error_PleaseEnterRoleName')}`)
        }
        else {
            var roleData = {
                "Id": RoleId,
                "RoleName": roleName,
                "EntityId": props.roleDetails.EntityDetailsId || props.selectedId.Id,
                "Description": roleDescription,
                "IsDelete": false,
                "IsActive": IsActive,
                "CreatedBy": "",
                "CreatedDate": "2021-02-04T07:07:58.150Z",
                "ModifiedBy": "",
                "ModifiedDate": "2021-02-04T07:07:58.150Z"
            }

            $.ajax({
                type: "POST",
                async: false,
                url: `/EntityAndRoleHierarchy/${apiState}`,
                data: JSON.stringify(roleData),
                contentType: 'application/json',
                success: function (response) {
                    console.log("status api working = " + JSON.stringify(response));
                    if (response.StatusCode == true) {

                        if (props.selectedId.Id == "" || props.selectedId.level==0) {

                            props.setSelectedId({ Id: props.selectedId.Id, selection: false, expansion: true, level: 0, type: "entity" })
                            if (props.selectedId.Id) {
                                let index = props.entityExpSel.findIndex((obj => obj.Id == props.selectedId.Id));
                                props.entityExpSel[index].expansion = true;
                                props.entityExpSel[index].selection = false;
                            }
                            if (props.selectedId.Id == "")
                            props.setParentRender(!props.parentRender);
                        }
                        else {
                            if (props.selectedId.expansion != true) {
                                if (apiState == "UpdateRole") {
                                    props.setSelectedId({ Id: props.selectedId.Id, selection: props.selectedId.selection, expansion: props.selectedId.expansion, level: props.selectedId.level, type: "role" })
                                    let index = props.entityExpSel.findIndex((obj => obj.Id == props.selectedId.Id));
                                    props.entityExpSel[index].expansion = props.selectedId.expansion;
                                    props.entityExpSel[index].selection = props.selectedId.selection;
                                }
                                else {
                                    props.setSelectedId({ Id: props.selectedId.Id, selection: false, expansion: true, level: (props.selectedId.level), type: "entity" })
                                    let index = props.entityExpSel.findIndex((obj => obj.Id == props.selectedId.Id));
                                    props.entityExpSel[index].expansion = true;
                                    props.entityExpSel[index].selection = false;
                                }
 
                            }
                            props.setReRenderForm(!props.reRenderForm);
                        }

                        if (apiState == "UpdateRole") {
                            props.setpreventPanelcollapse("UpdatedRole");
                        }
                        toastr.success(`${t('Label_Success')}`);
                        if (props.roleDetails) {
                            toggleEdit();
                        }
                        else {
                            closeForm();

                        }
                        setUpdateApiFlag(false);
                        //If addition/updation happen
                        if (props.term && props.term != '')
                            props.onSearchSubmit(props.term)

                    }
                    else {
                        toastr.error(response.Message);
                    }
                },
                error: function (error) {
                    setStatus(error)
                    console.log("error is " + error);
                    toastr.error(error.Message);
                }
            }
            )
        };
    }

    //To delete the existing Role

    function deleteRole() {

        $.ajax({
            type: "POST",
            url: "/EntityAndRoleHierarchy/DeleteRole",
            data: JSON.stringify({
                "Id": props.roleDetails.Id,
                "IsDelete": true
            }),
            contentType: 'application/json',
            success: function (response) {
                if (response.StatusCode == true) {
                    toastr.success(`${t('Label_Success')}`);
                    closeForm();
                    if (props.selectedId.Id == "") {
                        props.setParentRender(!props.parentRender);
                        props.setReRenderForm(!props.reRenderForm);
                    }
                    else {
                        props.setParentRender(!props.parentRender);
                        props.setReRenderForm(!props.reRenderForm);
                        props.forceUpdate();
                    }
                    //If addition/updation happen
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

    function closeForm() {
        Object.keys(props.entityExpSel).forEach((i) => props.entityExpSel[i].selection = false);
        props.setShowRoleForm(false);
        props.setShowEntityForm(false);
        props.setAddParentEntity(false);
    }
    //to handle the edit of form
    //To toggle the disabling of the input fields
    function toggleEdit() {
        props.disable ? props.setDisable(false) : props.setDisable(true);
    }

    const [deletemodal, setDeleteModel] = useState(false);
    function onclickdelete(deletemodal) {
        setDeleteModel(deletemodal)
    }

    return (

        <div className="adCatForm">

            <div className="ru-roleHeader">
                <Row>
                    <Col span={2} style={{ marginTop: '0.6vh' }}>
                        <img src="/Images/svg/Entity_Business.svg" className="svg-Roleform" />
                    </Col>
                    <Col span={4} style={{ marginTop: '1.6vh' }}>
                        <b className="category-texticon" >{t('Label_Role')}</b>
                    </Col>
                    <Col span={7} className="headerTextRolesandUsers">
                        {!props.roleDetails && <b>{t('Label_NewRole')}</b>}
                        {props.roleDetails && <b>{props.roleDetails.Name}</b>}
                    </Col>
                    {props.component == "Roles" && props.roleDetails &&
                        <Fragment>
                            <Col span={2}>
                                {props.disable &&
                                    <img src="\Views\Risk\icons\Action_Edit.svg" onClick={toggleEdit} className="entity-edit-icon" />
                                }

                                {!props.disable &&
                                    <img src="/Views/Risk/icons/CloseIcon.svg" onClick={toggleEdit} className="entity-del-cross-icon" />
                                }
                            </Col>
                            <col span={5}></col>
                            <Col span={2} >
                                {!props.disable &&
                                    <img src="/Views/Risk/icons/Misc_Check.svg" onClick={() => {
                                    Addroles(); closeForm();
                                    }} className="entity-check-icon" />
                                }
                                {props.disable &&
                                    <img src="\Views\Risk\icons\Action_Delete.svg" onClick={() => onclickdelete(true)} className="entity-del-trash-icon" />
                                }

                            </Col>

                        </Fragment>
                    }

                    {props.component == "Roles" && !props.roleDetails &&
                        <Fragment>
                            <Col span={2}>
                                <img src="/Views/Risk/icons/CloseIcon.svg" onClick={closeForm} className="entity-del-cross-icon" />
                            </Col>
                            <Col span={2} >
                                <img src="/Views/Risk/icons/Misc_Check.svg" onClick={Addroles} className="entity-check-icon" />
                            </Col>
                        </Fragment>
                    }


                </Row>


            </div>
            <Form className="addcatForm"
                layout='vertical'
                initialValues={{
                    remember: true,
                }}
                disabled={true}
            >
                <br />
                <Form.Item className="labels-padding" style={{ marginTop: '18%' }} label={<b className="entity-form-labels"> {t('Label_RoleName')} <i className="fa fa-circle asterisk-dot"></i></b>}>
                    <Input placeholder={`${t('Label_TypeName')}`} className="input-name-addcategory" disabled={props.disable}
                        defaultValue={props.roleDetails.Name || ""} key={props.roleDetails.Name}
                        onChange={e => setroleName(e.target.value)} />
                </Form.Item>

                <Form.Item className="labels-padding" style={{ marginTop: '10%' }} label={<b className="entity-form-labels">{t('Label_Description')}</b>}>
                    <TextArea rows={4} className="input-fields-width input-name-addcategory"
                        defaultValue={props.roleDetails.Description || ""} disabled={props.disable}
                        key={props.roleDetails.Description} onChange={e => setroleDescription(e.target.value)} />
                </Form.Item>

                <Form.Item >
                    <strong className="entity-form-labels">{t('Label_Active')}</strong>
                    <Switch defaultChecked={props.roleDetails.IsActive || IsActive} disabled={props.disable}
                        key={props.roleDetails.IsActive} onClick={() => setIsActive(!IsActive)} />
                </Form.Item>
            </Form>


            <Modal
                centered={true}
                visible={deletemodal}
                footer={null}
                closable={null}
                className="del-modal" >

                <Row justify="center">
                    <Col xs={2} sm={4} md={6} lg={8} xl={10} style={{ marginTop: '5vh', textAlign: 'center' }}>
                        <img src="\Views\Risk\icons\Action_Delete.svg" className="del-icon" />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col xs={18} sm={20} md={22} lg={24} xl={26} style={{ marginTop: '2vh', textAlign: 'center', marginBottom: '3vh' }}>
                        <b style={{ fontSize: '2.8vh' }} >{t('Alert_DeleteConfirmation')}</b>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                        {t('Alert_AreYouSureWantToDelete')}
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                        <b>{props.roleDetails.Name}</b> {t('Label_Role')}?
                    </Col>
                </Row>

                <Row justify="center">
                    <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'left' }}>
                        <Button className="delbutton" onClick={() => { deleteRole(); onclickdelete(false); }}> {t('Label_SmallYes')}</Button></Col>
                    <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'right' }}>
                        <Button className="delbutton" onClick={() => onclickdelete(false)}>{t('Label_SmallNo')}</Button></Col>
                </Row>

            </Modal>


        </div >
    );


}
export default RoleformRU;