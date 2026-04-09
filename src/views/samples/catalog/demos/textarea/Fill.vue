<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Textarea / Fill</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">fill プロパティでテキストエリアの外観を solid / outline に切り替える例。</p>
      <ion-textarea label="Solid textarea" label-placement="floating" fill="solid" placeholder="Enter text"></ion-textarea>
      
        <br />
      
        <ion-textarea
          label="Outline textarea"
          label-placement="floating"
          fill="outline"
          placeholder="Enter text"
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
  <ion-textarea label="Solid textarea" label-placement="floating" fill="solid" placeholder="Enter text"></ion-textarea>

  <br />

  <ion-textarea
    label="Outline textarea"
    label-placement="floating"
    fill="outline"
    placeholder="Enter text"
  ></ion-textarea>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonTextarea } from '@ionic/vue';
<\/script>`;

</script>
