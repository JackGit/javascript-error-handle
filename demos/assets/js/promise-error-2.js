new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve()
  }, 1000)
}).then(function () {
  throw new Error('promise then error')
})
