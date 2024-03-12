

window.addEventListener('beforeunload', function () {
	localStorage.setItem("lastQuote", "User has visited the site before but no quotes this session");
});

