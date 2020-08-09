'use strict';

(function () {
  var MapSizeVert = {
    MIN: 130,
    MAX: 630
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
    MapSizeVert: MapSizeVert,
    appartList: appartList,
    pins: pins
  };
})();
