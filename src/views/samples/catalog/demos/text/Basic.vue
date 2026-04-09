<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Text / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">テキスト表示（ion-text）の基本的な使い方。テキストの色や書体のバリエーションを確認できる。</p>
      <ion-text color="primary">
          <h1>H1: The quick brown fox jumps over the lazy dog</h1>
        </ion-text>
      
        <ion-text color="secondary">
          <h2>H2: The quick brown fox jumps over the lazy dog</h2>
        </ion-text>
      
        <ion-text color="tertiary">
          <h3>H3: The quick brown fox jumps over the lazy dog</h3>
        </ion-text>
      
        <p>
          <ion-text color="warning"><ion-icon :icon="warning"></ion-icon></ion-text>
          I saw a werewolf with a Chinese menu in his hand. Walking through the
          <ion-text color="success"><sub>streets</sub></ion-text> of Soho in the rain. He
          <ion-text color="medium"><i>was</i></ion-text> looking for a place called Lee Ho Fook's. Gonna get a
          <ion-text color="danger">big dish of beef chow mein.</ion-text>
        </p>
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
  IonIcon,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { warning } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-text color="primary">
    <h1>H1: The quick brown fox jumps over the lazy dog</h1>
  </ion-text>

  <ion-text color="secondary">
    <h2>H2: The quick brown fox jumps over the lazy dog</h2>
  </ion-text>

  <ion-text color="tertiary">
    <h3>H3: The quick brown fox jumps over the lazy dog</h3>
  </ion-text>

  <p>
    <ion-text color="warning"><ion-icon :icon="warning"></ion-icon></ion-text>
    I saw a werewolf with a Chinese menu in his hand. Walking through the
    <ion-text color="success"><sub>streets</sub></ion-text> of Soho in the rain. He
    <ion-text color="medium"><i>was</i></ion-text> looking for a place called Lee Ho Fook's. Gonna get a
    <ion-text color="danger">big dish of beef chow mein.</ion-text>
  </p>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonIcon, IonText } from '@ionic/vue';
  import { warning } from 'ionicons/icons';
<\/script>`;

</script>
