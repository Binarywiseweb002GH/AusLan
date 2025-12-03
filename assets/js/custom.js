var btn = $('#button');

$(window).on('scroll', function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
}).on('click', '#button', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, '300');
});


$(window).on('load', function () {
  // Preloader
  $('.loader').fadeOut();
  $('.loader-mask').delay(350).fadeOut('slow');
});

// wow js
new WOW().init();

// Our Team Section carousel js
$(function () {
  var owl = $('.our-team-con .owl-carousel');

  function initializeCarousel(marginValue) {
    owl.owlCarousel('destroy'); // Destroy existing instance if any
    owl.owlCarousel({
      margin: marginValue,
      nav: true,
      loop: true,
      dots: false,
      // navText: [
      //   "<i class='fa-solid fa-angle-left'></i>",
      //   "<i class='fa-solid fa-angle-right'></i>"
      // ],
      autoplay: true,
      autoplayTimeout: 6000,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        768: {
          items: 3
        },
        992: {
          items: 4
        }
      }
    });
  }

  function adjustMargin() {
    if (window.innerWidth <= 991) {
      initializeCarousel(20);
    } else {
      initializeCarousel(30); // Default margin for larger screens
    }
  }

  // Initial call to set the correct margin
  adjustMargin();

  // Adjust carousel on window resize
  $(window).on('resize', function () {
    adjustMargin();
  });
});

// comingsoon page countdown js
$(function () {
  if (document.getElementById("days") !== null) {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = '2025',
      dayMonth = "9/24/",
      birthday = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end

    const countDown = new Date(birthday).getTime(),
      x = setInterval(function () {
        const now = new Date().getTime(),
          distance = countDown - now;

        let days = Math.floor(distance / (day));
        let hours = Math.floor((distance % (day)) / (hour));
        let minutes = Math.floor((distance % (hour)) / (minute));
        let seconds = Math.floor((distance % (minute)) / second);

        document.getElementById("days").innerText = days,
          document.getElementById("hours").innerText = hours,
          document.getElementById("minutes").innerText = minutes,
          document.getElementById("seconds").innerText = seconds;

        //do something later when date is reached
        if (distance < 0) {
          clearInterval(x);
          var items = document.querySelectorAll(".compaign_countdown");
          for (var i = 0; i <= items.length; i++) {
            if (typeof items[i] !== 'undefined') {
              items[i].style.display = "none";
            }
          }
        }
        //seconds
      }, 0)
  }
}());
// Get the button
var backButton = document.getElementById("back-to-top-btn");

if ($('#back-to-top-btn').length) {

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backButton.style.display = "block";
    } else {
      backButton.style.display = "none";
    }
  }
  // When the user clicks on the button, scroll to the top of the document
  backButton.addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
}

// photo gallery script
$(function () {
  var $lightbox = $('#lightbox');
  $(document).on('click', '[data-target="#lightbox"]', function (event) {
    var $img = $(this).find('img'),
      src = $img.attr('src'),
      alt = $img.attr('alt'),
      css = {
        'maxWidth': $(window).width() - 100,
        'maxHeight': $(window).height() - 100
      };
    $lightbox.find('img').attr('src', src);
    $lightbox.find('img').attr('alt', alt);
    $lightbox.find('img').css(css);
  });
  $lightbox.on('shown.bs.modal', function (e) {
    var $img = $lightbox.find('img');
    $lightbox.find('.modal-dialog').css({
      'width': $img.width()
    });
    $lightbox.find('.close').removeClass('hidden');
  });
});
// photo gallery script for choosing images
var images = [
  "assets/images/gallery-img1.jpg",
  "assets/images/gallery-img2.jpg",
  "assets/images/gallery-img3.jpg",
  "assets/images/gallery-img4.jpg",
  "assets/images/gallery-img5.jpg",

  // Add more image paths as needed
];
var currentIndex = 0;
var popupImage = document.getElementById("popupImage");

if (popupImage) {
  popupImage.addEventListener("click", function () {
    // Update the src attribute with the next image path
    this.src = images[currentIndex];

    // Increment currentIndex or reset to 0 if it reaches the end
    currentIndex = (currentIndex + 1) % images.length;
  });
}

$(function () {

  var counters = $(".count");
  var countersQuantity = counters.length;
  var counter = [];

  for (i = 0; i < countersQuantity; i++) {
    counter[i] = parseInt(counters[i].innerHTML, 10);
  }

  var count = function (start, value, id) {
    var localStart = start;
    setInterval(function () {
      if (localStart < value) {
        localStart++;
        counters[id].innerHTML = localStart;
      }
    }, 40);
  }

  for (j = 0; j < countersQuantity; j++) {
    count(0, counter[j], j);
  }
});

$('.count').each(function () {
  $(this).prop('Counter', 0).animate({
    Counter: $(this).text()
  }, {
    duration: 3300,
    easing: 'swing',
    step: function (now) {
      $(this).text(Math.ceil(now));
    }
  });
});