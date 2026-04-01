<template>
  <ion-toast
    :is-open="!!message"
    :message="message"
    :color="color"
    :duration="duration"
    @did-dismiss="emit('dismiss')"
  />
</template>

<script setup lang="ts">
import { IonToast } from '@ionic/vue';

withDefaults(defineProps<{
  message: string;
  color?: string;
  duration?: number;
}>(), {
  color: 'success',
  duration: 3000,
});

const emit = defineEmits<{
  dismiss: [];
}>();
</script>
