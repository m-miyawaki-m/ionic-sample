<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item Sliding / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">スライドアイテム（ion-item-sliding）の基本的な使い方。スワイプでアクションボタンを表示する。</p>
      <ion-list>
          <ion-item-sliding>
            <ion-item>
              <ion-label>Sliding Item with End Options</ion-label>
            </ion-item>
      
            <ion-item-options>
              <ion-item-option>Favorite</ion-item-option>
              <ion-item-option color="danger">Delete</ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item-options side="start">
              <ion-item-option color="success">Archive</ion-item-option>
            </ion-item-options>
      
            <ion-item>
              <ion-label>Sliding Item with Start Options</ion-label>
            </ion-item>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item-options side="start">
              <ion-item-option color="success">Archive</ion-item-option>
            </ion-item-options>
      
            <ion-item>
              <ion-label>Sliding Item with Options on Both Sides</ion-label>
            </ion-item>
      
            <ion-item-options side="end">
              <ion-item-option>Favorite</ion-item-option>
              <ion-item-option color="danger">Delete</ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
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
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item-sliding>
      <ion-item>
        <ion-label>Sliding Item with End Options</ion-label>
      </ion-item>

      <ion-item-options>
        <ion-item-option>Favorite</ion-item-option>
        <ion-item-option color="danger">Delete</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option color="success">Archive</ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-label>Sliding Item with Start Options</ion-label>
      </ion-item>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option color="success">Archive</ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-label>Sliding Item with Options on Both Sides</ion-label>
      </ion-item>

      <ion-item-options side="end">
        <ion-item-option>Favorite</ion-item-option>
        <ion-item-option color="danger">Delete</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue';
<\/script>`;

</script>
