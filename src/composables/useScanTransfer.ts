import { ref } from 'vue';
import type { ParsedScanCode } from '@/types';

const transferredValue = ref<ParsedScanCode | null>(null);

/** ページ遷移パターンで、入力補助画面と親画面の間で値を受け渡す */
export function useScanTransfer() {
  const send = (value: ParsedScanCode) => {
    transferredValue.value = value;
  };

  const receive = (): ParsedScanCode | null => {
    const value = transferredValue.value;
    transferredValue.value = null;
    return value;
  };

  return { send, receive };
}
