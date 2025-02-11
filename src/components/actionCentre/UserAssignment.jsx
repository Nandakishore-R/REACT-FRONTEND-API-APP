import { useTranslation } from "react-i18next";
import { Tooltip, Modal, Pagination } from "antd";
import { useState, useEffect } from "react";

function UserAssignment(props) {
    const { t, i18n } = useTranslation();
    const [userstableData, setUserstableData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [order, setOrder] = useState("FirstName");
    const [orderType, setOrderType] = useState("asc");
    const [offset, setOffset] = useState(0);
    const [row, setRow] = useState(9);
    const [searchvar, setSearchvar] = useState("");
    const [searchcheck, setSearchcheck] = useState(false);
    const [pages, setPages] = useState(10);
    const [pageNum, setPageNum] = useState(1);
    const [EntityOwnerID, setEntityOwnerID] = useState("");

    useEffect(() => {
        if (props.calledFrom != "Workflow" && props.calledFrom != "Bsc") {
            $.ajax({
                type: "GET",
                cache: false,
                url: "/EntityAndRoleHierarchy/CheckEntityOwner",
                data: { EntityId: props.roleDetails.EntityDetailsId },
                contentType: 'application/json',
                success: function (response) {
                    if (response != "No Owner") {
                        setEntityOwnerID(response.UserId);
                    }
                },
                error: function (error) {
                    console.log("error is " + error);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (props.calledFrom == "Workflow" || props.calledFrom == "Bsc") {
            if (props.rolesuserlist && props.rolesuserlist.length > 0) {
                let roleexists = props.rolesuserlist.some((val) => {
                    return val.RoleId == props.childKeyAccess
                })
                props.rolesuserlist.map((val) => {
                    if (val.RoleId == props.childKeyAccess) {
                        setUserData(val.UsersList)
                    }
                })
                if (roleexists == true) {
                    let userrole;
                    if (typeof props.UsersUnderRole === "string") {
                        userrole = JSON.parse(props.UsersUnderRole);
                    }
                    else {
                        userrole = props.UsersUnderRole;
                    }
                    (userrole != "[]" && userrole != null) && userrole.map((value) => {
                        props.selectedUsers.push(value);
                    })
                }
            }
            if (props.membershipsData && props.membershipsData.length > 0) {
                let roleexists = props.membershipsData.some((val) => {
                    return val.RoleId == props.childKeyAccess
                })
                props.membershipsData.map((val) => {
                    if (val.RoleId == props.childKeyAccess) {
                        setUserData(val.UsersList)
                    }
                })
                if (roleexists && roleexists != undefined) {
                    props.UsersUnderRole&&props.UsersUnderRole != "[]" && props.UsersUnderRole.map((value) => {
                        props.selectedUsers.push(value);
                    })
                }
            }
        }
        else {
            if (props.selectedUsers.length == 0) {
                props.UsersUnderRole.map((value) => {
                    props.selectedUsers.push(value.id);
                })
            }
        }
    }, [props.UsersUnderRole]);

    useEffect(() => {
        if (props.calledFrom == 'Workflow' || props.calledFrom == "RiskResponse" || props.calledFrom == "Bsc") {
            if (searchvar != "") {
                setOffset(0);
                setPageNum(1);
            }
            $.ajax({
                type: "GET",
                cache: false,
                data: {
                    RoleId: props.childKeyAccess,
                    order: order,
                    orderType: orderType,
                    row: row,
                    offset: offset,
                    searchKey: searchvar
                },
                url: "/EntityAndRoleHierarchy/GetUsers",
                contentType: 'application/json',
                success: function (response) {
                    if (response.length > 0) {
                        if (response[0].totalNumberOfRows > 9) {
                            setPages((((response[0].totalNumberOfRows) / 9)) * 10)
                        }
                        else {
                            setPages(10);
                        }
                        setUserstableData(response);
                    }
                },
                error: function (error) {
                    console.log("error is " + error);
                }
            });
        }
        else {
            if (searchvar != "") {
                setOffset(0);
                setPageNum(1);
            }
            $.ajax({
                type: "GET",
                cache: false,
                data: {
                    order: order,
                    orderType: orderType,
                    row: row,
                    offset: offset,
                    searchKey: searchvar
                },
                url: "/EntityAndRoleHierarchy/GetUsersForAssignment",
                contentType: 'application/json',
                success: function (response) {
                    if (response.length > 0) {
                        setPages((((response[0].TotalNumberOfRows) / 9)) * 10)
                        setUserstableData(response);
                    }
                    else {
                        setUserstableData([]);
                    }
                },
                error: function (error) {
                    console.log("error is " + error);
                }
            });
        }
    }, [props.reload, searchvar, order, orderType]);

    function handlePages(e) {
        setPageNum(e)
        if (e == 1) {
            setOffset(0)
        }
        else {
            val = ((e - 1) * 9);
            setOffset(val)
        }

        props.setReload(!props.reload);
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

    function addclick() {
        if (props.calledFrom == "Workflow" || props.calledFrom == "Bsc") {
            if (props.rolesuserlist && props.rolesuserlist.length > 0) {
                props.rolesuserlist.map((val) => {
                    if (val.RoleId == props.childKeyAccess) {
                        val.UserIds = JSON.stringify(props.selectedUsers);
                        val.UsersList = userData;
                    }
                })
            }
            if (props.membershipsData && props.membershipsData.length > 0) {
                props.membershipsData.map((val) => {
                    if (val.RoleId == props.childKeyAccess) {
                        val.UserIds = props.selectedUsers;
                        val.UsersList = userData;
                    }
                })
            }
            props.setSelectedUsers([]);
            props.setAssignUsersModal(false)
            if (props.calledFrom == "Workflow") {
                props.passedFunction ? props.passedFunction() :"";
            }
        }
        else {
            if (props.selectedUsers.length == 0) {
                toastr.error(`${t('Error_PleaseSelectAtleastOneOrMoreUsers')}`)
            }
            else {
                var obj = {
                    "UserId": props.selectedUsers.toString(),
                    "RoleUserMappingId": "",
                    "CreatedBy": "",
                    "CreatedDate": "",
                    "ModifiedBy": "",
                    "ModifiedDate": "",
                    "RoleId": props.childKeyAccess,
                    "IsDelete": false
                }
                $.ajax({
                    type: "POST",
                    cache: false,
                    url: "/EntityAndRoleHierarchy/AssignUsersForRoles",
                    contentType: 'application/json',
                    data: JSON.stringify(obj),
                    success: function (response) {
                        toastr.success(response.Message);

                        /*props.setshowUserForm(true);*/
                        /*props.setChildKeyAccess(props.selectedUsers[0].Id || props.selectedUsers[0].id);*/
                        if (props.UsersUnderRole && props.UsersUnderRole.length == 0) {
                            // to add arrow to the 
                            makeIsChildTrue(props.getEntity)
                        }
                        props.setAssignUsersModal(false);
                        props.selectedId.selection = false;
                        props.selectedId.expansion = true;
                        let index = props.entityExpSel.findIndex((obj => obj.Id == props.selectedId.Id));
                        props.entityExpSel[index].expansion = true;
                        props.entityExpSel[index].selection = false;
                        props.setUserCheck(true)
                        props.setUserCall(!props.userCall)
                        props.setSelectedUsers([]);
                        props.setShowRoleForm(false)
                    },
                    error: function (error) {
                        console.log("error is " + error);
                    }
                });
            }

        }
    }
    function rowclick(value) {
        if ((props.selectedUsers.indexOf(value.Id || value.id) == -1)) {
            if (value.IsActive == true || value.isActive == true) {
                if (props.calledFrom == "Workflow" || props.calledFrom == "Bsc") {
                    if (props.selectedUsers.indexOf(value.id) == -1) {
                        props.setSelectedUsers([...props.selectedUsers, value.id])
                        let obj = {
                            Id: value.id,
                            FirstName: value.firstName,
                            LastName: value.lastName,
                            UserName: value.userName
                        }
                        setUserData([...userData, obj])
                    }
                    else {
                        setUserData(userData.filter(
                            (item) => (item.id || item.Id) !== value.id
                        ))
                        props.setSelectedUsers(props.selectedUsers.filter(item => item !== value.id))
                    }
                    console.log("User table data", userstableData)
                }
                else {
                    if (props.selectedUsers.indexOf(value.Id) == -1) {
                        props.setSelectedUsers([...props.selectedUsers, value.Id])
                    }
                    else {
                        props.setSelectedUsers(props.selectedUsers.filter(item => item !== value.Id))
                    }
                }
            }
            else {
                toastr.error(`${t('Error_UserIsInactive')}`);
            }
        }
        else if ((props.selectedUsers.indexOf(value.Id || value.id) != -1)) {
            if (props.calledFrom == "Workflow" || props.calledFrom == "Bsc") {
                if (props.selectedUsers.indexOf(value.id) == -1) {
                    props.setSelectedUsers([...props.selectedUsers, value.id])
                    let obj = {
                        Id: value.id,
                        FirstName: value.firstName,
                        LastName: value.lastName,
                        UserName: value.userName
                    }
                    setUserData([...userData, obj])
                }
                else {
                    setUserData(userData.filter(
                        (item) => (item.id || item.Id) !== value.id
                    ))
                    props.setSelectedUsers(props.selectedUsers.filter(item => item !== value.id))
                }
                console.log("User table data", userstableData)
            }
            else {
                if ((value.Id || value.id) == EntityOwnerID) {
                    /*ajax call with null user id*/
                    $.ajax({
                        type: "Get",
                        url: "/EntityAndRoleHierarchy/MakeEntityOwner",
                        data: {
                            "UserId": "null",
                            "EntityId": props.roleDetails.EntityDetailsId
                        },
                        contentType: 'application/json',
                        success: function (response) {
                            toastr.error(`${t('Error_EntityOnwershipRemoved')}`)
                            setEntityOwnerID("")
                        },
                        error: function (error) {
                            toastr.error(error.Message);
                        }
                    });
                }
                if (props.selectedUsers.indexOf(value.Id) == -1) {
                    props.setSelectedUsers([...props.selectedUsers, value.Id])
                }
                else {
                    props.setSelectedUsers(props.selectedUsers.filter(item => item !== value.Id))
                }
            }
        }
        else {
            toastr.error(`${t('Error_UserIsInactive')}`);
        }
    }

    function orderfunc(value) {
        if (value != order) {
            setOrder(value);
            setOrderType("asc")
            props.setReload(!props.reload)
        }
        else {
            if (orderType == "asc") {
                setOrderType("desc");
            }
            else {
                setOrderType("asc")
            }
        }
    }
    return (
        <div>
            <Modal className="modalcss-assignment-users"
                width="100%"
                height="120%"
                // visible={true}
                open={true}
                footer={null}
                closable={false}>
                <div className="navbar-user-assign-modal">
                    <p className="Sname-user-assign-modal">
                        <button className="closeformbutton-assign">
                            <img
                                className="cancelcross-assign"
                                src="\Views\Risk\icons\CloseIcon.svg"
                                onClick={() => {
                                    props.setSelectedUsers([]);
                                    props.setAssignUsersModal(false)
                                }} />
                        </button>

                        {t('Label_SelectUsersToAdd')}
                        <button className="ua-add-btn" onClick={() => { addclick() }}>
                            SAVE
                        </button>
                        {(props.calledFrom != 'Workflow' && props.calledFrom != "Bsc")
                            && isUserAssessmentAllowed == "True" && < button className="ua-create-user"
                                onClick={() => { props.setshowUserFormModel(true) }}>
                            {t('Label_CapsCreateNewUser')}
                            </button>}
                        <span>
                            <img src="/Images/svg/Search.svg"
                                onClick={() => {
                                    setSearchcheck(!searchcheck),
                                        setSearchvar("");
                                }}
                                className="search-icon-assignuser" />
                            {searchcheck && <input type="text" onClick={(e) => {
                                setSearchvar("");
                                e.target.value = "";
                            }} className={searchcheck ? "search-inp-assign-users-selected"
                                : "search-inp-assign-users"}
                                onChange={() => setSearchvar(event.target.value)}
                                value={searchvar}
                                placeholder={searchcheck ? `${t('Label_SearchHere')}` : ""} />}

                        </span>
                    </p>
                </div>
                <div className="r-main-table-userdisplay-div" >

                    {userstableData.length!=0 && < table className="r-allusers-table">
                        <tr className="r-allusers-row ">
                            <th className={order == 'FirstName' ? "ua-name-order" : "ua-name"}
                                onClick={() => orderfunc('FirstName')}>{t('Label_CapsFirstName')}
                                {order == 'FirstName' && <img
                                    className={orderType == 'desc' ? "desc-icon" : "asc-icon"}
                                    src="\Images\svg\CaretSmall_Down.svg" />}</th>
                            <th className={order == 'LastName' ? "ua-name-order" : "ua-name"}
                                onClick={() => orderfunc('LastName')}>{t('Label_CapsLastName')}
                                {order == 'LastName' && <img
                                    className={orderType == 'desc' ? "desc-icon" : "asc-icon"}
                                    src="\Images\svg\CaretSmall_Down.svg" />}</th>
                            <th className={order == 'UserName' ? "ua-name-order" : "ua-name"}
                                onClick={() => orderfunc('UserName')}>{t('Label_CapsUsername')}
                                {order == 'UserName' && <img
                                    className={orderType == 'desc' ? "desc-icon" : "asc-icon"}
                                    src="\Images\svg\CaretSmall_Down.svg" />}</th>
                            <th className={order == 'Designation' ? "ua-name-order" : "ua-name"}
                                onClick={() => orderfunc('Designation')}>{t('Label_CapsDesignation')}
                                {order == 'Designation' && <img
                                    className={orderType == 'desc' ? "desc-icon" : "asc-icon"}
                                    src="\Images\svg\CaretSmall_Down.svg" />}</th>
                            <th className={order == 'Location' ? "ua-name-order" : "ua-name"}
                                onClick={() => orderfunc('Location')}>{t('Label_CapsLocation')}
                                {order == 'Location' && <img
                                    className={orderType == 'desc' ? "desc-icon" : "asc-icon"}
                                    src="\Images\svg\CaretSmall_Down.svg" />}</th>
                            <th className={order == 'Email' ? "ua-name-order" : "ua-name"}
                                onClick={() => orderfunc('Email')}>{t('Label_CapsEmail')}
                                {order == 'Email' && <img
                                    className={orderType == 'desc' ? "desc-icon" : "asc-icon"}
                                    src="\Images\svg\CaretSmall_Down.svg" />}</th>
                            <th className={order == 'PhoneNumber' ? "ua-name-order" : "ua-name"}
                                onClick={() => orderfunc('PhoneNumber')}>{t('Label_CapsPhone')}
                                {order == 'PhoneNumber' && <img
                                    className={orderType == 'desc' ? "desc-icon" : "asc-icon"}
                                    src="\Images\svg\CaretSmall_Down.svg" />}</th>
                            <th className={order == 'Supervisor' ? "ua-name-order" : "ua-name"}
                                onClick={() => orderfunc('Supervisor')}>{t('Label_CapsSupervisor')}
                                {order == 'Supervisor' && <img
                                    className={orderType == 'desc' ? "desc-icon" : "asc-icon"}
                                    src="\Images\svg\CaretSmall_Down.svg" />}</th>
                        </tr>

                        {userstableData && userstableData.map((value) => {
                            return (<tr id="tr-list" key={value.Id || value.id} onClick={() => {
                                rowclick(value)
                            }}
                                className={(props.selectedUsers.length > 1 && (props.selectedUsers.indexOf(value.Id || value.id) == -1))
                                    ? "r-allusers-row-check" : ((props.selectedUsers.length == 1 && props.selectedUsers[0] != (value.Id || value.id))
                                        ? "r-allusers-row-check" : ((props.selectedUsers.length == 0) ? "r-allusers-row-check"
                                            : "r-allusers-row-check-selected"))
                                }>
                                <td className="ua-name"><p className="ua-name-p">
                                    <Tooltip title={value.FirstName || value.firstName}>{value.FirstName || value.firstName}</Tooltip></p></td>
                                <td className="ua-name"><p className="ua-name-p">
                                    <Tooltip title={value.LastName || value.lastName}>{value.LastName || value.lastName}</Tooltip></p></td>
                                <td className="ua-name"><p className="ua-name-p">
                                    <Tooltip title={value.UserName || value.userName}>{value.UserName || value.userName}</Tooltip></p></td>
                                <td className="ua-name"><p className="ua-name-p">
                                    <Tooltip title={value.Designation || value.designation}>{value.Designation || value.designation}</Tooltip></p></td>
                                <td className="ua-name"><p className="ua-name-p">
                                    <Tooltip title={value.Location || value.location}>{value.Location || value.location}</Tooltip></p></td>
                                <td className="ua-name"><p className="ua-name-p">
                                    <Tooltip title={value.Email || value.email}>{value.Email || value.email}</Tooltip></p></td>
                                <td className="ua-name"><p className="ua-name-p">
                                    <Tooltip title={value.PhoneNumber || value.phoneNumber}>{value.PhoneNumber || value.phoneNumber}</Tooltip></p></td>
                                <td className="ua-name"><p className="ua-name-p">
                                    <Tooltip title={value.Supervisor || value.supervisor}>{value.Supervisor || value.supervisor}</Tooltip></p></td>
                            </tr>
                            );

                        })

                        }
                        
                    </table>}
                    {userstableData.length == 0 && <h4 style={{display:"flex",justifyContent:"center"}}
                    >No Results Found</h4>}
                    {userstableData.length != 0 && < Pagination className='user-assign-pages' style={{
                        float: 'right',
                        marginTop: '1vh'
                    }}
                        onChange={(e) => { handlePages(e) }} defaultCurrent={1} current={pageNum} total={pages} showTitle={false} />}
                </div>
            </Modal>
        </div>
    );
}
export default UserAssignment;