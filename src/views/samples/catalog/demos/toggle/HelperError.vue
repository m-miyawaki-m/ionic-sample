<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toggle / Helper Error</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ヘルパーテキストとエラーメッセージをトグルに組み合わせる例。</p>
      <ion-toggle
          v-model="wifi"
          helper-text="Enable to connect to available networks"
          error-text="Must be enabled to access the internet"
          justify="space-between"
          @ionChange="validateToggle"
          :class="{
            'ion-valid': isValid,
            'ion-invalid': isValid === false,
            'ion-touched': isTouched,
          }"
        >
          Wi-Fi
        </ion-toggle>
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
  import { ref } from 'vue';
  import { 
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  ToggleCustomEvent,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-toggle
    v-model="wifi"
    helper-text="Enable to connect to available networks"
    error-text="Must be enabled to access the internet"
    justify="space-between"
    @ionChange="validateToggle"
    :class="{
      'ion-valid': isValid,
      'ion-invalid': isValid === false,
      'ion-touched': isTouched,
    }"
  >
    Wi-Fi
  </ion-toggle>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { ref } from 'vue';
  import { IonToggle, IonButton, ToggleCustomEvent } from '@ionic/vue';

  const wifi = ref(true);
  const isTouched = ref(false);
  const isValid = ref<boolean | undefined>();

  const validateToggle = (event: ToggleCustomEvent<{ checked: boolean }>) => {
    isTouched.value = true;
    isValid.value = event.detail.checked;
  };
<\/script>`;


  const wifi = ref(true);
  const isTouched = ref(false);
  const isValid = ref<boolean | undefined>();

  const validateToggle = (event: ToggleCustomEvent<{ checked: boolean }>) => {
    isTouched.value = true;
    isValid.value = event.detail.checked;
  };
</script>
