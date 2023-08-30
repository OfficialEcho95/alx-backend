const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});
client.on('error', err => {
  console.log('Redis client not connected to the server: ', err);
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (error, reply) => {
    if (error) {
      console.log("Error encountered: ", error);
    } else {   
      console.log("Reply:", reply);
    }
    client.quit();
  });
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (error, value) => {
    if (error) {
      console.log("Error encountered: ", error);
    } else {
      console.log(`${value}`);
    }
    client.quit();
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
