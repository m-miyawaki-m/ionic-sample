<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Searchbar / Debounce</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">debounce プロパティで ionChange イベントの発火を遅延させてパフォーマンスを改善する例。</p>
      <ion-searchbar :debounce="1000" @ionInput="handleInput($event)"></ion-searchbar>
      
        <ion-list>
          <ion-item v-for="result in results">
            <ion-label>{{ result }}</ion-label>
          </ion-item>
        </ion-list>
      <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
        <details>
          <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
          <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
        </details>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { 
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-searchbar :debounce="1000" @ionInput="handleInput($event)"></ion-searchbar>

  <ion-list>
    <ion-item v-for="result in results">
      <ion-label>{{ result }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonList, IonSearchbar } from '@ionic/vue';
  import { ref } from 'vue';

  const data = [
    'Amsterdam',
    'Buenos Aires',
    'Cairo',
    'Geneva',
    'Hong Kong',
    'Istanbul',
    'London',
    'Madrid',
    'New York',
    'Panama City',
  ];
  const results = ref(data);

  const handleInput = (event) => {
    const query = event.target.value.toLowerCase();
    results.value = data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  };
<\/script>`;


  const data = [
    'Amsterdam',
    'Buenos Aires',
    'Cairo',
    'Geneva',
    'Hong Kong',
    'Istanbul',
    'London',
    'Madrid',
    'New York',
    'Panama City',
  ];
  const results = ref(data);

  const handleInput = (event) => {
    const query = event.target.value.toLowerCase();
    results.value = data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  };
</script>
