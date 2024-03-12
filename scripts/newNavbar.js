

function showSidebar() {
	const sidebar = document.querySelector('.sidebar')
	sidebar.style.display = 'flex'
}
function hideSidebar() {
	const sidebar = document.querySelector('.sidebar')
	sidebar.style.display = 'none'
}

// 3 second delay before the chat icon appears
setTimeout(function () {
	document.getElementById('whatsapp-button-container').classList.add('delayed');
}, 5000)