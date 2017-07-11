function handleClick () {


  setTimeout(function () {
    throw new Error('not by report')
  }, 1000)

  myClickHandler()
}

function myClickHandler () {
  setTimeout(function unknown () {
    async()
  }, 1000)
  sync()
}

function async () {
  console.log('async task')
  report(new Error('async task error'))
}

function sync () {
  console.log('this is sync task')
  report(new Error("sync task error"))
}
