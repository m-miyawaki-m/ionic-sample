<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Textarea / Theming</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったテキストエリアのスタイルカスタマイズ例。</p>
      <ion-textarea
          aria-label="Custom textarea"
          placeholder="Type something here"
          class="custom"
          helper-text="Helper text"
          :counter="true"
          :maxlength="100"
        ></ion-textarea>
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
  IonTextarea,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<style>
  ion-textarea.custom {
    --background: #373737;
    --color: #fff;
    --padding-end: 10px;
    --padding-start: 10px;
    --placeholder-color: #ddd;
    --placeholder-opacity: 0.8;
  }

  ion-textarea.custom.ios .textarea-bottom .helper-text,
  ion-textarea.custom.ios .textarea-bottom .counter,
  ion-textarea.custom.md .textarea-bottom .helper-text,
  ion-textarea.custom.md .textarea-bottom .counter {
    color: var(--ion-color-primary);
  }
</style>

<template>
  <ion-textarea
    aria-label="Custom textarea"
    placeholder="Type something here"
    class="custom"
    helper-text="Helper text"
    :counter="true"
    :maxlength="100"
  ></ion-textarea>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonTextarea } from '@ionic/vue';
<\/script>`;

</script>

<style>
  ion-textarea.custom {
    --background: #373737;
    --color: #fff;
    --padding-end: 10px;
    --padding-start: 10px;
    --placeholder-color: #ddd;
    --placeholder-opacity: 0.8;
  }

  ion-textarea.custom.ios .textarea-bottom .helper-text,
  ion-textarea.custom.ios .textarea-bottom .counter,
  ion-textarea.custom.md .textarea-bottom .helper-text,
  ion-textarea.custom.md .textarea-bottom .counter {
    color: var(--ion-color-primary);
  }
</style>
