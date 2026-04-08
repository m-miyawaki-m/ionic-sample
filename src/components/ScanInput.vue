<template>
  <ion-item>
    <ion-input
      :value="modelValue"
      :label="label"
      label-placement="stacked"
      :placeholder="placeholder"
      @ion-input="emit('update:modelValue', ($event.target as unknown as HTMLInputElement).value)"
      @ion-focus="emit('focus')"
    />
    <ion-button slot="end" fill="clear" @click="emit('scan')">
      <ion-icon :icon="scanOutline" />
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { scanOutline } from 'ionicons/icons';

defineProps<{
  modelValue: string;
  label: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  scan: [];
  focus: [];
}>();
</script>
