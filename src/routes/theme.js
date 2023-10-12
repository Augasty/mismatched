const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

var prefersLightThemes = false

export const toggleTheme = () => {
    if (prefersLightThemes) {
        document.body.classList.remove(THEMES.LIGHT);
        document.body.classList.add(THEMES.DARK);
      } else {
        document.body.classList.remove(THEMES.DARK);
        document.body.classList.add(THEMES.LIGHT);
      }
      prefersLightThemes = !prefersLightThemes
};