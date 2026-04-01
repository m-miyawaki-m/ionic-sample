<template>
  <ion-loading
    :is-open="visible"
    :message="message"
    :duration="0"
    spinner="crescent"
  />
</template>

<script setup lang="ts">
import { IonLoading } from '@ionic/vue';

withDefaults(defineProps<{
  visible: boolean;
  message?: string;
}>(), {
  message: '通信中...',
});
</script>
