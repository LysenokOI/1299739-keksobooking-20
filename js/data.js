'use strict';

(function () {
  var checkinTime = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
    appartList: appartList,
    featuresList: featuresList,
    createAdv: function (index, area) {
      var checkinAndOut = window.util.getRandomItem(checkinTime);
      var pinLocation = {
        x: window.util.getRandom(area.getBoundingClientRect().x, area.getBoundingClientRect().width),
        y: window.util.getRandom(window.mapSize.MAP_SIZE_VERT.min, window.mapSize.MAP_SIZE_VERT.max)
      };

      return {
        author: {
          avatar: 'img/avatars/user0' + index + '.png'
        },
        offer: {
          title: 'Header',
          address: pinLocation.x + ', ' + pinLocation.y,
          price: window.util.getRandom(1500, 4800),
          type: window.util.getRandomItem(Object.keys(appartList)),
          rooms: window.util.getRandom(2, 4),
          guests: window.util.getRandom(2, 6),
          checkin: checkinAndOut,
          checkout: checkinAndOut,
          features: window.util.getRandomList(featuresList),
          description: 'Appartments description',
          photos: window.util.getRandomList(photosList)
        },
        location: pinLocation
      };
    }
  };
})();
