<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>FAB / Theming Css Shadow Parts</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS Shadow Parts を使った FAB の詳細なスタイリング例。</p>
      <ion-fab>
          <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="end">
            <ion-fab-button>
              <ion-icon :icon="document"></ion-icon>
            </ion-fab-button>
            <ion-fab-button>
              <ion-icon :icon="colorPalette"></ion-icon>
            </ion-fab-button>
            <ion-fab-button>
              <ion-icon :icon="globe"></ion-icon>
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
  import { add, colorPalette, document, globe } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-fab>
    <ion-fab-button>
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="end">
      <ion-fab-button>
        <ion-icon :icon="document"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="colorPalette"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="globe"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/vue';
  import { add, colorPalette, document, globe } from 'ionicons/icons';
<\/script>

<style>
  ion-fab-button::part(native) {
    background-color: #b7f399;
    border-radius: 15px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    color: black;
  }

  ion-fab-button::part(native):hover::after {
    background-color: #a3e681;
  }

  ion-fab-button::part(native):active::after {
    background-color: #87d361;
  }
</style>`;

</script>

<style>
  ion-fab-button::part(native) {
    background-color: #b7f399;
    border-radius: 15px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    color: black;
  }

  ion-fab-button::part(native):hover::after {
    background-color: #a3e681;
  }

  ion-fab-button::part(native):active::after {
    background-color: #87d361;
  }
</style>
