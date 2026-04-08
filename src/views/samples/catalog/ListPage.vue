<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>List</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="ion-padding">Basic</h2>
      <ion-list>
        <ion-item><ion-label>Item 1</ion-label></ion-item>
        <ion-item><ion-label>Item 2</ion-label></ion-item>
        <ion-item><ion-label>Item 3</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">Lines: none</h2>
      <ion-list lines="none">
        <ion-item><ion-label>No bottom line</ion-label></ion-item>
        <ion-item><ion-label>No bottom line</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">Inset list</h2>
      <ion-list :inset="true">
        <ion-item><ion-label>Inset item 1</ion-label></ion-item>
        <ion-item><ion-label>Inset item 2</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">With detail icon</h2>
      <ion-list>
        <ion-item button detail><ion-label>Tap me</ion-label></ion-item>
        <ion-item button detail><ion-label>Or me</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">List header</h2>
      <ion-list>
        <ion-list-header>
          <ion-label>Header</ion-label>
        </ion-list-header>
        <ion-item><ion-label>Item under header</ion-label></ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonListHeader, IonItem, IonLabel,
} from '@ionic/vue';
</script>
