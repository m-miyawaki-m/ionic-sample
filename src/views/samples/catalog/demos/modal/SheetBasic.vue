<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Modal / Sheet Basic</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">画面下部から出てくるシートスタイルのモーダルの基本実装例。</p>
        <ion-button id="open-modal" expand="block">Open Sheet Modal</ion-button>
    
        <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
          <ion-content class="ion-padding">
            <ion-searchbar @click="$refs.modal.$el.setCurrentBreakpoint(0.75)" placeholder="Search"></ion-searchbar>
            <ion-list>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
                </ion-avatar>
                <ion-label>
                  <h2>Connor Smith</h2>
                  <p>Sales Rep</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
                </ion-avatar>
                <ion-label>
                  <h2>Daniel Smith</h2>
                  <p>Product Designer</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
                </ion-avatar>
                <ion-label>
                  <h2>Greg Smith</h2>
                  <p>Director of Operations</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
                </ion-avatar>
                <ion-label>
                  <h2>Zoey Smith</h2>
                  <p>CEO</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>
      
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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>App</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-button id="open-modal" expand="block">Open Sheet Modal</ion-button>

    <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]">
      <ion-content class="ion-padding">
        <ion-searchbar @click="$refs.modal.$el.setCurrentBreakpoint(0.75)" placeholder="Search"></ion-searchbar>
        <ion-list>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>Connor Smith</h2>
              <p>Sales Rep</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>Daniel Smith</h2>
              <p>Product Designer</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>Greg Smith</h2>
              <p>Director of Operations</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>Zoey Smith</h2>
              <p>CEO</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
    IonSearchbar,
  } from '@ionic/vue';
<\/script>`;

</script>
