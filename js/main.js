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


var mapFilter = map.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var activationForms = [mapFilter, adForm];

var setDisableForms = function (item, status) {
  Array.prototype.forEach.call(item.children, function (element) {
    element.disabled = status;
  });
};

var setPageStatus = function (status) {
  if (status) {
    map.classList.remove('map--faded');
  }
  activationForms.forEach(function (element) {
    if (status) {
      setDisableForms(element, !status);
    } else {
      setDisableForms(element, !status)
    }
  });
};

setPageStatus(false);

var mapPinMain = map.querySelector('.map__pin--main');

var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + + pageYOffset,
    left: box.left + pageXOffset
  };
};

var pinMainCenterX = mapPinMain.getBoundingClientRect().width/2;
var pinMainCenterY = mapPinMain.getBoundingClientRect().height/2;
var mainPinCoords = {
  x: Math.round(mapPinMain.offsetLeft + pinMainCenterX),
  y: Math.round(mapPinMain.offsetTop + pinMainCenterY)
}

var adAddressInput = adForm.querySelector('#address');
var setAddressInputValue = function (coords) {
  adAddressInput.value = coords.x + ', ' + coords.y;
}

setAddressInputValue(mainPinCoords);

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setPageStatus(true);
  }
});

var pinMainAfter = window.getComputedStyle(mapPinMain, ':after');
var getPinSize = function() {
  return {
    width: mapPinMain.getBoundingClientRect().width,
    height: mapPinMain.getBoundingClientRect().height + Number(pinMainAfter.height.split('px', 1))
  };
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    setPageStatus(true);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    }

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };


      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinMouseCoords = function () {
        return {
          x: mapPinMain.offsetLeft - shift.x,
          y: mapPinMain.offsetTop - shift.y
        }
      }

      var checkPinCoords = function () {
        if (pinMouseCoords().y < 130) {
          mapPinMain.style.top = 130 + 'px'
        }
        if (pinMouseCoords().y > 630) {
          mapPinMain.style.top = 630 + 'px';
        }
        if (pinMouseCoords().x < - getPinSize().width/2 ) {
          mapPinMain.style.left = - getPinSize().width/2 + 'px';
        }
        var mapRightBoundery = map.getBoundingClientRect().width - getPinSize().width/2;
        if (pinMouseCoords().x > mapRightBoundery) {
          mapPinMain.style.left = mapRightBoundery + 'px';
        }
      }();


      mapPinMain.style.left = pinMouseCoords().x + 'px';
      mapPinMain.style.top = pinMouseCoords().y + 'px';

      mainPinCoords = {
        x: mapPinMain.offsetLeft + Math.round(getPinSize().width/2),
        y: mapPinMain.offsetTop + getPinSize().height
      }

      setAddressInputValue(mainPinCoords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove );
    document.addEventListener('mouseup', onMouseUp);
  }
});


