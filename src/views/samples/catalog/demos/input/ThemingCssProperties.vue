<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使った入力フィールドのスタイルカスタマイズ例。</p>
      <ion-input
          aria-label="Custom input"
          placeholder="Custom input"
          class="custom"
          helper-text="Helper text"
          :counter="true"
          :maxlength="20"
        ></ion-input>
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
  IonInput,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-input
    aria-label="Custom input"
    placeholder="Custom input"
    class="custom"
    helper-text="Helper text"
    :counter="true"
    :maxlength="20"
  ></ion-input>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInput } from '@ionic/vue';
<\/script>

<style>
  ion-input.custom {
    --background: #373737;
    --color: #fff;
    --placeholder-color: #ddd;
    --placeholder-opacity: 0.8;

    --padding-bottom: 10px;
    --padding-end: 10px;
    --padding-start: 10px;
    --padding-top: 10px;
  }

  ion-input.custom.ios .input-bottom .helper-text,
  ion-input.custom.ios .input-bottom .counter,
  ion-input.custom.md .input-bottom .helper-text,
  ion-input.custom.md .input-bottom .counter {
    color: var(--ion-color-primary);
  }
</style>`;

</script>

<style>
  ion-input.custom {
    --background: #373737;
    --color: #fff;
    --placeholder-color: #ddd;
    --placeholder-opacity: 0.8;

    --padding-bottom: 10px;
    --padding-end: 10px;
    --padding-start: 10px;
    --padding-top: 10px;
  }

  ion-input.custom.ios .input-bottom .helper-text,
  ion-input.custom.ios .input-bottom .counter,
  ion-input.custom.md .input-bottom .helper-text,
  ion-input.custom.md .input-bottom .counter {
    color: var(--ion-color-primary);
  }
</style>
