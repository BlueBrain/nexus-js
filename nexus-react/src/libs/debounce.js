function debounce(fnCallback, delay, immediate) {
  var timeout, ready = 1;
  return function() {
      var args = arguments, context = this;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
          if(!(ready = immediate)) {
              fnCallback.apply(context, args);
          }
      }, delay);
      if(immediate && ready) {
          return ready = 0, fnCallback.apply(context, args);
      }
  };
}

export default debounce;