<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Textarea / Autogrow</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">autoGrow プロパティで入力内容に応じてテキストエリアの高さが自動的に拡張する例。</p>
      <ion-item>
          <ion-textarea
            placeholder="Type something here"
            :auto-grow="true"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus sem, auctor accumsan egestas sed, venenatis at ex. Nam consequat ex odio, suscipit rhoncus orci dictum eget. Aenean sit amet ligula varius felis facilisis lacinia nec volutpat nulla. Duis ullamcorper sit amet turpis sed blandit. Integer pretium massa eu faucibus interdum."
          >
          </ion-textarea>
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
  IonMenuButton,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item>
    <ion-textarea
      placeholder="Type something here"
      :auto-grow="true"
      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus sem, auctor accumsan egestas sed, venenatis at ex. Nam consequat ex odio, suscipit rhoncus orci dictum eget. Aenean sit amet ligula varius felis facilisis lacinia nec volutpat nulla. Duis ullamcorper sit amet turpis sed blandit. Integer pretium massa eu faucibus interdum."
    >
    </ion-textarea>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonTextarea } from '@ionic/vue';
<\/script>`;

</script>
