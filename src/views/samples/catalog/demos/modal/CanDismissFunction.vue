<template>

  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
        <ion-title>Modal / Can Dismiss Function</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">canDismiss にコールバック関数を設定し、条件付きでモーダルを閉じる制御を実装する例。</p>
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
        <ion-content class="ion-padding">
          <p>You will be prompted when closing this modal.</p>
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
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  actionSheetController,
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
        <ion-content class="ion-padding">
          <p>You will be prompted when closing this modal.</p>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
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
    IonPage,
    actionSheetController,
  } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

  const presentingElement = ref(undefined);
  const page = ref();
  const modal = ref();

  const dismiss = () => {
    modal.value.$el.dismiss();
  };

  const canDismiss = async () => {
    const actionSheet = await actionSheetController.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });
    actionSheet.present();
    const { role } = await actionSheet.onWillDismiss();
    return role === 'confirm';
  };

  onMounted(() => {
    presentingElement.value = page.value.$el;
  });
<\/script>`;


  const presentingElement = ref(undefined);
  const page = ref();
  const modal = ref();

  const dismiss = () => {
    modal.value.$el.dismiss();
  };

  const canDismiss = async () => {
    const actionSheet = await actionSheetController.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });
    actionSheet.present();
    const { role } = await actionSheet.onWillDismiss();
    return role === 'confirm';
  };

  onMounted(() => {
    presentingElement.value = page.value.$el;
  });
</script>
