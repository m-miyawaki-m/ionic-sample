<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Keyboard / Enterkeyhint</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">enterkeyhint 属性でソフトキーボードの確定ボタンのラベルを変更する例。</p>
      <ion-list>
          <ion-item>
            <ion-input enterkeyhint="search" label-placement="stacked" placeholder="Enter search query">
              <code slot="label">enterkeyhint="search"</code>
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input enterkeyhint="send" label-placement="stacked" placeholder="Type a message">
              <code slot="label">enterkeyhint="send"</code>
            </ion-input>
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
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-input enterkeyhint="search" label-placement="stacked" placeholder="Enter search query">
        <code slot="label">enterkeyhint="search"</code>
      </ion-input>
    </ion-item>
    <ion-item>
      <ion-input enterkeyhint="send" label-placement="stacked" placeholder="Type a message">
        <code slot="label">enterkeyhint="send"</code>
      </ion-input>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonList, IonItem, IonInput } from '@ionic/vue';
<\/script>`;

</script>
