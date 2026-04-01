import { ref, watchEffect } from 'vue';

const isDark = ref(false);

export function useDarkMode() {
  const init = () => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      isDark.value = saved === 'true';
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  };

  const toggle = () => {
    isDark.value = !isDark.value;
  };

  watchEffect(() => {
    document.documentElement.classList.toggle('ion-palette-dark', isDark.value);
    localStorage.setItem('darkMode', String(isDark.value));
  });

  init();

  return { isDark, toggle };
}
