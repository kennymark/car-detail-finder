
import React from 'react'
import { Row, Col, Card } from 'antd'


function SecondRow({ data }) {
  return (
    <div style={{ marginTop: 25 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card  >
            <Card.Meta title="Engine CC"
              description={data.vehicleType.engineCc}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card  >
            <Card.Meta title="Model Description"
              description={data.vehicleType.makeDescription}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card  >
            <Card.Meta title="Variant Description"
              description={data.vehicleType.variantDescription}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}


export default SecondRow