<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>FAB / List Side</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-fab-list の side プロパティで展開方向（上下左右）を変更する例。</p>
      <ion-fab slot="fixed" horizontal="center" vertical="center">
          <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="top">
            <ion-fab-button>
              <ion-icon :icon="chevronUp"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
          <ion-fab-list side="end">
            <ion-fab-button>
              <ion-icon :icon="chevronForward"></ion-icon>
            </ion-fab-button>
            <ion-fab-button>
              <ion-icon :icon="chevronForward"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
          <ion-fab-list side="bottom">
            <ion-fab-button>
              <ion-icon :icon="chevronDown"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
          <ion-fab-list side="start">
            <ion-fab-button>
              <ion-icon :icon="chevronBack"></ion-icon>
            </ion-fab-button>
            <ion-fab-button>
              <ion-icon :icon="chevronBack"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
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
  IonFabList,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { add, chevronBack, chevronDown, chevronForward, chevronUp } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-fab slot="fixed" horizontal="center" vertical="center">
    <ion-fab-button>
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button>
        <ion-icon :icon="chevronUp"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
    <ion-fab-list side="end">
      <ion-fab-button>
        <ion-icon :icon="chevronForward"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="chevronForward"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
    <ion-fab-list side="bottom">
      <ion-fab-button>
        <ion-icon :icon="chevronDown"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
    <ion-fab-list side="start">
      <ion-fab-button>
        <ion-icon :icon="chevronBack"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="chevronBack"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/vue';
  import { add, chevronBack, chevronDown, chevronForward, chevronUp } from 'ionicons/icons';
<\/script>`;

</script>
