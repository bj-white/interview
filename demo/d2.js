new Promise((resolve) => {
  resolve();
}).then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
});

new Promise((resolve) => {
  resolve();
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(4);
});

setTimeout(() => {
  console.log(11);
}, 0);
