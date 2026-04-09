<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Accordion / Customization Icons</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">アコーディオンのトグルアイコンをカスタマイズする例。slot を使ってアイコンを差し替える。</p>
      <ion-accordion-group>
          <ion-accordion value="first" :toggle-icon="caretDownCircle" toggle-icon-slot="start">
            <ion-item slot="header" color="light">
              <ion-label>First Accordion</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">First Content</div>
          </ion-accordion>
          <ion-accordion value="second" :toggle-icon="caretDownCircle" toggle-icon-slot="start">
            <ion-item slot="header" color="light">
              <ion-label>Second Accordion</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">Second Content</div>
          </ion-accordion>
          <ion-accordion value="third" :toggle-icon="caretDownCircle" toggle-icon-slot="start">
            <ion-item slot="header" color="light">
              <ion-label>Third Accordion</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">Third Content</div>
          </ion-accordion>
        </ion-accordion-group>
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
  IonAccordion,
  IonAccordionGroup,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { caretDownCircle } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-accordion-group>
    <ion-accordion value="first" :toggle-icon="caretDownCircle" toggle-icon-slot="start">
      <ion-item slot="header" color="light">
        <ion-label>First Accordion</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">First Content</div>
    </ion-accordion>
    <ion-accordion value="second" :toggle-icon="caretDownCircle" toggle-icon-slot="start">
      <ion-item slot="header" color="light">
        <ion-label>Second Accordion</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">Second Content</div>
    </ion-accordion>
    <ion-accordion value="third" :toggle-icon="caretDownCircle" toggle-icon-slot="start">
      <ion-item slot="header" color="light">
        <ion-label>Third Accordion</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">Third Content</div>
    </ion-accordion>
  </ion-accordion-group>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';
  import { caretDownCircle } from 'ionicons/icons';
<\/script>`;

</script>
