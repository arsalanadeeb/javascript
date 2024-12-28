/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function(fn, t) {
    let timer = null;  // initialise a timer variable
    return function(...args) {
        const context = this; //preserve context
        clearTimeout(timer); //clear existing timer 
        timer = setTimeout(()=>fn.call(context,...args),t); //set new timer with call back
    }
  };

 