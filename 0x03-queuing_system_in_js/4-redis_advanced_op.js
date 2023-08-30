const redis = require('redis');
const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));

const schoolData = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2
};

client.hmset('HolbertonSchools', schoolData, (error, reply) => {
  if (error) {
    console.log('Error setting hash values:', error);
  } else {
    console.log('Hash values set successfully');
    client.quit();
  }
});

client.hgetall('HolbertonSchools', (error, hashValues) => {
  if (error) {
    console.log('Error retrieving hash values:', error);
  } else {
    console.log(hashValues);
    client.quit();
  }
});
