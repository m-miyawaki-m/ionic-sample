<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Picker / Modal</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">モーダル内で ion-picker を表示する例。</p>
      <ion-button id="open-modal">Open modal</ion-button>
        <ion-modal ref="modal" trigger="open-modal" is-open="true" @didDismiss="onDidDismiss">
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="modal.$el.dismiss(null, 'cancel')">Cancel</ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
              <ion-button @click="modal.$el.dismiss(currentValue, 'confirm')">Done</ion-button>
            </ion-buttons>
          </ion-toolbar>
          <ion-picker>
            <ion-picker-column :value="currentValue" @ionChange="onIonChange">
              <ion-picker-column-option value="" disabled="true">--</ion-picker-column-option>
              <ion-picker-column-option value="javascript">Javascript</ion-picker-column-option>
              <ion-picker-column-option value="typescript">Typescript</ion-picker-column-option>
              <ion-picker-column-option value="rust">Rust</ion-picker-column-option>
              <ion-picker-column-option value="c#">C#</ion-picker-column-option>
            </ion-picker-column>
          </ion-picker>
        </ion-modal>
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
  IonModal,
  IonPage,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

  import { ref } from 'vue';

const sourceCode = `<style>
  ion-modal {
    --height: auto;

    align-items: end;
  }

  ion-picker {
    margin-bottom: var(--ion-safe-area-bottom);
  }
</style>

<template>
  <ion-button id="open-modal">Open modal</ion-button>
  <ion-modal ref="modal" trigger="open-modal" is-open="true" @didDismiss="onDidDismiss">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="modal.$el.dismiss(null, 'cancel')">Cancel</ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="modal.$el.dismiss(currentValue, 'confirm')">Done</ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-picker>
      <ion-picker-column :value="currentValue" @ionChange="onIonChange">
        <ion-picker-column-option value="" disabled="true">--</ion-picker-column-option>
        <ion-picker-column-option value="javascript">Javascript</ion-picker-column-option>
        <ion-picker-column-option value="typescript">Typescript</ion-picker-column-option>
        <ion-picker-column-option value="rust">Rust</ion-picker-column-option>
        <ion-picker-column-option value="c#">C#</ion-picker-column-option>
      </ion-picker-column>
    </ion-picker>
  </ion-modal>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonModal,
    IonToolbar,
    IonButtons,
    IonButton,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption,
  } from '@ionic/vue';

  import { ref } from 'vue';

  let currentValue = 'javascript';

  const modal = ref(null);

  const onIonChange = (event: CustomEvent) => {
    currentValue = event.detail.value;
  };

  const onDidDismiss = (event: CustomEvent) => {
    console.log('didDismiss', JSON.stringify(event.detail));
  };
<\/script>`;


  let currentValue = 'javascript';

  const modal = ref(null);

  const onIonChange = (event: CustomEvent) => {
    currentValue = event.detail.value;
  };

  const onDidDismiss = (event: CustomEvent) => {
    console.log('didDismiss', JSON.stringify(event.detail));
  };
</script>

<style>
  ion-modal {
    --height: auto;

    align-items: end;
  }

  ion-picker {
    margin-bottom: var(--ion-safe-area-bottom);
  }
</style>
