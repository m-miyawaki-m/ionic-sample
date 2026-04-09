<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Accordion / Customization Theming</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったアコーディオンのテーマカスタマイズ例。</p>
      <ion-accordion-group expand="inset">
          <ion-accordion value="first">
            <ion-item slot="header" color="rose">
              <ion-label>First Accordion</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">First Content</div>
          </ion-accordion>
          <ion-accordion value="second">
            <ion-item slot="header" color="rose">
              <ion-label>Second Accordion</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">Second Content</div>
          </ion-accordion>
          <ion-accordion value="third">
            <ion-item slot="header" color="rose">
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
  <ion-accordion-group expand="inset">
    <ion-accordion value="first">
      <ion-item slot="header" color="rose">
        <ion-label>First Accordion</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">First Content</div>
    </ion-accordion>
    <ion-accordion value="second">
      <ion-item slot="header" color="rose">
        <ion-label>Second Accordion</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">Second Content</div>
    </ion-accordion>
    <ion-accordion value="third">
      <ion-item slot="header" color="rose">
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
<\/script>

<style>
  :root {
    --ion-color-rose: #fecdd3;
    --ion-color-rose-rgb: 254, 205, 211;
    --ion-color-rose-contrast: #000000;
    --ion-color-rose-contrast-rgb: 0, 0, 0;
    --ion-color-rose-shade: #e0b4ba;
    --ion-color-rose-tint: #fed2d7;
  }

  .ion-color-rose {
    --ion-color-base: var(--ion-color-rose);
    --ion-color-base-rgb: var(--ion-color-rose-rgb);
    --ion-color-contrast: var(--ion-color-rose-contrast);
    --ion-color-contrast-rgb: var(--ion-color-rose-contrast-rgb);
    --ion-color-shade: var(--ion-color-rose-shade);
    --ion-color-tint: var(--ion-color-rose-tint);
  }

  div[slot='content'] {
    background: rgba(var(--ion-color-rose-rgb), 0.25);
  }
</style>`;

</script>

<style>
  :root {
    --ion-color-rose: #fecdd3;
    --ion-color-rose-rgb: 254, 205, 211;
    --ion-color-rose-contrast: #000000;
    --ion-color-rose-contrast-rgb: 0, 0, 0;
    --ion-color-rose-shade: #e0b4ba;
    --ion-color-rose-tint: #fed2d7;
  }

  .ion-color-rose {
    --ion-color-base: var(--ion-color-rose);
    --ion-color-base-rgb: var(--ion-color-rose-rgb);
    --ion-color-contrast: var(--ion-color-rose-contrast);
    --ion-color-contrast-rgb: var(--ion-color-rose-contrast-rgb);
    --ion-color-shade: var(--ion-color-rose-shade);
    --ion-color-tint: var(--ion-color-rose-tint);
  }

  div[slot='content'] {
    background: rgba(var(--ion-color-rose-rgb), 0.25);
  }
</style>
