<template>
  <ion-page>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったコンテンツのスタイルカスタマイズ例。</p>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
    
        <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      
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
  <ion-content class="ion-padding">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>

    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonContent } from '@ionic/vue';
<\/script>

<style scoped>
  ion-content {
    --background: #d31373;
    --color: #fff;
  }
</style>`;

</script>

<style scoped>
  ion-content {
    --background: #d31373;
    --color: #fff;
  }
</style>
