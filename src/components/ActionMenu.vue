<template>
  <ion-button fill="clear" @click="openPopover">
    <ion-icon slot="icon-only" :icon="menuOutline" />
  </ion-button>

  <ion-popover
    :is-open="isOpen"
    :event="popoverEvent"
    @did-dismiss="isOpen = false"
  >
    <ion-content>
      <ion-list lines="none">
        <ion-item
          v-for="item in items"
          :key="item.action"
          button
          :detail="false"
          @click="selectAction(item.action)"
        >
          <ion-icon v-if="item.icon" :icon="item.icon" slot="start" />
          <ion-label>{{ item.label }}</ion-label>
        </ion-item>

        <ion-item-divider v-if="items.length > 0" />

        <ion-item button :detail="false" @click="toggleDark">
          <ion-icon :icon="isDark ? sunnyOutline : moonOutline" slot="start" />
          <ion-label>{{ isDark ? 'ライトモード' : 'ダークモード' }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonButton, IonIcon, IonPopover, IonContent,
  IonList, IonItem, IonItemDivider, IonLabel,
} from '@ionic/vue';
import { menuOutline, moonOutline, sunnyOutline } from 'ionicons/icons';
import { useDarkMode } from '@/composables/useDarkMode';
import type { MenuAction } from '@/types';

defineProps<{
  items: MenuAction[];
}>();

const emit = defineEmits<{
  select: [action: string];
}>();

const { isDark, toggle: toggleDarkMode } = useDarkMode();

const isOpen = ref(false);
const popoverEvent = ref<Event | null>(null);

const openPopover = (e: Event) => {
  popoverEvent.value = e;
  isOpen.value = true;
};

const selectAction = (action: string) => {
  isOpen.value = false;
  emit('select', action);
};

const toggleDark = () => {
  toggleDarkMode();
  isOpen.value = false;
};
</script>
