<template>
  <ion-button
    expand="block"
    class="ion-margin-top"
    :disabled="disabled || loading"
    @click="emit('submit')"
  >
    <ion-spinner v-if="loading" name="crescent" slot="start" />
    {{ loading ? loadingLabel : label }}
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonSpinner } from '@ionic/vue';

withDefaults(defineProps<{
  label?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
}>(), {
  label: '登録',
  loadingLabel: '送信中...',
  loading: false,
  disabled: false,
});

const emit = defineEmits<{
  submit: [];
}>();
</script>
