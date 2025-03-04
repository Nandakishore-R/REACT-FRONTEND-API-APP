import React from 'react'
import { Typography, Table } from 'antd';
const { Title } = Typography;
import './styles/table2.css'

function Table2({ columns, dataSource, title }) {
    return (
        <div >
            <Title level={4} className="table2-title">
                {title}
            </Title>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey={(record, index) => index}
                pagination={false}
                bordered
                className="styled-table"
            />
        </div>
    )
}

export default Table2