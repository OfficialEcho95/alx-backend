const kue = require('kue');
const queue = kue.createQueue({
  concurrency: 2 // Process two jobs at a time
});

const blacklistedNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100); // Initial progress

  if (blacklistedNumbers.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    job.progress(50, 100); // Progress update

    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    // Simulating async task
    setTimeout(() => {
      job.progress(100, 100); // Complete progress
      done();
    }, 1000);
  }
}

queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

console.log('Job processor is running...');
