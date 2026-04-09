<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Ripple Effect / Type</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">type プロパティで bounded（要素内に収まる）と unbounded（要素外に広がる）の波紋タイプを切り替える例。</p>
      <div class="wrapper">
          <b>Click on a shape to see the ripple</b>
      
          <div class="ion-activatable ripple-parent rounded-rectangle">
            Bounded
            <ion-ripple-effect></ion-ripple-effect>
          </div>
      
          <div class="ion-activatable ripple-parent circle">
            Unbounded
            <ion-ripple-effect type="unbounded"></ion-ripple-effect>
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

    <div class="ion-activatable ripple-parent rounded-rectangle">
      Bounded
      <ion-ripple-effect></ion-ripple-effect>
    </div>

    <div class="ion-activatable ripple-parent circle">
      Unbounded
      <ion-ripple-effect type="unbounded"></ion-ripple-effect>
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

    height: 170px;
    width: 400px;

    margin: 0 auto;
  }

  b {
    width: 100%;
  }

  .ripple-parent {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;

    border: 1px solid #ddd;

    user-select: none;
  }

  .rounded-rectangle {
    width: 250px;
    height: 75px;
    border-radius: 8px;
  }

  .circle {
    width: 120px;
    height: 120px;
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

    height: 170px;
    width: 400px;

    margin: 0 auto;
  }

  b {
    width: 100%;
  }

  .ripple-parent {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;

    border: 1px solid #ddd;

    user-select: none;
  }

  .rounded-rectangle {
    width: 250px;
    height: 75px;
    border-radius: 8px;
  }

  .circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
</style>
