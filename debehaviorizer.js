function debehaviorize() {
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
        // console.log('delete: ' + fun[i]);
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
    // console.log('fun props in work: ' + prop[index]);
    if (index == prop.length - 1) {
      //  console.log('--> return from recursive <--');
      return ;
    }
    index++;
    makeObjToReturn();
  }
}

var veryComplicatedObject = {};
veryComplicatedObject.isGoodDayToday = function isGoodDayToday() {return 'Yes';};
veryComplicatedObject.getSecInMin = function getSecInMin() {return 60;};
veryComplicatedObject.dayInYear = 365;
veryComplicatedObject.universeSize = Infinity;


var stateObj = debehaviorize(veryComplicatedObject);
console.log('Is good day today? : ' + stateObj.isGoodDayToday());
console.log('veryComplicatedObject: ' + Object.getOwnPropertyNames(veryComplicatedObject));
console.log('\n');

var onlyBehavior = debehaviorize(veryComplicatedObject, true);
console.log('onlyBehavior array: ' + onlyBehavior);
console.log('veryComplicatedObject: ' + Object.getOwnPropertyNames(veryComplicatedObject));
