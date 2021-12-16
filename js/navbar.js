const hamburguerButton = document.querySelector("#hamburguer-button");
hamburguerButton.addEventListener("click", toggleNavbar);

/**
 * Event handler that runs when the hamburger button is clicked (mobile version only).
 */
function toggleNavbar() {
	hamburguerButton.classList.toggle("is-active");
	document.querySelector("#navbar-menu").classList.toggle("is-active");
	const currentExpandedAria = hamburguerButton.getAttribute("aria-expanded");
	if(currentExpandedAria === "true") {
		hamburguerButton.setAttribute("aria-expanded", "false");
	} else {
		hamburguerButton.setAttribute("aria-expanded", "true");
	}
}
