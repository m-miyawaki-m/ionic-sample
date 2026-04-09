<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item / Detail Arrows</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">detail プロパティで項目右端に詳細矢印アイコンを表示する例。</p>
      <ion-item detail="true">
          <ion-label>
            <h3>Text Item</h3>
            <p>Detail set to true - detail arrow displays on both modes</p>
          </ion-label>
        </ion-item>
      
        <ion-item button>
          <ion-label>
            <h3>Button Item</h3>
            <p>Default detail - detail arrow displays on iOS only</p>
          </ion-label>
        </ion-item>
      
        <ion-item button detail="true">
          <ion-label>
            <h3>Button Item</h3>
            <p>Detail set to true - detail arrow displays on both modes</p>
          </ion-label>
        </ion-item>
      
        <ion-item button detail="false">
          <ion-label>
            <h3>Button Item</h3>
            <p>Detail set to false - detail arrow hidden on both modes</p>
          </ion-label>
        </ion-item>
      
        <ion-item button detail="true" :detailIcon="caretForwardOutline">
          <ion-label>
            <h3>Button Item</h3>
            <p>Detail set to true - detail arrow displays on both modes</p>
            <p>Detail icon set to caret-forward-outline</p>
          </ion-label>
        </ion-item>
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
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { caretForwardOutline } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-item detail="true">
    <ion-label>
      <h3>Text Item</h3>
      <p>Detail set to true - detail arrow displays on both modes</p>
    </ion-label>
  </ion-item>

  <ion-item button>
    <ion-label>
      <h3>Button Item</h3>
      <p>Default detail - detail arrow displays on iOS only</p>
    </ion-label>
  </ion-item>

  <ion-item button detail="true">
    <ion-label>
      <h3>Button Item</h3>
      <p>Detail set to true - detail arrow displays on both modes</p>
    </ion-label>
  </ion-item>

  <ion-item button detail="false">
    <ion-label>
      <h3>Button Item</h3>
      <p>Detail set to false - detail arrow hidden on both modes</p>
    </ion-label>
  </ion-item>

  <ion-item button detail="true" :detailIcon="caretForwardOutline">
    <ion-label>
      <h3>Button Item</h3>
      <p>Detail set to true - detail arrow displays on both modes</p>
      <p>Detail icon set to caret-forward-outline</p>
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonLabel } from '@ionic/vue';
  import { caretForwardOutline } from 'ionicons/icons';
<\/script>`;

</script>
