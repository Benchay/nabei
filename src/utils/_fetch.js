export  function _fetch(fetch, timeout) {
    return Promise.race([
        fetch,
        new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('request timeout')), timeout);
        })
    ]);
}
