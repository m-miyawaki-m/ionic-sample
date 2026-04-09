<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Picker Legacy / Inline IsOpen</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">旧 Picker をインラインコンポーネントとして isOpen で表示制御する例。</p>
      <ion-button @click="setOpen(true)">Open</ion-button>
        <ion-picker-legacy
          :is-open="isOpen"
          :columns="pickerColumns"
          :buttons="pickerButtons"
          @didDismiss="setOpen(false)"
        ></ion-picker-legacy>
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
  IonPickerLegacy,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-button @click="setOpen(true)">Open</ion-button>
  <ion-picker-legacy
    :is-open="isOpen"
    :columns="pickerColumns"
    :buttons="pickerButtons"
    @didDismiss="setOpen(false)"
  ></ion-picker-legacy>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonPickerLegacy } from '@ionic/vue';
  import { ref } from 'vue';

  const isOpen = ref(false);

  const pickerColumns = [
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
  ];

  const pickerButtons = [
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
  ];

  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
<\/script>`;


  const isOpen = ref(false);

  const pickerColumns = [
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
  ];

  const pickerButtons = [
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
  ];

  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
</script>
