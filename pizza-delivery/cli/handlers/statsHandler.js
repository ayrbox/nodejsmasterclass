const os = require('os');
const v8 = require('v8');

const stats = [
  { label: 'Load Average', handler: () => os.loadavg().join() },
  { label: 'CPU Count', handler: () => os.cpus().length },
  { label: 'Free Memory', handler: () => os.freemem() },
  {
    label: 'Current Malloced Memory',
    handler: () => v8.getHeapStatistics().malloced_memory,
  },
  {
    label: 'Peak Malloced Memory',
    handler: () => v8.getHeapStatistics().peak_malloced_memory,
  },
  {
    label: 'Allocated Help Used (%)',
    handler: () =>
      Math.round(
        (v8.getHeapStatistics().used_heap_size /
          v8.getHeapStatistics().total_heap_size) *
          100
      ),
  },
  {
    label: 'Available Heap Allocated (%)',
    handler: () =>
      Math.round(
        (v8.getHeapStatistics().total_heap_size /
          v8.getHeapStatistics().heap_size_limit) *
          100
      ),
  },
  { label: 'Uptime', handler: () => os.uptime() + ' ms' },
];

const statsHandler = function (command, args) {
  stats.forEach(({ label, handler }) => {
    console.log(`${label.padEnd(30, ' ')}    ${handler()}`);
  });
};

module.exports = statsHandler;
