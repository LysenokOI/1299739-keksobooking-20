'use strict';

(function () {
  var checkinTime = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var appartType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.data = {
    appartType: appartType,
    featuresList: featuresList,
    createAdv: function (index) {
      var checkinAndOut = window.randomize.getRandomItem(checkinTime);
      var pinLocation = {
        x: window.randomize.getRandom(window.mapSize.mapStartX, window.mapSize.mapEndX),
        y: window.randomize.getRandom(window.mapSize.MAP_SIZE_VERT.min, window.mapSize.MAP_SIZE_VERT.max)
      };

      return {
        author: {
          avatar: 'img/avatars/user0' + index + '.png'
        },
        offer: {
          title: 'Header',
          address: pinLocation.x + ', ' + pinLocation.y,
          price: window.randomize.getRandom(1500, 4800),
          type: window.randomize.getRandomItem(Object.keys(appartType)),
          rooms: window.randomize.getRandom(2, 4),
          guests: window.randomize.getRandom(2, 6),
          checkin: checkinAndOut,
          checkout: checkinAndOut,
          features: window.randomize.getRandomList(featuresList),
          description: 'Appartments description',
          photos: window.randomize.getRandomList(photosList)
        },
        location: pinLocation
      };
    }
  };
})();
