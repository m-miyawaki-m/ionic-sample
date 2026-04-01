import { ref, onMounted, onUnmounted } from 'vue';
import { SP2Scanner } from '@/plugins/sp2-scanner';
import type { ScanResult, ScannerStatus } from '@/types';

export function useSP2Scanner() {
  const status = ref<ScannerStatus>('unknown');
  const lastResult = ref<ScanResult | null>(null);
  const isScanning = ref(false);

  let scanListener: { remove: () => Promise<void> } | null = null;
  let resultCallback: ((result: ScanResult) => void) | null = null;

  const initialize = async () => {
    const res = await SP2Scanner.initialize();
    if (res.success) {
      const st = await SP2Scanner.getStatus();
      status.value = st.status;
    }
    scanListener = await SP2Scanner.addListener('scanResult', (result) => {
      lastResult.value = result;
      isScanning.value = false;
      if (resultCallback) {
        resultCallback(result);
      }
    });
  };

  const startScan = async () => {
    isScanning.value = true;
    await SP2Scanner.startScan();
  };

  const stopScan = async () => {
    isScanning.value = false;
    await SP2Scanner.stopScan();
  };

  const onScanResult = (callback: (result: ScanResult) => void) => {
    resultCallback = callback;
  };

  onMounted(() => {
    initialize();
  });

  onUnmounted(async () => {
    if (scanListener) {
      await scanListener.remove();
    }
    await SP2Scanner.destroy();
  });

  return {
    status,
    lastResult,
    isScanning,
    startScan,
    stopScan,
    onScanResult,
  };
}
