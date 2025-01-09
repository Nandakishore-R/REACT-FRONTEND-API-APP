import React from 'react';
import { Modal, Button, Table } from 'antd';

function ClauseModel(props) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [clauseData, setClauseData] = React.useState([
        // Add placeholder data or initialize as needed
        { key: '1', link: 'Clause 1', label: 'Mandatory Clause 1' },
        { key: '2', link: 'Clause 2', label: 'Mandatory Clause 2' },
    ]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const locale = {
        emptyText: loading ? "Processing..." : "No Data",
    };

    const columns = [
        {
            title: <b>CLAUSE NO</b>,
            dataIndex: 'link',
            key: 'link',
            responsive: ["lg"],
            width: "8.5vw",
        },
        {
            title: <b>MANDATORY CLAUSE</b>,
            dataIndex: 'label',
            key: 'label',
            responsive: ["lg"],
        },
    ];

    return (
        <div className="vd-clause-model">
            <Button 
                type="primary" 
                onClick={showModal} 
                style={{ backgroundColor: "#4D94FF" }}
            >
                Categorization Clauses
            </Button>
            <Modal 
                title="Categorization Clauses" 
                open={isModalOpen} 
                onOk={handleOk} 
                footer={null} 
                onCancel={handleCancel} 
                width="85vw"
            >
                <div className="vd-clause-table-wrapper">
                    <Table
                        size="middle"
                        pagination={false}
                        columns={columns}
                        dataSource={clauseData}
                        locale={locale}
                        rowClassName={(record, index) => (index % 2 === 0 ? 'even' : 'odd')}
                        loading={loading}
                        rowKey={record => record.key}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default ClauseModel;
