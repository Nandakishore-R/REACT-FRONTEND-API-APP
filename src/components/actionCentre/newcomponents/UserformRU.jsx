const useTranslation = window["ReactI18next"].useTranslation;
function UserformRU(props) {
    const { t, i18n } = useTranslation();
    const Form = window["antd"].Form;
    const [form] = Form.useForm();
    const Input = window["antd"].Input;
    const InputPassword = window["antd"].Input.Password;
    const Select = window["antd"].Select;
    const Row = window["antd"].Row;
    const Col = window["antd"].Col;
    const Button = window["antd"].Button;
    const Modal = window["antd"].Modal;
    const Switch = window['antd'].Switch;
    const Tooltip = window['antd'].Tooltip;
    const [supervisorentity, setsupervisorEntity] = React.useState("");
    const [supervisorrole, setsupervisorRole] = React.useState("");
    const [supervisoruser, setsupervisorUser] = React.useState("");
    //const isUserAssessmentAllowed = props.isUserAssessmentAllowed //don't add this otherwise functionality breaks to be revisted
    //Users form field State
    const [firstName, setfirstName] = React.useState("");
    const [lastName, setlastName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [entityOwner, setentityOwner] = React.useState(false);
    const [designation, setDesignation] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [email, setemail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmpassword, setConfirmPassword] = React.useState("");
    const [supervisorID, setSupervisorID] = React.useState("");
    const [userApi, setUserApi] = React.useState("CreateUser");
    const [userId, setUserId] = React.useState("00000000-0000-0000-0000-000000000000");
    const [supervisor, setSupervisor] = React.useState([]);
    const [activetab, setActivetab] = React.useState(true);

    //state management
    React.useEffect(() => {
        if (props.userDetails) {
            setUserId(props.userDetails.Id);
            setfirstName(props.userDetails.FirstName);
            setlastName(props.userDetails.LastName);
            setUserName(props.userDetails.UserName);
            setentityOwner(props.userDetails.EntityOwner);
            setDesignation(props.userDetails.Designation);
            setLocation(props.userDetails.Location);
            setemail(props.userDetails.Email);
            setPhone(props.userDetails.PhoneNumber);
            setActivetab(props.userDetails.IsActive)
            setsupervisorEntity(props.userDetails.SupervisorEntity);
            setsupervisorRole(props.userDetails.SupervisorRole);
            setsupervisorUser(props.userDetails.SupervisorUser);
            setUserApi("UpdateUser");
            setPassword("");
            setConfirmPassword("");
        }
        else {
            setUserId("00000000-0000-0000-0000-000000000000");
            setfirstName("");
            setlastName("");
            setUserName("");
            setentityOwner("");
            setDesignation("");
            setLocation("");
            setemail("");
            setPhone(null);
            setActivetab(true)
            setsupervisorEntity("");
            setsupervisorRole("");
            setsupervisorUser("");
            setUserApi("CreateUser");
            setPassword("");
            setConfirmPassword("");
        }
    }, [props.userDetails]);

    /*supervisor data api*/
    supervisorclick = (event) => {
        let value = event;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/User/SupervisorUsers",
            data: {
                "q": value,
                "UserId": props.userDetails ? props.userDetails.Id : "00000000-0000-0000-0000-000000000000"

            },
            async: false,
            contentType: 'application/json',
            success: function (response) {
                setSupervisor(response)
            },
            error: function (error) {
                console.log("error of supervisor api is " + JSON.stringify(error));
            }
        });

    }
    /*setting supervisor id at selecting supervisor */
    function supervisordatafunction(data) {
        supervisor.map(value => {
            if ((value.id + value.roleId == data && value.isUser == true)) {

                setsupervisorEntity(value.entityId);
                setsupervisorRole(value.roleId);
                setsupervisorUser(value.id);

            }
            else if ((value.id == data && value.isUser == false)) {

                setsupervisorRole(value.id);
                setsupervisorEntity("");
                setsupervisorUser("");
            }
        });

    }
    React.useEffect(() => {
        $.ajax({
            type: "GET",
            url: "/User/SupervisorUsers",
            data: {
                q: "",
                "UserId": props.userDetails ? props.userDetails.Id : "00000000-0000-0000-0000-000000000000"
            },
            async: false,
            contentType: "application/json",
            success: function (response) {
                setSupervisor(response);
            },
            error: function (error) {
                console.log("error of supervisor api is " + JSON.stringify(error));
            }
        });
    }, []);

    const verifyPassword = (val) => {
        if (val != password) {
            toastr.error(`${t('Error_PasswordAndConfirmationPasswordDoNotMatch')}`)
        }
    };
    function validateEmail(e) {
        if (e == "" || e == null) {
            return true
        }
        else {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    }

    function validateEmails(email) {
        // Regular expression for basic email format validation
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if email matches the basic email format
        if (!emailPattern.test(email)) {
            return false;
        }

        // Check if the local part (before @) has at least 3 characters
        var localPart = email.split('@')[0];
        if (localPart.length < 2) {
            return false;
        }

        // Email is valid
        return true;
    }


    function validateEmailDomain(email) {
       
        // Check if email ends with 'suryodaybank.com'
        var domain = `${t('Label_SuryodayDomain')}`;// 'suryodaybank.com';

        if (!email.endsWith('@' + domain)) {
            return false;
        }

        return true;
    }

    function validatePhoneNumber(inputtxt) {
        if (inputtxt == "" || inputtxt == null) {
            return true
        }
        else {
            var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            return (inputtxt.match(phoneno));
        }
    }
   
    function createFunc() {
        let isValid = true;
        var upper = /[A-Z]/;
        var lower = /[a-z]/;
        var number = /[0-9]/;
        var characters = /[!@#$%&*]/;
        var nonchars = /[\-`~\^\(\)_\+\=\}\{\]\[\|'";:><,\./\?]/;
        if (!firstName) {
            toastr.error(`${t('Alert_EnterFirstName')}`)
            isValid = false;
        }
        else if (!lastName) {
            toastr.error(`${t('Alert_EnterLastName')}`)
            isValid = false;
        }
        else if (!userName) {
            toastr.error(`${t('Alert_EnterUserName')}`)
            isValid = false;
        }
        else if (!email) {
            toastr.error(`${t('Please Enter Email')}`)
            isValid = false;
        }
        else if ((email != "" || email == null) && !validateEmails(email)) {
            toastr.error(`${t('Alert_EnterAValidEmail')}`)
            isValid = false;
        }
        else if ((email != "" || email == null) && !validateEmailDomain(email)) {
            toastr.error(`${t('Alert_EnterAValidDomain')}`)
            isValid = false;
        }
        else if (userApi == "CreateUser" && !password) {
            toastr.error(`${t('Alert_EnterPassword')}`)
            isValid = false;
        }
        else if (password.length) {
            var errorlist = [];
            if (password.length < 6) {
                errorlist.push((`${t('Alert_PasswordLength')}`));
            }
            if (!password.match(upper)) {
                errorlist.push((`${t('Alert_PasswordUpperCase')}`));
            }
            if (!password.match(lower)) {
                errorlist.push((`${t('Alert_PasswordLowerCase')}`));
            }
            if (!password.match(number)) {
                errorlist.push((`${t('Alert_PasswordNumber')}`));
            }
            if (password.match(nonchars)) {
                errorlist.push((`${t('Alert_PasswordOnlyTheseCharacters')}`));
            }
            if (!password.match(characters)) {
                errorlist.push((`${t('Alert_PasswordSpecialCharacters')}`));
            }

            if (errorlist.length > 0) {
                toastr.error(errorlist.toString());
                isValid = false;
            }
            else if (errorlist.length == 0 && confirmpassword != password) {
                toastr.error(`${t('Error_PasswordAndConfirmationPasswordDoNotMatch')}`)
                isValid = false;
            }
        }

        else if ((phone != "" || phone == null) && !validatePhoneNumber(phone)) {
            toastr.error(`${t('Alert_EnterAValidPhone')}`)
            isValid = false;
        }
        else if (confirmpassword != password) {
            toastr.error(`${t('Error_PasswordAndConfirmationPasswordDoNotMatch')}`);
            isValid = false;
        }
        

        if (isValid) {
            var userData = {
                "Id": userId,
                "UserName": userName,
                "PasswordHash": "",
                "IsActive": activetab,
                "LockoutEnabled": true,
                "CreatedBy": "",
                "CreatedDate": "2021-02-05T08:13:49.152Z",
                "ModifiedBy": "",
                "ModifiedDate": "2021-02-05T08:13:49.152Z",
                "FirstName": firstName,
                "LastName": lastName,
                "Email": email,
                "EntityOwner": entityOwner,
                "DesignationId": designation,
                "Location": location,
                "PhoneNo": phone,
                "Password": password,
                "EntityId": props.entityId,
                "RoleId": props.roleId,
                "supervisorEntity": supervisorentity || "",
                "supervisorRole": supervisorrole || "",
                "supervisorUser": supervisoruser || "",
                "EntityOwnerMappingId": "",
                "IsDelete": false,
                "ErrorMessage": ""
            }

            $.ajax({
                type: "POST",
                async: false,
                url: `/EntityAndRoleHierarchy/${userApi}`,
                data: JSON.stringify(userData),
                contentType: 'application/json',
                success: function (response) {
                    if (response.StatusCode == true) {
                        if (userApi == "CreateUser") {
                            props.selectedUsers.push(response.Message)
                            toastr.success(`${t('Label_Success')}`);
                        } else {
                            toastr.success(response.Message);
                        }
                        props.setshowUserFormModel(false)
                        if (props.calledFrom != "Admin") {
                            props.setUserCheck(true)
                            props.setUserCall(!props.userCall)
                            props.setReload(!props.reload)
                        }
                    }
                    else {
                        toastr.error(response.Message);
                    }
                    /*  props.setReRenderForm(!props.reRenderForm)*/

                },
                error: function (error) {
                    setStatus(error)
                    console.log("error is " + error);
                    toastr.error(error.Message);
                }
            });
        }

    }

    return (
        <div style={{ overflow: "hidden" }} className="create-user-modal-div" id="user-form-create">
            <Modal
                footer={false}
                closable={false}
                className="rh-useredit-modal"
                visible={true}
            >
                <div className="navbar-user-create-modal">
                    <p className="Sname-user-create-modal">
                        <button className="closeformbutton-create">
                            <img
                                className="cancelcross-create"
                                src="\Views\Risk\icons\CloseIcon.svg"
                                onClick={() => {
                                    props.setshowUserFormModel(false)
                                }} />
                        </button>
                      {isUserAssessmentAllowed == "True" ?
                            <React.Fragment>
                       {props.createcheck == true ? `${t('Label_NewUser')}` : `${t('Label_UpdateUser')}`}
                       <button className="ua-add-btn-create" onClick={() => { createFunc() }}>
                            {props.createcheck == true ? `${t('Label_Create')}` : `${t('Label_Update')}`}
                            </button>
                            </React.Fragment>
                            :
                       `${t('Label_ViewUser')}`
                      }
                    </p>
                </div>
                <Form
                    id="userForm-create"
                    layout="vertical"
                    form={form}
                    className="userForm-create"
                    scrollToFirstError
                    initialValues={{
                        remember: true
                    }}
                >
                    <Row id="userFormRow">
                        <Col span={12}>
                            <Form.Item  className="input-field-create" label={<b>{t('Label_FirstName')}<span style={{ color: "red" }}>*</span> </b>}>
                                <Input disabled={isUserAssessmentAllowed == "True" ? false : true}
                                    className="input-field-create" defaultValue={firstName} value={firstName} key={props.userDetails.FirstName}
                                    onChange={e => setfirstName(e.target.value)} />
                            </Form.Item>
                            <Form.Item label={<b>{t('Label_Username')}<span style={{ color: "red" }}>*</span></b>}>
                                <Input disabled={isUserAssessmentAllowed == "True" ? props.userDetails ? true : false : true}
                                    className="input-field-create" defaultValue={userName} value={userName} key={props.userDetails.UserName}
                                    onChange={e => setUserName(e.target.value)} />
                            </Form.Item>
                            <Form.Item label={<b>{t('Label_Location')}</b>}>
                                <Input disabled={isUserAssessmentAllowed == "True" ? false : true}
                                    className="input-field-create" defaultValue={location} value={location} key={props.userDetails.Location} onChange={e => setLocation(e.target.value)} />
                            </Form.Item>
                            <Form.Item label={<b>{t('Label_Phone')}</b>}>
                                <Input disabled={isUserAssessmentAllowed == "True" ? false : true}
                                    className="input-field-create" defaultValue={phone} value={phone} key={props.userDetails.PhoneNumber} onChange={e => setPhone(e.target.value)} />
                            </Form.Item>
                            {
                                isUserAssessmentAllowed == "True" &&
                                <Form.Item label={<b>{t('Label_NewPassword')}
                                    {userApi == "CreateUser" && <span style={{ color: "red" }}>*</span>}</b>}>
                                    <InputPassword autocomplete="new-password" className="input-field-create" defaultValue={password} value={password} key={props.userDetails.Password} onChange={e => setPassword(e.target.value)} />
                                </Form.Item>
                            }
                        </Col>
                        <Col span={1}>
                        </Col>
                        <Col span={11}>
                            <Form.Item label={<b>{t('Label_LastName')}<span style={{ color: "red" }}>*</span></b>}>
                                <Input disabled={isUserAssessmentAllowed == "True" ? props.disable : true}
                                    className="input-field-create" defaultValue={lastName} value={lastName} key={props.userDetails.LastName}
                                    onChange={e => setlastName(e.target.value)}  />
                            </Form.Item>
                            <Form.Item label={<b>{t('Label_Designation')}</b>}>
                                <Input disabled={isUserAssessmentAllowed == "True" ? false : true}
                                    className="input-field-create" defaultValue={designation} value={designation} key={props.userDetails.Designation} onChange={e => setDesignation(e.target.value)} />
                            </Form.Item>
                            <Form.Item label={<b>{t('Label_Email')}<span style={{ color: "red" }}>*</span></b>}>
                                <Input disabled={isUserAssessmentAllowed == "True" ? false : true}
                                    type="email" className="input-field-create" defaultValue={email} value={email} key={props.userDetails.Email} onChange={e => setemail(e.target.value)} />
                            </Form.Item>
                            <Form.Item label={<b>{t('Label_Supervisor')}</b>}>

                                <Select disabled={isUserAssessmentAllowed == "True" ? false : true}
                                    showSearch="true"
                                    className="select-field-supervisor"
                                    placeholder={`${t('Alert_EnterCharacters')}`}
                                    optionFilterProp={"key"}
                                    onChange={supervisordatafunction}
                                    value={(supervisoruser ? supervisoruser : "") + (supervisorrole ? supervisorrole : "")}
                                    onSearch={(e) => {
                                         supervisorclick (e)
                                    }}
                                    key={(supervisoruser ? supervisoruser : "") + (supervisorrole ? supervisorrole : "")}
                                    onSelect={supervisordatafunction}
                                >
                                    {supervisor.map(value => (
                                        <Option value={value.id + (value.roleId !== "00000000-0000-0000-0000-000000000000" ? value.roleId : "")}
                                            key={value.label}>
                                            <Tooltip title={value.label}
                                                key={value.id + (value.roleId !== "00000000-0000-0000-0000-000000000000" ? value.roleId : "")}>
                                                <span>{value.label} </span>
                                            </Tooltip>
                                        </Option>
                                    ))}
                                </Select>

                            </Form.Item>
                            {
                                isUserAssessmentAllowed =="True" && 
                                <Form.Item label={<b>{t('Label_ConfirmNewPassword')}
                                    {userApi == "CreateUser" && <span style={{ color: "red" }}>*</span>}</b>}>
                                    <InputPassword className="input-field-create" defaultValue={confirmpassword} value={confirmpassword} key={props.userDetails.Password} onChange={e => setConfirmPassword(e.target.value)} />
                                </Form.Item>
                            }
                            
                        </Col>
                    </Row>
                    <Row id="userFormRow">
                        <Col span={6}>
                            <Form.Item className="userFormActiveSwitch">
                                <b>{t('Label_Active')}</b>
                                <Switch disabled={isUserAssessmentAllowed == "True" ? false : true}
                                    style={{ marginLeft: "3%" }}
                                    onChange={(e) => {
                                        setActivetab(e)
                                    }} defaultChecked={activetab} />
                            </Form.Item>
                        </Col>
                        </Row>
                </Form>
            </Modal>
        </div>
    );

}