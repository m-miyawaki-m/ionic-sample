<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Datetime / Buttons Customizing Buttons</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">確認・キャンセルボタンの外観をカスタマイズする例。スロットを使ったボタンの差し替え。</p>
      <ion-datetime ref="datetime">
          <ion-buttons slot="buttons">
            <ion-button color="danger" @click="reset()">Reset</ion-button>
            <ion-button color="primary" @click="cancel()">Never mind</ion-button>
            <ion-button color="primary" @click="confirm()">All Set</ion-button>
          </ion-buttons>
        </ion-datetime>
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
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-datetime ref="datetime">
    <ion-buttons slot="buttons">
      <ion-button color="danger" @click="reset()">Reset</ion-button>
      <ion-button color="primary" @click="cancel()">Never mind</ion-button>
      <ion-button color="primary" @click="confirm()">All Set</ion-button>
    </ion-buttons>
  </ion-datetime>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButtons, IonButton, IonDatetime } from '@ionic/vue';
  import { ref } from 'vue';

  const datetime = ref();
  const reset = () => datetime.value.$el.reset();
  const cancel = () => datetime.value.$el.cancel();
  const confirm = () => datetime.value.$el.confirm();
<\/script>`;


  const datetime = ref();
  const reset = () => datetime.value.$el.reset();
  const cancel = () => datetime.value.$el.cancel();
  const confirm = () => datetime.value.$el.confirm();
</script>
