// Skjuler demolinjen når adressen inneholder ?ren (fint til opptak av skjermleserdemoen).
(function () {
  if (new URLSearchParams(location.search).has('ren')) {
    var linje = document.querySelector('.demolinje');
    if (linje) linje.remove();
  }
})();
