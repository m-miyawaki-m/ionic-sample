<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Card</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">シンプルな ion-card。テキストを ion-card-content で包む。</p>
      <ion-card>
        <ion-card-content>これはカードです。コンテンツをまとめて表示するのに使います。</ion-card-content>
      </ion-card>

      <h2 class="ion-padding">Header (title + subtitle + content)</h2>
      <p class="ion-padding-horizontal">ion-card-header に ion-card-title と ion-card-subtitle を入れる。</p>
      <ion-card>
        <ion-card-header>
          <ion-card-title>カードタイトル</ion-card-title>
          <ion-card-subtitle>サブタイトル</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>ヘッダーとコンテンツを組み合わせたカードです。</ion-card-content>
      </ion-card>

      <h2 class="ion-padding">Card with button</h2>
      <p class="ion-padding-horizontal">ion-button を ion-card-content 内に置いてアクションを提供する。</p>
      <ion-card>
        <ion-card-header>
          <ion-card-title>アクション付きカード</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          詳細な情報をここに表示します。
          <ion-button expand="block" class="ion-margin-top">詳細を見る</ion-button>
          <ion-button expand="block" fill="outline">キャンセル</ion-button>
        </ion-card-content>
      </ion-card>

      <h2 class="ion-padding">Colors</h2>
      <p class="ion-padding-horizontal">color プロパティでカードの背景色を変更できる。</p>
      <ion-card color="primary">
        <ion-card-header>
          <ion-card-title>Primary</ion-card-title>
        </ion-card-header>
        <ion-card-content>プライマリカラーのカード</ion-card-content>
      </ion-card>
      <ion-card color="secondary">
        <ion-card-header>
          <ion-card-title>Secondary</ion-card-title>
        </ion-card-header>
        <ion-card-content>セカンダリカラーのカード</ion-card-content>
      </ion-card>
      <ion-card color="success">
        <ion-card-header>
          <ion-card-title>Success</ion-card-title>
        </ion-card-header>
        <ion-card-content>成功カラーのカード</ion-card-content>
      </ion-card>
      <ion-card color="danger">
        <ion-card-header>
          <ion-card-title>Danger</ion-card-title>
        </ion-card-header>
        <ion-card-content>危険カラーのカード</ion-card-content>
      </ion-card>

      <h2 class="ion-padding">Disabled</h2>
      <p class="ion-padding-horizontal">disabled プロパティを付けると操作不可になり見た目も変わる。</p>
      <ion-card disabled>
        <ion-card-header>
          <ion-card-title>無効化されたカード</ion-card-title>
        </ion-card-header>
        <ion-card-content>このカードは操作できません。</ion-card-content>
      </ion-card>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/card" target="_blank" rel="noopener">ionicframework.com/docs/api/card ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonButton, IonNote,
} from '@ionic/vue';
</script>
