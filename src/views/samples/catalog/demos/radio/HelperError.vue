<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Radio / Helper Error</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ヘルパーテキストとエラーメッセージをラジオグループに組み合わせる例。</p>
      <form @submit.prevent="submit">
          <ion-radio-group
            v-model="favFruit"
            helper-text="Select your favorite fruit"
            error-text="This field is required"
            @ionChange="validateRadioGroup"
            :class="{ 'ion-valid': isValid, 'ion-invalid': isValid === false, 'ion-touched': isTouched }"
          >
            <ion-radio value="grapes">Grapes</ion-radio><br />
            <ion-radio value="strawberries">Strawberries</ion-radio><br />
            <ion-radio value="pineapple">Pineapple</ion-radio><br />
            <ion-radio value="cherries">Cherries</ion-radio>
          </ion-radio-group>
      
          <br />
      
          <ion-button type="submit" size="small">Submit</ion-button>
        </form>
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
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
  RadioGroupCustomEvent,
 } from '@ionic/vue';

const sourceCode = `<template>
  <form @submit.prevent="submit">
    <ion-radio-group
      v-model="favFruit"
      helper-text="Select your favorite fruit"
      error-text="This field is required"
      @ionChange="validateRadioGroup"
      :class="{ 'ion-valid': isValid, 'ion-invalid': isValid === false, 'ion-touched': isTouched }"
    >
      <ion-radio value="grapes">Grapes</ion-radio><br />
      <ion-radio value="strawberries">Strawberries</ion-radio><br />
      <ion-radio value="pineapple">Pineapple</ion-radio><br />
      <ion-radio value="cherries">Cherries</ion-radio>
    </ion-radio-group>

    <br />

    <ion-button type="submit" size="small">Submit</ion-button>
  </form>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { ref } from 'vue';
  import { IonRadioGroup, IonRadio, IonButton, RadioGroupCustomEvent } from '@ionic/vue';

  const favFruit = ref('');
  const isTouched = ref(false);
  const isValid = ref<boolean | undefined>();

  const validateRadioGroup = (event: RadioGroupCustomEvent<{ value: string }>) => {
    isTouched.value = true;
    isValid.value = event.detail.value ? true : false;
  };

  const submit = () => {
    validateRadioGroup({ detail: { value: favFruit.value } } as RadioGroupCustomEvent<{ value: string }>);
  };
<\/script>`;


  const favFruit = ref('');
  const isTouched = ref(false);
  const isValid = ref<boolean | undefined>();

  const validateRadioGroup = (event: RadioGroupCustomEvent<{ value: string }>) => {
    isTouched.value = true;
    isValid.value = event.detail.value ? true : false;
  };

  const submit = () => {
    validateRadioGroup({ detail: { value: favFruit.value } } as RadioGroupCustomEvent<{ value: string }>);
  };
</script>
