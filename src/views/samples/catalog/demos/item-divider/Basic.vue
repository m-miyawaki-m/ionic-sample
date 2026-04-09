<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item Divider / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">リストの区切り見出し（ion-item-divider）の基本的な使い方。</p>
      <ion-list>
          <ion-item-group>
            <ion-item-divider>
              <ion-label> Section A </ion-label>
            </ion-item-divider>
      
            <ion-item>
              <ion-label>A1</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>A2</ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label>A3</ion-label>
            </ion-item>
          </ion-item-group>
      
          <ion-item-group>
            <ion-item-divider>
              <ion-label> Section B </ion-label>
            </ion-item-divider>
      
            <ion-item>
              <ion-label>B1</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>B2</ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label>B3</ion-label>
            </ion-item>
          </ion-item-group>
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
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item-group>
      <ion-item-divider>
        <ion-label> Section A </ion-label>
      </ion-item-divider>

      <ion-item>
        <ion-label>A1</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>A2</ion-label>
      </ion-item>
      <ion-item lines="none">
        <ion-label>A3</ion-label>
      </ion-item>
    </ion-item-group>

    <ion-item-group>
      <ion-item-divider>
        <ion-label> Section B </ion-label>
      </ion-item-divider>

      <ion-item>
        <ion-label>B1</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>B2</ion-label>
      </ion-item>
      <ion-item lines="none">
        <ion-label>B3</ion-label>
      </ion-item>
    </ion-item-group>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList } from '@ionic/vue';
<\/script>`;

</script>
