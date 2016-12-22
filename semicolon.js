function semicolonSon (s) {
  var SEMICOLON = ':,;';
  var array = [];
  var currentArray = array;
  var key = '';

  while(hasNext(s)) {
    if (isNextObj(s)) {
        s = deleteSemicolonAtStart(s);
        key = nextElement(s);
        currentArray[key] = [];
        currentArray = currentArray[key];
        s = deleteElementAtStart(s);
        s = deleteSemicolonAtStart(s);
    } else {
        s = deleteSemicolonAtStart(s);
        key = nextElement(s);
        s = deleteElementAtStart(s);
        s= deleteSemicolonAtStart(s);
        var val = nextElement(s);
        if (isFun(val)) {
          /*jshint -W054 */
          // In example: var adder = new Function('a', 'b', 'return a + b');
          currentArray[key] = new Function(getFunAtrr(val), getFunBody(val));
            } else {
              currentArray[key] = val;
      }
      s = deleteElementAtStart(s);
      s = deleteSemicolonAtStart(s);
    }
  }
  return array;

  function hasNext(str) {
    for(var i = 0; i <= str.length - 1; i++) {
      switch (str[i]) {
        case SEMICOLON.charAt(0): return true;
        case SEMICOLON.charAt(1): return true;
        case SEMICOLON.charAt(2): return true;
      }
    }
    return false;
  }

  function nextElement(str) {
  var isFunBody = false;
  for(var i = 0; i <= str.length - 1; i++) {
      for(var j = 0; j <= SEMICOLON.length - 1; j++) {
        if (str.charAt(i) == '|') {
          isFunBody = !isFunBody;
        }
        if (!isFunBody && str.charAt(i) == SEMICOLON.charAt(j)) {
          return str.slice(0,i);
        }
      }
    }
    return str;
  }

  function deleteSemicolonAtStart(str) {
    for(var i = 0; i <= SEMICOLON.length - 1; i++){
    if (str.charAt(0) == SEMICOLON[i]) {
      return str.slice(1,str.length);
    }
  }
    return str;
  }

  function deleteElementAtStart(str) {
    var isFunBody = false;

    for(var i = 0; i <= str.length - 1; i++) {
      for(var j = 0; j <= SEMICOLON.length - 1; j++) {
        if (str.charAt(i) == '|') {
          isFunBody = !isFunBody;
        }
        if (!isFunBody && str.charAt(i) == SEMICOLON.charAt(j)) {
        return str.slice(i,str.length);
        }
      }
    }
    return str;
  }

  function isNextObj(str) {
    for(var i = 0; i <= str.length - 1; i++) {
      switch (str[i]) {
        case SEMICOLON.charAt(0): return true;
        case SEMICOLON.charAt(1): return false;
        case SEMICOLON.charAt(2): return false;
      }
    }
  }

  function isFun(str) {
    var reg = new RegExp('^\\|.+\\|$');
    return (str.search(reg) < 0) ? false : true;
  }

  function deleteSemicolons(str) {
    str = str.slice(1, str.length);
    return str.slice(0, str.length - 1);
  }

  function getFunBody(str) {
    str = deleteSemicolons(str);
    return (str.search(/^function/) < 0) ? str : str.match(/{.+}/i);
  }

  function getFunAtrr(str) {
    var array = [];
    str = (str.search(/^|function/) < 0) ? '()' : (str.match(/\(.+\)/i)) + '';
    str = deleteSemicolons(str);
    array = str.split(',');
    return array;
  }

}

var son = semicolonSon(';key,value;arrayHere:methodName,|function (a) { return a + 1; }|;arrayHere:key2,NaN');
// var son = semicolonSon(';key,value;methodName,|return true|;');
console.log('Result array:');
console.log(son);
console.log('\n');
console.log('Function result: ' + son.arrayHere.methodName(2));
// console.log('Function result: ' + son.methodName());
