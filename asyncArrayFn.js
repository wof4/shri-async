const { AsyncArray, less, get, add } = window.Homework;

function addPromise() {
  this.less = (a, b) => new Promise((resolve) => less(a, b, resolve));
  this.add = (a, b) => new Promise((resolve) => add(a, b, resolve));
  this.length = (arr) => new Promise((resolve) => arr.length(resolve));
  this.get = (arr, index) => new Promise((resolve) => arr.get(index, resolve));
}

const addMethod = new addPromise();

async function myFunc(arr, cb) {
  let count = 0;
  let resultNum = 0;

  await getItem(arr);

  async function getItem(arr) {
    if (await addMethod.less(resultNum, await addMethod.get(arr, count))) {
      resultNum = await addMethod.get(arr, count);
    }
    count = await addMethod.add(count, 1);
    if (await addMethod.less(count, await addMethod.length(arr))) {
      await getItem(arr);
    }
  }
  console.log(resultNum);
  cb(resultNum);
}

myFunc(new AsyncArray([111, 2232, 33333, 11, 987349876, 4444, 55554, 4444444,44,4444,8844655,55526]), () => {});
