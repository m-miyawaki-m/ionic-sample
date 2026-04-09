<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input OTP / States</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">無効（disabled）・読み取り専用（readonly）などの状態を確認する例。</p>
      <ion-input-otp disabled value="1234"> Disabled </ion-input-otp>
        <ion-input-otp readonly value="1234"> Readonly </ion-input-otp>
      
        <ion-input-otp
          v-for="(input, index) in inputs"
          :key="index"
          :value="input.value"
          class="ion-touched has-focus"
          :class="[getInputClasses(input.value)]"
          @ionInput="(e) => input.value = e.target.value"
        >
          <span>{{ getValidationMessage(input.value) }}</span>
        </ion-input-otp>
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
  IonInputOtp,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-input-otp disabled value="1234"> Disabled </ion-input-otp>
  <ion-input-otp readonly value="1234"> Readonly </ion-input-otp>

  <ion-input-otp
    v-for="(input, index) in inputs"
    :key="index"
    :value="input.value"
    class="ion-touched has-focus"
    :class="[getInputClasses(input.value)]"
    @ionInput="(e) => input.value = e.target.value"
  >
    <span>{{ getValidationMessage(input.value) }}</span>
  </ion-input-otp>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInputOtp } from '@ionic/vue';
  import { ref } from 'vue';

  const inputs = ref([{ value: '12' }, { value: '1234' }]);

  const getInputClasses = (value: string) => ({
    'ion-valid': value.length === 4,
    'ion-invalid': value.length < 4,
  });

  const getValidationMessage = (value: string) => (value.length === 4 ? 'Valid' : 'Invalid');
<\/script>`;


  const inputs = ref([{ value: '12' }, { value: '1234' }]);

  const getInputClasses = (value: string) => ({
    'ion-valid': value.length === 4,
    'ion-invalid': value.length < 4,
  });

  const getValidationMessage = (value: string) => (value.length === 4 ? 'Valid' : 'Invalid');
</script>
