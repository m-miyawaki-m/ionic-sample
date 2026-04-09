<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Picker Legacy / Multiple Column</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">旧 Picker で複数カラムを同時に表示する例。</p>
      <ion-button id="open-picker">Open</ion-button>
        <ion-picker-legacy trigger="open-picker" :columns="pickerColumns" :buttons="pickerButtons"></ion-picker-legacy>
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

const sourceCode = `<template>
  <ion-button id="open-picker">Open</ion-button>
  <ion-picker-legacy trigger="open-picker" :columns="pickerColumns" :buttons="pickerButtons"></ion-picker-legacy>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonPickerLegacy } from '@ionic/vue';

  const pickerColumns = [
    {
      name: 'meat',
      options: [
        {
          text: 'Pepperoni',
          value: 'pepperoni',
        },
        {
          text: 'Smoked Ham',
          value: 'smoked-ham',
        },
        {
          text: 'Crispy Bacon',
          value: 'bacon',
        },
      ],
    },
    {
      name: 'veggies',
      options: [
        {
          text: 'Red onion',
          value: 'red-onion',
        },
        {
          text: 'Peppers',
          value: 'peppers',
        },
        {
          text: 'Black olives',
          value: 'black-olives',
        },
      ],
    },
    {
      name: 'crust',
      options: [
        {
          text: 'Pan style',
          value: 'pan',
        },
        {
          text: 'Hand tossed',
          value: 'hand-tossed',
        },
        {
          text: 'Stuffed crust',
          value: 'stuffed-crust',
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
        console.log(\`You selected a \${value.crust.text} pizza with \${value.meat.text} and \${value.veggies.text}\`);
      },
    },
  ];
<\/script>`;


  const pickerColumns = [
    {
      name: 'meat',
      options: [
        {
          text: 'Pepperoni',
          value: 'pepperoni',
        },
        {
          text: 'Smoked Ham',
          value: 'smoked-ham',
        },
        {
          text: 'Crispy Bacon',
          value: 'bacon',
        },
      ],
    },
    {
      name: 'veggies',
      options: [
        {
          text: 'Red onion',
          value: 'red-onion',
        },
        {
          text: 'Peppers',
          value: 'peppers',
        },
        {
          text: 'Black olives',
          value: 'black-olives',
        },
      ],
    },
    {
      name: 'crust',
      options: [
        {
          text: 'Pan style',
          value: 'pan',
        },
        {
          text: 'Hand tossed',
          value: 'hand-tossed',
        },
        {
          text: 'Stuffed crust',
          value: 'stuffed-crust',
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
        console.log(`You selected a ${value.crust.text} pizza with ${value.meat.text} and ${value.veggies.text}`);
      },
    },
  ];
</script>
