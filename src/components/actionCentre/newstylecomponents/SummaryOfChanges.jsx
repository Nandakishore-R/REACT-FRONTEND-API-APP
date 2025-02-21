import React from 'react'
import summary from './summary'
import { useState, useEffect } from 'react';
function SummaryOfChanges() {
    const getISTDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    };
    const [response, setResponse] = useState([]);

    useEffect(() => {

        const newsummary = summary;
        console.log("new", newsummary);
        let updatedResponse = newsummary.map((item) => {
            return {
                ...item,
                time: getISTDateTime(item.time), // Convert time to IST format
                oldValue: item.oldValue ?? "",
                newValue: item.newValue ?? "",
                userName: item.userName ?? "",
            };
        });


        setResponse(updatedResponse);

    }, []);


    return (
        <div id="pageThirdLast" className="fixedPage">
            <div className="form-group" id="innerDivPageThird" style={{width: '100%',  margin: '0px'}}>
                <div className="row">
                    <div className="form-group col-md-6 ">
                        <label>Summary of changes</label>
                    </div>
                </div>
                <center>
                    <table
                        id="fieldhistorytable"
                        style={{ tableLayout: "fixed" }}
                        width="96%"
                    >
                        <thead>
                            <tr>
                                <th>FieldName</th>
                                <th>Previous Value</th>
                                <th>Changed Value</th>
                                <th>Changed By</th>
                                <th>Change Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {response
                                .filter((item) => item.comment == null) // Only rows without comments
                                .map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.label}</td>
                                        <td>{item.oldValue}</td>
                                        <td>{item.newValue}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.time}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </center>
            </div>
        </div>
    )
}

export default SummaryOfChanges