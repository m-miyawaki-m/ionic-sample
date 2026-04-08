<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Button</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>
      <h2>Basic</h2>
      <ion-button>Default</ion-button>

      <h2>Colors</h2>
      <ion-button color="primary">Primary</ion-button>
      <ion-button color="secondary">Secondary</ion-button>
      <ion-button color="tertiary">Tertiary</ion-button>
      <ion-button color="success">Success</ion-button>
      <ion-button color="warning">Warning</ion-button>
      <ion-button color="danger">Danger</ion-button>

      <h2>Fill</h2>
      <ion-button fill="clear">Clear</ion-button>
      <ion-button fill="outline">Outline</ion-button>
      <ion-button fill="solid">Solid</ion-button>

      <h2>Sizes</h2>
      <ion-button size="small">Small</ion-button>
      <ion-button size="default">Default</ion-button>
      <ion-button size="large">Large</ion-button>

      <h2>Expand</h2>
      <ion-button expand="block">Block</ion-button>
      <ion-button expand="full">Full</ion-button>

      <h2>Disabled</h2>
      <ion-button disabled>Disabled</ion-button>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/button" target="_blank" rel="noopener">ionicframework.com/docs/api/button ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-button>Default</ion-button>
      <ion-button color="primary">Primary</ion-button>
      <ion-button fill="outline">Outline</ion-button>
      <ion-button fill="clear">Clear</ion-button>
      <ion-button size="small">Small</ion-button>
      <ion-button size="large">Large</ion-button>
      <ion-button expand="block">Block Button</ion-button>
      <ion-button disabled>Disabled</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonNote,
} from '@ionic/vue';
</script>
