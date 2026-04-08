<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Img</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic</h2>
      <p>
        <code>ion-img</code> は遅延読込 (Lazy Load) をサポートする画像コンテナ。
        Intersection Observer を使い、ビューポートに入ったタイミングで読み込む。
        通常の <code>&lt;img&gt;</code> と同じ <code>src</code> / <code>alt</code> 属性を使う。
      </p>
      <ion-img
        src="https://picsum.photos/400/200?random=1"
        alt="サンプル画像1"
        style="border-radius: 8px;"
      />

      <h2>Lazy load デモ (複数枚)</h2>
      <p>
        スクロールして下に進むと順次読み込まれる。
        ネットワークタブで確認すると、画面外の画像は最初はリクエストされないことがわかる。
      </p>
      <ion-img
        v-for="n in 4"
        :key="n"
        :src="`https://picsum.photos/400/200?random=${n + 10}`"
        :alt="`遅延読込画像 ${n}`"
        style="margin-bottom: 12px; border-radius: 8px;"
      />

      <h2>エラーハンドリング</h2>
      <p>
        <code>@ionError</code> イベントで読み込み失敗を検出できる。
        壊れた URL を指定してエラーメッセージを表示するデモ。
      </p>
      <ion-img
        src="https://example.com/broken-image.png"
        alt="壊れた画像"
        style="border: 2px dashed var(--ion-color-medium); border-radius: 8px; min-height: 80px;"
        @ionError="onImageError"
      />
      <p v-if="imageError" style="color: var(--ion-color-danger); margin-top: 4px;">
        画像の読み込みに失敗しました。
      </p>

      <h2>イベント (ionImgDidLoad)</h2>
      <p>
        <code>@ionImgWillLoad</code> と <code>@ionImgDidLoad</code> で読み込み前後を検知できる。
        ローディングインジケーターの表示切替などに利用可能。
      </p>
      <ion-img
        src="https://picsum.photos/400/150?random=99"
        alt="イベント付き画像"
        style="border-radius: 8px;"
        @ionImgWillLoad="loading = true"
        @ionImgDidLoad="loading = false"
      />
      <p style="margin-top: 4px; font-size: 0.85em; color: var(--ion-color-medium);">
        状態: {{ loading ? '読み込み中...' : '読み込み完了' }}
      </p>

      <h2>Alt テキスト</h2>
      <p>
        <code>alt</code> 属性は通常の <code>&lt;img&gt;</code> と同様に
        スクリーンリーダーのアクセシビリティや画像未表示時のフォールバックとして機能する。
      </p>
      <ion-img
        src="https://ionicframework.com/img/meta/logo.png"
        alt="Ionic Framework ロゴ"
        style="max-width: 200px; border-radius: 8px; background: #3880ff; padding: 16px;"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonImg,
} from '@ionic/vue';
import { ref } from 'vue';

const loading = ref(true);
const imageError = ref(false);

const onImageError = () => {
  imageError.value = true;
};
</script>
