Promise.resolve().then(() => {
  console.log('promise');
});

process.nextTick(() => {
  console.log('nexttick');
});

setImmediate(() => {
  console.log('setImmediate');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);
