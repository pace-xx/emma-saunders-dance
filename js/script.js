document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form: builds a pre-filled mailto so messages reach an inbox
  // even before this static site is wired up to a real form backend
  // (e.g. Formspree / Netlify Forms).
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var message = form.querySelector('#message').value.trim();
      var status = form.querySelector('.form-status');

      if (!name || !email || !message) {
        status.textContent = 'Please fill in your name, email and message.';
        status.className = 'form-status visible err';
        return;
      }

      var to = form.getAttribute('data-to') || '';
      var subject = encodeURIComponent('Website enquiry from ' + name);
      var body = encodeURIComponent(
        message + '\n\n---\nName: ' + name + '\nEmail: ' + email + (phone ? '\nPhone: ' + phone : '')
      );
      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;

      status.textContent = 'Opening your email app to send this message…';
      status.className = 'form-status visible ok';
    });
  }
});
