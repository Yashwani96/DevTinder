// const p1 = new Promise((resolve, reject) => {
//   reject("p1 is rejected");
// });

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p2 sucess"), 5000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p3 success"), 2000);
});

p2.then((res) => console.log(res));
console.log("1");

console.log("2");
