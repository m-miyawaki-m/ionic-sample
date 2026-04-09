<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Popover / Nested</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ポップオーバー内に別のポップオーバーを入れ子にする例。階層型メニューの実装に利用できる。</p>
      <ion-button id="popover-button">Open Menu</ion-button>
        <ion-popover trigger="popover-button" :dismiss-on-select="true">
          <ion-content>
            <ion-list>
              <ion-item :button="true" :detail="false">Option 1</ion-item>
              <ion-item :button="true" :detail="false">Option 2</ion-item>
              <ion-item :button="true" id="nested-trigger">More options...</ion-item>
      
              <ion-popover trigger="nested-trigger" :dismiss-on-select="true" side="end">
                <ion-content>
                  <ion-list>
                    <ion-item :button="true" :detail="false">Nested option</ion-item>
                  </ion-list>
                </ion-content>
              </ion-popover>
            </ion-list>
          </ion-content>
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
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button id="popover-button">Open Menu</ion-button>
  <ion-popover trigger="popover-button" :dismiss-on-select="true">
    <ion-content>
      <ion-list>
        <ion-item :button="true" :detail="false">Option 1</ion-item>
        <ion-item :button="true" :detail="false">Option 2</ion-item>
        <ion-item :button="true" id="nested-trigger">More options...</ion-item>

        <ion-popover trigger="nested-trigger" :dismiss-on-select="true" side="end">
          <ion-content>
            <ion-list>
              <ion-item :button="true" :detail="false">Nested option</ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonItem, IonList, IonPopover } from '@ionic/vue';
<\/script>`;

</script>
