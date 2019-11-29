const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/9cd2471196767f6040a6ed44210e9525/"+ latitude + "," + longitude + "?units=si"
    request({ url, json: true} , (error, {body}) => {
        if (error){
            callback("unable to connect to weather service", undefined)
        } else if (body.error){
            callback("unable to find location", undefined)
        } else {
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            const precipType= body.daily.data[0].precipType
            //console.log(body.daily.data[0])

            callback(undefined, body.daily.data[0].summary +"  It is currently " + temperature + " degrees out. There is a "+ precipProbability + "% chance of " + precipType+ ".")

        }

    })
}

module.exports = forecast
