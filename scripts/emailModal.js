

window.onload = function () {
	const emailModal = new bootstrap.Modal(document.getElementById('emailModal'));
	const status = new URLSearchParams(window.location.search).get('status');
	console.log(status);

	if (status === 'success') {
		document.getElementById('emailMessage').innerText = "Message sent. We'll be in touch shortly";
		emailModal.show();

	}

	else if (status === 'failed') {
		document.getElementById('emailMessage').innerText = "Oops! Something went wrong. Please try again later.";
		emailModal.show();

	}
}
