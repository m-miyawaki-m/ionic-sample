<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Action Sheet</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>Basic</h2>
      <p>actionSheetController.create() → present() でシートを表示。背景タップでも閉じられる。</p>
      <ion-button @click="showBasic">Basic Action Sheet</ion-button>

      <h2>With Header + Subheader</h2>
      <p>header でタイトル、subHeader で補足説明を付ける。選択内容をユーザーに明示できる。</p>
      <ion-button @click="showHeaders">Header + Subheader</ion-button>

      <h2>With Icons</h2>
      <p>各ボタンに icon プロパティでアイコンを設定できる。ionicons のアイコン名を文字列で渡す。</p>
      <ion-button @click="showIcons">With Icons</ion-button>

      <h2>Destructive Button</h2>
      <p>role: 'destructive' を指定すると赤字で危険な操作を強調できる。削除確認などに使う。</p>
      <ion-button @click="showDestructive">Destructive</ion-button>

      <h2>Cancel Button</h2>
      <p>role: 'cancel' を指定すると Cancel ボタンが一番下に別表示される。タップ時と背景タップ時は自動で閉じる。</p>
      <ion-button @click="showCancel">With Cancel Button</ion-button>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/action-sheet" target="_blank" rel="noopener">ionicframework.com/docs/api/action-sheet ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-button @click="presentOfficialActionSheet">Show Official Action Sheet</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonNote,
  actionSheetController,
} from '@ionic/vue';
import { trash, share, heart, create, close } from 'ionicons/icons';

const showBasic = async () => {
  const actionSheet = await actionSheetController.create({
    buttons: [
      { text: '選択肢 A' },
      { text: '選択肢 B' },
      { text: '選択肢 C' },
    ],
  });
  await actionSheet.present();
};

const showHeaders = async () => {
  const actionSheet = await actionSheetController.create({
    header: '操作を選択してください',
    subHeader: '選択した操作は取り消せません',
    buttons: [
      { text: '続ける' },
      { text: 'キャンセル', role: 'cancel' },
    ],
  });
  await actionSheet.present();
};

const showIcons = async () => {
  const actionSheet = await actionSheetController.create({
    header: 'アクション',
    buttons: [
      { text: '共有', icon: share },
      { text: 'お気に入り', icon: heart },
      { text: '編集', icon: create },
      { text: 'キャンセル', role: 'cancel', icon: close },
    ],
  });
  await actionSheet.present();
};

const showDestructive = async () => {
  const actionSheet = await actionSheetController.create({
    header: 'アイテムを削除しますか？',
    buttons: [
      { text: '削除する', role: 'destructive', icon: trash },
      { text: 'キャンセル', role: 'cancel' },
    ],
  });
  await actionSheet.present();
};

const showCancel = async () => {
  const actionSheet = await actionSheetController.create({
    header: 'ファイルを保存',
    buttons: [
      { text: 'クラウドに保存' },
      { text: 'ローカルに保存' },
      { text: 'キャンセル', role: 'cancel' },
    ],
  });
  await actionSheet.present();
};

const presentOfficialActionSheet = async () => {
  const officialSheet = await actionSheetController.create({
    header: 'Actions',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => { console.log('Delete clicked'); },
      },
      {
        text: 'Share',
        handler: () => { console.log('Share clicked'); },
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ],
  });
  await officialSheet.present();
};
</script>
