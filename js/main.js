// requirejs.config({
//     baseUrl: './public/js'
// });
//
// define(["jquery", "domReady"], function($) {
//     "use strict";
//
// });
function smoothScroll() {
    var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
        V = 0.4;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
    for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
            e.preventDefault(); //отменяем стандартное поведение
            var w = window.pageYOffset,  // производим прокрутка прокрутка
                hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
            var t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
                start = null;
            requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
                window.scrollTo(0, r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash  // URL с хэшем
                }
            }
        }, false);
    }
}

function stickyHeader() {
    window.onscroll = function () {
        myFunction()
    };
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }
}

function dropDownMenuHeader() {
    document.getElementById(['menu_label']).addEventListener("click", toggleClass);

    function toggleClass() {
        if (window.matchMedia("(min-width: 576px)").matches) {
            document.getElementById(['logo']).classList.toggle('close');
            document.getElementById(['telegramNav']).classList.toggle('close');
            document.getElementById(['navMenuMobileRight']).classList.toggle('open');
            document.getElementById(['navMenuMobileLeft']).classList.toggle('open');
        }
        else {
            document.getElementById(['nav-menu']).classList.toggle('on');
        }
    }
}

var handleMatchMedia = function (mediaQuery) {
        if (mediaQuery.matches) {
            stickyHeader();
        }
    },
    mql = window.matchMedia('all and (min-width: 576px)');

handleMatchMedia(mql);
mql.addListener(handleMatchMedia);

smoothScroll();
dropDownMenuHeader();