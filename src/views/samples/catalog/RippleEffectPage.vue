<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Ripple Effect</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic (Bounded)</h2>
      <p>
        <code>ion-ripple-effect</code> は Material Design 風の波紋アニメーション。
        親要素に <code>class="ion-activatable"</code> を付けてタップすると波紋が出る。
        <code>position: relative</code> も必要。
      </p>
      <div
        class="ion-activatable"
        style="
          position: relative; overflow: hidden;
          padding: 16px; border-radius: 8px;
          background: var(--ion-color-primary);
          color: white; text-align: center; cursor: pointer;
        "
      >
        タップしてみてください
        <ion-ripple-effect />
      </div>

      <h2>Unbounded</h2>
      <p>
        <code>type="unbounded"</code> にすると波紋が要素の外にもはみ出す。
        アイコンボタンなどで使われる。
        親要素に <code>ion-activatable ripple-parent</code> を付ける。
      </p>
      <div style="display: flex; gap: 24px; align-items: center; margin-top: 8px;">
        <div
          class="ion-activatable ripple-parent"
          style="
            position: relative;
            width: 48px; height: 48px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            background: var(--ion-color-medium-tint); cursor: pointer;
          "
        >
          ★
          <ion-ripple-effect type="unbounded" />
        </div>
        <div
          class="ion-activatable ripple-parent"
          style="
            position: relative;
            width: 48px; height: 48px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            background: var(--ion-color-secondary-tint); cursor: pointer;
          "
        >
          ♥
          <ion-ripple-effect type="unbounded" />
        </div>
      </div>

      <h2>カスタムカラー</h2>
      <p>
        CSS 変数 <code>--ripple-color</code> で波紋の色を変更できる。
        デフォルトは <code>currentColor</code>。
      </p>
      <div
        class="ion-activatable"
        style="
          position: relative; overflow: hidden;
          padding: 16px; border-radius: 8px;
          background: #1c1c1e; color: white;
          text-align: center; cursor: pointer;
          --ripple-color: gold;
        "
      >
        タップで金色の波紋
        <ion-ripple-effect />
      </div>

      <h2>ion-item 内での使用</h2>
      <p>
        <code>ion-item</code> は内部で <code>ion-ripple-effect</code> を使用しており、
        ボタン (button) や routerLink が設定されると自動で波紋が有効になる。
      </p>
      <ion-list>
        <ion-item button @click="() => {}">
          <ion-label>タップして波紋を確認</ion-label>
        </ion-item>
        <ion-item button @click="() => {}">
          <ion-label>もう一つのアイテム</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonRippleEffect,
  IonList, IonItem, IonLabel,
} from '@ionic/vue';
</script>
