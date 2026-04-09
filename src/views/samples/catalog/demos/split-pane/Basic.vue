<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Split Pane / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">スプリットペイン（ion-split-pane）の基本的な使い方。画面幅に応じてサイドメニューと本文を並列表示する。</p>
      <ion-split-pane when="xs" content-id="main">
          <ion-menu content-id="main">
            <ion-header>
              <ion-toolbar color="tertiary">
                <ion-title>Menu</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding"> Menu Content </ion-content>
          </ion-menu>
      
          <div class="ion-page" id="main">
            <ion-header>
              <ion-toolbar>
                <ion-title>Main View</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding"> Main View Content </ion-content>
          </div>
        </ion-split-pane>
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
  IonMenu,
  IonMenuButton,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-split-pane when="xs" content-id="main">
    <ion-menu content-id="main">
      <ion-header>
        <ion-toolbar color="tertiary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding"> Menu Content </ion-content>
    </ion-menu>

    <div class="ion-page" id="main">
      <ion-header>
        <ion-toolbar>
          <ion-title>Main View</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding"> Main View Content </ion-content>
    </div>
  </ion-split-pane>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonContent, IonHeader, IonMenu, IonSplitPane, IonTitle, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
