<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Select / Customization Styling Select</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティと Shadow Parts を使ったセレクトボックスのスタイルカスタマイズ例。</p>
      <ion-select aria-label="Fruit" placeholder="Select fruit">
          <ion-select-option value="apples">Apples</ion-select-option>
          <ion-select-option value="oranges">Oranges</ion-select-option>
          <ion-select-option value="bananas">Bananas</ion-select-option>
        </ion-select>
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
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-select aria-label="Fruit" placeholder="Select fruit">
    <ion-select-option value="apples">Apples</ion-select-option>
    <ion-select-option value="oranges">Oranges</ion-select-option>
    <ion-select-option value="bananas">Bananas</ion-select-option>
  </ion-select>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonSelect, IonSelectOption } from '@ionic/vue';
<\/script>

<style>
  ion-select {
    --placeholder-color: #971e49;
    --placeholder-opacity: 1;
    width: 100%;
    justify-content: center;
  }

  ion-select::part(placeholder),
  ion-select::part(text) {
    flex: 0 0 auto;
  }

  ion-select::part(placeholder)::first-letter {
    font-size: 24px;
    font-weight: 500;
  }

  ion-select::part(text) {
    color: #545ca7;
  }

  ion-select::part(icon) {
    color: #971e49;
    opacity: 1;
  }
</style>`;

</script>

<style>
  ion-select {
    --placeholder-color: #971e49;
    --placeholder-opacity: 1;
    width: 100%;
    justify-content: center;
  }

  ion-select::part(placeholder),
  ion-select::part(text) {
    flex: 0 0 auto;
  }

  ion-select::part(placeholder)::first-letter {
    font-size: 24px;
    font-weight: 500;
  }

  ion-select::part(text) {
    color: #545ca7;
  }

  ion-select::part(icon) {
    color: #971e49;
    opacity: 1;
  }
</style>
