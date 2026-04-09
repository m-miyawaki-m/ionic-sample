<template>
  <ion-page>
    <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Title / Collapsible Large Title Basic</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">collapsible-large-title（大きなタイトルをスクロールで縮小）の基本的な実装例。</p>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Title</ion-title>
          </ion-toolbar>
        </ion-header>
    
        <div class="ion-padding">Scroll the list to see the title collapse.</div>
    
        <ion-list>
          <ion-item>Item 1</ion-item>
          <ion-item>Item 2</ion-item>
          <ion-item>Item 3</ion-item>
          <ion-item>Item 4</ion-item>
          <ion-item>Item 5</ion-item>
          <ion-item>Item 6</ion-item>
          <ion-item>Item 7</ion-item>
          <ion-item>Item 8</ion-item>
          <ion-item>Item 9</ion-item>
          <ion-item>Item 10</ion-item>
          <ion-item>Item 11</ion-item>
          <ion-item>Item 12</ion-item>
          <ion-item>Item 13</ion-item>
          <ion-item>Item 14</ion-item>
          <ion-item>Item 15</ion-item>
          <ion-item>Item 16</ion-item>
          <ion-item>Item 17</ion-item>
          <ion-item>Item 18</ion-item>
          <ion-item>Item 19</ion-item>
          <ion-item>Item 20</ion-item>
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
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>Title</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Title</ion-title>
      </ion-toolbar>
    </ion-header>

    <div class="ion-padding">Scroll the list to see the title collapse.</div>

    <ion-list>
      <ion-item>Item 1</ion-item>
      <ion-item>Item 2</ion-item>
      <ion-item>Item 3</ion-item>
      <ion-item>Item 4</ion-item>
      <ion-item>Item 5</ion-item>
      <ion-item>Item 6</ion-item>
      <ion-item>Item 7</ion-item>
      <ion-item>Item 8</ion-item>
      <ion-item>Item 9</ion-item>
      <ion-item>Item 10</ion-item>
      <ion-item>Item 11</ion-item>
      <ion-item>Item 12</ion-item>
      <ion-item>Item 13</ion-item>
      <ion-item>Item 14</ion-item>
      <ion-item>Item 15</ion-item>
      <ion-item>Item 16</ion-item>
      <ion-item>Item 17</ion-item>
      <ion-item>Item 18</ion-item>
      <ion-item>Item 19</ion-item>
      <ion-item>Item 20</ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem } from '@ionic/vue';
<\/script>`;

</script>
