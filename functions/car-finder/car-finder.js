
const axios = require('axios')


exports.handler = async (event, context, callback) => {

  const regNo = event.queryStringParameters.number
  const url = 'https://www.moneysupermarket.com/shop/car-insurance/api/vehicle-lookup?registrationNumber=' + regNo

  try {
    const request = await axios.get(url, { headers: { Accept: 'application/json' } })
    const data = request.data[0]
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    })
  } catch (error) {
    callback(error, {
      body: JSON.stringify(error),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    })

  }
}
