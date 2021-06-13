Promise._any = (promises = []) => {
    return new Promise((resolve, reject) => {
    {
        const rejected = [];
        promises.forEach(promise => {
        promise.then(resolve).catch(error => {
            rejected.push(error);
            if (rejected.length === promises.length) {
            reject(rejected);
            }
        });
        });
    }
    });
};

(async () => {
    try {
    const result = await Promise._any([
        new Promise((resolve, reject) => setTimeout(() => reject('a'), 1000)),
        new Promise((resolve, reject) => setTimeout(() => resolve('b'), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject('c'), 1000)),
    ]);
    console.log({ 'Promise._any': result }); // b
    } catch (e) {
    console.log('err: ', e);
    }
})();

Promise._allSettled = (promises = []) => {
    return new Promise((resolve, reject) => {
    {
        const resultArray = [];
        promises.forEach(promise => {
        promise
            .then(result =>
            resultArray.push({ status: 'fullfield', value: result })
            )
            .catch(error => {
            resultArray.push({ status: 'rejected', reason: error });
            if (resultArray.length === promises.length) {
                resolve(resultArray);
            }
            });
        });
    }
    });
};

(async () => {
    try {
    const result = await Promise._allSettled([
        new Promise((resolve, reject) => setTimeout(() => reject('a'), 1000)),
        new Promise((resolve, reject) => setTimeout(() => resolve('b'), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject('c'), 1000)),
    ]);
    console.log({ 'Promise._allSettled': result }); 
    //{status: "rejected", reason: "a"}
    //{status: "fullfield", value: "b"}
    //{status: "rejected", reason: "c"}
    } catch (e) {
    console.log('err: ', e);
    }
})();

Promise.prototype._finally = function (onFulfilled) {
    this.then(onFulfilled, onFulfilled);
    return this;
};

Promise.resolve('pppp')
    ._finally(() => console.log('hello'))
    .then(console.log);
