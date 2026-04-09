<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Segment Button / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったセグメントボタンのスタイルカスタマイズ例。</p>
      <ion-segment value="custom">
          <ion-segment-button value="custom">
            <ion-label>Custom</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
          <ion-segment-button value="buttons">
            <ion-label>Buttons</ion-label>
          </ion-segment-button>
        </ion-segment>
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
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-segment value="custom">
    <ion-segment-button value="custom">
      <ion-label>Custom</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
    <ion-segment-button value="buttons">
      <ion-label>Buttons</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue';
<\/script>

<style>
  ion-segment-button {
    --indicator-color: #08a391;
  }

  /* Material Design styles */
  ion-segment-button.md {
    --color: #000;
    --color-checked: #08a391;
    --indicator-height: 4px;
  }

  /* iOS styles */
  ion-segment-button.ios {
    --color: #08a391;
    --color-checked: #fff;
    --border-radius: 20px;
  }
</style>`;

</script>

<style>
  ion-segment-button {
    --indicator-color: #08a391;
  }

  /* Material Design styles */
  ion-segment-button.md {
    --color: #000;
    --color-checked: #08a391;
    --indicator-height: 4px;
  }

  /* iOS styles */
  ion-segment-button.ios {
    --color: #08a391;
    --color-checked: #fff;
    --border-radius: 20px;
  }
</style>
