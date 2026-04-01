import { ref } from 'vue';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import type { ScanResult } from '@/types';

export type FeedbackType = 'none' | 'vibrate' | 'toast' | 'vibrate+toast';

const feedbackType = ref<FeedbackType>(
  (localStorage.getItem('scanFeedback') as FeedbackType) || 'vibrate+toast'
);

const toastMessage = ref('');
const toastVisible = ref(false);

export function useScanFeedback() {
  const setFeedbackType = (type: FeedbackType) => {
    feedbackType.value = type;
    localStorage.setItem('scanFeedback', type);
  };

  const triggerFeedback = async (result: ScanResult) => {
    const type = feedbackType.value;

    // バイブレーション
    if (type === 'vibrate' || type === 'vibrate+toast') {
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch {
        // Web環境ではHapticsが使えない場合がある
        console.log('[ScanFeedback] Haptics not available');
      }
    }

    // トースト
    if (type === 'toast' || type === 'vibrate+toast') {
      toastMessage.value = `読み取り: ${result.value}`;
      toastVisible.value = true;
      setTimeout(() => {
        toastVisible.value = false;
      }, 1500);
    }
  };

  const triggerSuccess = async () => {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      console.log('[ScanFeedback] Haptics not available');
    }
  };

  const triggerError = async () => {
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch {
      console.log('[ScanFeedback] Haptics not available');
    }
  };

  return {
    feedbackType,
    setFeedbackType,
    triggerFeedback,
    triggerSuccess,
    triggerError,
    toastMessage,
    toastVisible,
  };
}
