exports.STKit = (function () {

  function isArrayLikeFun(obj) {
    /*jshint maxcomplexity:false */
    if ( Object.prototype.toString.call(obj) === '[object Array]' ) {
      return true;
    }

    if (typeof(obj) != 'object' && typeof(obj) != 'string') {
      return false;
    }

    if (!obj.hasOwnProperty('length')) {
      return false;
    }

    var l = obj.length;
    if (typeof(l) != 'number' || l < 0) {
      return false;
    }

    if (Math.floor(l) != l) {
      return false;
    }

    var propertys = (Object.getOwnPropertyNames(obj));

    for (var j = 0; j < obj.length; j++) {
      if (propertys.indexOf(j + '') < 0) {
        return false;
     }
   }
    return true;
  }

  function semicolonSonFun (s) {
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

  function memoizeFun(func) {
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

  function debehaviorizeFun() {
    var isBehaviorSeparate = typeof(arguments[1]) == 'boolean' ? arguments[1] : false;
    var fun = arguments[0];
    var prop = Object.getOwnPropertyNames(fun);
    var index = 0;
    var objToReturn = {};

    if (typeof(fun) != 'object') {
      throw 'Data error: not object in function arguments.';
    }
    if (isLock(fun)) {
      throw 'Object debehaviorize error: input object is frozen or seal.';
    }

    makeObjToReturn();

    return isBehaviorSeparate ? makeArray() : objToReturn;

    function isLock(obj) {
      return (Object.isFrozen(obj) || Object.isSealed(obj)) ? true : false;
    }

    function makeArray() {
      var arr = [];
      arr = Object.keys(objToReturn).map(function (key) { return objToReturn[key]; });
      for (var i in objToReturn) {
        if (fun.hasOwnProperty(i)) {
          delete fun[i];
        }
      }
      return arr;
    }
      function makeObjToReturn() {
      var key = '' + prop[index];
      var funToSet = fun[prop[index]];
      if (typeof(funToSet) == 'function') {
        if (isLock(funToSet)) {
          throw 'Object debehaviorize error: function in object is frozen or seal.';
        }
        objToReturn[key] = fun[prop[index]];
      }
      if (index == prop.length - 1) {
        return ;
      }
      index++;
      makeObjToReturn();
    }
  }
        return {
            isArrayLike: isArrayLikeFun,
            semicolonSon: semicolonSonFun,
            memoize: memoizeFun,
            debehaviorize: debehaviorizeFun
        };

    })();
