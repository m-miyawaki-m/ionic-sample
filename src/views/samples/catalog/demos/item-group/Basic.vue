<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item Group / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-item-group を使って関連するリスト項目をグループ化する例。</p>
      <ion-item-group>
          <ion-item-divider>
            <ion-label>A</ion-label>
          </ion-item-divider>
      
          <ion-item>
            <ion-label>Angola</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Argentina</ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Armenia</ion-label>
          </ion-item>
        </ion-item-group>
      
        <ion-item-group>
          <ion-item-divider>
            <ion-label>B</ion-label>
          </ion-item-divider>
      
          <ion-item>
            <ion-label>Bangladesh</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Belarus</ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Belgium</ion-label>
          </ion-item>
        </ion-item-group>
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
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item-group>
    <ion-item-divider>
      <ion-label>A</ion-label>
    </ion-item-divider>

    <ion-item>
      <ion-label>Angola</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Argentina</ion-label>
    </ion-item>
    <ion-item lines="none">
      <ion-label>Armenia</ion-label>
    </ion-item>
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider>
      <ion-label>B</ion-label>
    </ion-item-divider>

    <ion-item>
      <ion-label>Bangladesh</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Belarus</ion-label>
    </ion-item>
    <ion-item lines="none">
      <ion-label>Belgium</ion-label>
    </ion-item>
  </ion-item-group>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonItemDivider, IonItemGroup, IonLabel } from '@ionic/vue';
<\/script>`;

</script>
