const THEME_KEY = "theme";
const THEME_SELECTOR = "data-theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";
const SYSTEM_THEME = "system";

const itemTheme = Array.from(document.querySelectorAll(".item-theme"));
itemTheme.forEach((item) => {
	item.addEventListener(
		"click",
		() => {
			changeTheme(item.textContent.toLowerCase());
			saveTheme(item.textContent.toLowerCase());
			changeActiveElement(item);
		},
		false
	);
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
	changeTheme(currentTheme);
});

function changeTheme(theme) {
	if (theme === SYSTEM_THEME || !currentTheme) {
		if (prefersDarkMode()) {
			document.documentElement.setAttribute(THEME_SELECTOR, DARK_THEME);
		} else {
			document.documentElement.setAttribute(THEME_SELECTOR, LIGHT_THEME);
		}
	} else {
		document.documentElement.setAttribute(THEME_SELECTOR, theme);
	}
}

function saveTheme(theme) {
	localStorage.setItem(THEME_KEY, theme);
}

function changeActiveElement(currentElement) {
	const previousActiveElement = document.querySelector(".item-theme.is-active");
	if (previousActiveElement) {
		previousActiveElement.classList.remove("is-active");
	}

	currentElement.classList.add("is-active");
}

function prefersDarkMode() {
	if (!window.matchMedia) {
		return false;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const currentTheme = localStorage.getItem(THEME_KEY);
changeTheme(currentTheme);
let currentElementTheme = Array.from(itemTheme).find(
	(item) => item.textContent.toLowerCase() === currentTheme
);
if (!currentElementTheme) {
	currentElementTheme = Array.from(itemTheme).find(
		(item) => item.textContent.toLowerCase() === SYSTEM_THEME
	);
}
changeActiveElement(currentElementTheme);
