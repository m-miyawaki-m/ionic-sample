<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Avatar / Item</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-item 内にアバターを配置する例。</p>
      <ion-item>
          <ion-avatar slot="start">
            <img alt="Silhouette of a person's head" src="@/assets/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>Item Avatar</ion-label>
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
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item>
    <ion-avatar slot="start">
      <img alt="Silhouette of a person's head" src="@/assets/img/demos/avatar.svg" />
    </ion-avatar>
    <ion-label>Item Avatar</ion-label>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonAvatar, IonItem, IonLabel } from '@ionic/vue';
<\/script>`;

</script>
