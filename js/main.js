'use strict';
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

map.classList.remove('map--faded');

var appartType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

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
      type: getRandomItem(Object.keys(appartType)),
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
  var pin = similarPinTemplate.cloneNode(true);
  var img = pin.querySelector('img');
  pin.style.left = adv.location.x - img.getAttribute('width') / 2 + 'px';
  pin.style.top = adv.location.y - img.getAttribute('height') + 'px';
  img.src = adv.author.avatar;
  img.alt = adv.offer.title;
  return pin;
};

var modifyCard = function (adv) {
  var card = similarCardTemplate.cloneNode(true);
  var title = card.querySelector('.popup__title');
  var address = card.querySelector('.popup__text--address');
  var price = card.querySelector('.popup__text--price');
  var appartmentType = card.querySelector('.popup__type');
  var capacity = card.querySelector('.popup__text--capacity');
  var time = card.querySelector('.popup__text--time');
  var description = card.querySelector('.popup__description');
  var photos = card.querySelector('.popup__photos');
  var avatar = card.querySelector('.popup__avatar');

  title.textContent = adv.offer.title;
  address.textContent = adv.offer.address;
  console.log(adv.offer.price);
  price.innerHTML += adv.offer.price + '&#x20bd' + '<span>/ночь</span>';
  console.log(price);
  appartmentType.textContent = appartType[adv.offer.type];
  capacity.textContent = adv.offer.rooms + ' комнаты для' + adv.offer.guests;
  time.textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;

  var features = card.querySelector('.popup__features');
  featuresList = features.children;
  for (var i = 0; i < adv.features.length; i++) {
    featuresList[i].textContent = adv.features[i];
  }

  description.textContent = adv.offer.description;
  var fragmentPhotos = document.createDocumentFragment();
  for (var photo = 0; photo < adv.photos.length; photo++) {
    var photoElement = photos.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = adv.offer.photos[i];
    photoElement.appendChild(fragmentPhotos);
  }
  photos.appendChild(fragmentPhotos);

  avatar.src = adv.author.avatar;
  return card;
};

var renderAd = function (min, max) {
  var fragmentAds = document.createDocumentFragment();
  var fragmentCards = document.createDocumentFragment();
  for (var i = min; i <= max; i++) {
    fragmentAds.appendChild(modifyAd(createAd(i)));
    fragmentCards.appendChild(modifyCard(createAd(i)));
    console.log(modifyCard(createAd(i)));
    console.log(createAd(i));
  }
  mapPins.appendChild(fragmentAds);
  mapPins.insertAfter(fragmentsCards);
  console.log(mapPins);
};

renderAd(1, 8);
