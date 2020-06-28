'use strict';

(function () {

  var setAddressInputValue = function (addressForm, coords) {
    addressForm.value = coords.x + ', ' + coords.y;
  };

  var titleCheck = function (elem) {
    elem.required = true;
    elem.minLength = 30;
    elem.maxLength = 100;
  };

  var capacityCheck = function (capacity, roomNumber) {
    if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Не для гостей');
    } else if (capacity.value === '0' && roomNumber.value !== '100') {
      roomNumber.setCustomValidity('Выберите 100 комнат');
    } else if (roomNumber.value < capacity.value) {
      var guestEnding = (roomNumber.value === '1') ? ' гостя' : ' гостей';
      capacity.setCustomValidity('Не больше ' + roomNumber.value + guestEnding);
    } else {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  };

  var roomCapacityCheck = function (capacity, roomNumber) {
    capacityCheck(capacity, roomNumber);
    roomNumber.addEventListener('change', function () {
      capacityCheck(capacity, roomNumber);
    });
    capacity.addEventListener('change', function () {
      capacityCheck(capacity, roomNumber);
    });
  };

  var priceCheck = function (type, price) {
    var appartMinPrice = window.data.appartList[type.value].minPrice;
    price.min = appartMinPrice;
    price.placeholder = appartMinPrice;
  };

  var appartPriceCheck = function (type, price) {
    priceCheck(type, price);
    type.addEventListener('change', function () {
      priceCheck(type, price);
    });
  };

  var priceInputCheck = function (elem) {
    elem.required = true;
    elem.max = 1000000;
  };

  var setCheckinTime = function (checkin, checkout) {
    checkout.addEventListener('change', function () {
      checkin.value = checkout.value;
    });
    checkin.addEventListener('change', function () {
      checkout.value = checkin.value;
    });
  };

  window.form = {
    roomCapacityCheck: roomCapacityCheck,
    setAddressInputValue: setAddressInputValue,
    titleCheck: titleCheck,
    appartPriceCheck: appartPriceCheck,
    priceInputCheck: priceInputCheck,
    setCheckinTime: setCheckinTime
  };
})();
