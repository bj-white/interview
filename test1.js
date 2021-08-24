setImmediate(() => {
  console.log('setImmediate');
});

Promise.resolve().then(() => {
  console.log('promise1');
});

process.nextTick(() => {
  console.log('nextTick1');
});
