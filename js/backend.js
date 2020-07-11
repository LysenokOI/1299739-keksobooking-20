'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var SUCCSESS__CODE = 200;
  var MAX__EXPECTATION = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = MAX__EXPECTATION;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCSESS__CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Server answer: ' + xhr.status + ' ' + xhr.statusText);
      }
      xhr.addEventListener('error', function () {
        onError('Connection failed');
      });
      xhr.addEventListener('timeout', function () {
        onError('No answer for ' + xhr.timeout + 'ms');
      });
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
