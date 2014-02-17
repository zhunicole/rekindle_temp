$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	setTimeout(activateLoginButton, 1500);
}

function activateLoginButton() {
	$(".login-prompt > p").animate({opacity:0}, 800);
	$(".login-prompt img").fadeIn(800);
}