<template>
  <ion-modal :is-open="isOpen" @did-dismiss="emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="emit('close')">閉じる</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          v-for="option in options"
          :key="option.value"
          button
          :detail="false"
          @click="select(option.value)"
        >
          <ion-label>{{ option.label }}</ion-label>
          <ion-icon
            v-if="option.value === selectedValue"
            :icon="checkmarkOutline"
            slot="end"
            color="primary"
          />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonModal, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/vue';
import { checkmarkOutline } from 'ionicons/icons';
import type { SelectOption } from '@/types';

defineProps<{
  isOpen: boolean;
  title: string;
  options: SelectOption[];
  selectedValue?: string;
}>();

const emit = defineEmits<{
  close: [];
  select: [value: string];
}>();

const select = (value: string) => {
  emit('select', value);
  emit('close');
};
</script>
