import React from 'react'
import { Row, Col, Card } from 'antd'



const FirstRow = ({ data }) => (
  <div style={{ marginTop: 25 }}>
    <Row gutter={16}>
      <Col span={8}>
        <Card  >
          <Card.Meta title="Body Type ID"
            description={data.vehicleType.bodyTypeId}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card  >
          <Card.Meta title="Doors"
            description={data.vehicleType.doors}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card >
          <Card.Meta title="Engine Litres"
            description={data.vehicleType.engineLitres}
          />
        </Card>
      </Col>
    </Row>
  </div>
)

export default FirstRow