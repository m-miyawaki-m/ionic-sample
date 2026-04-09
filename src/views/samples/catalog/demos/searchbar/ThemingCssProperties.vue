<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Searchbar / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使った検索バーのスタイルカスタマイズ例。</p>
      <ion-searchbar showCancelButton="focus" class="custom"></ion-searchbar>
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
  IonSearchbar,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-searchbar showCancelButton="focus" class="custom"></ion-searchbar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonSearchbar } from '@ionic/vue';
<\/script>

<style scoped>
  /* Scoped components require higher specificity to customize */
  ion-searchbar.custom {
    --background: #19422d;
    --color: #fff;
    --placeholder-color: #fff;
    --icon-color: #fff;
    --clear-button-color: #fff;

    --border-radius: 4px;
  }

  ion-searchbar.ios.custom {
    --cancel-button-color: #19422d;
  }

  ion-searchbar.md.custom {
    --cancel-button-color: #fff;
  }
</style>`;

</script>

<style scoped>
  /* Scoped components require higher specificity to customize */
  ion-searchbar.custom {
    --background: #19422d;
    --color: #fff;
    --placeholder-color: #fff;
    --icon-color: #fff;
    --clear-button-color: #fff;

    --border-radius: 4px;
  }

  ion-searchbar.ios.custom {
    --cancel-button-color: #19422d;
  }

  ion-searchbar.md.custom {
    --cancel-button-color: #fff;
  }
</style>
