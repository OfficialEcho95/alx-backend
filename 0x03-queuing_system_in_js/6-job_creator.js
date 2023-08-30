const kue = require('kue');
const queue = kue.createQueue();

const jobData = {
	phoneNumber: '435454541',
  message: 'Phone number verification'
};

const notificationJob = queue.create('push_notification_code', jobData);

notificationJob
  .on('complete', () => {
    console.log('Notification job completed');
    queue.shutdown(5000, err => {
      console.log('Kue shutdown:', err || 'done');
      process.exit(0);
    });
  })
  .on('failed', err => {
    console.log('Notification job failed:', err);
    queue.shutdown(5000, err => {
      console.log('Kue shutdown:', err || 'done');
      process.exit(1);
    });
  })
  .save(error => {
    if (!error) {
      console.log(`Notification job created: ${notificationJob.id}`);
    }
  });
