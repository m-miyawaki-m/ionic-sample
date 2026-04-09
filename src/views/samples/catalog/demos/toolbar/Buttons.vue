<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toolbar / Buttons</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ツールバーにさまざまなボタンを配置する例。</p>
      <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button> Start </ion-button>
          </ion-buttons>
          <ion-title>Start / End Buttons</ion-title>
          <ion-buttons slot="end">
            <ion-button> End </ion-button>
          </ion-buttons>
        </ion-toolbar>
      
        <ion-toolbar>
          <ion-buttons slot="secondary">
            <ion-button> Secondary </ion-button>
          </ion-buttons>
          <ion-buttons slot="primary">
            <ion-button> Primary </ion-button>
          </ion-buttons>
          <ion-title>Primary / Secondary Buttons</ion-title>
        </ion-toolbar>
      
        <ion-toolbar>
          <ion-buttons slot="secondary">
            <ion-button>
              <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
            </ion-button>
            <ion-button>
              <ion-icon slot="icon-only" :icon="search"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="primary">
            <ion-button>
              <ion-icon slot="icon-only" :ios="ellipsisHorizontal" :md="ellipsisVertical"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>Icon Buttons</ion-title>
        </ion-toolbar>
      
        <ion-toolbar>
          <ion-buttons slot="secondary">
            <ion-button fill="solid">
              <ion-icon slot="start" :icon="personCircle"></ion-icon>
              Contact
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="primary">
            <ion-button fill="solid">
              Help
              <ion-icon slot="end" :icon="helpCircle"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>Solid Buttons</ion-title>
        </ion-toolbar>
      
        <ion-toolbar>
          <ion-buttons slot="secondary">
            <ion-button fill="outline">
              <ion-icon slot="start" :icon="star"></ion-icon>
              Star
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="primary">
            <ion-button fill="outline">
              Edit
              <ion-icon slot="end" :icon="create"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>Outline Buttons</ion-title>
        </ion-toolbar>
      
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button default-href="#"></ion-back-button>
          </ion-buttons>
          <ion-title>Back Button</ion-title>
        </ion-toolbar>
      
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button :auto-hide="false"></ion-menu-button>
          </ion-buttons>
          <ion-title>Menu Button</ion-title>
        </ion-toolbar>
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
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button> Start </ion-button>
    </ion-buttons>
    <ion-title>Start / End Buttons</ion-title>
    <ion-buttons slot="end">
      <ion-button> End </ion-button>
    </ion-buttons>
  </ion-toolbar>

  <ion-toolbar>
    <ion-buttons slot="secondary">
      <ion-button> Secondary </ion-button>
    </ion-buttons>
    <ion-buttons slot="primary">
      <ion-button> Primary </ion-button>
    </ion-buttons>
    <ion-title>Primary / Secondary Buttons</ion-title>
  </ion-toolbar>

  <ion-toolbar>
    <ion-buttons slot="secondary">
      <ion-button>
        <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
      </ion-button>
      <ion-button>
        <ion-icon slot="icon-only" :icon="search"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-buttons slot="primary">
      <ion-button>
        <ion-icon slot="icon-only" :ios="ellipsisHorizontal" :md="ellipsisVertical"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-title>Icon Buttons</ion-title>
  </ion-toolbar>

  <ion-toolbar>
    <ion-buttons slot="secondary">
      <ion-button fill="solid">
        <ion-icon slot="start" :icon="personCircle"></ion-icon>
        Contact
      </ion-button>
    </ion-buttons>
    <ion-buttons slot="primary">
      <ion-button fill="solid">
        Help
        <ion-icon slot="end" :icon="helpCircle"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-title>Solid Buttons</ion-title>
  </ion-toolbar>

  <ion-toolbar>
    <ion-buttons slot="secondary">
      <ion-button fill="outline">
        <ion-icon slot="start" :icon="star"></ion-icon>
        Star
      </ion-button>
    </ion-buttons>
    <ion-buttons slot="primary">
      <ion-button fill="outline">
        Edit
        <ion-icon slot="end" :icon="create"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-title>Outline Buttons</ion-title>
  </ion-toolbar>

  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button default-href="#"></ion-back-button>
    </ion-buttons>
    <ion-title>Back Button</ion-title>
  </ion-toolbar>

  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button :auto-hide="false"></ion-menu-button>
    </ion-buttons>
    <ion-title>Menu Button</ion-title>
  </ion-toolbar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonBackButton, IonButton, IonButtons, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/vue';
  import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, search, personCircle, star } from 'ionicons/icons';
<\/script>`;

</script>
