<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>FAB / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">フローティングアクションボタン（ion-fab）の基本的な使い方。画面上に固定表示されるボタンを確認できる。</p>
      <ion-fab>
          <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
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
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { add } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-fab>
    <ion-fab-button>
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonFab, IonFabButton, IonIcon } from '@ionic/vue';
  import { add } from 'ionicons/icons';
<\/script>`;

</script>
