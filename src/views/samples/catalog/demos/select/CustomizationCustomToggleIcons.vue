<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Select / Customization Custom Toggle Icons</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">toggleIcon プロパティでセレクトのトグルアイコンをカスタマイズする例。</p>
      <ion-list>
          <ion-item>
            <ion-select
              interface="popover"
              :toggle-icon="add"
              :expanded-icon="remove"
              aria-label="fruit"
              placeholder="Select fruit"
            >
              <ion-select-option value="apples">Apples</ion-select-option>
              <ion-select-option value="oranges">Oranges</ion-select-option>
              <ion-select-option value="bananas">Bananas</ion-select-option>
            </ion-select>
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
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { add, remove } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-select
        interface="popover"
        :toggle-icon="add"
        :expanded-icon="remove"
        aria-label="fruit"
        placeholder="Select fruit"
      >
        <ion-select-option value="apples">Apples</ion-select-option>
        <ion-select-option value="oranges">Oranges</ion-select-option>
        <ion-select-option value="bananas">Bananas</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/vue';
  import { add, remove } from 'ionicons/icons';
<\/script>`;

</script>
