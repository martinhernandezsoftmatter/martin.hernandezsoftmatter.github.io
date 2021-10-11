const THEME_KEY = "theme";
const THEME_SELECTOR = "data-theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";
const SYSTEM_THEME = "system";

const itemTheme = document.querySelectorAll(".item-theme");
itemTheme.forEach((item) => {
	item.addEventListener(
		"click",
		() => {
			changeTheme(item.textContent.toLowerCase());
			saveTheme(item.textContent.toLowerCase());
		},
		false
	);
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

function prefersDarkMode() {
	if (!window.matchMedia) {
		return false;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const currentTheme = localStorage.getItem(THEME_KEY);
changeTheme(currentTheme);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
	changeTheme(currentTheme);
});
