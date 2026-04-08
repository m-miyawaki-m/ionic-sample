<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Progress Bar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>
      <h2>Determinate</h2>
      <p>type="determinate" (デフォルト) で value (0〜1) に応じた進捗を表示する。</p>
      <ion-progress-bar :value="0.1" />
      <ion-progress-bar :value="0.35" />
      <ion-progress-bar :value="0.6" />
      <ion-progress-bar :value="0.85" />
      <ion-progress-bar :value="1.0" />

      <h2>Indeterminate</h2>
      <p>type="indeterminate" は進捗不明の処理中を示す。バーが左右に流れ続ける。</p>
      <ion-progress-bar type="indeterminate" />

      <h2>Buffer</h2>
      <p>buffer プロパティでバッファ量 (薄色部分) を示しながら進捗を表示できる。動画バッファリングに類似。</p>
      <ion-progress-bar :value="0.3" :buffer="0.7" />

      <h2>Colors</h2>
      <p>color プロパティでバーの色を変更できる。</p>
      <ion-progress-bar color="primary" :value="0.5" />
      <ion-progress-bar color="secondary" :value="0.5" />
      <ion-progress-bar color="success" :value="0.7" />
      <ion-progress-bar color="warning" :value="0.6" />
      <ion-progress-bar color="danger" :value="0.4" />

      <h2>Reversed</h2>
      <p>reversed プロパティを付けると進行方向が右から左になる。</p>
      <ion-progress-bar :value="0.6" reversed />
      <ion-progress-bar type="indeterminate" reversed />

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/progress-bar" target="_blank" rel="noopener">ionicframework.com/docs/api/progress-bar ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-progress-bar :value="0.5" />
      <ion-progress-bar type="indeterminate" />
      <ion-progress-bar :value="0.25" :buffer="0.5" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonProgressBar, IonNote,
} from '@ionic/vue';
</script>
