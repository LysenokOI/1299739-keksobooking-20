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

var getRandomList = function (list) {
  var i = getRandom(1, list.length);
  var j;
  var newArray = [];

  while (i--) {
    j = Math.floor(Math.random() * (i+1));
    [list[i], list[j]] = [list[j], list[i]];
    newArray.push(list[i]);
  }
  return newArray;
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

var generateAd = function (adv) {
  var pin = similarPinTemplate.cloneNode(true);
  var img = pin.querySelector('img');
  pin.style.left = adv.location.x - img.getAttribute('width') / 2 + 'px';
  pin.style.top = adv.location.y - img.getAttribute('height') + 'px';
  img.src = adv.author.avatar;
  img.alt = adv.offer.title;
  return pin;
};

var generateCard = function (adv) {
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
  price.innerHTML = adv.offer.price + '&#x20bd' + '<span>/ночь</span>';
  appartmentType.textContent = appartType[adv.offer.type];
  capacity.textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests;
  time.textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;

  var cardFeatures = card.querySelector('.popup__features');
  var featuresElements = cardFeatures.children;

  for (var featureElement = 0; featureElement < featuresElements.length; featureElement++) {
    for (var featureName = 0; featureName < adv.offer.features.length; featureName++) {
      if ( featuresElements[featureElement].classList.contains('popup__feature--' + adv.offer.features[featureName])) {
        featuresElements[featureElement].textContent = adv.offer.features[featureName];
      }
    }
    if (featuresElements[featureElement].textContent === '') {
      featuresElements[featureElement].style.visibility = 'hidden';
    }
  }

  description.textContent = adv.offer.description;

  var fragmentPhotos = document.createDocumentFragment();
  for (var photo = 0; photo < adv.offer.photos.length; photo++) {
    var photoElement = photos.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = adv.offer.photos[photo];
    console.log(photoElement);
    fragmentPhotos.appendChild(photoElement);
  }
  /*while (photos.firstElementChild) {
    photos.firstElementChild.remove;
  }*/
  photos.appendChild(fragmentPhotos);

  avatar.src = adv.author.avatar;
  console.log(card);
  return card;
};


var renderAds = function (index) {
  var fragmentAds = document.createDocumentFragment();
  var fragmentCards = document.createDocumentFragment();

  fragmentAds.appendChild(generateAd(createAd(index)));
  fragmentCards.appendChild(generateCard(createAd(index)));

  mapPins.appendChild(fragmentAds);
  mapPins.insertAfter(fragmentCards);
  console.log(mapPins);
};


for (var i = 1; i <= COUNT_ADS; i++) {
  renderAds(i);
}
