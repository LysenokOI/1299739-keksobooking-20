'use strict';
var COUNT_ADS = 8;
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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

var getRandomList = function (list) {
  var i = getRandom(1, list.length+1);
  var j;
  var newArray = [];

  while (i--) {
    j = Math.floor(Math.random() * (i+1));
    [list[i], list[j]] = [list[j], list[i]];
    newArray.push(list[i]);
  }
  return newArray;
};

var removeFirstChild = function (container) {
  while (container.firstElementChild) {
    container.firstElementChild.remove();
  }
}

var createAdv = function (index) {
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
      price: getRandom(1500, 4800),
      type: getRandomItem(Object.keys(appartType)),
      rooms: getRandom(2, 4),
      guests: getRandom(2, 6),
      checkin: checkinAndOut,
      checkout: checkinAndOut,
      features: getRandomList(featuresList),
      description: 'Appartments description',
      photos: getRandomList(photosList)
    },
    location: pinLocation
  };
};

var renderPin = function (adv) {
  var pin = similarPinTemplate.cloneNode(true);
  var img = pin.querySelector('img');
  pin.style.left = adv.location.x - img.getAttribute('width') / 2 + 'px';
  pin.style.top = adv.location.y - img.getAttribute('height') + 'px';
  img.src = adv.author.avatar;
  img.alt = adv.offer.title;
  return pin;
};

var renderCard = function (adv) {
  var card = similarCardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = adv.offer.title;
  card.querySelector('.popup__text--address').textContent = adv.offer.address;
  card.querySelector('.popup__text--price').innerHTML = adv.offer.price + '&#x20bd' + '<span>/ночь</span>';
  card.querySelector('.popup__type').textContent = appartType[adv.offer.type];
  card.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests;
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
  card.querySelector('.popup__description').textContent = adv.offer.description;
  card.querySelector('.popup__avatar').src = adv.author.avatar;

  var cardFeatures = card.querySelector('.popup__features');
  var fragmentFeatures = document.createDocumentFragment();

  for (var i = 0; i < adv.offer.features.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', 'popup__feature--' + adv.offer.features[i]);
    featureElement.textContent = featuresList[i];
    fragmentFeatures.append(featureElement);
  }

  removeFirstChild(cardFeatures);
  cardFeatures.append(fragmentFeatures);

  var photos = card.querySelector('.popup__photos');
  var fragmentPhotos = document.createDocumentFragment();

  for (var i = 0; i < adv.offer.photos.length; i++) {
    var photoElement = photos.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = adv.offer.photos[i];
    fragmentPhotos.appendChild(photoElement);
  }
  removeFirstChild(photos);
  photos.appendChild(fragmentPhotos);

  return card;
};

var advList = [];

var fragmentPins = document.createDocumentFragment();
for (var i = 1; i <= COUNT_ADS; i++) {
  var adv = createAdv(i)
  advList.push(adv);
  fragmentPins.appendChild(renderPin(adv));
}

mapPins.appendChild(fragmentPins);

mapPins.after(renderCard(advList[0]));
