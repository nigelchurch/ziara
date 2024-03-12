
// initialize global variables and constants
let arrive;
let depart;
let port;
let pax;
let rooms;
let destination;
let inclusive;
let golf;
let car;
let duration;

let quoteMessage = '';
let scopeMessage = '';
let exchangeRate;



// GET curent KES-USD rate
fetch('https://open.er-api.com/v6/latest/USD')
.then(response => response.json())
.then(data => {
	exchangeRate = data.rates.KES;
})
.catch(error => {
	console.error('Error fetching exchange rate:', error);
});



function openModalWithText(text) {
	// Set the text content of the modal body
	document.getElementById("modal-text").innerHTML = text;
	
	// Get the modal instance
	var myModal = new bootstrap.Modal(document.getElementById('mailModal'));
	
	// Open the modal
	myModal.show();
}


let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate()+1);
document.getElementById('from').value = new Date().getFullYear() + '-' + ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '-' + ('0' + tomorrow.getDate()).slice(-2);


function calculatePrice() {
	
	// ! within this area are the USER DEFINED constant rates
	
	let roomRate = 20000; // per room
	let golfRate = 6000; // per pax
	const carRate = 6000; // one only
	const allIncRate = 7000; // per pax
	const peakMultiplier = 1.5; // multiplier on room rates for peak periods
	const peakStart = new Date("2024-07-01"); // start of peak period 1
	const peakEnd = new Date("2024-09-30"); // end of peak period 1
	const sgr = 3500; // return cost for 1 adult on the sgr
	const nboMtBus = 2000; // return cost by noce bus from nbo to mt kenya
	const nboMaraBus = 2500; // return cost by nice bus from nbo to the mara
	const transportChildRate = 0.8; // bus and train price multiplier for under 16s
	let transport = 5000; // basic airport transfer (MBA or NBO) for the small group
	const parkFees = 240 * exchangeRate; // cost per adult for park entry per day
	const gameDrive = 3000; // cost for the game driver and vehicle locally per adult
	const safariChildRate = 0.5 // child rate multiplier for under 16s
	
	
	// * modify NOTHING bellow here
	


	const mbaMtBusTrain = sgr + nboMtBus;
	const mbaMaraBusTrain = sgr + nboMaraBus;
	let gameDrivePrice = 0;
	let golfPrice = 0;
	let carPrice = 0;
	let peakTime = 0;
	let safariMessage="";
	const today = new Date();
	
	
	// get all variables and cast them into usable form
	arrive = Date.parse(document.getElementById('from').value) / (1000 * 60 * 60 * 24);
	let arriveDate = new Date(document.getElementById('from').value);
	depart = Date.parse(document.getElementById('to').value) / (1000 * 60 * 60 * 24);
	let departDate = new Date(document.getElementById('to').value);
	port = document.getElementById('port').value;
	pax = parseInt(document.getElementById('pax').value);
	children = parseInt(document.getElementById('children').value);
	rooms = parseInt(document.getElementById('rooms').value);
	safari = parseInt(document.getElementById('safari').value);
	destination = document.getElementById("destination").value;
	inclusive = document.getElementById('inclusive').checked;
	golf = document.getElementById('golf').checked;
	car = document.getElementById('car').checked;
	// output section on form
	outputMsgBox = document.getElementById('pricing-output');
	
	
	// validate the dates
	if (arriveDate < today || departDate <= today || departDate <= arriveDate) {
		document.getElementById("ModalLabel").innerHTML = 'Appologies for the inconvenience';
		document.getElementById("modal-text").innerHTML = 'Would you mind double checking the dates';
		var myModal = new bootstrap.Modal(document.getElementById('mailModal'));
		myModal.show();
		return; // exit early
	}
	
	// calc transport from airport to destination
	if (port == 'nbo' && destination == 'The Coast') {
		transport = transport + sgr * (pax + children * transportChildRate);
	}
	else if (port == 'nbo' && destination == 'Mt Kenya') {
		transport = transport + nboMtBus * (pax + children * transportChildRate);
	}
	else if (port == 'nbo' && destination == 'The Mara') {
		transport = transport + nboMaraBus * (pax + children * transportChildRate);
	}
	else if (port == 'mba' && destination == 'Mt Kenya') {
		transport = transport + mbaMtBusTrain * (pax + children * transportChildRate);
	}
	else if (port == 'mba' && destination == 'The Mara') {
		transport = transport + mbaMaraBusTrain * (pax + children * transportChildRate);
	}


	// calc price for game drive(s)
	if (safari>=1){
		gameDrivePrice = Math.floor(safari * ((pax + safariChildRate * children) * (parkFees + gameDrive)));
	}


	// check for peak season and adjust rates if so 
	if (arriveDate >= peakStart && arriveDate <= peakEnd) {
		peakTime = 1;
	}
	if (departDate >= peakStart && arriveDate <= peakEnd) {
		peakTime = 1;
	}

	if (peakTime == 1) {
		roomRate = roomRate * peakMultiplier;
		golfRate = golfRate * peakMultiplier;
	}


	// * calculator starts here

	duration = depart - arrive;

	scopeMessage = `${pax} adults with ${children} children in ${rooms} room(s) for ${duration} night(s) `;


	if (safari>=1){
		safariMessage = `(Including ${safari} game drive(s))`;
	}


	if (inclusive) {
		roomRate = roomRate + (pax * allIncRate);
		scopeMessage += "all inclusive ";
	}
	
	if (golf) {
		golfPrice = pax * golfRate;
		scopeMessage += "including a round of golf ";
	}
	
	if (car) {
		carPrice = carRate * duration;
		scopeMessage += "and hire of a car ";
	}
	
	let totalPrice = (duration * rooms * roomRate) + golfPrice + carPrice + transport + gameDrivePrice;
	
	// output message formatting
	scopeMessage += `at ${destination} ${safariMessage}: <br><strong>Total price comes to ${totalPrice.toLocaleString()} KES</strong> <br>(or about ${(Math.floor(totalPrice / exchangeRate)).toLocaleString()} USD at today's rate)`;
	let priceMessage = `Estimated price for your vacation: ${(Math.floor(totalPrice / exchangeRate)).toLocaleString()} USD`
	
	// send full messge to modal and price only to html page
	outputMsgBox.innerHTML = priceMessage;
	openModalWithText(scopeMessage);

	localStorage.setItem('lastQuote', scopeMessage);
}




// Add an event listener to the contact us button
document.getElementById("redirectToContact").addEventListener("click", function () {
	setTimeout(function () {
		window.location.href = "contact.html";
	}, 200);
});



document.getElementById('calculate').addEventListener('click', function (event) {
	event.preventDefault(); // stops the default submit behaviour
	const form = document.querySelector('form');

	// Check if the form is valid
	if (form.checkValidity()) {
		calculatePrice();
	} else {
		form.reportValidity();
	}
})