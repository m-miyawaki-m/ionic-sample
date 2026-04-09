<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Card / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったカードのスタイルカスタマイズ例。</p>
      <ion-card>
          <ion-card-header>
            <ion-card-title>Card Title</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>
      
          <ion-card-content>
            Here's a small text description for the card content. Nothing more, nothing less.
          </ion-card-content>
        </ion-card>
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
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Card Title</ion-card-title>
      <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      Here's a small text description for the card content. Nothing more, nothing less.
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
<\/script>

<style scoped>
  ion-card {
    --background: #000;
    --color: #9efff0;
  }

  ion-card-title {
    --color: #52ffe4;
  }

  ion-card-subtitle {
    --color: #d1fff8;
  }
</style>`;

</script>

<style scoped>
  ion-card {
    --background: #000;
    --color: #9efff0;
  }

  ion-card-title {
    --color: #52ffe4;
  }

  ion-card-subtitle {
    --color: #d1fff8;
  }
</style>
