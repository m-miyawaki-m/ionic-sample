<template>

  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
        <ion-title>Modal / Can Dismiss Boolean</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">canDismiss プロパティを boolean で設定し、モーダルを閉じられるかどうかを制御する例。</p>
      <ion-button id="open-modal" expand="block">Open</ion-button>

      <ion-modal ref="modal" trigger="open-modal" :can-dismiss="canDismiss" :presenting-element="presentingElement">
        <ion-header>
          <ion-toolbar>
            <ion-title>Modal</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="dismiss()">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <p class="ion-padding-horizontal">You must accept the terms and conditions to close this modal.</p>
          <ion-item>
            <ion-checkbox id="terms" @ionChange="onTermsChanged" :checked="canDismiss">
              <div class="ion-text-wrap">Do you accept the terms and conditions?</div>
            </ion-checkbox>
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
  CheckboxCustomEvent,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

const sourceCode = `<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button id="open-modal" expand="block">Open</ion-button>

      <ion-modal ref="modal" trigger="open-modal" :can-dismiss="canDismiss" :presenting-element="presentingElement">
        <ion-header>
          <ion-toolbar>
            <ion-title>Modal</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="dismiss()">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <p class="ion-padding-horizontal">You must accept the terms and conditions to close this modal.</p>
          <ion-item>
            <ion-checkbox id="terms" @ionChange="onTermsChanged" :checked="canDismiss">
              <div class="ion-text-wrap">Do you accept the terms and conditions?</div>
            </ion-checkbox>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    CheckboxCustomEvent,
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonCheckbox,
    IonPage,
  } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

  const canDismiss = ref(false);
  const presentingElement = ref();
  const page = ref();
  const modal = ref();

  const dismiss = () => {
    modal.value.$el.dismiss();
  };

  const onTermsChanged = (event: CheckboxCustomEvent) => {
    canDismiss.value = event.detail.checked;
  };

  onMounted(() => {
    presentingElement.value = page.value.$el;
  });
<\/script>`;


  const canDismiss = ref(false);
  const presentingElement = ref();
  const page = ref();
  const modal = ref();

  const dismiss = () => {
    modal.value.$el.dismiss();
  };

  const onTermsChanged = (event: CheckboxCustomEvent) => {
    canDismiss.value = event.detail.checked;
  };

  onMounted(() => {
    presentingElement.value = page.value.$el;
  });
</script>
