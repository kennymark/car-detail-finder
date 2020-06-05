
const axios = require('axios')


exports.handler = async (event, context) => {

  const regNo = event.queryStringParameters.number
  const url = 'https://www.moneysupermarket.com/shop/car-insurance/api/vehicle-lookup?registrationNumber=' + regNo

  try {
    const request = await axios.get(url)
    const data = request.data[0]
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }

  }
}
