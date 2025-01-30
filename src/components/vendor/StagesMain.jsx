import React, { useState, useEffect, useRef, Fragment } from "react";
import { Row, Col, Switch, Checkbox, InputNumber } from "antd";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import StagesList from "./StagesList";
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    "Welcome to React": "Welcome to React and react-i18next"
                }
            }
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });
function StagesMain(props) {
    const { t } = useTranslation();
    const [allowInitiator, setAllowInitiator] = useState(true);
    const [allowEndUser, setAllowEndUser] = useState(false);
    /*const [stageList, setStageList] = React.useState([]);*/
    let arrayList = [];
    // Form Builder Data Set
    const fb = useRef();
    const FormModal = () => {
        return (
            <div className="" id="formDesignerArea" ref={fb}></div>
        )
    }
    /*React.useEffect(() => {
        props.setStages(stageList);
    }, [stageList]);*/
    console.log("props2", props);
    return (
        <Fragment>
            <FormModal />
            <div className="stageBackground">

                {/* Commenting the switches , for fscs and no work is done on it , and are not going to api as well.
                It needs to be refactored as per stages at other places !!
            */}

                {/*<Row className="stageFlex">*/}
                {/*    <Col>*/}
                {/*        <Switch defaultChecked onChange={() => setAllowInitiator(!allowInitiator)} value={allowInitiator} />*/}
                {/*            <label className="label-stages">{t('Label_AllowInitiatorToChangeStages')} </label>*/}
                {/*    </Col>*/}
                {/*    <Col>*/}
                {/*        <Switch onChange={() => setAllowEndUser(!allowEndUser) } value={allowEndUser} />*/}
                {/*            <label className="label-stages">{t('Label_AllowEndUserAddingStages')}</label>*/}
                {/*     </Col>*/}
                {/*</Row>*/}
                <Row className="stageFlex">
                    <Col className="abcd">
                        <InputNumber size="large" defaultValue={0} min={0} onChange={(val) => {
                            if (val < props.numberOfApprovalStages) {
                                console.log("in if");
                                props.setNumberOfApprovalStages(val);
                                props.setStageRequired(val == 0);
                                let removeItems = props.numberOfApprovalStages - val;
                                const updatedStages = [...props.stages];
                                updatedStages.splice(updatedStages.length - removeItems, removeItems);

                                // Update the stages state
                                props.setStages(updatedStages);
                            }
                            else {
                                console.log(val);
                                console.log("in else");
                                const newStages = [...props.stages];
                                newStages.push({
                                        "Actions": {
                                            "_Abort": 0,
                                            "_Approve": 1,
                                            "_Need correction": 0,
                                        },
                                        "StageName": "",
                                        "isVisible": false,
                                        "ApprovalMandatory": false,
                                        "ReviewBy": "0",
                                        "IsMandatory": false,
                                        "IsPinned": false,
                                        "SamplingSize": 100,
                                        "StageNumber": val,
                                        "JsonForm": [],
                                        "FormGroup": [],
                                    });
                                console.log("new",newStages);
                                props.setStages(newStages);
                                props.setNumberOfApprovalStages(val);
                            }

                        }} value={props.numberOfApprovalStages} />
                        <label className="label-stages">{t('Label_NumberOfApprovalStages')}</label>
                    </Col>
                    <Col>
                        <Checkbox checked={props.stageRequired} onChange={(val) => {
                            props.setStageRequired(val.target.checked);
                            props.setNumberOfApprovalStages(val.target.checked == true ? 0 : props.numberOfApprovalStages)
                        }}>{t('Label_NoStagesRequired')}</Checkbox>
                    </Col>
                </Row>
                {props.numberOfApprovalStages > 0 && !props.stageRequired &&

                    <StagesList
                        numberOfApprovalStages={props.numberOfApprovalStages}
                        setNumberOfApprovalStages={props.setNumberOfApprovalStages}
                        stageList={props.stages}
                        setStageList={props.setStages}
                        currentLanguage={props.currentLanguage}
                        translatorObject={props.translatorObject}
                    />
                }
            </div>
        </Fragment>
    )
}
export default StagesMain;