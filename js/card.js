'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var removeFirstChild = function (container) {
    while (container.firstElementChild) {
      container.firstElementChild.remove();
    }
  };
  var createCard = function (adv) {
    var card = similarCardTemplate.cloneNode(true);

    card.querySelector('.popup__title').textContent = adv.offer.title;
    card.querySelector('.popup__text--address').textContent = adv.offer.address;
    card.querySelector('.popup__text--price').innerHTML = adv.offer.price + '&#x20bd' + '<span>/ночь</span>';
    card.querySelector('.popup__type').textContent = window.data.appartList[adv.offer.type].title;
    card.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests;
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    card.querySelector('.popup__description').textContent = adv.offer.description;
    card.querySelector('.popup__avatar').src = adv.author.avatar;

    var cardFeatures = card.querySelector('.popup__features');
    var fragmentFeatures = document.createDocumentFragment();

    for (var i = 0; i < adv.offer.features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + adv.offer.features[i]);
      featureElement.textContent = window.data.featuresList[i];
      fragmentFeatures.append(featureElement);
    }

    removeFirstChild(cardFeatures);
    cardFeatures.append(fragmentFeatures);

    var photos = card.querySelector('.popup__photos');
    var fragmentPhotos = document.createDocumentFragment();

    for (var j = 0; i < adv.offer.photos.length; j++) {
      var photoElement = photos.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = adv.offer.photos[j];
      fragmentPhotos.appendChild(photoElement);
    }
    removeFirstChild(photos);
    photos.appendChild(fragmentPhotos);

    return card;
  };

  var renderCard = function () {
    var pinListener = function (evt) {
      if (
        evt.target
        && evt.target.matches('.map__pin:not(.map__pin--main)')
      ) {
        var oldCard = window.elements.map.querySelector('.map__card');
        if (oldCard) {
          oldCard.remove();
        }
        window.elements.mapPinsContainer.after(createCard(window.pin.advList[window.util.getRandom(1, 6)]));
      }
    };

    window.elements.mapPinsContainer.addEventListener('click', pinListener);

  };

  window.card = {
    createCard: createCard,
    renderCard: renderCard
  };
})();
