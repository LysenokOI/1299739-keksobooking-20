'use strict';

(function () {
  window.util = {
    getRandom: function (min, max) {
      return min + Math.floor((max - min) * Math.random());
    },
    getRandomItem: function (list) {
      return list[this.getRandom(0, list.length)];
    },
    getRandomList: function (list) {
      var i = this.getRandom(1, list.length+1);
      var j;
      var newArray = [];

      while (i--) {
        j = Math.floor(Math.random() * (i+1));
        [list[i], list[j]] = [list[j], list[i]];
        newArray.push(list[i]);
      }
      return newArray;
    },
    setDisableForms: function (item, status) {
      Array.prototype.forEach.call(item.children, function (element) {
        element.disabled = status;
      });
    },
  }
})();
