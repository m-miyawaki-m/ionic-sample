<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input / Clear</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">clearInput プロパティで入力値をワンタップでクリアするボタンを表示する例。</p>
      <ion-list>
          <ion-item>
            <ion-input
              label="Input with clear button"
              label-placement="stacked"
              :clear-input="true"
              placeholder="Enter text to see clear button"
              value="Default value"
            >
            </ion-input>
          </ion-item>
      
          <ion-item>
            <ion-input
              label="Input with clear on edit"
              label-placement="stacked"
              :clear-on-edit="true"
              placeholder="Enter text, leave the input, come back and type to clear"
            >
            </ion-input>
          </ion-item>
      
          <ion-item>
            <ion-input
              label="Password input"
              label-placement="stacked"
              type="password"
              placeholder="Enter text, leave the input, come back and type to clear"
            >
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
      <ion-input
        label="Input with clear button"
        label-placement="stacked"
        :clear-input="true"
        placeholder="Enter text to see clear button"
        value="Default value"
      >
      </ion-input>
    </ion-item>

    <ion-item>
      <ion-input
        label="Input with clear on edit"
        label-placement="stacked"
        :clear-on-edit="true"
        placeholder="Enter text, leave the input, come back and type to clear"
      >
      </ion-input>
    </ion-item>

    <ion-item>
      <ion-input
        label="Password input"
        label-placement="stacked"
        type="password"
        placeholder="Enter text, leave the input, come back and type to clear"
      >
      </ion-input>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInput, IonItem, IonList } from '@ionic/vue';
<\/script>`;

</script>
