<template>
  <ion-item>
    <ion-input
      :value="modelValue"
      :label="label"
      label-placement="stacked"
      type="number"
      :placeholder="placeholder"
      :min="min"
      @ion-input="onInput"
    />
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonInput } from '@ionic/vue';

defineProps<{
  modelValue: number;
  label: string;
  placeholder?: string;
  min?: number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const onInput = (event: CustomEvent) => {
  const val = Number((event.target as HTMLInputElement).value);
  emit('update:modelValue', isNaN(val) ? 0 : val);
};
</script>
