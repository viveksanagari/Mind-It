'use strict';
(function() {
  var time_ticks;
  var seconds;
  var point_calculator;
  var opened_cards;
  var points = document.getElementsByClassName('points')[0];
  var timer = document.getElementsByClassName('timer')[0];
  var stop = document.getElementsByClassName('finish')[0];

  function play_cards() {
    var card = document.getElementsByClassName('card');
    var all_cards = ["url('images/5.png')", "url('images/6.png')", "url('images/7.png')", "url('images/8.png')", "url('images/9.png')", "url('images/10.png')", "url('images/5.png')", "url('images/6.png')", "url('images/7.png')", "url('images/8.png')", "url('images/9.png')", "url('images/10.png')"];

    seconds = 29;
    point_calculator = 0;
    opened_cards = [];

    stop.style.display = 'none';

    shuffle(all_cards);

    for (var i = 0; i < card.length; i++) {
      if(card[i].classList.contains('flipped')) {
        card[i].classList.toggle('flipped');
      }
      card[i].querySelector('.close').style.backgroundImage = all_cards[i];
      card[i].addEventListener('click', flip);
    }
    points.innerText = '00';

    startTimer();
  }

  function flip() {
    if (!this.classList.contains('flipped') && opened_cards.length < 2) {
      this.classList.toggle('flipped');

      opened_cards.push(this);

      if (opened_cards.length === 2) {
        checkMatch();
      }
    }
  }

  function checkMatch() {
    if (opened_cards[0].querySelector('.close').style.backgroundImage === opened_cards[1].querySelector('.close').style.backgroundImage) {
      opened_cards = [];

      points.innerText = '0' + ++point_calculator;
    }
    else {
      setTimeout(flipBack, 1500);
    }
  }

  function flipBack() {
    opened_cards[0].classList.toggle('flipped');
    opened_cards[1].classList.toggle('flipped');

    opened_cards = [];
  }

  function startTimer() {
    timer.innerText = '0:30';
    time_ticks = setInterval(decrementTime, 1000);
  }

  function decrementTime() {
    if (seconds === 0) {
      timer.innerText = '0:0' + seconds;
      clearInterval(time_ticks);
      complete();
    }
    if (seconds < 10) {
      timer.innerText = '0:0' + seconds;
    }
    if (seconds >= 10) {
      timer.innerText = '0:' + seconds;
    }
    if (point_calculator === 8){
      clearInterval(time_ticks);
      complete();
    }
    seconds--;
  }

  function complete() {
    var restart = document.getElementsByTagName('button')[0];
    restart.addEventListener('click', play_cards);

    stop.style.display = 'flex';

    if (point_calculator === 6) {
      stop.querySelector('h1').innerText = 'you win';
    }
    else {
      stop.querySelector('h1').innerText = 'Good luck next time';
    }
    stop.querySelector('.final-score').innerText = 'score: ' + point_calculator;
    stop.querySelector('.time').innerText = 'time left: ' + seconds + ' sec.';
  }

  function shuffle(pack) {
    for (var i = pack.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      pack[j] = [pack[i], pack[i] = pack[j]][0];
    }
    return pack;
  }

  play_cards();
})();
