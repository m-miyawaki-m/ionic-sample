<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Skeleton Text / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">コンテンツ読み込み中のプレースホルダー（ion-skeleton-text）の基本的な使い方。</p>
      <ion-list v-if="loaded">
          <ion-list-header>Albums</ion-list-header>
          <ion-item>
            <ion-thumbnail slot="start">
              <ion-icon style="width: 100%; height: 100%" :icon="musicalNotes"></ion-icon>
            </ion-thumbnail>
            <ion-label>
              <h3>Abbey Road</h3>
              <p>The Beatles</p>
              <p>1969</p>
            </ion-label>
          </ion-item>
        </ion-list>
      
        <ion-list v-if="!loaded">
          <ion-list-header>
            <ion-skeleton-text :animated="true" style="width: 80px"></ion-skeleton-text>
          </ion-list-header>
          <ion-item>
            <ion-thumbnail slot="start">
              <ion-skeleton-text :animated="true"></ion-skeleton-text>
            </ion-thumbnail>
            <ion-label>
              <h3>
                <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
              </h3>
              <p>
                <ion-skeleton-text :animated="true" style="width: 60%;"></ion-skeleton-text>
              </p>
              <p>
                <ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
              </p>
            </ion-label>
          </ion-item>
        </ion-list>
      
        <ion-button @click="setLoaded(!loaded)">Toggle</ion-button>
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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonSkeletonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { musicalNotes } from 'ionicons/icons';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-list v-if="loaded">
    <ion-list-header>Albums</ion-list-header>
    <ion-item>
      <ion-thumbnail slot="start">
        <ion-icon style="width: 100%; height: 100%" :icon="musicalNotes"></ion-icon>
      </ion-thumbnail>
      <ion-label>
        <h3>Abbey Road</h3>
        <p>The Beatles</p>
        <p>1969</p>
      </ion-label>
    </ion-item>
  </ion-list>

  <ion-list v-if="!loaded">
    <ion-list-header>
      <ion-skeleton-text :animated="true" style="width: 80px"></ion-skeleton-text>
    </ion-list-header>
    <ion-item>
      <ion-thumbnail slot="start">
        <ion-skeleton-text :animated="true"></ion-skeleton-text>
      </ion-thumbnail>
      <ion-label>
        <h3>
          <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
        </h3>
        <p>
          <ion-skeleton-text :animated="true" style="width: 60%;"></ion-skeleton-text>
        </p>
        <p>
          <ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
        </p>
      </ion-label>
    </ion-item>
  </ion-list>

  <ion-button @click="setLoaded(!loaded)">Toggle</ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonThumbnail,
  } from '@ionic/vue';
  import { musicalNotes } from 'ionicons/icons';
  import { ref } from 'vue';

  const loaded = ref(false);
  const setLoaded = (state: boolean) => (loaded.value = state);
<\/script>`;


  const loaded = ref(false);
  const setLoaded = (state: boolean) => (loaded.value = state);
</script>
