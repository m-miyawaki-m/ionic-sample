<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Modal / Inline Basic</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">trigger 属性を使い、ボタンクリックでインラインモーダルを開くパターン。</p>
        <ion-button id="open-modal" expand="block">Open</ion-button>
        <p>{{ message }}</p>
        <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-button @click="cancel()">Cancel</ion-button>
              </ion-buttons>
              <ion-title>Welcome</ion-title>
              <ion-buttons slot="end">
                <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <ion-item>
              <ion-input
                label="Enter your name"
                label-placement="stacked"
                ref="input"
                type="text"
                placeholder="Your name"
              ></ion-input>
            </ion-item>
          </ion-content>
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
  IonInput,
  IonItem,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { OverlayEventDetail } from '@ionic/core/components';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Inline Modal</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-button id="open-modal" expand="block">Open</ion-button>
    <p>{{ message }}</p>
    <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Welcome</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-input
            label="Enter your name"
            label-placement="stacked"
            ref="input"
            type="text"
            placeholder="Your name"
          ></ion-input>
        </ion-item>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
  } from '@ionic/vue';
  import { OverlayEventDetail } from '@ionic/core/components';
  import { ref } from 'vue';

  const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

  const modal = ref();
  const input = ref();

  const cancel = () => modal.value.$el.dismiss(null, 'cancel');

  const confirm = () => {
    const name = input.value.$el.value;
    modal.value.$el.dismiss(name, 'confirm');
  };

  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    if (event.detail.role === 'confirm') {
      message.value = \`Hello, \${event.detail.data}!\`;
    }
  };
<\/script>`;


  const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

  const modal = ref();
  const input = ref();

  const cancel = () => modal.value.$el.dismiss(null, 'cancel');

  const confirm = () => {
    const name = input.value.$el.value;
    modal.value.$el.dismiss(name, 'confirm');
  };

  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    if (event.detail.role === 'confirm') {
      message.value = `Hello, ${event.detail.data}!`;
    }
  };
</script>
