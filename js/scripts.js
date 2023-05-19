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
    console.log(sectionId);
    
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".navigation ul li a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".navigation ul li  a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}

/*
document.addEventListener('scroll', function () {

    let sections = document.querySelectorAll("section");
    let childrenNodeArr = Array.from(sections);
    const elemFound1 = childrenNodeArr.find(
        e =>
          e.classList.contains("about-me")
      );
    sections.forEach(section => {
     // console.log(typeof section);
     
        if (isInViewport(section, true)===true){
            


            
            if (elemFound1) {
              let link1 = document.getElementById('jumpToAboutMe');
              console.log(link1);
              addClass(link1,'highlighted');
            }
        }

    })
});

*/

// https://dev.to/albertomontalesi/javascript-tutorial-create-a-smooth-scroll-navigation-17kp

document.addEventListener("DOMContentLoaded", () => {
    //  little hack to detect if the user is on ie 11
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    // get all the links with an ID that starts with 'sectionLink'
    const listOfLinks = document.querySelectorAll("a[href^='#sectionLink");
     
    // loop over all the links
    listOfLinks.forEach(function (link) {
      // listen for a click
      link.addEventListener('click',  () => {
        // toggle highlight on and off when we click a link
        listOfLinks.forEach( (link) => {
          if (link.classList.contains('highlighted')) {
            link.classList.remove('highlighted');
          }
        });
        link.classList.add('highlighted');
        // get the element where to scroll
        let ref = link.href.split('#sectionLink');
        ref = "#section" + ref[1];
        // ie 11 does not support smooth scroll, so we will simply scroll
        if (isIE11) {
          window.scrollTo(0, document.querySelector(ref).offsetTop);
        } else {
          window.scroll({
            behavior: 'smooth',
            left: 0,
            // top gets the distance from the top of the page of our target element
            top: document.querySelector(ref).offsetTop - 100
          });
        } 
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
    logo.src = "./imgs/logo-mobile.svg"
    addClass(document.getElementById('header'), 'thin');    
   }
   else{
    logo.src = "./imgs/logo.svg";
    removeClass(document.getElementById('header'), 'thin');  
   }

});