<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Textarea / Helper Error</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ヘルパーテキストとエラーメッセージをテキストエリアに組み合わせる例。</p>
      <ion-textarea
          ref="input"
          fill="solid"
          label="Email"
          label-placement="floating"
          helper-text="Enter a valid email"
          error-text="Invalid email"
          @ionInput="validate"
          @ionBlur="markTouched"
        ></ion-textarea>
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
  IonMenuButton,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-textarea
    ref="input"
    fill="solid"
    label="Email"
    label-placement="floating"
    helper-text="Enter a valid email"
    error-text="Invalid email"
    @ionInput="validate"
    @ionBlur="markTouched"
  ></ion-textarea>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonTextarea } from '@ionic/vue';
  import { ref } from 'vue';

  const input = ref();

  const validateEmail = (email) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_\`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (event) => {
    const value = event.target.value;

    input.value.$el.classList.remove('ion-valid');
    input.value.$el.classList.remove('ion-invalid');

    if (value === '') return;

    validateEmail(value) ? input.value.$el.classList.add('ion-valid') : input.value.$el.classList.add('ion-invalid');
  };

  const markTouched = () => {
    input.value.$el.classList.add('ion-touched');
  };
<\/script>`;


  const input = ref();

  const validateEmail = (email) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (event) => {
    const value = event.target.value;

    input.value.$el.classList.remove('ion-valid');
    input.value.$el.classList.remove('ion-invalid');

    if (value === '') return;

    validateEmail(value) ? input.value.$el.classList.add('ion-valid') : input.value.$el.classList.add('ion-invalid');
  };

  const markTouched = () => {
    input.value.$el.classList.add('ion-touched');
  };
</script>
