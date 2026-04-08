<template>
  <ion-item>
    <ion-input
      :value="modelValue"
      :label="label"
      label-placement="stacked"
      :placeholder="placeholder"
      @ion-input="emit('update:modelValue', ($event.target as unknown as HTMLInputElement).value)"
      @keyup.enter="emit('search')"
    />
    <ion-button slot="end" fill="clear" @click="emit('scan')">
      <ion-icon :icon="scanOutline" />
    </ion-button>
    <ion-button slot="end" fill="clear" @click="emit('search')" :disabled="!modelValue">
      <ion-icon :icon="searchOutline" />
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { scanOutline, searchOutline } from 'ionicons/icons';

defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  search: [];
  scan: [];
}>();
</script>
