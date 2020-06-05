
import React from 'react'
import { Row, Col, Card } from 'antd'
import { upperFirst } from 'lodash'

function ThirdRow({ data }) {

  return (
    <div style={{ marginTop: 25 }}>
      <Row gutter={16}>
        <Col span={8} >
          <Card  >
            <Card.Meta title="Right Hand Drive?"
              description={upperFirst(data.vehicleType.rightHandDrive)}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card >
            <Card.Meta title="Vehicle Type ID"
              description={data.vehicleType.vehicleTypeId}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card >
            <Card.Meta title="Vehicle Value"
              description={`£` + data.vehicleType.vehicleValue || 'Not Listed'}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ThirdRow