import { persisted } from 'svelte-persisted-store';
import { BROWSER } from 'esm-env';

export const theme = persisted("theme", {
    darkMode: BROWSER        
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? true
            : false
        : true,
});

theme.subscribe(($theme) => {
    if (!BROWSER) return;
    document.body.classList.remove('light', 'dark');
	document.body.classList.add($theme.darkMode ? "dark" : "light");
});

export const toggleDarkMode = () => {
    theme.update($theme => {
        $theme.darkMode = !$theme.darkMode;
        return $theme;
    })
};