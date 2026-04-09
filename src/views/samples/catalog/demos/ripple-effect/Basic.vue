<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Ripple Effect / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-ripple-effect の基本的な使い方。タップ時に広がる波紋エフェクトを確認できる。</p>
      <div class="wrapper">
          <b>Click on a shape to see the ripple</b>
      
          <div class="ion-activatable ripple-parent rectangle">
            <ion-ripple-effect></ion-ripple-effect>
          </div>
      
          <div class="ion-activatable ripple-parent rounded-rectangle">
            <ion-ripple-effect></ion-ripple-effect>
          </div>
      
          <div class="ion-activatable ripple-parent circle">
            <ion-ripple-effect></ion-ripple-effect>
          </div>
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
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <div class="wrapper">
    <b>Click on a shape to see the ripple</b>

    <div class="ion-activatable ripple-parent rectangle">
      <ion-ripple-effect></ion-ripple-effect>
    </div>

    <div class="ion-activatable ripple-parent rounded-rectangle">
      <ion-ripple-effect></ion-ripple-effect>
    </div>

    <div class="ion-activatable ripple-parent circle">
      <ion-ripple-effect></ion-ripple-effect>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonRippleEffect } from '@ionic/vue';
<\/script>

<style scoped>
  .wrapper {
    display: flex;
    flex-wrap: wrap;

    align-items: center;
    justify-content: space-between;
    text-align: center;

    height: 300px;
    width: 300px;

    margin: 0 auto;
  }

  b {
    width: 100%;
  }

  .ripple-parent {
    position: relative;
    overflow: hidden;

    border: 1px solid #ddd;
  }

  .rectangle {
    width: 300px;
    height: 150px;
  }

  .rounded-rectangle {
    width: 185px;
    height: 65px;
    border-radius: 8px;
  }

  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
</style>`;

</script>

<style scoped>
  .wrapper {
    display: flex;
    flex-wrap: wrap;

    align-items: center;
    justify-content: space-between;
    text-align: center;

    height: 300px;
    width: 300px;

    margin: 0 auto;
  }

  b {
    width: 100%;
  }

  .ripple-parent {
    position: relative;
    overflow: hidden;

    border: 1px solid #ddd;
  }

  .rectangle {
    width: 300px;
    height: 150px;
  }

  .rounded-rectangle {
    width: 185px;
    height: 65px;
    border-radius: 8px;
  }

  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
</style>
