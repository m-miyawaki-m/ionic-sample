<template>
  <ion-page>
    <ion-content fixed-slot-placement="before">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">FAB ボタンを ion-content の外（コンテンツの前）に配置する例。</p>
        <ion-fab horizontal="end" vertical="bottom" slot="fixed">
          <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        <ion-list>
          <ion-item v-for="(item, index) in items" button>
            <ion-avatar slot="start">
              <img :src="'@/assets/img/demos/placeholder.svg' + index" alt="avatar" />
            </ion-avatar>
            <ion-label>{{ item }}</ion-label>
          </ion-item>
        </ion-list>
        <ion-infinite-scroll @ionInfinite="ionInfinite">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      
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
  InfiniteScrollCustomEvent,
  IonAvatar,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
 } from '@ionic/vue';
  import { add } from 'ionicons/icons';
  import { reactive } from 'vue';

const sourceCode = `<template>
  <ion-content fixed-slot-placement="before">
    <ion-fab horizontal="end" vertical="bottom" slot="fixed">
      <ion-fab-button>
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-list>
      <ion-item v-for="(item, index) in items" button>
        <ion-avatar slot="start">
          <img :src="'@/assets/img/demos/placeholder.svg' + index" alt="avatar" />
        </ion-avatar>
        <ion-label>{{ item }}</ion-label>
      </ion-item>
    </ion-list>
    <ion-infinite-scroll @ionInfinite="ionInfinite">
      <ion-infinite-scroll-content></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    InfiniteScrollCustomEvent,
    IonAvatar,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
  } from '@ionic/vue';
  import { add } from 'ionicons/icons';
  import { reactive } from 'vue';

  const items = reactive([]);

  const generateItems = () => {
    const count = items.length + 1;
    for (let i = 0; i < 50; i++) {
      items.push(\`Item \${count + i}\`);
    }
  };

  const ionInfinite = (event: InfiniteScrollCustomEvent) => {
    generateItems();
    setTimeout(() => event.target.complete(), 500);
  };

  generateItems();
<\/script>`;


  const items = reactive([]);

  const generateItems = () => {
    const count = items.length + 1;
    for (let i = 0; i < 50; i++) {
      items.push(`Item ${count + i}`);
    }
  };

  const ionInfinite = (event: InfiniteScrollCustomEvent) => {
    generateItems();
    setTimeout(() => event.target.complete(), 500);
  };

  generateItems();
</script>
