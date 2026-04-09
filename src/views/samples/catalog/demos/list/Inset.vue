<template>
  <ion-page>
    <ion-content color="light">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">inset プロパティでリストを画面端から内側に配置する例。</p>
        <ion-list :inset="true">
          <ion-item>
            <ion-label>Pokémon Yellow</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Mega Man X</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>The Legend of Zelda</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Pac-Man</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Super Mario World</ion-label>
          </ion-item>
        </ion-list>
      
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
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-content color="light">
    <ion-list :inset="true">
      <ion-item>
        <ion-label>Pokémon Yellow</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Mega Man X</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>The Legend of Zelda</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Pac-Man</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Super Mario World</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonContent, IonItem, IonLabel, IonList } from '@ionic/vue';
<\/script>`;

</script>
