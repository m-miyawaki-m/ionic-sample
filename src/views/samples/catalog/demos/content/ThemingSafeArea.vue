<template>
  <ion-page>
    <ion-content>
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">セーフエリア（ノッチ等）を考慮したコンテンツのパディング設定例。</p>
        <span>Here's a small text description for the content. Nothing more, nothing less.</span>
      
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
  import { IonContent, IonPage } from '@ionic/vue';

const sourceCode = `<template>
  <ion-content>
    <span>Here's a small text description for the content. Nothing more, nothing less.</span>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonContent } from '@ionic/vue';
<\/script>

<style>
  :root {
    /**
     * Setting the variables for DEMO purposes only.
     * Values will be set automatically when building an iOS or Android app.
     */
    --ion-safe-area-top: 20px;
    --ion-safe-area-bottom: 20px;
    --ion-safe-area-left: 20px;
    --ion-safe-area-right: 20px;
  }
</style>

<style scoped>
  ion-content::part(scroll) {
    padding-top: var(--ion-safe-area-top, 0);
    padding-bottom: var(--ion-safe-area-bottom, 0);
    padding-left: var(--ion-safe-area-left, 0);
    padding-right: var(--ion-safe-area-right, 0);
  }
</style>`;

</script>

<style>
  :root {
    /**
     * Setting the variables for DEMO purposes only.
     * Values will be set automatically when building an iOS or Android app.
     */
    --ion-safe-area-top: 20px;
    --ion-safe-area-bottom: 20px;
    --ion-safe-area-left: 20px;
    --ion-safe-area-right: 20px;
  }
</style>
