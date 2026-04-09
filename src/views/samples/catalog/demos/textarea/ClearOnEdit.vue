<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Textarea / Clear On Edit</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">clearOnEdit プロパティで編集開始時に入力値をクリアする例。</p>
      <ion-textarea
          placeholder="Enter text, leave the textarea, come back, and type to clear"
          :clear-on-edit="true"
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

const sourceCode = `<template>
  <ion-textarea
    placeholder="Enter text, leave the textarea, come back, and type to clear"
    :clear-on-edit="true"
  ></ion-textarea>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonTextarea } from '@ionic/vue';
<\/script>`;

</script>
