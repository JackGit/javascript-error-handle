function hasKey (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

function replace (obj, prop, replacement, track) {
  const orig = obj[prop]
  obj[prop] = replacement(orig)
  if (track) {
    track.push([obj, prop, orig])
  }
}

function restore (track) {
  let builtin

  while (track.length) {
    builtin = track.shift()
    let obj = builtin[0]
    let name = builtin[1]
    let orig = builtin[2]
    obj[name] = orig

    // remove the wrapper attribute
    if (orig.__fm_wrapper__) {
      delete orig.__fm_wrapper__
    }
  }
}

function wrap (func, before, after) {
  // if original function is already a wrapper function
  // don't want to wrap twice
  if (func.__fm_inner__) {
    return func
  }

  // if original function has already been wrapped before, return the wrapper
  if (func.__fm_wrapper__) {
    return func.__fm_wrapper__
  }

  function wrapper () {
    before && before.apply(this, arguments)
    func.apply(this, arguments)
    after && after.apply(this, arguments)
  }

  // copy over properties of the original function
  for (let prop in func) {
    if (hasKey(func, prop)) {
      wrapper[prop] = func[prop]
    }
  }

  // wrapper.prototype = func.prototype
  wrapper.__fm_inner__ = func
  func.__fm_wrapper__ = wrapper

  return wrapper
}

function wrapFunc (obj, prop, before, after, track) {
  replace(obj, prop, function (orig) {
    return wrap(orig, before, after)
  }, track)
}
