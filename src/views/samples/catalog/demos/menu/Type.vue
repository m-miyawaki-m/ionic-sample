<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Menu / Type</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">type プロパティでメニューの表示アニメーション（overlay / reveal / push）を切り替える例。</p>
      <ion-menu :type="menuType" content-id="main-content">
          <ion-header>
            <ion-toolbar>
              <ion-title>Menu Content</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <ion-menu-toggle>
              <ion-button>Click to close the menu</ion-button>
            </ion-menu-toggle>
          </ion-content>
        </ion-menu>
      
        <div class="ion-page" id="main-content">
          <ion-header>
            <ion-toolbar>
              <ion-title>Menu</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <h2>Select an overlay type:</h2>
            <ion-radio-group value="overlay" v-model="menuType">
              <ion-item>
                <ion-radio value="overlay">
                  <code>overlay</code>
                </ion-radio>
              </ion-item>
              <ion-item>
                <ion-radio value="reveal">
                  <code>reveal</code>
                </ion-radio>
              </ion-item>
              <ion-item>
                <ion-radio value="push">
                  <code>push</code>
                </ion-radio>
              </ion-item>
            </ion-radio-group>
            <br />
            <ion-menu-toggle>
              <ion-button>Click to open the menu</ion-button>
            </ion-menu-toggle>
          </ion-content>
        </div>
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
  IonItem,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-menu :type="menuType" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-menu-toggle>
        <ion-button>Click to close the menu</ion-button>
      </ion-menu-toggle>
    </ion-content>
  </ion-menu>

  <div class="ion-page" id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>Select an overlay type:</h2>
      <ion-radio-group value="overlay" v-model="menuType">
        <ion-item>
          <ion-radio value="overlay">
            <code>overlay</code>
          </ion-radio>
        </ion-item>
        <ion-item>
          <ion-radio value="reveal">
            <code>reveal</code>
          </ion-radio>
        </ion-item>
        <ion-item>
          <ion-radio value="push">
            <code>push</code>
          </ion-radio>
        </ion-item>
      </ion-radio-group>
      <br />
      <ion-menu-toggle>
        <ion-button>Click to open the menu</ion-button>
      </ion-menu-toggle>
    </ion-content>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonMenu,
    IonMenuToggle,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonTitle,
    IonToolbar,
  } from '@ionic/vue';
  import { ref } from 'vue';

  const menuType = ref('overlay');
<\/script>`;


  const menuType = ref('overlay');
</script>
