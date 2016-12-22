function isArrayLike(obj) {
  /*jshint maxcomplexity:false */

  if ( Object.prototype.toString.call(obj) === '[object Array]' ) {
    // console.log('Is array.');
    return true;
  }

  if (typeof(obj) != 'object' && typeof(obj) != 'string') {
    // console.log('Is not object or string.');
    return false;
  }

  if (!obj.hasOwnProperty('length')) {
    // console.log('Is not have property: length.');
    return false;
  }

  var l = obj.length;
  if (typeof(l) != 'number' || l < 0) {
    // console.log('Wrong length: ' + l);
    return false;
  }

  if (Math.floor(l) != l) {
    // console.log('Length not whole number.');
    return false;
  }

  var propertys = (Object.getOwnPropertyNames(obj));
  // console.log('Prop:' + propertys);

  for (var j = 0; j < obj.length; j++) {
    // console.log('->  [' + j + '] ' + obj[j] + '  value type :' + typeof(obj[j]));
    if (propertys.indexOf(j + '') < 0) {
      // console.log('Index undefined: ' + j);
      return false;
   }
 }
  return true;
}

var s = '1.1';
var a = [NaN,2,3,null,5];
var b = {0: 0, 1: 1};
var c = {0: 'a', 1: 'b', 2: 'c'};
c.length = 3;
var d = {0: 0, 1: 1, 2: 3};
d.length = 3;

console.log(isArrayLike(s));
console.log(isArrayLike(a));
console.log(isArrayLike(b));
console.log(isArrayLike(c));
console.log(isArrayLike(d));
