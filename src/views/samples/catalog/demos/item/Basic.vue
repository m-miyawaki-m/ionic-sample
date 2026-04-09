<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">リスト項目（ion-item）の基本的な使い方。ラベルとコンテンツの組み合わせを確認できる。</p>
      <ion-item>
          <ion-label>Basic Item</ion-label>
        </ion-item>
      
        <ion-item>
          <ion-label>
            Multi-line text that should wrap when it is too long to fit on one line. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </ion-label>
        </ion-item>
      
        <ion-item>
          <ion-label class="ion-text-nowrap">
            Multi-line text that should ellipsis when it is too long to fit on one line. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </ion-label>
        </ion-item>
      
        <ion-item>
          <ion-label>
            <h1>H1 Heading</h1>
            <p>Paragraph</p>
          </ion-label>
        </ion-item>
      
        <ion-item>
          <ion-label>
            <h2>H2 Heading</h2>
            <p>Paragraph</p>
          </ion-label>
        </ion-item>
      
        <ion-item>
          <ion-label>
            <h3>H3 Heading</h3>
            <p>Paragraph</p>
          </ion-label>
        </ion-item>
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
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item>
    <ion-label>Basic Item</ion-label>
  </ion-item>

  <ion-item>
    <ion-label>
      Multi-line text that should wrap when it is too long to fit on one line. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit.
    </ion-label>
  </ion-item>

  <ion-item>
    <ion-label class="ion-text-nowrap">
      Multi-line text that should ellipsis when it is too long to fit on one line. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
    </ion-label>
  </ion-item>

  <ion-item>
    <ion-label>
      <h1>H1 Heading</h1>
      <p>Paragraph</p>
    </ion-label>
  </ion-item>

  <ion-item>
    <ion-label>
      <h2>H2 Heading</h2>
      <p>Paragraph</p>
    </ion-label>
  </ion-item>

  <ion-item>
    <ion-label>
      <h3>H3 Heading</h3>
      <p>Paragraph</p>
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonLabel } from '@ionic/vue';
<\/script>`;

</script>
