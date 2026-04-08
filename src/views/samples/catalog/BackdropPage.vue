<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Backdrop</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <h2>Basic (タップで消える)</h2>
      <p>
        <code>ion-backdrop</code> はコンテンツを覆う暗い半透明オーバーレイ。
        Modal / Alert / ActionSheet などが内部で使用しているが、単体でも使える。
        <code>:visible="true"</code> で表示、<code>@ionBackdropTap</code> イベントでタップを検出できる。
      </p>
      <ion-button expand="block" @click="showBasic = true">
        バックドロップを表示 (タップで消える)
      </ion-button>

      <h2>Non-tappable</h2>
      <p>
        <code>:tappable="false"</code> にすると、バックドロップをタップしても何も起きない。
        モーダルのように「必ずボタンで閉じる」ことを強制したい場合に使う。
        このデモでは5秒後に自動で消える。
      </p>
      <ion-button expand="block" fill="outline" @click="showNonTappable">
        Non-tappable バックドロップ (5秒後に消える)
      </ion-button>

      <h2>stop-propagation="false"</h2>
      <p>
        デフォルトでは <code>stopPropagation="true"</code> でバックドロップ後ろのクリックをブロック。
        <code>:stop-propagation="false"</code> にするとクリックがバックドロップを通過する (クリックスルー)。
      </p>
      <ion-button expand="block" fill="outline" color="medium" @click="showClickThrough = true">
        クリックスルー バックドロップ
      </ion-button>

      <h2>スタイルカスタマイズ</h2>
      <p>
        CSS カスタムプロパティで色・透明度を変更できる。
        <code>--backdrop-opacity</code> で暗さを調整 (デフォルト: 0.4)。
      </p>
      <ion-button expand="block" fill="outline" color="warning" @click="showCustom = true">
        カスタムスタイル バックドロップ
      </ion-button>

      <h2>内部使用の例</h2>
      <p>
        <code>ion-modal</code>, <code>ion-alert</code>, <code>ion-action-sheet</code>, <code>ion-loading</code>,
        <code>ion-popover</code> などはすべて内部で <code>ion-backdrop</code> を使用している。
        直接使うケースは少ないが、カスタムオーバーレイを自作する際に役立つ。
      </p>

    </ion-content>

    <!-- Basic backdrop: tappable=true (default) -->
    <ion-backdrop
      :visible="showBasic"
      :tappable="true"
      :stop-propagation="true"
      @ionBackdropTap="showBasic = false"
    />

    <!-- Non-tappable backdrop -->
    <ion-backdrop
      :visible="showNonTappableVisible"
      :tappable="false"
      :stop-propagation="true"
    />

    <!-- Click-through backdrop -->
    <ion-backdrop
      :visible="showClickThrough"
      :tappable="true"
      :stop-propagation="false"
      @ionBackdropTap="showClickThrough = false"
    />

    <!-- Custom style backdrop -->
    <ion-backdrop
      :visible="showCustom"
      :tappable="true"
      :stop-propagation="true"
      style="--backdrop-opacity: 0.8; background: rgba(0, 80, 200, 0.6);"
      @ionBackdropTap="showCustom = false"
    />

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonBackdrop,
} from '@ionic/vue';
import { ref } from 'vue';

const showBasic = ref(false);
const showNonTappableVisible = ref(false);
const showClickThrough = ref(false);
const showCustom = ref(false);

const showNonTappable = () => {
  showNonTappableVisible.value = true;
  setTimeout(() => {
    showNonTappableVisible.value = false;
  }, 5000);
};
</script>
