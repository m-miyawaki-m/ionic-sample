<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input / Start End Slots</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">start / end スロットを使って入力フィールドの前後にアイコンやボタンを配置する例。</p>
      <ion-list>
          <ion-item>
            <ion-input label-placement="stacked" label="Email" placeholder="email@domain.com">
              <ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon>
              <ion-button fill="clear" slot="end" aria-label="Show/hide">
                <ion-icon slot="icon-only" :icon="eye" aria-hidden="true"></ion-icon>
              </ion-button>
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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { eye, lockClosed } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-input label-placement="stacked" label="Email" placeholder="email@domain.com">
        <ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon>
        <ion-button fill="clear" slot="end" aria-label="Show/hide">
          <ion-icon slot="icon-only" :icon="eye" aria-hidden="true"></ion-icon>
        </ion-button>
      </ion-input>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonIcon, IonInput, IonItem, IonList } from '@ionic/vue';
  import { eye, lockClosed } from 'ionicons/icons';
<\/script>`;

</script>
