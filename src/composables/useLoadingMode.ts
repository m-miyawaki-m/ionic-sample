import { ref } from 'vue';

export type LoadingMode = 'overlay' | 'button';

const mode = ref<LoadingMode>(
  (localStorage.getItem('loadingMode') as LoadingMode) || 'overlay'
);

export function useLoadingMode() {
  const setMode = (m: LoadingMode) => {
    mode.value = m;
    localStorage.setItem('loadingMode', m);
  };

  return { loadingMode: mode, setMode };
}
