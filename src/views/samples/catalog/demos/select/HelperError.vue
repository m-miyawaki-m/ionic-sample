<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Select / Helper Error</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ヘルパーテキストとエラーメッセージをセレクトボックスに組み合わせる例。</p>
      <form @submit.prevent="submit">
          <ion-select
            v-model="favFruit"
            label="Favorite fruit"
            placeholder="Select fruit"
            helper-text="Select your favorite fruit"
            error-text="This field is required"
            @ionChange="validateSelect"
            @ionBlur="onIonBlur"
            :class="{ 'ion-valid': isValid, 'ion-invalid': isValid === false, 'ion-touched': isTouched }"
          >
            <ion-select-option value="apple">Apple</ion-select-option>
            <ion-select-option value="banana">Banana</ion-select-option>
            <ion-select-option value="orange">Orange</ion-select-option>
          </ion-select>
      
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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  SelectCustomEvent,
 } from '@ionic/vue';

const sourceCode = `<template>
  <form @submit.prevent="submit">
    <ion-select
      v-model="favFruit"
      label="Favorite fruit"
      placeholder="Select fruit"
      helper-text="Select your favorite fruit"
      error-text="This field is required"
      @ionChange="validateSelect"
      @ionBlur="onIonBlur"
      :class="{ 'ion-valid': isValid, 'ion-invalid': isValid === false, 'ion-touched': isTouched }"
    >
      <ion-select-option value="apple">Apple</ion-select-option>
      <ion-select-option value="banana">Banana</ion-select-option>
      <ion-select-option value="orange">Orange</ion-select-option>
    </ion-select>

    <br />

    <ion-button type="submit" size="small">Submit</ion-button>
  </form>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { ref } from 'vue';
  import { IonSelect, IonSelectOption, IonButton, SelectCustomEvent } from '@ionic/vue';

  const favFruit = ref('');
  const isTouched = ref(false);
  const isValid = ref<boolean | undefined>();

  const validateSelect = (event: SelectCustomEvent<{ value: string }>) => {
    isValid.value = event.detail.value ? true : false;
  };

  const markTouched = () => {
    isTouched.value = true;
  };

  const onIonBlur = () => {
    markTouched();
    validateSelect({ detail: { value: favFruit.value } } as SelectCustomEvent<{ value: string }>);
  };

  const submit = () => {
    markTouched();
    validateSelect({ detail: { value: favFruit.value } } as SelectCustomEvent<{ value: string }>);
  };
<\/script>`;


  const favFruit = ref('');
  const isTouched = ref(false);
  const isValid = ref<boolean | undefined>();

  const validateSelect = (event: SelectCustomEvent<{ value: string }>) => {
    isValid.value = event.detail.value ? true : false;
  };

  const markTouched = () => {
    isTouched.value = true;
  };

  const onIonBlur = () => {
    markTouched();
    validateSelect({ detail: { value: favFruit.value } } as SelectCustomEvent<{ value: string }>);
  };

  const submit = () => {
    markTouched();
    validateSelect({ detail: { value: favFruit.value } } as SelectCustomEvent<{ value: string }>);
  };
</script>
