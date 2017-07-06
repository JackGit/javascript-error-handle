new Promise(function (resolve, reject) {
  setTimeout(function () {
    throw new Error('in promise')
  }, 1000)
})
