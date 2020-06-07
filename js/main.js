'use strict';
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var similarCardTemplate = document.querySelector('#card')


map.classList.remove('map--faded');

var flatType = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapStartX = map.getBoundingClientRect().x;
var mapEndX = mapStartX + map.getBoundingClientRect().width;

var getRandom = function (min, max) {
  return min + Math.floor((max - min) * Math.random());
};

var getRandomItem = function (list) {
  return list[getRandom(0, list.length)];
};

var getRandomListLength = function (list) {
  return list.slice(0, getRandom(0, list.length));
};

var createAd = function (index) {
  var checkinAndOut = getRandomItem(checkinTime);
  var pinLocation = {
    x: getRandom(mapStartX, mapEndX),
    y: getRandom(130, 630)
  };

  return {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    },
    offer: {
      title: 'Header',
      address: pinLocation.x + ', ' + pinLocation.y,
      price: 1500,
      type: getRandomItem(flatType),
      rooms: 3,
      guests: 5,
      checkin: checkinAndOut,
      checkout: checkinAndOut,
      features: getRandomListLength(featuresList),
      description: 'Appartments description',
      photos: getRandomListLength(photosList)
    },
    location: pinLocation
  };
};

var modifyAd = function (adv) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var img = pinElement.querySelector('img');
  pinElement.style.left = adv.location.x - img.getAttribute('width') / 2 + 'px';
  pinElement.style.top = adv.location.y - img.getAttribute('height') + 'px';
  img.src = adv.author.avatar;
  img.alt = adv.offer.title;
  return pinElement;
};

var renderAd = function (min, max) {
  var fragment = document.createDocumentFragment();
  for (var i = min; i <= max; i++) {
    fragment.appendChild(modifyAd(createAd(i)));
  }
  mapPins.appendChild(fragment);
};

renderAd(1, 8);
