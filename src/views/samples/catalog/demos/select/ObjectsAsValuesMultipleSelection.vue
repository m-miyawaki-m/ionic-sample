<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Select / Objects As Values Multiple Selection</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">オブジェクトを値として使った複数選択セレクトの例。compareWith と組み合わせる。</p>
      <ion-list>
          <ion-item>
            <ion-select
              aria-label="Food"
              placeholder="Select food"
              :compareWith="compareWith"
              @ionChange="handleChange($event)"
              :multiple="true"
            >
              <ion-select-option v-for="food in foods" :value="food">{{ food.name }}</ion-select-option>
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

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-select
        aria-label="Food"
        placeholder="Select food"
        :compareWith="compareWith"
        @ionChange="handleChange($event)"
        :multiple="true"
      >
        <ion-select-option v-for="food in foods" :value="food">{{ food.name }}</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/vue';

  const foods = [
    {
      id: 1,
      name: 'Apples',
      type: 'fruit',
    },
    {
      id: 2,
      name: 'Carrots',
      type: 'vegetable',
    },
    {
      id: 3,
      name: 'Cupcakes',
      type: 'dessert',
    },
  ];

  const compareWith = (o1, o2) => {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((o) => o.id === o1.id);
    }

    return o1.id === o2.id;
  };

  const handleChange = (event) => {
    console.log('Current value:', JSON.stringify(event.detail.value));
  };
<\/script>`;


  const foods = [
    {
      id: 1,
      name: 'Apples',
      type: 'fruit',
    },
    {
      id: 2,
      name: 'Carrots',
      type: 'vegetable',
    },
    {
      id: 3,
      name: 'Cupcakes',
      type: 'dessert',
    },
  ];

  const compareWith = (o1, o2) => {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((o) => o.id === o1.id);
    }

    return o1.id === o2.id;
  };

  const handleChange = (event) => {
    console.log('Current value:', JSON.stringify(event.detail.value));
  };
</script>
