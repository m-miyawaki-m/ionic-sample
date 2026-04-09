<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-buttons slot="start">
            <ion-back-button default-href="/"></ion-back-button>
          </ion-buttons>
          <ion-title>Layout / Dynamic Font Scaling</ion-title>
          <ion-buttons slot="end">
            <ion-button>
              <ion-icon :icon="create" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content color="light">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ダイナミックフォントスケーリングに対応したレイアウト実装の例。</p>
        <ion-list :inset="true">
          <ion-item>
            <ion-input label="Name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-checkbox>Check for a free puppy</ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-toggle>Enable Notifications</ion-toggle>
          </ion-item>
        </ion-list>
    
        <ion-list :inset="true">
          <ion-item>
            <ion-label>Item 1</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Item 2</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Item 3</ion-label>
          </ion-item>
        </ion-list>
      
    <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
      <details>
        <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
        <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
      </details>
    </div>
    </ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-title>Footer</ion-title>
        </ion-toolbar>
      </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { 
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
 } from '@ionic/vue';
  import { create } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/"></ion-back-button>
      </ion-buttons>
      <ion-title>Title</ion-title>
      <ion-buttons slot="end">
        <ion-button>
          <ion-icon :icon="create" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content color="light">
    <ion-list :inset="true">
      <ion-item>
        <ion-input label="Name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-checkbox>Check for a free puppy</ion-checkbox>
      </ion-item>
      <ion-item>
        <ion-toggle>Enable Notifications</ion-toggle>
      </ion-item>
    </ion-list>

    <ion-list :inset="true">
      <ion-item>
        <ion-label>Item 1</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Item 2</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Item 3</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-title>Footer</ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToggle,
    IonToolbar,
  } from '@ionic/vue';
  import { create } from 'ionicons/icons';
<\/script>`;

</script>
