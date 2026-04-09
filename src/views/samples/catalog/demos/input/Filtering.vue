<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input / Filtering</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ionInput イベントと正規表現を使って入力値をリアルタイムにフィルタリングする例。</p>
      <ion-list>
          <ion-item>
            <ion-input
              label="Alphanumeric Characters"
              :value="inputModel"
              @ionInput="onInput($event)"
              ref="ionInputEl"
            ></ion-input>
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
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-input
        label="Alphanumeric Characters"
        :value="inputModel"
        @ionInput="onInput($event)"
        ref="ionInputEl"
      ></ion-input>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInput, IonItem, IonList } from '@ionic/vue';
  import { ref } from 'vue';

  const ionInputEl = ref();
  const inputModel = ref('');
  const onInput = (event) => {
    const value = event.target!.value;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    inputModel.value = filteredValue;

    const inputCmp = ionInputEl.value;
    if (inputCmp !== undefined) {
      inputCmp.$el.value = filteredValue;
    }
  };
<\/script>`;


  const ionInputEl = ref();
  const inputModel = ref('');
  const onInput = (event) => {
    const value = event.target!.value;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    inputModel.value = filteredValue;

    const inputCmp = ionInputEl.value;
    if (inputCmp !== undefined) {
      inputCmp.$el.value = filteredValue;
    }
  };
</script>
