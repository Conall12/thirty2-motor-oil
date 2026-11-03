/* Thirty2 mockup: contact form. Nothing is ever sent. */
(function () {
  'use strict';
  var form = document.getElementById('contact-form');
  var done = document.getElementById('form-success');
  if (!form || !done) return;

  /* Pre-select the enquiry type from ?type=trade|fleet|retail|other */
  var type = new URLSearchParams(location.search).get('type');
  var select = document.getElementById('c-type');
  if (type && select.querySelector('option[value="' + type.replace(/[^a-z]/g, '') + '"]')) select.value = type;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // mockup: never submit anywhere
    var name = form.elements.name.value.trim().split(/\s+/)[0];
    done.querySelector('[data-success-name]').textContent = name ? ', ' + name : '';
    form.reset();
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });

  done.querySelector('[data-reset-form]').addEventListener('click', function () {
    done.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
})();
