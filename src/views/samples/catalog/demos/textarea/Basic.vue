<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Textarea / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">複数行テキスト入力（ion-textarea）の基本的な使い方。</p>
      <ion-list>
          <ion-item>
            <ion-textarea label="Regular textarea" placeholder="Type something here"></ion-textarea>
          </ion-item>
          <ion-item>
            <ion-textarea :readonly="true" label="Readonly textarea" placeholder="Can't edit this"></ion-textarea>
          </ion-item>
          <ion-item>
            <ion-textarea :disabled="true" label="Disabled textarea" placeholder="Can't type here"></ion-textarea>
          </ion-item>
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
  IonTextarea,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-textarea label="Regular textarea" placeholder="Type something here"></ion-textarea>
    </ion-item>
    <ion-item>
      <ion-textarea :readonly="true" label="Readonly textarea" placeholder="Can't edit this"></ion-textarea>
    </ion-item>
    <ion-item>
      <ion-textarea :disabled="true" label="Disabled textarea" placeholder="Can't type here"></ion-textarea>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonList, IonTextarea } from '@ionic/vue';
<\/script>`;

</script>
