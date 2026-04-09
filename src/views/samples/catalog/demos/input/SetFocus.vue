<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input / Set Focus</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">setFocus() メソッドを使ってプログラムから入力フィールドにフォーカスを当てる例。</p>
      <ion-list>
          <ion-item>
            <ion-button @click="setFocus">Click to set focus</ion-button>
          </ion-item>
          <ion-item>
            <ion-input ref="input" label="Email" label-placement="floating"></ion-input>
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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-button @click="setFocus">Click to set focus</ion-button>
    </ion-item>
    <ion-item>
      <ion-input ref="input" label="Email" label-placement="floating"></ion-input>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInput, IonItem, IonList, IonButton } from '@ionic/vue';
  import { ref } from 'vue';

  const input = ref();

  function setFocus() {
    input.value.$el.setFocus();
  }
<\/script>`;


  const input = ref();

  function setFocus() {
    input.value.$el.setFocus();
  }
</script>
