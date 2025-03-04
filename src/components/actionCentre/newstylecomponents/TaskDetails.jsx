import React from "react";
import DetailsCard from "../../../common/DetailsCard";

function TaskDetails({ data }) {
    const selectedKeys = [
        "title",
        "name",
        "taskDescription",
        "referenceNumber",
        "personalID",
        "unitofMeasurement",
        "selfAttestationName",
        "controlName",
        "riskName"
    ];

    // Define labels for each key
    const labels = {
        title: "Title",
        name: "Name",
        taskDescription: "Description",
        referenceNumber: "Reference Number",
        personalID: "Personal ID",
        unitofMeasurement: "Unit of Measurement",
        selfAttestationName: "Self Attestation Name",
        controlName: "Control Name",
        riskName: "Risk Name"
    };

    // Create a new object with only the selected keys, values, and labels
    const mappedData = selectedKeys.reduce((acc, key) => {
        if (data[key] !== undefined) {
            acc[key] = {
                value: data[key],
                label: labels[key]
            };
        }
        return acc;
    }, {});
    // the selected keys are the keys in from the api response to be displayed. if they are not null then it will be displayed.
    // A mapping is done to include the labels for the values also
    return <DetailsCard data={mappedData} />;
}

export default TaskDetails;
