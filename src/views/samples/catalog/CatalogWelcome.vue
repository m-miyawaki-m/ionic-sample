<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>コンポーネントカタログ</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/samples" router-direction="back">
            <ion-icon slot="icon-only" :icon="closeOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="ion-padding">
        <p class="catalog-summary">
          {{ totalComponents }} コンポーネント &nbsp;/&nbsp; {{ totalDemos }} デモ
        </p>
      </div>

      <ion-list>
        <ion-item
          v-for="cat in categories"
          :key="cat.name"
          :router-link="firstDemoPath(cat)"
          router-direction="root"
          button
          detail
        >
          <ion-label>
            <h2>{{ cat.name }}</h2>
            <p>{{ componentNames(cat) }}</p>
          </ion-label>
          <ion-badge slot="end" color="primary">{{ catDemoCount(cat) }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { computed } from 'vue';
import { categories, type Category } from './catalog-data';

const totalComponents = computed(() =>
  categories.reduce((sum, cat) => sum + cat.components.length, 0)
);

const totalDemos = computed(() =>
  categories.reduce(
    (sum, cat) =>
      sum + cat.components.reduce((s, comp) => s + comp.demos.length, 0),
    0
  )
);

function catDemoCount(cat: Category): number {
  return cat.components.reduce((sum, comp) => sum + comp.demos.length, 0);
}

function componentNames(cat: Category): string {
  return cat.components.map((c) => c.name).join(', ');
}

function firstDemoPath(cat: Category): string {
  const firstComp = cat.components[0];
  if (!firstComp) return '/samples/catalog';
  const firstDemo = firstComp.demos[0];
  if (!firstDemo) return '/samples/catalog';
  return `/samples/catalog/${firstComp.slug}/${firstDemo.slug}`;
}
</script>

<style scoped>
.catalog-summary {
  color: var(--ion-color-medium);
  font-size: 14px;
  margin: 0;
}
</style>
