<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Accordion / Toggle</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">プログラムからアコーディオンの開閉を切り替える方法。value プロパティを使った制御を確認できる。</p>
      <ion-accordion-group ref="accordionGroup">
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
      
        <ion-button @click="toggleAccordion()">Toggle Second Accordion</ion-button>
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
  IonButton,
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
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-accordion-group ref="accordionGroup">
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

  <ion-button @click="toggleAccordion()">Toggle Second Accordion</ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonAccordion, IonAccordionGroup, IonButton, IonItem, IonLabel } from '@ionic/vue';
  import { ref } from 'vue';

  const accordionGroup = ref(null);

  const toggleAccordion = () => {
    if (!accordionGroup.value) {
      return;
    }
    const nativeEl = accordionGroup.value.$el;

    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };
<\/script>`;


  const accordionGroup = ref(null);

  const toggleAccordion = () => {
    if (!accordionGroup.value) {
      return;
    }
    const nativeEl = accordionGroup.value.$el;

    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };
</script>
