const { AsyncArray, less, get, add } = window.Homework;

// обернул каждый асинхронный метод в промис для более удобной работы с функцией.
function addPromise() {
  this.less = (a, b) => new Promise((resolve) => less(a, b, resolve));
  this.add = (a, b) => new Promise((resolve) => add(a, b, resolve));
  this.length = (arr) => new Promise((resolve) => arr.length(resolve));
  this.get = (arr, index) => new Promise((resolve) => arr.get(index, resolve));
}

const addMethod = new addPromise();


async function getMaxNmber(arr, cb) {
  let count = 0;
  let resultNum = 0;
  
// асинхронный цикл с рекурсией
  async function acyncCycle(arr) {
    if (await addMethod.less(resultNum, await addMethod.get(arr, count))) {
      resultNum = await addMethod.get(arr, count);
    }
    count = await addMethod.add(count, 1);
    if (await addMethod.less(count, await addMethod.length(arr))) {
      await acyncCycle(arr);
    }
  }
  await acyncCycle(arr);

  cb({'getMaxNumber': resultNum});
}

getMaxNmber(new AsyncArray([111, 33, 324, 11, 92538, 4444, 55554, 4444,64,44764,6784,-1]), console.log);
