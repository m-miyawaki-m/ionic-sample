<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">テキスト入力フィールド（ion-input）の基本的な使い方。ラベルとプレースホルダーを確認できる。</p>
      <ion-list>
          <ion-item>
            <ion-input label="Default input"></ion-input>
          </ion-item>
      
          <ion-item>
            <ion-input label="Input with placeholder" placeholder="Enter company name"></ion-input>
          </ion-item>
      
          <ion-item>
            <ion-input label="Input with value" value="121 S Pinckney St #300"></ion-input>
          </ion-item>
      
          <ion-item>
            <ion-input label="Readonly input" value="Madison" :readonly="true"></ion-input>
          </ion-item>
      
          <ion-item>
            <ion-input label="Disabled input" value="53703" :disabled="true"></ion-input>
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
      <ion-input label="Default input"></ion-input>
    </ion-item>

    <ion-item>
      <ion-input label="Input with placeholder" placeholder="Enter company name"></ion-input>
    </ion-item>

    <ion-item>
      <ion-input label="Input with value" value="121 S Pinckney St #300"></ion-input>
    </ion-item>

    <ion-item>
      <ion-input label="Readonly input" value="Madison" :readonly="true"></ion-input>
    </ion-item>

    <ion-item>
      <ion-input label="Disabled input" value="53703" :disabled="true"></ion-input>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInput, IonItem, IonList } from '@ionic/vue';
<\/script>`;

</script>
