<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Picker Legacy / Controller</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">旧 Picker API（pickerController）を使ってプログラム的にピッカーを表示する例。</p>
      <ion-button @click="openPicker()">Open</ion-button>
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
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  pickerController,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-button @click="openPicker()">Open</ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, pickerController } from '@ionic/vue';
  import { ref } from 'vue';

  const message = ref('');

  const openPicker = async () => {
    const picker = await pickerController.create({
      columns: [
        {
          name: 'languages',
          options: [
            {
              text: 'JavaScript',
              value: 'javascript',
            },
            {
              text: 'TypeScript',
              value: 'typescript',
            },
            {
              text: 'Rust',
              value: 'rust',
            },
            {
              text: 'C#',
              value: 'c#',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(\`You selected: \${value.languages.value}\`);
          },
        },
      ],
    });
    await picker.present();
  };
<\/script>`;


  const message = ref('');

  const openPicker = async () => {
    const picker = await pickerController.create({
      columns: [
        {
          name: 'languages',
          options: [
            {
              text: 'JavaScript',
              value: 'javascript',
            },
            {
              text: 'TypeScript',
              value: 'typescript',
            },
            {
              text: 'Rust',
              value: 'rust',
            },
            {
              text: 'C#',
              value: 'c#',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`You selected: ${value.languages.value}`);
          },
        },
      ],
    });
    await picker.present();
  };
</script>
