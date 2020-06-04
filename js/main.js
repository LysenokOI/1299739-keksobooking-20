'use strict';

var formatNum = function (string) {
  return string.toString().padStart(2, '0');
};

var getShuffle = function (array) {
  var i = array.length;
  var j;

  while (i--) {
    j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

var createArray = function (min, max) {
  var array = [];
  for (var i = min; i <= max; i++ ) {
    array.push(i);
  }
  return array;
};

var createObject = function (min, max) {
  for (var i = 0; i < max - min; i++) {
    return {
      'author': {
        'avatar': 'img/avatars/user' + formatNum(getShuffle(createArray(min, max))[i]) + '.png'
      }
    };
  }
};
