<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toast / Buttons</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">トースト（ion-toast）にカスタムボタンを追加する例。</p>
      <ion-button id="open-toast">Open Toast</ion-button>
        <ion-toast
          trigger="open-toast"
          message="Hello World!"
          :duration="3000"
          :buttons="toastButtons"
          @didDismiss="handleDismiss($event)"
        ></ion-toast>
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
  IonToast,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button id="open-toast">Open Toast</ion-button>
  <ion-toast
    trigger="open-toast"
    message="Hello World!"
    :duration="3000"
    :buttons="toastButtons"
    @didDismiss="handleDismiss($event)"
  ></ion-toast>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonToast } from '@ionic/vue';

  const toastButtons = [
    {
      text: 'More Info',
      role: 'info',
      handler: () => {
        console.log('More Info clicked');
      },
    },
    {
      text: 'Dismiss',
      role: 'cancel',
      handler: () => {
        console.log('Dismiss clicked');
      },
    },
  ];

  const handleDismiss = (event: CustomEvent) => {
    const { role } = event.detail;
    console.log(\`Dismissed with role: \${role}\`);
  };
<\/script>`;


  const toastButtons = [
    {
      text: 'More Info',
      role: 'info',
      handler: () => {
        console.log('More Info clicked');
      },
    },
    {
      text: 'Dismiss',
      role: 'cancel',
      handler: () => {
        console.log('Dismiss clicked');
      },
    },
  ];

  const handleDismiss = (event: CustomEvent) => {
    const { role } = event.detail;
    console.log(`Dismissed with role: ${role}`);
  };
</script>
