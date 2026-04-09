<template>
  <ion-accordion-group :multiple="true">
    <ion-accordion
      v-for="cat in categories"
      :key="cat.name"
      :value="cat.name"
    >
      <ion-item slot="header" color="light">
        <ion-label>{{ cat.name }}</ion-label>
      </ion-item>

      <div slot="content">
        <template v-for="comp in cat.components" :key="comp.slug">
          <ion-item-divider sticky>
            <ion-label>{{ comp.name }}</ion-label>
          </ion-item-divider>

          <ion-item
            v-for="demo in comp.demos"
            :key="demo.slug"
            :router-link="`/samples/catalog/${comp.slug}/${demo.slug}`"
            router-direction="root"
            :class="{ 'sidebar-item--active': isActive(comp.slug, demo.slug) }"
            button
            lines="none"
            class="sidebar-demo-item"
            @click="handleItemClick"
          >
            <ion-label>{{ demo.name }}</ion-label>
          </ion-item>
        </template>
      </div>
    </ion-accordion>
  </ion-accordion-group>
</template>

<script setup lang="ts">
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonItemDivider,
  IonLabel,
  menuController,
} from '@ionic/vue';
import { useRoute } from 'vue-router';
import { categories } from './catalog-data';

const route = useRoute();

function isActive(compSlug: string, demoSlug: string): boolean {
  return route.path === `/samples/catalog/${compSlug}/${demoSlug}`;
}

async function handleItemClick(): Promise<void> {
  await menuController.close();
}
</script>

<style scoped>
.sidebar-demo-item {
  --min-height: 36px;
  font-size: 13px;
}

.sidebar-item--active {
  --background: var(--ion-color-primary-tint, rgba(var(--ion-color-primary-rgb), 0.15));
  --color: var(--ion-color-primary);
  font-weight: 600;
}
</style>
