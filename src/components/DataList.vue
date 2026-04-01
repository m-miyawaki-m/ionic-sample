<template>
  <ion-list>
    <ion-item
      v-for="item in items"
      :key="item.id"
      button
      :detail="selectable"
      @click="emit('select', item.id)"
    >
      <ion-label>
        <h2>{{ item.title }}</h2>
        <p v-if="item.subtitle">{{ item.subtitle }}</p>
      </ion-label>
      <ion-note v-if="item.note" slot="end">{{ item.note }}</ion-note>
    </ion-item>
    <ion-item v-if="items.length === 0">
      <ion-label color="medium">{{ emptyMessage }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonNote } from '@ionic/vue';
import type { DataListItem } from '@/types';

withDefaults(defineProps<{
  items: DataListItem[];
  selectable?: boolean;
  emptyMessage?: string;
}>(), {
  selectable: true,
  emptyMessage: 'データがありません',
});

const emit = defineEmits<{
  select: [id: string];
}>();
</script>
