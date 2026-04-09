<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item / Content Types Supporting Visuals</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">サポートビジュアル（アバター・サムネイルなど）を含む ion-item の例。</p>
      <ion-list>
          <ion-item>
            <ion-icon aria-hidden="true" :icon="airplane" slot="start"></ion-icon>
            <ion-label>Airplane Mode</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon aria-hidden="true" :icon="wifi" slot="start"></ion-icon>
            <ion-label>Wi-Fi</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon aria-hidden="true" :icon="bluetooth" slot="start"></ion-icon>
            <ion-label>Bluetooth</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon aria-hidden="true" :icon="call" slot="start"></ion-icon>
            <ion-label>Cellular</ion-label>
          </ion-item>
        </ion-list>
      
        <ion-list>
          <ion-item>
            <ion-avatar aria-hidden="true" slot="start">
              <img alt="" src="@/assets/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label>Huey</ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar aria-hidden="true" slot="start">
              <img alt="" src="@/assets/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label>Dewey</ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar aria-hidden="true" slot="start">
              <img alt="" src="@/assets/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label>Louie</ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar aria-hidden="true" slot="start">
              <img alt="" src="@/assets/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label>Fooie</ion-label>
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
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { airplane, bluetooth, call, wifi } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-icon aria-hidden="true" :icon="airplane" slot="start"></ion-icon>
      <ion-label>Airplane Mode</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon aria-hidden="true" :icon="wifi" slot="start"></ion-icon>
      <ion-label>Wi-Fi</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon aria-hidden="true" :icon="bluetooth" slot="start"></ion-icon>
      <ion-label>Bluetooth</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon aria-hidden="true" :icon="call" slot="start"></ion-icon>
      <ion-label>Cellular</ion-label>
    </ion-item>
  </ion-list>

  <ion-list>
    <ion-item>
      <ion-avatar aria-hidden="true" slot="start">
        <img alt="" src="@/assets/img/demos/avatar.svg" />
      </ion-avatar>
      <ion-label>Huey</ion-label>
    </ion-item>
    <ion-item>
      <ion-avatar aria-hidden="true" slot="start">
        <img alt="" src="@/assets/img/demos/avatar.svg" />
      </ion-avatar>
      <ion-label>Dewey</ion-label>
    </ion-item>
    <ion-item>
      <ion-avatar aria-hidden="true" slot="start">
        <img alt="" src="@/assets/img/demos/avatar.svg" />
      </ion-avatar>
      <ion-label>Louie</ion-label>
    </ion-item>
    <ion-item>
      <ion-avatar aria-hidden="true" slot="start">
        <img alt="" src="@/assets/img/demos/avatar.svg" />
      </ion-avatar>
      <ion-label>Fooie</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonAvatar, IonItem, IonLabel, IonList, IonIcon } from '@ionic/vue';
  import { airplane, bluetooth, call, wifi } from 'ionicons/icons';
<\/script>`;

</script>
