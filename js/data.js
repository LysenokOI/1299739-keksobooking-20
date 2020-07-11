'use strict';

(function () {
  var MAP_SIZE_VERT = {
    min: 130,
    max: 630
  };
  var pins = [];
  var appartList = {
    palace: {
      title: 'Дворец',
      minPrice: 10000
    },
    flat: {
      title: 'Квартира',
      minPrice: 1000
    },
    house: {
      title: 'Дом',
      minPrice: 5000
    },
    bungalo: {
      title: 'Бунгало',
      minPrice: 0
    }
  };

  window.data = {
    MAP_SIZE_VERT: MAP_SIZE_VERT,
    appartList: appartList,
    pins: pins
  };
})();
