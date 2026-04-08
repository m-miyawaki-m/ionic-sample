<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Thumbnail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">
        <code>ion-thumbnail</code> は正方形の画像コンテナ。
        デフォルトで角が丸く表示される。商品・ユーザーのアイコンに使う。
      </p>
      <ion-list>
        <ion-item>
          <ion-thumbnail slot="start">
            <img src="https://picsum.photos/80/80?random=1" alt="サムネイル1" />
          </ion-thumbnail>
          <ion-label>
            <h2>商品 A</h2>
            <p>カテゴリ: 電子機器</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-thumbnail slot="start">
            <img src="https://picsum.photos/80/80?random=2" alt="サムネイル2" />
          </ion-thumbnail>
          <ion-label>
            <h2>商品 B</h2>
            <p>カテゴリ: 食料品</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-thumbnail slot="start">
            <img src="https://picsum.photos/80/80?random=3" alt="サムネイル3" />
          </ion-thumbnail>
          <ion-label>
            <h2>商品 C</h2>
            <p>カテゴリ: 衣類</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">With ion-img inside</h2>
      <p class="ion-padding-horizontal">
        <code>ion-thumbnail</code> 内に <code>ion-img</code> を使うと遅延読込が有効になる。
      </p>
      <ion-list>
        <ion-item>
          <ion-thumbnail slot="start">
            <ion-img src="https://picsum.photos/80/80?random=4" alt="ion-img サムネイル" />
          </ion-thumbnail>
          <ion-label>
            <h2>遅延読込サムネイル</h2>
            <p>ion-img を内部で使用</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-thumbnail slot="start">
            <ion-img src="https://picsum.photos/80/80?random=5" alt="ion-img サムネイル2" />
          </ion-thumbnail>
          <ion-label>
            <h2>遅延読込サムネイル 2</h2>
            <p>スクロールで読み込み</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">サイズ変更 (--size)</h2>
      <p class="ion-padding-horizontal">
        CSS カスタムプロパティ <code>--size</code> でサムネイルのサイズを変更できる。
        デフォルトは 48px。
      </p>
      <ion-list>
        <ion-item>
          <ion-thumbnail slot="start" style="--size: 32px;">
            <img src="https://picsum.photos/32/32?random=6" alt="小さいサムネイル" />
          </ion-thumbnail>
          <ion-label>小さいサムネイル (32px)</ion-label>
        </ion-item>
        <ion-item>
          <ion-thumbnail slot="start" style="--size: 56px;">
            <img src="https://picsum.photos/56/56?random=7" alt="中サムネイル" />
          </ion-thumbnail>
          <ion-label>中サムネイル (56px)</ion-label>
        </ion-item>
        <ion-item>
          <ion-thumbnail slot="start" style="--size: 72px;">
            <img src="https://picsum.photos/72/72?random=8" alt="大きいサムネイル" />
          </ion-thumbnail>
          <ion-label>大きいサムネイル (72px)</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonThumbnail, IonImg,
} from '@ionic/vue';
</script>
