import { useTranslation } from "react-i18next";
import {useState, useEffect} from "react";
import {Row, Col, Button, Menu, Modal, Dropdown, Tooltip} from 'antd';

function UserDisplayPanel(props) {
    const { t, i18n } = useTranslation();
    const [userDetails, setuserDetails] = useState("");
    const [userDetailsID, setuserDetailsID] = useState("");
    const [entityId, setEntityId] = useState([]);
    const [roleId, setRoleId] = useState("");
    const [showUserFormModel, setshowUserFormModel] = useState(false);
    const [EntityOwnerID, setEntityOwnerID] = useState("");
    const [EntityOwnerName, setEntityOwnerName] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [makeownermodel, setMakeownermodel] = useState(false);
    const [deleteusermodel, setDeleteusermodel] = useState(false);
    const [activecheck, setActivecheck] = useState(true);
    const [selectedUserCheckArr, setSelectedUserCheckArr] = useState([]);

    useEffect(() => {
        if (props.userstatedata && props.userstatedata[0])
        setEntityId(props.userstatedata[0].entityId);
    }, [props.userstatedata])

    useEffect(() => {
        $.ajax({
            type: "GET",
            cache: false,
            url: "/EntityAndRoleHierarchy/CheckEntityOwner",
            data: { EntityId: entityId },
            contentType: 'application/json',
            success: function (response) {
                if (response != "No Owner") {
                    setEntityOwnerID(response.UserId);
                    var entityownername = response.FirstName + response.LastName;
                    setEntityOwnerName(entityownername);
                }
                else {
                    setEntityOwnerID("")
                    setEntityOwnerName("")
                }
            },
            error: function (error) {
                console.log("error is " + error);
            }
        });
    }, [props.userstatedata]);

    function updateuser() {
        $.ajax({
            type: "GET",
            async: false,
            url: "/EntityAndRoleHierarchy/GetUserDetails",
            data: { Id: userDetailsID },
            contenttype: "application/json",
            success: function (response) {
                setuserDetails(response);
                setshowUserFormModel(true);
                props.setStakeholderData([...props.stakeholderData, response]);
            },
            error: function (error) { }
        });
    }

    /*delete user api call*/
    function deleteUser() {
        $.ajax({
            type: "POST",
            url: "/EntityAndRoleHierarchy/DeleteUser",
            data: JSON.stringify({
                "Id": userDetailsID,
                "RoleId": props.userstatedata[0].roleId,
                "IsDelete": true
            }),
            contentType: 'application/json',
            success: function (response) {
                if (response.StatusCode == true) {
                    setDeleteusermodel(false)
                    setEntityOwnerName('');
                    setEntityOwnerID('')
                    props.setUserCheck(true)
                    props.setUserCall(!props.userCall)
                    toastr.success(response.Message);
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
    function makeowner() {
        $.ajax({
            type: "Get",
            url: "/EntityAndRoleHierarchy/MakeEntityOwner",
            data: {
                "UserId": userDetailsID,
                "EntityId": entityId
            },
            contentType: 'application/json',
            success: function (response) {
                props.setUserCheck(true)
                props.setUserCall(!props.userCall)
                setMakeownermodel(false)
                toastr.success(response.Message)
            },
            error: function (error) {
                console.log("error is " + JSON.stringify(error));
                toastr.error(error.Message);
            }
        });
    }

    function entityownerclick() {
        if (EntityOwnerID) {
            setMakeownermodel(true);

        }
        else {
            $.ajax({
                type: "Get",
                url: "/EntityAndRoleHierarchy/MakeEntityOwner",
                data: {
                    "UserId": userDetailsID,
                    "EntityId": entityId
                },
                contentType: 'application/json',
                success: function (response) {
                    props.setUserCheck(true)
                    props.setUserCall(!props.userCall)
                    setMakeownermodel(false)
                    toastr.success(response.Message)
                },
                error: function (error) {
                    console.log("error is " + JSON.stringify(error));
                    toastr.error(error.Message);
                }
            });
        }
    }

    function userselection(tab) {
        if (props.calledFrom == "Workflow" || props.calledFrom == "Bsc" || props.calledFrom == "Initiative" || props.bscProps) {
            var user = tab.Id || tab.id + tab.roleId || tab.RoleId;
            if (selectedUserCheckArr.length != 0) {
                if (selectedUserCheckArr.indexOf(user) == -1) {
                    setSelectedUserCheckArr([...selectedUserCheckArr, user])
                }
                else {
                    setSelectedUserCheckArr(selectedUserCheckArr.filter(item => item !== user))
                }
            }
            else {
                setSelectedUserCheckArr([...selectedUserCheckArr, user])
            }
        }
        props.setSelectedUsersKeyAccess(tab.id)
        let fullName = tab.displayName;
        userName = fullName.split(",");
        if (props.selectionType == "multiple") {
            if (props.bscProps) {
                handleUserSelection(props.multiSelectBsc, props.setMultiSelectBsc,tab);
            }
            else {
                handleUserSelection(props.selectedItem, props.setSelectedItem,tab);

            }
        }
    }

    function handleUserSelection(array, setArray,tab) {
        var roleIndex = -1; var userIndex = -1; var filteredArray = [];
            //Check if role is selected or not
            roleIndex = array.findIndex(function (o) {
                return (o.RoleId == tab.roleId);
            });
            //It means role is present , so setting the user list
            if (roleIndex !== -1) {
                userIndex = array[roleIndex].UsersList.findIndex(function (o) {
                    return (o.userid == tab.id);
                });
                //check whether the user is selected or deselected
                if (userIndex == -1) {
                    array[roleIndex].UsersList.push({
                        type: "User",
                        userid: tab.id,
                        Id: tab.id,
                        username: userName,
                        FirstName: tab.firstName,
                        LastName: tab.lastName,
                        UserName: tab.displayName,
                    })
                }
                else {
                    filteredArray = array[roleIndex].UsersList.filter((ele) => {
                        return (ele.userid != tab.id);
                    });
                    array[roleIndex].UsersList = filteredArray;
                }
            }
            else {
                //when role arrow is clicked straight away , instead of clicking on role.
                array.push({
                    RoleId: tab.roleId,
                    entityid: tab.entityId,
                    EntityName: tab.entityName,
                    RoleName: tab.role,
                    roleid: tab.id,
                    UsersList: [{
                        type: "User",
                        userid: tab.id,
                        Id:tab.id,
                        username: userName,
                        FirstName: tab.firstName,
                        LastName: tab.lastName,
                        UserName: tab.displayName,
                    }]
                })

            }

    }

    const menu = (
        <Menu className="menu-ul-users" >
            {(EntityOwnerID != userDetailsID) && (activecheck == true && <Menu.Item className="menu-li-users" >
                <Button className="menu-li-btn" onClick={() => { entityownerclick() }}>
                    {t('Label_MakeEntityOwner')}
                    <img src="/Images/svg/Star.svg" className="rh-svg-userform-star-dropdown " />
                </Button>
            </Menu.Item>)}
            <Menu.Item className="menu-li-users">
                <Button className="menu-li-btn" onClick={() => { updateuser() }}>
                    {typeof isUserAssessmentAllowed !== 'undefined' && isUserAssessmentAllowed == "True" ?  t('Label_EditUserDetails')  :  t('Label_ViewUserDetails') }
                </Button>
            </Menu.Item>
            <Menu.Item className="menu-li-users">
                <Button className="menu-li-btn-unassign" onClick={() => { setDeleteusermodel(true) }}>
                    {t('Label_UnassignUser')}
                </Button>
            </Menu.Item>
            <Menu.Item className="menu-li-users">
                <Button className="menu-li-btn">
                    {t('Label_Cancel')}
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            {showUserFormModel && (
                <UserformRU
                    createcheck={false}
                    setReRenderForm={props.setReRenderForm}
                    reRenderForm={props.reRenderForm}
                    userDetails={userDetails}
                    setshowUserFormModel={setshowUserFormModel}
                    setUserCheck={props.setUserCheck}
                    setUserCall={props.setUserCall}
                    userCheck={props.userCheck}
                    userCall={props.userCall}
                    entityId={entityId}
                    roleId={roleId}
                />
            )}

            <Modal footer={false}
                closable={false}
                className="makeentityowner-modal"
                visible={makeownermodel}>
                <div className="makeentityowner-div">
                    <img style={{
                        marginLeft: "15vw", height: "6vh",
                    }}
                        src="/Images/svg/Star.svg" className="rh-svg-userform-star" />
                    <h4 style={{ textAlign:"center", marginTop: "2vh", marginBottom: "2vh" }}>
                        <b>{t('Label_EntityOwnerConflict')}</b></h4>
                    <p style={{ textAlign: "center", margin:"auto" }}>
                        <span className="span-name-user"><b> {EntityOwnerName} </b></span> {t('Error_ConfirmEntityOwner')}
                        <span className="span-name-user">
                            <b>  {currentUser}  </b> </span>
                        ?
                    </p>
                    <Row style={{ marginTop: "3vh", justifyContent: "center" }}>
                        <Col span={11}>
                            <Button style={{ width: "100%", border: " 1px solid skyblue", color: "skyblue", padding: "2%" }}
                                onClick={() => { makeowner() }}><b>{t('Label_Yes')}</b></Button></Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                            <Button style={{ width: "100%", border: " 1px solid skyblue", color: "skyblue", padding: "2%" }}
                                onClick={() => { setMakeownermodel(false) }}><b>{t('Label_No')}</b></Button></Col>
                    </Row>
                </div>
            </Modal>

            <Modal footer={false}
                closable={false}
                className="deleteuser-modal"
                visible={deleteusermodel}>
                <div className="deleteuser-div">
                    <h3 style={{ textAlign: "center", marginTop: "4vh", marginBottom: "4vh" }}>
                        <b>{t('Label_UnassignUser')}</b></h3>
                    <p style={{ textAlign: "center", margin: "auto" }}>
                        {t('Error_ConfirmUnassignUser')}</p>
                    <Row style={{ marginTop: "3vh" ,justifyContent:"center"}}>
                        <Col span={11}>
                            <Button style={{ width: "100%", border: " 1px solid skyblue", color: "skyblue", padding: "2%" }}
                                onClick={() => { deleteUser() }}><b>{t('Label_Yes')}</b></Button></Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                            <Button style={{ width: "100%", border: " 1px solid skyblue", color: "skyblue", padding: "2%" }}
                                onClick={() => { setDeleteusermodel(false) }}><b>{t('Label_No')}</b></Button></Col>
                    </Row>
                </div>
            </Modal>
            <div >
                {(props.calledFrom != "Workflow" && !props.bscProps && props.calledFrom != "Initiative") && <div className="rh-userHeader-display-user">
                    <Row>
                        <Col span={2} style={{ marginTop: '0.5vh' }}>
                            <img src="/Images/svg/UserIcon.svg"
                                className="svg-userform" />
                        </Col>
                        <Col span={4} style={{ marginTop: '1.6vh' }}>
                            <b className="category-texticon" >{t('Label_Users')}</b>
                        </Col>
                    </Row></div>}
                <div className="ru-allUserDisplayList" >
                {props.userstatedata && props.userstatedata.map((value) => {
                    return (
                        <div className={(value.IsActive == false || value.isActive == false) ?
                            "rh-userpaneldisplay-selected-greyed"
                            : (((selectedUserCheckArr.indexOf((value.Id || value.id) + (value.RoleId || value.roleId))) == -1)
                                ? "rh-userpaneldisplay-selected"
                                : "rh-userpaneldisplay-selected-click")} key={value.id}>
                            <Row onClick={() => {
                                setEntityId(value.entityId);
                                setRoleId(value.roleId);
                                setuserDetailsID(value.id)
                                setActivecheck(value.IsActive || value.isActive)
                                setCurrentUser(value.displayName)
                                if (value.IsActive == true || value.isActive == true) {
                                    userselection(value)
                                }
                                else {
                                    if (props.calledFrom == "Workflow" || props.calledFrom == "Initiative" || props.bscProps) {
                                        toastr.error("User is inactive");
                                    }
                                }
                            }}>
                                <Col span={19} style={{ paddingTop: "1.1vh" }} >
                                    <Row>
                                        <Col span={2}
                                            className={(((selectedUserCheckArr.indexOf((value.Id || value.id) + (value.RoleId || value.roleId))) == -1)
                                                ? "rh-user-svg"
                                                : "rh-user-svg-selected")}  >
                                            <img src="/Images/svg/UserIcon.svg"
                                                className={(value.IsActive == false || value.isActive == false) ?
                                                    "rh-svg-userform-greyed"
                                                    : (((selectedUserCheckArr.indexOf((value.Id || value.id) + (value.RoleId || value.roleId))) == -1)
                                                        ? "rh-svg-userform"
                                                        : "rh-svg-userform-selected")}
                                            />
                                        </Col>
                                        <Col
                                            span={11}
                                            className={(value.IsActive == false || value.isActive == false) ?
                                                "rh-userdisplay-data-selected-greyed"
                                                : "rh-userdisplay-data-selected"} >
                                            <b><Tooltip placement="topLeft" title={value.displayName}>
                                                {value.displayName}
                                            </Tooltip></b>
                                        </Col>
                                        <Col span={1}></Col>
                                        <Col span={9} className={(value.IsActive == false || value.isActive == false) ?
                                            "rh-userdisplay-data-selected-greyed"
                                            : "rh-userdisplay-data-selected"} >
                                            <Tooltip placement="topLeft" title={value.userName}>
                                                {value.userName}
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={5}>
                                    <Row>
                                        <Col span={1}
                                            className={((selectedUserCheckArr.indexOf((value.Id || value.id) + (value.RoleId || value.roleId))) == -1) ? "rh-star-svg"
                                                : "rh-star-svg-selected"}
                                        >
                                            {EntityOwnerID == value.id && <img src="/Images/svg/Star.svg"
                                                className={((selectedUserCheckArr.indexOf((value.Id || value.id) + (value.RoleId || value.roleId))) == -1)? "rh-svg-userform-star"
                                                    : "rh-svg-userform-star-selected"}
                                            />}
                                        </Col>
                                        <Col span={2}>
                                        </Col>
                                        {props.calledFrom != "Workflow" && props.calledFrom != "Initiative" && !props.bscProps && <Col span={1}
                                            className="rh-dot-svg" >
                                            <Dropdown className="dd-users" trigger={['click']} overlay={menu} arrow>
                                                <Button className="dot-dot-btn-dd">
                                                    <img src="/Images/svg/Dot-Dot-Dot.svg"
                                                        className={(value.IsActive == false || value.isActive == false) ?
                                                            "rh-svg-userform-dot-greyed"
                                                            : "rh-svg-userform-dot"} />
                                                </Button>
                                            </Dropdown>

                                        </Col>}
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                    );
                })
                }
            </div>
            </div>
        </div>
        
       

    );
}
export default UserDisplayPanel;