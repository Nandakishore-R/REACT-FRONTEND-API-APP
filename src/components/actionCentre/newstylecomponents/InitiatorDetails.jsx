import React from 'react'
import Card2 from '../../../common/Card2';
function InitiatorDetails({ data }) {
    console.log("data",data.initiatorName);
    const selectedKeys = [
        "initiatorName",
        "strDateOfRaise",
        "initiatorRole",
        "kriRiskName",
        "baselLossType",
        "baselBusinessLine",
        "targetValue",
        "baselineValue",
      ];
    // Define labels for each key
    const labels = {
        initiatorName: "Initiator",
        strDateOfRaise: "InitiatedDate",
        initiatorRole: "Role",
        kriRiskName: "KRI Risk Name",
        baselLossType: "Basel Loss Type",
        baselBusinessLine: "Basel Business Line",
        targetValue: "Target Value",
        baselineValue: "Baseline Value",
    };

    // Create a new object with only the selected keys, values, and labels
    const mappedData = selectedKeys.reduce((acc, key) => {
        console.log("key",data[key]);
        if (data[key] !== undefined) {
            acc[key] = {
                value: data[key],
                label: labels[key],
            };
        }
        return acc;
    }, {});

    return (
        <Card2 data={mappedData} />
    )
}

export default InitiatorDetails