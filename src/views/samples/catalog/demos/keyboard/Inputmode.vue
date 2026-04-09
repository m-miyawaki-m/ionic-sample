<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Keyboard / Inputmode</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">inputmode 属性でソフトキーボードの種類（数字・メール・URL など）を指定する例。</p>
      <ion-list>
          <ion-item>
            <ion-input inputmode="email" label-placement="stacked" placeholder="Enter a username or email address">
              <code slot="label">inputmode="email"</code>
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input inputmode="numeric" label-placement="stacked" placeholder="Enter an integer">
              <code slot="label">inputmode="numeric"</code>
            </ion-input>
          </ion-item>
          <ion-item>
            <ion-input inputmode="decimal" label-placement="stacked" placeholder="Enter a decimal">
              <code slot="label">inputmode="decimal"</code>
            </ion-input>
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
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-input inputmode="email" label-placement="stacked" placeholder="Enter a username or email address">
        <code slot="label">inputmode="email"</code>
      </ion-input>
    </ion-item>
    <ion-item>
      <ion-input inputmode="numeric" label-placement="stacked" placeholder="Enter an integer">
        <code slot="label">inputmode="numeric"</code>
      </ion-input>
    </ion-item>
    <ion-item>
      <ion-input inputmode="decimal" label-placement="stacked" placeholder="Enter a decimal">
        <code slot="label">inputmode="decimal"</code>
      </ion-input>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonList, IonItem, IonInput } from '@ionic/vue';
<\/script>`;

</script>
