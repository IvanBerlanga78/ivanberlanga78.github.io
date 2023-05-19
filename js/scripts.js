//Navigation

document.getElementById('jumpToTop').addEventListener('click', function(){

    let scrollTop = document.getElementById('about-me').offsetTop;
    window.scrollTo({ top: scrollTop, behavior: 'smooth'});
})

document.getElementById('jumptoSkills').addEventListener('click', function(){
    let scrollSkills = document.getElementById('skills').offsetTop;
    window.scrollTo({ top: scrollSkills, behavior: 'smooth'});
})