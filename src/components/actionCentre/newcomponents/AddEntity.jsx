import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import $ from "jquery";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Input,Form, Switch, Row, Col, Select, Button, Modal } from "antd";

function AddEntity(props) {
    
    const { t, i18n } = useTranslation();
    const { Option } = Select;
    const { TextArea } = Input;
    //parent or children api to rerender
    const [getAllEntity, setGetAllEntity] = useState('');
    //level of entity
    const [level, setLevel] = useState(0);
    //parent id in case of adding the entity
    const [entityParentId, setEntityParentId] = useState("");
    //entity details id
    const [entityId, setEntityId] = useState("");
    //To set Type of Entity
    const [entityType, setEntityType] = useState('');
    //to store all the entities
    const [entityTypeName, setEntityTypeName] = useState('');
    //To handle the state change for the "Name"
    const [name, setName] = useState('');
    //To handle the state change for the "Description"
    const [desc, setDesc] = useState('');
    //stores the name of the entitytype the type is changed to 
    const [entityTypeInfo, setEntityTypeInfo] = useState({
        nameOfEntityType: "",
        IsPrimary: true,
        iconName: ""
    });
    //To handle the state change for the "Active/Inactive Switch"
    const [activeData, setActiveData] = useState(true);
    const [addEntity, setAddEntity] = useState('/EntityAndRoleHierarchy/CreateEntityHierarchy');
     const counter = selector((state) => state)

    //to get all the parent entities
    useEffect(() => {
        $.ajax({
            type: "GET",
            async: true,
            data: {
                "EntityHierarchyMasterId": props.keyAccess,
            },
            url: '/EntityAndRoleHierarchy/GetParentEntityDropdown',
            contenttype: "application/json",
            success: function (response) {

                setGetAllEntity(response);
            },
            error: function (response) {
                console.log(response);
            }
        })
    }, [])
    // API call for Adding Entities         
    useEffect(() => {
        if (props.entityDetails && props.addParentEntity == false && props.addChildEntity == false) {
            setEntityId(props.entityDetails.EntityDetailsId);
            setName(props.entityDetails.EntityName);
            setDesc(props.entityDetails.EntityDescription);
            setEntityParentId(props.entityDetails.ParentEntityId);
            setActiveData(props.entityDetails.IsActive);
            setEntityType(props.entityDetails.EntityTypeId);
            setAddEntity('/EntityAndRoleHierarchy/UpdateEntityHierarchy');
            setLevel(props.entityDetails.EntityLevel);
            setEntityTypeInfo({
                nameOfEntityType: props.entityDetails.EntityTypeName,
                IsPrimary: props.entityDetails.IsPrimary,
                iconName: props.entityDetails.EntityTypeIconName
            })
        }
        if (props.addParentEntity == true && props.addChildEntity == false) {
            setEntityId("00000000-0000-0000-0000-000000000000");
            setName('');
            setDesc('');
            setEntityParentId('');
            setActiveData(true);
            setEntityType('');
            setAddEntity('');
            setLevel(0);
            setAddEntity('/EntityAndRoleHierarchy/CreateEntityHierarchy');
        }
        if (props.addParentEntity == false && props.addChildEntity == true) {
            if (props.selectedId.Id == "") {
                //do nothing , default values remain
            }
            else {
                setEntityParentId(props.selectedId.Id);
            }
            setEntityId("00000000-0000-0000-0000-000000000000");
            setLevel(props.entityDetails.EntityLevel);
            setName('');
            setDesc('');
            setActiveData(true);
            setEntityType('');
            setAddEntity('');
            setAddEntity('/EntityAndRoleHierarchy/CreateEntityHierarchy');
        }

    }, [props.entityDetails, props.addChildEntity, props.addParentEntity]);


    useEffect(() => {
        entityTypeName && entityTypeName.length > 0 && entityTypeName.map((data) => {
            if (data.Id == entityType) {
                setEntityTypeInfo({
                    nameOfEntityType: data.EntityTypeName,
                    IsPrimary: data.IsPrimary,
                    iconName: data.EntityTypeIconName
                    //IsActive will also be appended if there is any representation change for inactive entities kick in
                })
            }
        })

    }, [entityType])

    function updateGetEntity(array) {
        let found = array.find((node) => {
            if (node.id === entityId) {
                if (entityTypeInfo.nameOfEntityType != "") {
                    (node.entityType = entityTypeInfo.nameOfEntityType)
                    node.primary = entityTypeInfo.IsPrimary
                    node.entityTypeIconName = entityTypeInfo.iconName

                }
                (node.name = name)
                //IsActive will be updated here if any representation change for inactive entities kick in
                return found;
            }
        })
        if (found == undefined) {
            array.find(
                (c) =>
                    c.children && c.children.length > 0 && updateGetEntity(c.children)
            )
        }
    }
    function deleteGetEntity(array) {
        let found = array.find((node) => {
            if (node.id === entityId) {
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
                    item.isPrimaryChildPresent = false;
                    item.isNonPrimaryChildPresent = false;
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
                        item.isPrimaryChildPresent = false;
                        item.isNonPrimaryChildPresent = false;
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

    function AddingEntity() {    
        var parentId = "00000000-0000-0000-0000-000000000000";
        if (props.master[0] == props.keyAccess) {
            parentId = "00000000-0000-0000-0000-000000000000";
        } else {
            parentId = entityParentId;
        }
        const data =
        {
            "EntityDetailsId": entityId,
            "MaskedId": "",
            "EntityHierarchyMasterId": props.keyAccess,
            "EntityName": name,
            "EntityDescription": desc,
            "EntityTypeId": entityType,
            "ParentEntityId": parentId,
            "EntityLevel": props.selectedId.Id ? props.selectedId.level :0,
            "IsDelete": false,
            "IsActive": activeData,
            "CreatedBy": "",
            "CreatedDate": "2021-02-03T17:51:17.063Z",
            "ModifiedBy": "string",
            "ModifiedDate": "2021-02-03T17:51:17.063Z",
            "ErrorMessage": ""
        }
        $.ajax({
            type: "POST",
            async: false,
            url: addEntity,
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                if (response.StatusCode == true) {
                    toastr.success(response.Message);
                    if (props.addChildEntity == true || props.addParentEntity == true) {
                        closeForm();
                        if (props.selectedId.Id == "") {
                            props.setSelectedId({ Id: props.selectedId.Id, selection: false, expansion: true, level: 0,type:"entity" })
                            props.setParentRender(!props.parentRender);
                        }

                            if (props.selectedId.expansion != true) {
                                props.setSelectedId({ Id: props.selectedId.Id, selection: false, expansion: true, level: props.selectedId.level, type: "entity" })
                                let index = props.entityExpSel.findIndex((obj => obj.Id == props.selectedId.Id));
                                props.entityExpSel[index].expansion = true;
                                props.entityExpSel[index].selection = false;
                            }
                            props.setReRenderForm(!props.reRenderForm)
                        
                    }

                    else {
                        toggleEdit();
                        updateGetEntity(props.getEntity)
                    }

                    //If searching and add/update happen
                    if(props.term && props.term!='')
                    props.onSearchSubmit(props.term)
                }
                else {
                        toastr.error(response.Message);
                }
            },
            error: function (error) {
                console.log("error is " + error);
                toastr.error(error.Message);
            }
        });
    }
    //to get the entity Types
    useEffect(() => {
        var level = "";
        if (props.addParentEntity == true) {
            level = 0
        }
        $.ajax({
            type: "GET",
            async: true,
            data: {
                "EntityHierarchyMasterId": props.keyAccess,
                "level": level
            },
            url: '/EntityAndRoleHierarchy/GetEntityTypes',
            contenttype: "application/json",
            success: function (response) {

                setEntityTypeName(response);
            },
            error: function (response) {
                console.log(response);
            }
        })
    }, [props.addParentEntity])
    //To delete the existing entity

    function deleteEntity() {
        $.ajax({
            type: "POST",
            url: '/EntityAndRoleHierarchy/DeleteEntityHierarchy',
            data: JSON.stringify({
                "EntityDetailsId": props.entityDetails.EntityDetailsId,
                "IsDelete": true
            }),
            contentType: 'application/json',
            success: function (response) {
                if (response.StatusCode == true) {
                    toastr.success(response.Message);
                    closeForm();
                    if (props.selectedId.Id == "" || props.selectedId.selection == false) {
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
    //To close the form on successful saving of the data
    function closeForm() {
        Object.keys(props.entityExpSel).forEach((i) => props.entityExpSel[i].selection = false);
        props.setShowEntityForm(false);
        props.setAddParentEntity(false);
    }
    //to handle the edit of form
    //To toggle the disabling of the input fields
    function toggleEdit() {
        props.disable ? props.setDisable(false) : props.setDisable(true);
    }
    //handle states on clicking cross
    function handleCancel() {
        setEntityParentId(props.entityDetails.ParentEntityId);
        setName(props.entityDetails.EntityName);
        setDesc(props.entityDetails.EntityDescription);
        setActiveData(props.entityDetails.IsActive);
        setEntityType(props.entityDetails.EntityTypeId);
        toggleEdit();
    }


    const [deletemodal, setDeleteModel] = useState(false);
    function onclickdelete(deletemodal) {
        setDeleteModel(deletemodal)
    }

    const messagePopup = (currentActiveTab) => {
        //const hasAnyChild = tab.isPrimaryChildPresent || tab.isNonPrimaryChildPresent || tab.isChildPresent;
        let hasChildren = props.hasChildren;
        let hasPrimaryChildren = props.hasPrimaryChildren;
        if ((props.keyAccess != props.master[props.master.length - 1]) && (hasChildren )  ) {
            return (
                <div>
                    <Row justify="center">
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            {t('Alert_PleaseReassignParentBeforeDelete')}
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            <b>{props.entityDetails.EntityName}</b> {t('Label_Entity')}!
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
        else if (props.keyAccess == props.master[props.master.length - 1] && (hasChildren || hasPrimaryChildren)) {
            return (
                <div>
                    <Row justify="center">
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            {t('Alert_ThisWillDeleteAllChildEntitiesAssociatedToEntity')} <b>{props.entityDetails.EntityName}</b>{t('Alert_AlsoItWillRemoveItFromAllocationsAndAllReports')}{t('Alert_AreYouSureYouWantToContinue')}
                </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'left' }}>
                            <Button className="delbutton" onClick={() => { deleteEntity(); onclickdelete(false); }}>{t('Label_SmallYes')}</Button></Col>
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
                            {t('Alert_DeletingThisEntityWillRemoveFromReports')}
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={15} sm={17} md={19} lg={21} xl={23} style={{ textAlign: 'center', fontSize: '2.2vh' }}>
                            <b>{props.entityDetails.EntityName}</b> {t('Label_Entity')}?
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'left' }}>
                            <Button className="delbutton" onClick={() => { deleteEntity(); onclickdelete(false); }}>{t('Label_SmallYes')}</Button></Col>
                        <Col xs={6} sm={6} md={8} lg={10} xl={10} style={{ marginTop: '2vh', marginBottom: '4vh', float: 'right' }}>
                            <Button className="delbutton" onClick={() => onclickdelete(false)}>{t('Label_SmallNo')}</Button></Col>
                    </Row>
                </div>
            );
        }
    }


    return (
        <div>
            <div id="entity-header" className={props.entityDetails
                ?
                entityTypeInfo.IsPrimary ? "addentity-primary-header" : "addentity-sub-header"
                :
                "addentity-header"}>
                <Row>
                    {props.entityDetails &&
                        <Col span={8}>
                            <Row>
                                <Col span={5}>
                                    <img src={`/Images/svg/${entityTypeInfo.iconName}.svg`} className="entity-form-svg" />
                                </Col>
                                <Col span={18} className="texticon">
                                <p><Tooltip placement="topRight" title={entityTypeInfo.nameOfEntityType}>{entityTypeInfo.nameOfEntityType}</Tooltip></p>
                                </Col>
                            </Row>
                        </Col>
                    }
                    <Col span={12} className="texticon" >
                        {!props.entityDetails && <b style={{ marginLeft: "3%" }}>{t('Label_NewEntity')}</b>}
                        {props.entityDetails &&
                            <Tooltip placement="topRight" title={name}>
                                <span>{name}</span></Tooltip>}
                    </Col>
                    {!props.entityDetails && <Col span={8}></Col>}
                    {props.component == "Entity" && props.entityDetails &&
                        <Fragment>
                            <Col span={2} >

                                {props.disable &&
                                    <img src="\Views\Risk\icons\Action_Edit.svg" onClick={() => {
                                        props.setAddChildEntity(false);
                                        props.setAddParentEntity(false);
                                        toggleEdit();
                                    }} className="entity-edit-icon" />
                                }
                                {!props.disable &&
                                    <img src="/Views/Risk/icons/CloseIcon.svg" onClick={() => {
                                        handleCancel();
                                    }} className="entity-del-cross-icon" />
                                }
                            </Col>
                            <Col span={2}>
                                {props.disable &&
                                    <img src="\Views\Risk\icons\Action_Delete.svg" onClick={() => onclickdelete(true)} className="entity-del-trash-icon" />
                                }
                                {!props.disable &&
                                    <img src="/Views/Risk/icons/Misc_Check.svg" onClick={() => {
                                    AddingEntity();
                                    if (name != "" && (response.StatusCode == false)) { closeForm(); }
                                }} className="entity-check-icon-edit" />
                                }
                            </Col>
                        </Fragment>
                    }
                    {props.component == "Entity" && !props.entityDetails &&
                        <Fragment>
                            <Col span={2}>
                                <img src="/Views/Risk/icons/CloseIcon.svg" onClick={closeForm} className="entity-cross-icon" />
                            </Col>
                            <Col span={2} >
                                <img src="/Views/Risk/icons/Misc_Check.svg" onClick={AddingEntity} className="entity-check-icon" />
                            </Col>
                        </Fragment>
                    }
                </Row>
            </div>

            <Form className="addEntityForm"
                layout='vertical'
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item className="labels-padding" label={<b className="entity-form-labels">{t('Label_EntityType')} <i className="fa fa-circle asterisk-dot"></i></b>} style={{ marginTop: '20%' }}  >
                    <Select className="owner-input" defaultValue={entityType}
                        value={entityType}
                        disabled={props.disable}
                        showSearch="true"
                        onChange={(event) => {
                            setEntityType(event);
                        }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.props.children[0].toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {entityTypeName &&
                            entityTypeName
                                .map(data =>
                                    <Option value={data.Id} key={data.Id} >
                                        <span>{data.EntityTypeName} </span></Option>
                                )}
                    </Select>
                </Form.Item>
                <Form.Item className="labels-padding" label={<b className="entity-form-labels">{t('Label_Name')} <i className="fa fa-circle asterisk-dot"></i></b>}>
                    <Input onChange={e => setName(e.target.value)} placeholder={`${t('Label_TypeName')}`} disabled={props.disable}
                        defaultValue={name} value={name} key={props.entityDetails.EntityName || ""}
                        className="input-name-entity" />
                </Form.Item>
                {(props.addParentEntity == true || props.entityDetails.EntityLevel == 0) &&
                    props.addChildEntity == false && props.master[0] != props.keyAccess &&
                    <Form.Item className="labels-padding" label={<b className="entity-form-labels">{t('Label_ParentEntity')} <i className="fa fa-circle asterisk-dot"></i></b>}>
                        <Select defaultValue={entityParentId} value={entityParentId}
                            showSearch
                            className="owner-input"
                            disabled={props.disable}
                            onChange={(e) => {
                                setEntityParentId(e);
                            }}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                ((option.children.props && option.children.props.children)
                                    ||
                                    option.children)
                                    .toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >   
                            {getAllEntity && getAllEntity.map(data => (
                                <Option key={data.ParentEntityId} value={data.ParentEntityId}>
                                    <Tooltip placement="topRight" title={data.ParentEntity}>
                                        {data.ParentEntity}</Tooltip>
                                </Option>
                            ))}
                        </Select>
                        </Form.Item>
                    }
                    <Form.Item className="labels-padding" label={<b className="entity-form-labels">{t('Label_Description')}</b>}>
                        <TextArea rows={4} onChange={e => setDesc(e.target.value)} disabled={props.disable}
                            defaultValue={desc} value={desc}
                            key={props.entityDetails.EntityDescription || ""} className="input-desc-entitydesc" />
                    </Form.Item>

                    <Form.Item className="labels-padding">
                        <strong className="entity-form-labels">{t('Label_Active')}</strong><Switch id="entity-switch" defaultChecked={activeData} disabled={props.disable}
                            key={activeData} onClick={() => setActiveData(!activeData)} />
                    </Form.Item>
                </Form>

            <Modal
                centered={true}
                visible={deletemodal}
                footer={null}
                closable={null}
                className="del-modal">

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

                {/*Showing Delete pop-up based on the Level and Parent/Child relationship*/}
                {messagePopup(props.currentActiveTab)}
            </Modal>
        </div>
    )
}
export default AddEntity;