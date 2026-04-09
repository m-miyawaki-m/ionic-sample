<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Checkbox / Helper Error</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ヘルパーテキストとエラーメッセージをチェックボックスに組み合わせる例。</p>
      <form @submit.prevent="submit">
          <ion-checkbox
            v-model="agree"
            helper-text="Agree to the terms before continuing"
            error-text="You must agree to the terms to continue"
            @ionChange="validateCheckbox"
            :class="{ 'ion-valid': isValid, 'ion-invalid': isValid === false, 'ion-touched': isTouched }"
          >
            I agree to the terms and conditions
          </ion-checkbox>
      
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
  CheckboxCustomEvent,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <form @submit.prevent="submit">
    <ion-checkbox
      v-model="agree"
      helper-text="Agree to the terms before continuing"
      error-text="You must agree to the terms to continue"
      @ionChange="validateCheckbox"
      :class="{ 'ion-valid': isValid, 'ion-invalid': isValid === false, 'ion-touched': isTouched }"
    >
      I agree to the terms and conditions
    </ion-checkbox>

    <br />

    <ion-button type="submit" size="small">Submit</ion-button>
  </form>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { ref } from 'vue';
  import { IonCheckbox, IonButton, CheckboxCustomEvent } from '@ionic/vue';

  const agree = ref(false);
  const isTouched = ref(false);
  const isValid = ref<boolean | undefined>();

  const validateCheckbox = (event: CheckboxCustomEvent<{ checked: boolean }>) => {
    isTouched.value = true;
    isValid.value = event.detail.checked;
  };

  const submit = () => {
    validateCheckbox({ detail: { checked: agree.value } } as CheckboxCustomEvent<{ checked: boolean }>);
  };
<\/script>`;


  const agree = ref(false);
  const isTouched = ref(false);
  const isValid = ref<boolean | undefined>();

  const validateCheckbox = (event: CheckboxCustomEvent<{ checked: boolean }>) => {
    isTouched.value = true;
    isValid.value = event.detail.checked;
  };

  const submit = () => {
    validateCheckbox({ detail: { checked: agree.value } } as CheckboxCustomEvent<{ checked: boolean }>);
  };
</script>
