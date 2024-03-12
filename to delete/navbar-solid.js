// transparent menubar while the hero background is visible

var navbar = document.getElementById('navbar');

// first remove navbar
navbar.classList.remove('fixed');
document.querySelector('.logo').style.display = 'none';
// now add it with the transition properties defined in the style sheet
navbar.classList.add('fixed');
document.querySelector('.logo').style.display = 'block';




// drop-down menu on burger click
document.getElementById('toggle-menu').addEventListener('click', function () {
	var navbar = document.getElementById('navbar');
	var menu = document.getElementById('menu');
	var toggleButton = document.getElementById('toggle-menu');
	navbar.style.transition = 'none';
	navbar.classList.toggle('expanded');
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
		toggleButton.textContent = '☰';
		navbar.style.transition = '';
	});
});

// 3 second delay before the chat icon appears
setTimeout(function () {
	document.getElementById('whatsapp-button-container').classList.add('delayed');
}, 3000)


