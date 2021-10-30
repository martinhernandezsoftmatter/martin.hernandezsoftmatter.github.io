const hamburguerButton = document.querySelector("#hamburguer-button")
hamburguerButton.addEventListener("click", toggleNavbar);

document.querySelector(".navbar-item.has-dropdown").addEventListener("click", (event) => {
	toggleNavbarDropdown(event.target.parentElement);
});

function toggleNavbar() {
	hamburguerButton.classList.toggle("is-active");
	document.querySelector("#navbar-menu").classList.toggle("is-active");
}

/**
 *
 * @param {HTMLDivElement} dropdown
 */
function toggleNavbarDropdown(dropdown) {
	dropdown.classList.toggle("is-active");
}
