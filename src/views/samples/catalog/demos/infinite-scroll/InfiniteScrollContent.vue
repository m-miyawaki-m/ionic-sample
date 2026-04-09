<template>
  <ion-page>
    <ion-content>
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">デフォルトの ion-infinite-scroll-content を使った実装例。</p>
        <ion-list>
          <ion-item v-for="(item, index) in items">
            <ion-avatar slot="start">
              <img :src="'@/assets/img/demos/placeholder.svg' + index" alt="avatar" />
            </ion-avatar>
            <ion-label>{{ item }}</ion-label>
          </ion-item>
        </ion-list>
        <ion-infinite-scroll>
          <ion-infinite-scroll-content
            loading-text="Please wait..."
            loading-spinner="bubbles"
          ></ion-infinite-scroll-content>
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
  IonAvatar,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
 } from '@ionic/vue';
  import { reactive } from 'vue';

const sourceCode = `<template>
  <ion-content>
    <ion-list>
      <ion-item v-for="(item, index) in items">
        <ion-avatar slot="start">
          <img :src="'@/assets/img/demos/placeholder.svg' + index" alt="avatar" />
        </ion-avatar>
        <ion-label>{{ item }}</ion-label>
      </ion-item>
    </ion-list>
    <ion-infinite-scroll>
      <ion-infinite-scroll-content
        loading-text="Please wait..."
        loading-spinner="bubbles"
      ></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
  } from '@ionic/vue';
  import { reactive } from 'vue';

  const items = reactive([]);

  for (let i = 1; i < 51; i++) {
    items.push(\`Item \${i}\`);
  }
<\/script>`;


  const items = reactive([]);

  for (let i = 1; i < 51; i++) {
    items.push(`Item ${i}`);
  }
</script>
