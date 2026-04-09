<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Radio / Label Wrap</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ラジオボタンのラベルが長い場合に折り返す動作を確認する例。</p>
      <ion-list>
          <ion-radio-group value="truncated">
            <ion-item>
              <ion-radio value="truncated">Truncated with ellipsis by default</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="wrapped-part" class="wrapped">Wrapping with text-wrap applied to label shadow part</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="wrapped-div">
                <div class="ion-text-wrap">Wrapping with ion-text-wrap class applied wrapper element</div>
              </ion-radio>
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
    <ion-radio-group value="truncated">
      <ion-item>
        <ion-radio value="truncated">Truncated with ellipsis by default</ion-radio>
      </ion-item>
      <ion-item>
        <ion-radio value="wrapped-part" class="wrapped">Wrapping with text-wrap applied to label shadow part</ion-radio>
      </ion-item>
      <ion-item>
        <ion-radio value="wrapped-div">
          <div class="ion-text-wrap">Wrapping with ion-text-wrap class applied wrapper element</div>
        </ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonList, IonItem, IonRadio, IonRadioGroup } from '@ionic/vue';
<\/script>

<style scoped>
  ion-list {
    width: 250px;
  }

  ion-radio.wrapped::part(label) {
    white-space: normal;
  }
</style>`;

</script>

<style scoped>
  ion-list {
    width: 250px;
  }

  ion-radio.wrapped::part(label) {
    white-space: normal;
  }
</style>
