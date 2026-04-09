<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Accordion / Accessibility Animations</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">アニメーションのアクセシビリティ対応。prefers-reduced-motion が有効な場合にアコーディオンのアニメーションを無効化する例。</p>
      <ion-accordion-group :animated="false">
          <ion-accordion value="first">
            <ion-item slot="header" color="light">
              <ion-label>First Accordion</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">First Content</div>
          </ion-accordion>
          <ion-accordion value="second">
            <ion-item slot="header" color="light">
              <ion-label>Second Accordion</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">Second Content</div>
          </ion-accordion>
          <ion-accordion value="third">
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

const sourceCode = `<template>
  <ion-accordion-group :animated="false">
    <ion-accordion value="first">
      <ion-item slot="header" color="light">
        <ion-label>First Accordion</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">First Content</div>
    </ion-accordion>
    <ion-accordion value="second">
      <ion-item slot="header" color="light">
        <ion-label>Second Accordion</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">Second Content</div>
    </ion-accordion>
    <ion-accordion value="third">
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
<\/script>`;

</script>
