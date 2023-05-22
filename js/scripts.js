//Helper Functions
//https://ultimatecourses.com/blog/javascript-hasclass-addclass-removeclass-toggleclass

function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}


const isInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };

//Navigation

// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  
  // Get current scroll position
  let scrollY = window.pageYOffset;
  
  // Now we loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");
    let navLink = document.querySelector(".navigation ul li a[href*=" + sectionId + "]");
    
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
}

// https://dev.to/albertomontalesi/javascript-tutorial-create-a-smooth-scroll-navigation-17kp

document.addEventListener("DOMContentLoaded", () => {
    //  little hack to detect if the user is on ie 11
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    // get all the links with an ID that starts with 'sectionLink'
    const listOfLinks = document.querySelectorAll("a[href^='#section");
     
    // loop over all the links
    listOfLinks.forEach(function (link) {
      // listen for a click
      link.addEventListener('click',  (event) => {
        // toggle highlight on and off when we click a link
        listOfLinks.forEach( (link) => {
          if (link.classList.contains('active')) {
            link.classList.remove('active');
          }
        });
        link.classList.add('active');
        // get the element where to scroll
        let ref = link.href.split('#section');
        ref = "#section" + ref[1];
        // ie 11 does not support smooth scroll, so we will simply scroll
        if (isIE11) {
          window.scrollTo(0, document.querySelector(ref).offsetTop);
        } else {
          window.scroll({
            behavior: 'smooth',
            left: 0,
            // top gets the distance from the top of the page of our target element
            top: document.querySelector(ref).offsetTop
          });
        } 
        event.preventDefault();
      })
    })
  })
//Change header on scroll

let lastScrollTop = 0;
let logo = document.getElementById('logo');
let scrollTop = document.getElementById('main').offsetTop;

window.addEventListener("scroll", (event) => {
   let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426" 
   if (st > lastScrollTop) {

    addClass(document.getElementById('header'), 'thin');
    document.querySelector(".navigation ul").classList.add("visible");    
   }
   else{

    removeClass(document.getElementById('header'), 'thin');
    document.querySelector(".navigation ul").classList.remove("visible");  
   }

});

//CTA's scroll

let cta1 = document.querySelector(".about-me .cta");

cta1.addEventListener('click', function(event){
  window.scroll({
    behavior: 'smooth',
    left: 0,
    // top gets the distance from the top of the page of our target element
    top: document.querySelector('.skills').offsetTop    
  });
  event.preventDefault();
})

let cta2 = document.querySelector(".skills .text .cta");

cta2.addEventListener('click', function(event){
  window.scroll({
    behavior: 'smooth',
    left: 0,
    // top gets the distance from the top of the page of our target element
    top: document.querySelector('.projects').offsetTop    
  });
  event.preventDefault();
})


// Sliders

const leftArrows = document.querySelectorAll(".left-arrow"),
  rightArrows = document.querySelectorAll(".right-arrow")
  //slider = document.getElementsByClassName(".slider[num]");

  const listOfSliders = document.querySelectorAll("div[class^=sliderNum]");
  console.log(leftArrows);

/**
 * @brief Scroll to the right
 */
function scrollRight(slider) {

  //console.log(listOfSliders)

  listOfSliders.forEach(slider => {
    let ref = slider.className.split('sliderNum');
    ref = ".sliderNum" + ref[1];
    let elem = document.querySelector(ref).className;
  
    if (ref.scrollWidth - ref.clientWidth === ref.scrollLeft) {
      document.querySelector(ref).scrollTo({
        left: 0,
        behavior: "smooth"
      });
    } else {
      console.log(ref);
      document.querySelector(ref).scrollBy({
        left: window.innerWidth,
        behavior: "smooth"
      });
    }

  })

}

/**
 * @brief Scroll to the left
 */
function scrollLeft(slider) {

  //console.log('left');
  listOfSliders.forEach(slider => {
    let ref = slider.className.split('sliderNum');
    ref = ".sliderNum" + ref[1];
    let elem = document.querySelector(ref).className;
    document.querySelector(ref).scrollBy({
    left: -window.innerWidth,
    behavior: "smooth"
  });
  })
}

// Auto slider
let timerId = setInterval(scrollRight, 5000);

/**
 * @brief Reset timer for scrolling right
 */
function resetTimer() {
  clearInterval(timerId);
  timerId = setInterval(scrollRight, 5000);
}


// Scroll Events

leftArrows.forEach(leftArrow => {
    leftArrow.addEventListener("click", function (ev) {
    scrollLeft();
    resetTimer(); 
  })
});

rightArrows.forEach(rightArrow =>{
  rightArrow.addEventListener("click", function (ev) {
  scrollRight();
  resetTimer(); 
})
});

