// iss.js

const request = require('request');

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipwho.is/json/${ip}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);
    if (!data.latitude || !data.longitude || data.success === false) {
      callback(`It didn't work! Error: ${data.message}`, null);
      return;
    }

    const coordinates = { latitude: data.latitude, longitude: data.longitude };
    callback(null, coordinates);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };

// index.js

const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchCoordsByIP('8.8.8.8', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(data);
});

const request = require('request');

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`), null);
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

module.exports = { fetchISSFlyOverTimes };


const { fetchISSFlyOverTimes } = require('./iss');

const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (error, passes) => {
  if (error) {
    console.log("Error fetching ISS flyover times:", error);
  } else {
    console.log("ISS flyover times:", passes);
  }
});

const { fetchISSFlyOverTimes } = require('./iss');

const invalidCoords = { latitude: 'invalid', longitude: 'coords' };

fetchISSFlyOverTimes(invalidCoords, (error, passes) => {
  if (error) {
    console.log("Error fetching ISS flyover times:", error);
  } else {
    console.log("ISS flyover times:", passes);
  }
});

const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});
