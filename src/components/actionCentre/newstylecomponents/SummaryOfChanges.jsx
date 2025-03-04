import React from 'react'
import data from './summary';
import Table2 from '../../../common/Table2';
import { useState, useEffect } from 'react';
const { summary, columns, title } = data;
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

    const dataSource = response.filter((item) => item.comment == null);
    return (
        <div style={{ padding: "16px" }}>
            <Table2 dataSource={dataSource} columns={columns} title={title} />
        </div >
    )
}

export default SummaryOfChanges