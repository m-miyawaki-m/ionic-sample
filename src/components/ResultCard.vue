<template>
  <ion-card v-if="visible">
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle v-if="subtitle">{{ subtitle }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-list lines="none">
        <ion-item v-for="(item, index) in items" :key="index">
          <ion-label>{{ item.label }}</ion-label>
          <ion-note slot="end">{{ item.value }}</ion-note>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonList, IonItem, IonLabel, IonNote,
} from '@ionic/vue';

defineProps<{
  visible: boolean;
  title: string;
  subtitle?: string;
  items: { label: string; value: string | number }[];
}>();
</script>
