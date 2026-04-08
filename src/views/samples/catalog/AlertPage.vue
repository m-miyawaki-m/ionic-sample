<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Alert</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic</h2>
      <p>alertController.create() → present() の2ステップ。メッセージのみのシンプルな確認ダイアログ。</p>
      <ion-button @click="showBasic">Basic Alert</ion-button>

      <h2>With Buttons (OK / Cancel)</h2>
      <p>buttons 配列に role: 'cancel' と role: 'confirm' を指定して2択の確認ダイアログ。キャンセルは自動で閉じる。</p>
      <ion-button @click="showConfirm">Confirm Alert</ion-button>

      <h2>With Input</h2>
      <p>inputs 配列でダイアログ内にテキスト入力欄を追加できる。入力値は handler の値で受け取る。</p>
      <ion-button @click="showInput">Input Alert</ion-button>

      <h2>Multiple Buttons</h2>
      <p>3つ以上のボタンを並べて複数の選択肢を提示できる。ボタンは上から積まれる形で表示される。</p>
      <ion-button @click="showMultiple">Multiple Buttons Alert</ion-button>

      <h2>Header + Subheader</h2>
      <p>header でタイトル、subHeader でサブタイトルを設定してより情報量の多いダイアログにする。</p>
      <ion-button @click="showHeaders">Header + Subheader Alert</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
  alertController,
} from '@ionic/vue';

const showBasic = async () => {
  const alert = await alertController.create({
    message: 'これはシンプルなアラートです。',
    buttons: ['OK'],
  });
  await alert.present();
};

const showConfirm = async () => {
  const alert = await alertController.create({
    header: '確認',
    message: '操作を続けますか？',
    buttons: [
      { text: 'キャンセル', role: 'cancel' },
      { text: 'OK', role: 'confirm' },
    ],
  });
  await alert.present();
};

const showInput = async () => {
  const alert = await alertController.create({
    header: '名前を入力',
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: '例: 山田 太郎',
      },
    ],
    buttons: [
      { text: 'キャンセル', role: 'cancel' },
      { text: 'OK', role: 'confirm' },
    ],
  });
  await alert.present();
};

const showMultiple = async () => {
  const alert = await alertController.create({
    header: '操作を選択',
    buttons: [
      { text: '編集する', role: 'confirm' },
      { text: 'コピーする' },
      { text: '削除する', cssClass: 'danger' },
      { text: 'キャンセル', role: 'cancel' },
    ],
  });
  await alert.present();
};

const showHeaders = async () => {
  const alert = await alertController.create({
    header: 'アラートタイトル',
    subHeader: 'サブタイトル (追加情報)',
    message: 'ヘッダー・サブヘッダー・メッセージの3段階で情報を伝えられます。',
    buttons: ['閉じる'],
  });
  await alert.present();
};
</script>
