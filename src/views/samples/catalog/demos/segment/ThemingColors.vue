<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Segment / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったセグメントの色のカスタマイズ例。</p>
      <ion-segment value="default">
          <ion-segment-button value="default">
            <ion-label>Default</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment color="primary" value="primary">
          <ion-segment-button value="primary">
            <ion-label>Primary</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment color="secondary" value="secondary">
          <ion-segment-button value="secondary">
            <ion-label>Secondary</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment color="tertiary" value="tertiary">
          <ion-segment-button value="tertiary">
            <ion-label>Tertiary</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment color="success" value="success">
          <ion-segment-button value="success">
            <ion-label>Success</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment color="warning" value="warning">
          <ion-segment-button value="warning">
            <ion-label>Warning</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment color="danger" value="danger">
          <ion-segment-button value="danger">
            <ion-label>Danger</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment color="light" value="light">
          <ion-segment-button value="light">
            <ion-label>Light</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment color="medium" value="medium">
          <ion-segment-button value="medium">
            <ion-label>Medium</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment color="dark" value="dark">
          <ion-segment-button value="dark">
            <ion-label>Dark</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
        </ion-segment>
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
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-segment value="default">
    <ion-segment-button value="default">
      <ion-label>Default</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment color="primary" value="primary">
    <ion-segment-button value="primary">
      <ion-label>Primary</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment color="secondary" value="secondary">
    <ion-segment-button value="secondary">
      <ion-label>Secondary</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment color="tertiary" value="tertiary">
    <ion-segment-button value="tertiary">
      <ion-label>Tertiary</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment color="success" value="success">
    <ion-segment-button value="success">
      <ion-label>Success</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment color="warning" value="warning">
    <ion-segment-button value="warning">
      <ion-label>Warning</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment color="danger" value="danger">
    <ion-segment-button value="danger">
      <ion-label>Danger</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment color="light" value="light">
    <ion-segment-button value="light">
      <ion-label>Light</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment color="medium" value="medium">
    <ion-segment-button value="medium">
      <ion-label>Medium</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment color="dark" value="dark">
    <ion-segment-button value="dark">
      <ion-label>Dark</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue';
<\/script>`;

</script>
