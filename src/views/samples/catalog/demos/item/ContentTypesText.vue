<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Item / Content Types Text</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content color="light">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">テキストコンテンツを含む ion-item のレイアウト例。</p>
        <ion-list :inset="true">
          <ion-item>
            <ion-input label="First Name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="Last Name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-toggle>
              <ion-label>Allow Notifications</ion-label>
              <ion-note color="medium">Unsubscribe at any time</ion-note>
            </ion-toggle>
          </ion-item>
        </ion-list>
    
        <ion-list :inset="true">
          <ion-item>
            <ion-textarea label="Comments" label-placement="floating" rows="5"></ion-textarea>
          </ion-item>
        </ion-list>
    
        <ion-note color="medium" class="ion-margin-horizontal">
          Your comments will be kept anonymous and will only be used to improve the reliability of our products.
        </ion-note>
      
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
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Example</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content color="light">
    <ion-list :inset="true">
      <ion-item>
        <ion-input label="First Name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="Last Name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-toggle>
          <ion-label>Allow Notifications</ion-label>
          <ion-note color="medium">Unsubscribe at any time</ion-note>
        </ion-toggle>
      </ion-item>
    </ion-list>

    <ion-list :inset="true">
      <ion-item>
        <ion-textarea label="Comments" label-placement="floating" rows="5"></ion-textarea>
      </ion-item>
    </ion-list>

    <ion-note color="medium" class="ion-margin-horizontal">
      Your comments will be kept anonymous and will only be used to improve the reliability of our products.
    </ion-note>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTextarea,
    IonToggle,
    IonToolbar,
    IonTitle,
  } from '@ionic/vue';
<\/script>

<style scoped>
  ion-note {
    display: block;
  }
</style>`;

</script>

<style scoped>
  ion-note {
    display: block;
  }
</style>
