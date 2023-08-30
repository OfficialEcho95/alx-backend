const redis = require('redis');
const { promisify } = require('util'); // Import the promisify function

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

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

async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(`${value}`);
  } catch (error) {
    console.log("Error encountered: ", error);
  } finally {
    client.quit();
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
