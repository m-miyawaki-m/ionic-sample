<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Loading</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>Basic</h2>
      <p>loadingController.create() → present() で全画面ローディングを表示。duration を指定すると自動で閉じる。</p>
      <ion-button @click="showBasic">Basic Loading (2秒)</ion-button>

      <h2>With Message</h2>
      <p>message プロパティでスピナーの下にテキストを表示できる。処理内容をユーザーに伝えるのに便利。</p>
      <ion-button @click="showWithMessage">With Message</ion-button>

      <h2>Spinner Variants</h2>
      <p>spinner プロパティでアニメーションの種類を変えられる。crescent/bubbles/circles/dots/lines 等がある。</p>
      <ion-button @click="showSpinner('crescent')">Crescent</ion-button>
      <ion-button @click="showSpinner('bubbles')">Bubbles</ion-button>
      <ion-button @click="showSpinner('dots')">Dots</ion-button>

      <h2>Custom Duration</h2>
      <p>duration を変えて表示時間を調整できる。実際の非同期処理では dismiss() を明示的に呼ぶ。</p>
      <ion-button @click="showDuration(1000)">1秒</ion-button>
      <ion-button @click="showDuration(3000)">3秒</ion-button>

      <h2>Translucent</h2>
      <p>translucent プロパティを有効にすると、iOS でガラス調の半透明スタイルになる。</p>
      <ion-button @click="showTranslucent">Translucent (2秒)</ion-button>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/loading" target="_blank" rel="noopener">ionicframework.com/docs/api/loading ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-button @click="presentOfficialLoading">Show Official Loading</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonNote,
  loadingController,
} from '@ionic/vue';

const showBasic = async () => {
  const loading = await loadingController.create({
    duration: 2000,
  });
  await loading.present();
};

const showWithMessage = async () => {
  const loading = await loadingController.create({
    message: 'データを読み込んでいます...',
    duration: 2000,
  });
  await loading.present();
};

const showSpinner = async (spinner: string) => {
  const loading = await loadingController.create({
    message: `Spinner: ${spinner}`,
    spinner: spinner as 'crescent' | 'bubbles' | 'dots',
    duration: 2000,
  });
  await loading.present();
};

const showDuration = async (duration: number) => {
  const loading = await loadingController.create({
    message: `${duration / 1000}秒後に閉じます`,
    duration,
  });
  await loading.present();
};

const showTranslucent = async () => {
  const loading = await loadingController.create({
    message: '送信中...',
    translucent: true,
    duration: 2000,
  });
  await loading.present();
};

const presentOfficialLoading = async () => {
  const officialLoading = await loadingController.create({
    message: 'Please wait...',
    duration: 2000,
  });
  await officialLoading.present();
};
</script>
