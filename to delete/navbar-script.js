// transparent menubar while the hero background is visible

let ribbon = 0; // hold visibility of menu bar at top

window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    var hero = document.getElementById('header');
    var currentPage = window.location.pathname; 

    navbar.classList.add('fixed');
    document.querySelector('.logo').style.display = 'block';

    // otherwise hide navbar til user scrolls past the hero section
    if (window.scrollY >= hero.offsetHeight) {
        navbar.classList.add('fixed');
        document.querySelector('.logo').style.display = 'block';
        ribbon = 1;
    } else {
        navbar.classList.remove('fixed');
        document.querySelector('.logo').style.display = 'none';
        ribbon = 0;
    }
});



// drop-down menu on burger click
document.getElementById('toggle-menu').addEventListener('click', function () {
    var navbar = document.getElementById('navbar');
    var menu = document.getElementById('menu');
    var toggleButton = document.getElementById('toggle-menu');
    navbar.style.transition = 'none';
    navbar.classList.toggle('expanded');

    if (toggleButton.textContent === '☰'){
        document.querySelector('.logo').style.display = 'block';
    }
    else{
        if(!ribbon){
            document.querySelector('.logo').style.display = 'none';
        }
        
    }




    toggleButton.textContent = toggleButton.textContent === '☰' ? '✕' : '☰';

    // If the navbar is expanded, wait for it to become solid before expanding the menu
    if (navbar.classList.contains('expanded')) {
        setTimeout(function () {
            menu.classList.toggle('open');
            navbar.style.transition = '';
        }, 0); // ! ms transition time for navbar
    } else {
        setTimeout(function () {
            menu.classList.toggle('open');
            navbar.style.transition = '';
        }, 0); // ! ms transition time for navbar
    }
});


// Close menu when clicking outside of it
window.addEventListener('click', function (event) {
    var menu = document.getElementById('menu');
    var toggleButton = document.getElementById('toggle-menu');
    if (!menu.contains(event.target) && event.target !== toggleButton) {
        var navbar = document.getElementById('navbar');
        navbar.classList.remove('expanded');
        menu.classList.remove('open');
        if(!ribbon){
            document.querySelector('.logo').style.display = 'none';
        }
        toggleButton.textContent = '☰';
        navbar.style.transition = '';
    }
});

// Close menu when a link is clicked
document.querySelectorAll('#menu a').forEach(function (link) {
    link.addEventListener('click', function () {
        var navbar = document.getElementById('navbar');
        var menu = document.getElementById('menu');
        var toggleButton = document.getElementById('toggle-menu');
        navbar.classList.remove('expanded');
        menu.classList.remove('open');
        if(!ribbon){
            document.querySelector('.logo').style.display = 'none';
        }
        toggleButton.textContent = '☰';
        navbar.style.transition = '';
    });
});


// 3 second delay before the chat icon appears
setTimeout(function () {
	document.getElementById('whatsapp-button-container').classList.add('delayed');
}, 3000)
