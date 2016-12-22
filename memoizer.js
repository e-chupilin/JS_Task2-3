function isStringContainEnd(stringFull, stringEnd) {
  if(stringFull.length < stringEnd.length) {return false;}

  var isContain = true;
  for (var i = 0; i <= stringEnd.length - 1; i++) {
    if (stringEnd[stringEnd.length - 1 - i] != stringFull[stringFull.length - 1 - i]) {
    isContain = false;
      }
    }
    console.log('in func');
  return isContain;
}

function memoize(func) {
  var memo = {};
  var slice = Array.prototype.slice;

  if (typeof(func) != 'function') {
    throw 'Argument must be function.';
  }

  return function() {
    var args = slice.call(arguments);

    if (args in memo) {
      return memo[args];
    }
    else {
      return (memo[args] = func.apply(this, args));
    }
  };
}


var isStringContainEndMemo = memoize(isStringContainEnd);

console.log(isStringContainEndMemo('beginend', 'end'));
console.log(isStringContainEndMemo('beginend', 'end'));
