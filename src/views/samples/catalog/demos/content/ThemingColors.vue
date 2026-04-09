<template>
  <ion-page>
    <ion-content color="primary" class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったコンテンツ背景色のカスタマイズ例。</p>
        <h1>Primary content</h1>
        <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      </ion-content>
      <ion-content color="secondary" class="ion-padding">
        <h1>Secondary content</h1>
        <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      </ion-content>
      <ion-content color="tertiary" class="ion-padding">
        <h1>Tertiary content</h1>
        <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      </ion-content>
      <ion-content color="success" class="ion-padding">
        <h1>Success content</h1>
        <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      </ion-content>
      <ion-content color="warning" class="ion-padding">
        <h1>Warning content</h1>
        <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      </ion-content>
      <ion-content color="danger" class="ion-padding">
        <h1>Danger content</h1>
        <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      </ion-content>
      <ion-content color="light" class="ion-padding">
        <h1>Light content</h1>
        <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      </ion-content>
      <ion-content color="medium" class="ion-padding">
        <h1>Medium content</h1>
        <p>Here's a small text description for the content. Nothing more, nothing less.</p>
      </ion-content>
      <ion-content color="dark" class="ion-padding">
        <h1>Dark content</h1>
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
  <ion-content color="primary" class="ion-padding">
    <h1>Primary content</h1>
    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
  <ion-content color="secondary" class="ion-padding">
    <h1>Secondary content</h1>
    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
  <ion-content color="tertiary" class="ion-padding">
    <h1>Tertiary content</h1>
    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
  <ion-content color="success" class="ion-padding">
    <h1>Success content</h1>
    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
  <ion-content color="warning" class="ion-padding">
    <h1>Warning content</h1>
    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
  <ion-content color="danger" class="ion-padding">
    <h1>Danger content</h1>
    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
  <ion-content color="light" class="ion-padding">
    <h1>Light content</h1>
    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
  <ion-content color="medium" class="ion-padding">
    <h1>Medium content</h1>
    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
  <ion-content color="dark" class="ion-padding">
    <h1>Dark content</h1>
    <p>Here's a small text description for the content. Nothing more, nothing less.</p>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonContent } from '@ionic/vue';
<\/script>`;

</script>
