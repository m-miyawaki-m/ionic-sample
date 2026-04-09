<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>List Header / Buttons</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-list-header 内にボタンを配置する例。</p>
      <ion-list>
          <ion-list-header>
            <ion-label>Video Games</ion-label>
            <ion-button>See All</ion-button>
          </ion-list-header>
          <ion-item>
            <ion-label>Pokémon Yellow</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Mega Man X</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>The Legend of Zelda</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Pac-Man</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Super Mario World</ion-label>
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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-list-header>
      <ion-label>Video Games</ion-label>
      <ion-button>See All</ion-button>
    </ion-list-header>
    <ion-item>
      <ion-label>Pokémon Yellow</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Mega Man X</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>The Legend of Zelda</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Pac-Man</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Super Mario World</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/vue';
<\/script>`;

</script>
