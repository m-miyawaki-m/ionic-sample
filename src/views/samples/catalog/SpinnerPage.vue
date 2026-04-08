<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Spinner</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>
      <h2>Basic</h2>
      <p>ion-spinner はローディング中を表すアニメーション。デフォルトはプラットフォームに応じて自動選択される。</p>
      <ion-spinner />

      <h2>Variants</h2>
      <p>name プロパティで8種類のスピナー形状を選択できる。</p>
      <div style="display:flex; flex-wrap:wrap; gap:24px; align-items:center; padding:8px 0;">
        <div style="text-align:center;">
          <ion-spinner name="bubbles" /><br /><small>bubbles</small>
        </div>
        <div style="text-align:center;">
          <ion-spinner name="circles" /><br /><small>circles</small>
        </div>
        <div style="text-align:center;">
          <ion-spinner name="crescent" /><br /><small>crescent</small>
        </div>
        <div style="text-align:center;">
          <ion-spinner name="dots" /><br /><small>dots</small>
        </div>
        <div style="text-align:center;">
          <ion-spinner name="lines" /><br /><small>lines</small>
        </div>
        <div style="text-align:center;">
          <ion-spinner name="lines-small" /><br /><small>lines-small</small>
        </div>
        <div style="text-align:center;">
          <ion-spinner name="lines-sharp" /><br /><small>lines-sharp</small>
        </div>
        <div style="text-align:center;">
          <ion-spinner name="lines-sharp-small" /><br /><small>lines-sharp-small</small>
        </div>
      </div>

      <h2>Color</h2>
      <p>color プロパティでスピナーの色を変更できる。</p>
      <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:center;">
        <ion-spinner color="primary" />
        <ion-spinner color="secondary" />
        <ion-spinner color="tertiary" />
        <ion-spinner color="success" />
        <ion-spinner color="warning" />
        <ion-spinner color="danger" />
        <ion-spinner color="medium" />
        <ion-spinner color="dark" />
      </div>

      <h2>Paused</h2>
      <p>paused プロパティでアニメーションを停止できる。</p>
      <ion-spinner paused />
      <ion-spinner name="dots" paused color="primary" />

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/spinner" target="_blank" rel="noopener">ionicframework.com/docs/api/spinner ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-spinner />
      <ion-spinner name="bubbles" />
      <ion-spinner name="circles" />
      <ion-spinner name="crescent" />
      <ion-spinner name="dots" />
      <ion-spinner name="lines" />
      <ion-spinner name="lines-small" />
      <ion-spinner name="lines-sharp" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonSpinner, IonNote,
} from '@ionic/vue';
</script>
