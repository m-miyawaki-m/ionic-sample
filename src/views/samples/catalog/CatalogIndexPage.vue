<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples" />
        </ion-buttons>
        <ion-title>コンポーネントカタログ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="c in components" :key="c.path" :router-link="c.path" detail>
          <ion-label>{{ c.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
} from '@ionic/vue';

const components = [
  { name: 'Button', path: '/samples/catalog/button' },
  { name: 'Input',  path: '/samples/catalog/input'  },
  { name: 'List',   path: '/samples/catalog/list'   },
  { name: 'Modal',  path: '/samples/catalog/modal'  },
  { name: 'Toast',  path: '/samples/catalog/toast'  },
  { name: 'Radio Group', path: '/samples/catalog/radio-group' },
  { name: 'Checkbox', path: '/samples/catalog/checkbox' },
  { name: 'Toggle', path: '/samples/catalog/toggle' },
];
</script>
