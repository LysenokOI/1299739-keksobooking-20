'use strict';

(function () {
  var map = document.querySelector('.map');
  window.mapSize = {
    MAP_SIZE_VERT: {
      min: 130,
      max: 630
    },
    mapStartX: map.getBoundingClientRect().x,
    mapEndX: map.getBoundingClientRect().width,
    map: map
  };
})();
