
const WORKER_INTERVAL = 10;

const realWork = function() {
    console.log('Read working being carried out and done.');
}

const loop = function() {
    setInterval(function() {
        realWork();
    }, WORKER_INTERVAL);
};

(function init() {
    realWork();
    loop();
    console.log('Init');
}());


