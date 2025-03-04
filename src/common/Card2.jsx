import React from 'react'
import { Card, Typography } from "antd";
const { Title, Text } = Typography;
import './styles/card2.css'

function Card2({data}) {
  return (
    
        <Card variant="outlined">
            <div className="card2Div">
                {Object.entries(data).map(([key, item]) =>
                    item.value ? (
                        <div className="card2DivItem" key={key}>
                            <Title level={5}>{item.label}</Title>
                            <Text>{item.value}</Text>
                        </div>
                    ) : null
                )}
            </div>
        </Card>
  );
}

export default Card2