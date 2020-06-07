'use strict';
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var similarPinTemplate = document. querySelector('#pin')
    .content
    .querySelector('.map__pin');

map.classList.remove('map--faded');

var flatType = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapStartX = map.getBoundingClientRect().x;
var mapEndX = map.getBoundingClientRect().x + map.getBoundingClientRect().width;

var getRandom = function (min, max) {
  return min + Math.floor((max - min) * Math.random());
};

var getRandomItem = function (list) {
  return list[getRandom(0, list.length)];
};

var getRandomListLength = function (list) {
  return list.slice(0, getRandom(0, list.length));
};

var checkinAndOut = getRandomItem(checkinTime);
var pinLocation = {
  x: getRandom(mapStartX, mapEndX),
  y: getRandom(130, 630)
};

var createAd = function (index) {
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

var renderAd = function (adv) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pin = pinElement.querySelector('.map__pin');
  var img = pinElement.querySelector('img');
  console.log(adv);
  console.log(pinElement);
  pin.style.left = adv.location.x + adv.getBoundingClientRect().width / 2 + 'px;';
  pin.style.top = adv.location.y - adv.getBoundingClientRect().height + 'px;';
  img.src = adv.author.avatar;
  img.alt = adv.author.title;
  return pinElement;
};

var createAds = function (min, max) {
  var fragment = document.createDocumentFragment();
  for (var i = min; i <= max; i++) {
    var advertising = createAd(i);
    console.log('advertising' + advertising);
    fragment.appendChild(renderAd(advertising));
  }
  return mapPins.appendChild(fragment);
};

createAds(1, 8);
