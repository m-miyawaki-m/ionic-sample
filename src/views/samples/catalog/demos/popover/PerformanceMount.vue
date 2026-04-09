<template>
  <ion-page>
    <ion-content>
        <ion-button id="open-popover">Open Popover</ion-button>
        <ion-popover :keep-contents-mounted="true" trigger="open-popover">
          <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">keepContentsMounted プロパティでポップオーバーの内容を事前マウントしてパフォーマンスを改善する例。</p>This content was mounted as soon as the popover was created.</ion-content>
        </ion-popover>
      
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
  IonButton,
  IonContent,
  IonPage,
  IonPopover,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-content>
    <ion-button id="open-popover">Open Popover</ion-button>
    <ion-popover :keep-contents-mounted="true" trigger="open-popover">
      <ion-content class="ion-padding">This content was mounted as soon as the popover was created.</ion-content>
    </ion-popover>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonContent, IonPopover } from '@ionic/vue';
<\/script>`;

</script>
