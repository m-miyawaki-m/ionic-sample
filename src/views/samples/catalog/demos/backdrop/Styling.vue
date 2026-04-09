<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Backdrop / Styling</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS を使ったバックドロップのスタイルカスタマイズ例。</p>
      <ion-backdrop :visible="true"></ion-backdrop>
        <div class="ion-page">
          <ion-header>
            <ion-toolbar>
              <ion-title>Backdrop</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, cum aspernatur cupiditate nesciunt totam
              perspiciatis delectus soluta laboriosam, ullam impedit porro eaque laborum optio natus sed nostrum, provident
              expedita vero!
            </p>
          </ion-content>
        </div>
        <div id="box">
          <ion-checkbox color="light"></ion-checkbox>
          <ion-button class="ion-margin-start" color="light">Clickable</ion-button>
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
  IonBackdrop,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<style>
  ion-backdrop {
    opacity: 0.9;
    background: var(--ion-color-primary);
  }

  #box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ion-background-color, #fff);
    width: 90%;
    height: 100px;
    border-radius: 10px;
  }
</style>

<template>
  <ion-backdrop :visible="true"></ion-backdrop>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Backdrop</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, cum aspernatur cupiditate nesciunt totam
        perspiciatis delectus soluta laboriosam, ullam impedit porro eaque laborum optio natus sed nostrum, provident
        expedita vero!
      </p>
    </ion-content>
  </div>
  <div id="box">
    <ion-checkbox color="light"></ion-checkbox>
    <ion-button class="ion-margin-start" color="light">Clickable</ion-button>
  </div>
</template>
<script setup lang="ts">
// @ts-nocheck
  import { IonBackdrop, IonHeader, IonToolbar, IonTitle, IonContent, IonCheckbox, IonButton } from '@ionic/vue';
<\/script>`;

</script>

<style>
  ion-backdrop {
    opacity: 0.9;
    background: var(--ion-color-primary);
  }

  #box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ion-background-color, #fff);
    width: 90%;
    height: 100px;
    border-radius: 10px;
  }
</style>
