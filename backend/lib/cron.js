import cron from 'cron';
import https from 'https';

const job = new cron.CronJob('*/14 * * * *', function () {
    https
        .get(process.env.API_URL, (res) => {
            if (res.statusCode === 200) {
                console.log('Cron job executed successfully!');
            }
            else {
                console.error(`Error executing cron job: ${res.statusCode}`);
            }
        })
        .on('error', (e) => {
            console.error(`Error executing cron job: ${e.message}`);
        });
});

export default job;