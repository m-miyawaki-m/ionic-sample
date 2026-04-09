<template>

  <ion-tabs ref="tabs">
    <ion-tab tab="home">
      <ion-page id="home-page">
        <ion-header>
          <ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
            <ion-title>Tabs / Select Method</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">select() メソッドを使ってプログラムから特定のタブに切り替える例。</p>
          <div class="example-content">
            Listen now content
            <ion-button @click="selectRadio()">Go to Radio</ion-button>
          </div>
        </ion-content>
      </ion-page>
    </ion-tab>
    <ion-tab tab="radio">
      <ion-page id="radio-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Radio</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="example-content">Radio content</div>
        </ion-content>
      </ion-page>
    </ion-tab>
    <ion-tab tab="library">
      <ion-page id="library-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Library</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="example-content">Library content</div>
        </ion-content>
      </ion-page>
    </ion-tab>
    <ion-tab tab="search">
      <ion-page id="search-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Search</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="example-content">Search content</div>
        
<div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
  <details>
    <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
    <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
  </details>
</div>
</ion-content>
      </ion-page>
    </ion-tab>

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home">
        <ion-icon :icon="playCircle" />
        Listen Now
      </ion-tab-button>
      <ion-tab-button tab="radio">
        <ion-icon :icon="radio" />
        Radio
      </ion-tab-button>
      <ion-tab-button tab="library">
        <ion-icon :icon="library" />
        Library
      </ion-tab-button>
      <ion-tab-button tab="search">
        <ion-icon :icon="search" />
        Search
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>

</template>

<script setup lang="ts">
// @ts-nocheck
  import { ref } from 'vue';
  import { 
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { playCircle, radio, library, search } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-tabs ref="tabs">
    <ion-tab tab="home">
      <ion-page id="home-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Listen now</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="example-content">
            Listen now content
            <ion-button @click="selectRadio()">Go to Radio</ion-button>
          </div>
        </ion-content>
      </ion-page>
    </ion-tab>
    <ion-tab tab="radio">
      <ion-page id="radio-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Radio</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="example-content">Radio content</div>
        </ion-content>
      </ion-page>
    </ion-tab>
    <ion-tab tab="library">
      <ion-page id="library-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Library</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="example-content">Library content</div>
        </ion-content>
      </ion-page>
    </ion-tab>
    <ion-tab tab="search">
      <ion-page id="search-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Search</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="example-content">Search content</div>
        </ion-content>
      </ion-page>
    </ion-tab>

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home">
        <ion-icon :icon="playCircle" />
        Listen Now
      </ion-tab-button>
      <ion-tab-button tab="radio">
        <ion-icon :icon="radio" />
        Radio
      </ion-tab-button>
      <ion-tab-button tab="library">
        <ion-icon :icon="library" />
        Library
      </ion-tab-button>
      <ion-tab-button tab="search">
        <ion-icon :icon="search" />
        Search
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { ref } from 'vue';
  import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTab,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonTitle,
    IonToolbar,
  } from '@ionic/vue';
  import { playCircle, radio, library, search } from 'ionicons/icons';

  const tabs = ref();

  const selectRadio = () => {
    tabs.value.$el.select('radio');
  };
<\/script>

<style scoped>
  /* This style is for demonstration purposes only. */
  /* It's not required for the tabs to function. */
  .example-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 10px;
  }
</style>`;


  const tabs = ref();

  const selectRadio = () => {
    tabs.value.$el.select('radio');
  };
</script>

<style scoped>
  /* This style is for demonstration purposes only. */
  /* It's not required for the tabs to function. */
  .example-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 10px;
  }
</style>
