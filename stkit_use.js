 var stkit = require('./modules/stkit.js').STKit;
 console.log(stkit.isArrayLike(1+1));
 console.log(stkit.semicolonSon(';key,value;arrayHere:methodName,|function (a) { return a + 1; }|;arrayHere:key2,NaN'));
