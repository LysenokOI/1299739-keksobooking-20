'use strict';

(function () {


  var setAddressInputValue = function (addressForm, coords) {
    addressForm.value = coords.x + ', ' + coords.y;
  };

  var capacityCheck = function (capacity, roomNumber) {
    console.log(roomNumber.value);
    console.log(capacity.value);
    if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Не для гостей');
    } else if (capacity.value === '0' && roomNumber.value !== '100') {
      roomNumber.setCustomValidity('Выберите 100 комнат');
    } else if (roomNumber.value < capacity.value) {
      capacity.setCustomValidity('Не больше ' + roomNumber.value + ' гостей');
    } else {
      capacity.setCustomValidity('');
      roomNumber.setCustomValidity('');
    }
  };

  window.form = {
    capacityCheck: capacityCheck,
    setAddressInputValue: setAddressInputValue
  };
})();
