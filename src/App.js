import React, { useState, useEffect } from 'react';
import { Input, Spin, Icon, Steps, Tag, Alert } from 'antd';
import _ from 'lodash'
import FirstRow from './components/FirstRow'
import SecondRow from './components/SecondRow'
import ThirdRow from './components/ThirdRow'


function App() {
  const [state, setState] = useState({
    data: {},
    noDetails: false,
    errorMsg: '',
    searchVal: '',
    loading: false
  })

  const local = 'http://localhost:34567/.netlify/functions/car-finder?number='

  const prod = 'https://us-central1-webproduct-1481880564821.cloudfunctions.net/carinfofinder/get-car'

  const icon = <Icon type="loading" style={{ fontSize: 104, margin: 100 }} />
  const { Step } = Steps
  const isDev = process.env.NODE_ENV === 'development'

  useEffect(() => {
    console.log(process.env.NODE_ENV)
    getCarDetails()
  }, [])

  const getCarDetails = async (number = 'bl04djv') => {
    // if (state.searchVal.length < 4) {
    //   setState({
    //     errorMsg: 'Please enter registration plate number to process',
    //     noDetails: true,
    //   })
    // }

    try {
      const req = await fetch(`${isDev ? local : prod}${number}`, { headers: { accept: "Accept: application/json" } })
      const data = await req.json()
      console.log(data);
      setState({ data })
    } catch (error) {
      setState({
        loading: false,
        noDetails: true,
        errorMsg: 'There are no results for the registration number'
      })
    }
  }

  if (state.loading) {
    return (
      <Spin indicator={icon} tip="Loading..." />
    )
  }

  const { data, errorMsg, noDetail } = state
  return (
    <React.Fragment>
      <pre>
        {/* {JSON.stringify(data, null, 2)} */}
        {/* {JSON.stringify(process.env, null, 2)} */}
      </pre>
      <div className="container">

        <h1>What is the vehicle's registration number?</h1>
        <Input.Search
          placeholder="Enter Car Plate No Here..."
          size="large"
          onChange={({ target }) => setState({ searchVal: target.value })}
          onSearch={(val) => getCarDetails(val)}
          onPressEnter={({ target }) => getCarDetails(target.value)}
          enterButton='Search'
        />
        {noDetail && <Alert style={{ margin: '20px 0' }} closable message={errorMsg} type="error" showIcon />}
        {data &&
          <>
            <div style={{ marginTop: 16 }}>
              <div className='car-header'>
                <h1>{data.selectedPreviewLine1}</h1>
                <h2>{data.selectedPreviewLine2}</h2>
              </div>
              <div>
                Registration No <h3> {_.upperCase(data.registrationNumber)} <span>
                  <Tag color='#2db7f5'>Vehicle Insurance Group {data.insuranceGroup50}</Tag></span></h3>
              </div>
            </div>

            {data.vehicleType &&
              (
                <div className='mb-2'>
                  <Steps size="small" progressDot current={2} style={{ margin: '40px 0' }}>
                    <Step title={data?.vehicleType.manufacturedYear} description="Manufactured Year" />
                    <Step title={data.vehicleType.manufacturedFrom} description="Manufactured From" />
                    <Step title={data.vehicleType.manufacturedTo} description="Manufactured To" />
                  </Steps>
                  <FirstRow data={data} />
                  <SecondRow data={data} />
                  <ThirdRow data={data} />
                </div>
              )
            }
          </>}
      </div>
    </React.Fragment>
  )
}
export default App;
