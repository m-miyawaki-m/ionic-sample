<template>
  <ion-chip :color="color">
    <ion-icon :icon="icon" />
    <ion-label>スキャナ: {{ statusLabel }}</ion-label>
  </ion-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonChip, IonIcon, IonLabel } from '@ionic/vue';
import { bluetoothOutline, closeCircleOutline, helpCircleOutline } from 'ionicons/icons';
import type { ScannerStatus } from '@/types';

const props = defineProps<{
  status: ScannerStatus;
}>();

const color = computed(() => {
  switch (props.status) {
    case 'connected': return 'success';
    case 'disconnected': return 'danger';
    default: return 'medium';
  }
});

const icon = computed(() => {
  switch (props.status) {
    case 'connected': return bluetoothOutline;
    case 'disconnected': return closeCircleOutline;
    default: return helpCircleOutline;
  }
});

const statusLabel = computed(() => {
  switch (props.status) {
    case 'connected': return '接続中';
    case 'disconnected': return '未接続';
    default: return '不明';
  }
});
</script>
