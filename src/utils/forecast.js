const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a61d4dce2582ebf25a3b40732a8c26cf&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to conncet to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike)

        }

    })
}

module.exports = forecast