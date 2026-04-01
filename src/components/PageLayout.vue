<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button v-if="backHref" :default-href="backHref" />
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ActionMenu
            :items="menuItems"
            @select="(action) => emit('menu-select', action)"
          />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :class="contentClass">
      <slot />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton, IonContent,
} from '@ionic/vue';
import ActionMenu from '@/components/ActionMenu.vue';
import type { MenuAction } from '@/types';

withDefaults(defineProps<{
  title: string;
  backHref?: string;
  menuItems?: MenuAction[];
  contentClass?: string;
}>(), {
  backHref: '/home',
  menuItems: () => [],
  contentClass: 'ion-padding',
});

const emit = defineEmits<{
  'menu-select': [action: string];
}>();
</script>
