const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpus = os.cpus().length;

    console.log(`Starting covid-app on ${cpus} CPUs`)
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    console.dir(cluster.workers, {depth: 0});
    cluster.on('exit', (worker, code) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} crashed.\nStarting a new worker...`);
            const nw = cluster.fork();
            console.log(`Worker ${nw.process.pid} spawned`);
        }
    });

    console.log(`Master PID: ${process.pid}`)
} else {
     require('./app.js');
}