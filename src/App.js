import React, { useState, useEffect, useCallback } from 'react';
import { Input, Spin, Icon, Steps, Tag, Empty } from 'antd';
import _ from 'lodash'
import FirstRow from './components/FirstRow'
import SecondRow from './components/SecondRow'
import ThirdRow from './components/ThirdRow'
import axios from 'axios'

function App() {
  const [state, setState] = useState({
    data: {},
    error: null,
    errorMsg: '',
    loading: false
  })
  const [searchVal, setSearchVal] = useState('initialState')
  const local = 'http://localhost:65042/.netlify/functions/car-finder?number='

  const prod = 'https://car-finder.netlify.app/.netlify/functions/car-finder?number='

  const icon = <Icon type="loading" style={{ fontSize: 204, marginTop: 100 }} />
  const { Step } = Steps
  const isDev = process.env.NODE_ENV === 'development'



  useEffect(() => {
    getCarDetails()
    // eslint-disable-next-line no-use-before-define
  }, [getCarDetails, prod])

  const getCarDetails = useCallback(async (number = 'bl04djv') => {
    try {
      setState({ loading: true })
      const { data } = await axios.get(isDev ? local + number : prod + number)
      console.log(data)
      setState({ data, loading: false, error: false })
    } catch (error) {
      setState({
        loading: false,
        error,
        errorMsg: 'There are no results for the registration number. Please try again'
      })
    }
  }, [isDev])


  const { data, errorMsg, error, loading } = state
  return (
    <React.Fragment>
      <div className="container">

        <h1 className='text-center'>What is the vehicle's registration number?</h1>
        <Input.Search
          placeholder="Enter Car Plate No Here..."
          size="large"
          autoCapitalize
          autoFocus
          autoSave
          allowClear
          onChange={({ target: { value } }) => setSearchVal(value)}
          onSearch={(val) => getCarDetails(val)}
          onPressEnter={({ target }) => getCarDetails(target.value)}
          enterButton='Search'
        />

        {loading && <center><Spin indicator={icon} tip="Loading..." /></center>}
        {error && <Empty description={errorMsg} style={{ marginTop: 100 }} />}

        {data &&
          <>
            <div style={{ marginTop: 16 }}>
              <div className='car-header'>
                <h1>{data?.selectedPreviewLine1}</h1>
                <h2>{data?.selectedPreviewLine2}</h2>
              </div>
              <div>
                Registration No <h3> {_.upperCase(data.registrationNumber)} <span>
                  <Tag color='#2db7f5'>Vehicle Insurance Group {data.insuranceGroup50}</Tag></span></h3>
              </div>
            </div>

            {data?.vehicleType &&
              (
                <div className='mb-2'>
                  <Steps size="small" progressDot current={2} style={{ margin: '40px 0' }}>
                    <Step title={data?.vehicleType?.manufacturedYear} description="Manufactured Year" />
                    <Step title={data?.vehicleType?.manufacturedFrom} description="Manufactured From" />
                    <Step title={data?.vehicleType?.manufacturedTo} description="Manufactured To" />
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
