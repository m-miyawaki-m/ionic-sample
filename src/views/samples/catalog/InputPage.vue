<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Input</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic</h2>
      <ion-input label="Default" placeholder="Enter text" />

      <h2>Label Placement</h2>
      <ion-input label="Floating" label-placement="floating" placeholder="Enter text" />
      <ion-input label="Stacked" label-placement="stacked" placeholder="Enter text" />
      <ion-input label="Fixed" label-placement="fixed" placeholder="Enter text" />

      <h2>Helper Text</h2>
      <ion-input
        label="Email"
        type="email"
        helper-text="Enter your email"
        error-text="Invalid email"
      />

      <h2>Types</h2>
      <ion-input label="Text" type="text" />
      <ion-input label="Password" type="password" />
      <ion-input label="Number" type="number" />
      <ion-input label="Tel" type="tel" />

      <h2>Clear Button</h2>
      <ion-input label="With clear" :clear-input="true" placeholder="Type to see clear" />

      <h2>Counter</h2>
      <ion-input label="Max 20" :counter="true" :maxlength="20" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonInput,
} from '@ionic/vue';
</script>
