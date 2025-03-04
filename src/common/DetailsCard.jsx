import React from "react";
import { Card, Typography, Input } from "antd";
import './styles/detailscard.css'
const { Title, Text } = Typography;

const DetailsCard = ({ data }) => {
    return (
        <Card className="detailsCard">
            <div>
                {Object.entries(data).map(([key, item]) =>
                    item.value ? (
                        <div key={key}>
                            <Title level={5}>{item.label}</Title>

                            <Text className="detailsText">
                                {item.value}
                            </Text>

                        </div>
                    ) : null
                )}
            </div>
        </Card>
    );
};

export default DetailsCard;
