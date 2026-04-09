<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Item / Content Types Controls</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content color="light">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">フォームコントロール（チェックボックス・トグルなど）を含む ion-item の例。</p>
        <ion-list :inset="true">
          <ion-item>
            <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
            <ion-input aria-label="Task name" value="Get eggs"></ion-input>
          </ion-item>
          <ion-item>
            <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
            <ion-input aria-label="Task name" value="Get milk"></ion-input>
          </ion-item>
          <ion-item>
            <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
            <ion-input aria-label="Task name" value="Take out compost"></ion-input>
          </ion-item>
          <ion-item>
            <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
            <ion-input aria-label="Task name" value="Pick up dry cleaning"></ion-input>
          </ion-item>
          <ion-item>
            <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
            <ion-input aria-label="Task name" value="Call mom"></ion-input>
          </ion-item>
          <ion-item>
            <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
            <ion-input aria-label="Task name" value="Order more dog food"></ion-input>
          </ion-item>
          <ion-item>
            <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
            <ion-input aria-label="Task name" value="Think of new tasks for this demo"></ion-input>
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
  IonCheckbox,
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
  <ion-header>
    <ion-toolbar>
      <ion-title>Example</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content color="light">
    <ion-list :inset="true">
      <ion-item>
        <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
        <ion-input aria-label="Task name" value="Get eggs"></ion-input>
      </ion-item>
      <ion-item>
        <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
        <ion-input aria-label="Task name" value="Get milk"></ion-input>
      </ion-item>
      <ion-item>
        <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
        <ion-input aria-label="Task name" value="Take out compost"></ion-input>
      </ion-item>
      <ion-item>
        <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
        <ion-input aria-label="Task name" value="Pick up dry cleaning"></ion-input>
      </ion-item>
      <ion-item>
        <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
        <ion-input aria-label="Task name" value="Call mom"></ion-input>
      </ion-item>
      <ion-item>
        <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
        <ion-input aria-label="Task name" value="Order more dog food"></ion-input>
      </ion-item>
      <ion-item>
        <ion-checkbox slot="start" aria-label="Toggle task completion"></ion-checkbox>
        <ion-input aria-label="Task name" value="Think of new tasks for this demo"></ion-input>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonList, IonTitle, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
