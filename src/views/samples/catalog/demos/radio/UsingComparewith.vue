<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Radio / Using Comparewith</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">compareWith プロパティでオブジェクト値の比較方法をカスタマイズする例。</p>
      <ion-list>
          <ion-radio-group :compareWith="compareWith" @ionChange="handleChange($event)">
            <ion-item v-for="food in foods">
              <ion-radio :value="food">{{ food.name }}</ion-radio>
            </ion-item>
          </ion-radio-group>
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
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-radio-group :compareWith="compareWith" @ionChange="handleChange($event)">
      <ion-item v-for="food in foods">
        <ion-radio :value="food">{{ food.name }}</ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonList, IonRadio, IonRadioGroup } from '@ionic/vue';

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
    return o1.id === o2.id;
  };

  const handleChange = (event) => {
    console.log('Current value:', JSON.stringify(event.detail.value));
  };
</script>
