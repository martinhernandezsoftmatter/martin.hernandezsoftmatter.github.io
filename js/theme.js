const THEME_KEY = "theme";
const LIGHT_THEME_VALUE = "light";
const DARK_THEME_VALUE = "dark";
const SYSTEM_THEME_VALUE = "system";
const THEME_SELECTOR = "data-theme";

/**
 * @typedef {LIGHT_THEME_VALUE|DARK_THEME_VALUE|SYSTEM_THEME_VALUE} ThemeValue
 */

/**
 * Executes when page finishes loading.
 */
function init() {
	setupListeners();

	const currentTheme = loadTheme();
	changeTheme(currentTheme);

	changeDropdownDefaultValue(currentTheme);
}

/**
 * Changes dropdown value according to current theme. Only executes when page finishes loading.
 * @param {ThemeValue} currentTheme
 */
function changeDropdownDefaultValue(currentTheme) {
	const select = document.getElementsByName("theme-dropdown")[0];
	select.value = currentTheme;
}

/**
 * Loads saved theme from user preferences.
 * @returns {ThemeValue} theme value saved previously or SYSTEM_THEME_VALUE if nothing is saved.
 */
function loadTheme() {
	return localStorage.getItem(THEME_KEY) || SYSTEM_THEME_VALUE;
}

/**
 * Adds listeners to HTML elements of the page.
 */
function setupListeners() {
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", onChangeColorScheme);

	const select = document.getElementsByName("theme-dropdown")[0];
	select.addEventListener("change", (event) => {
		const { value } = event.target;
		onChangeThemeDropdown(value);
	});
}

/**
 * Event handler that runs when `prefers-color-scheme` property changes.
 */
function onChangeColorScheme() {
	const currentTheme = loadTheme();
	changeTheme(currentTheme);
}

/**
 * Event handler that runs when the theme dropdown's value change.
 * @param {ThemeValue} value Theme value to use.
 */
function onChangeThemeDropdown(value) {
	changeTheme(value);
	saveTheme(value);
}

/**
 * Changes theme of webpage.
 * @param {ThemeValue} theme Theme value to use.
 */
function changeTheme(theme) {
	if (theme === SYSTEM_THEME_VALUE) {
		if (userPrefersDarkMode()) {
			document.documentElement.setAttribute(THEME_SELECTOR, DARK_THEME_VALUE);
		} else {
			document.documentElement.setAttribute(THEME_SELECTOR, LIGHT_THEME_VALUE);
		}
	} else {
		document.documentElement.setAttribute(THEME_SELECTOR, theme);
	}
}

/**
 * Saves theme to user preferences.
 * @param {ThemeValue} theme Theme value to use.
 */
function saveTheme(theme) {
	localStorage.setItem(THEME_KEY, theme);
}

/**
 * Checks the `prefers-color-scheme` property value
 * @returns {boolean} true if property value is dark, false if not or if property is not available.
 */
function userPrefersDarkMode() {
	if (!window.matchMedia) {
		return false;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

init();
