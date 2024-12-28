/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
    let timer = null;
    let cacheArgs = null;
    return function(...args){
     if(timer == null){
       cacheArgs = null;
       func(...args);
       timer = setTimeout(()=>{
         if(cacheArgs){
             func(...cacheArgs);
         }
         timer = null;
         cacheArgs = null;
       },wait);
     }else{
       // timer is blocked cache the args
       cacheArgs = args;
     }
    }
 }
 