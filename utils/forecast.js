const request = require("request")

const forecast = (lat, lon, callback) => {
    const url = `https://api.darksky.net/forecast/a20071b704e2a45e50f3d9ece9208ca0/${lat},${lon}`
    request({url: url, json: true}, (error, {body}) => {
        if (error) callback("Could Not Connect to API", undefined)
        else {
            const {error, currently, daily} = body
            if (error) callback(error, undefined)
            else {
                callback(undefined, `It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain. The high is ${daily.data[0].temperatureHigh} and the low is ${daily.data[0].temperatureLow}.`)
            }
        }
    })
}

module.exports = forecast