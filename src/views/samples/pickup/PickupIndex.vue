<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>ピックアップ部品</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <p class="ion-padding" style="color:var(--ion-color-medium);margin:0">
        よく使う UI 部品を厳選。タップでパターン集を開きます。
      </p>
      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="item in pickupItems" :key="item.slug">
            <ion-card button :router-link="`/samples/pickup/${item.slug}`" class="pickup-card">
              <ion-card-content class="ion-text-center">
                <ion-icon :icon="item.icon" size="large" color="primary" />
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-list-header class="ion-margin-top">
        <ion-label>アイコン比較</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item router-link="/samples/pickup/material-icons" detail>
          <span class="material-icons" slot="start" style="color:var(--ion-color-primary);font-size:24px">category</span>
          <ion-label>
            <h2>Material Icons 一覧</h2>
            <p>Google Material Design アイコン 228個をカテゴリ別に表示</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonGrid, IonRow, IonCol,
  IonCard, IonCardContent,
  IonIcon, IonList, IonListHeader, IonItem, IonLabel,
} from '@ionic/vue';
import {
  imageOutline,
  caretDownCircleOutline,
  tabletLandscapeOutline,
  checkboxOutline,
  linkOutline,
  radioButtonOnOutline,
  pricetagOutline,
  listOutline,
  createOutline,
  calendarOutline,
  ellipseOutline,
} from 'ionicons/icons';

const pickupItems = [
  { slug: 'button',   title: 'ボタン',         description: 'タップ操作の起点',       icon: ellipseOutline },
  { slug: 'input',    title: '入力フィールド',  description: 'テキスト入力',          icon: createOutline },
  { slug: 'select',   title: 'コンボボックス',  description: 'ドロップダウン選択',     icon: caretDownCircleOutline },
  { slug: 'checkbox', title: 'チェックボックス', description: '複数選択の ON/OFF',     icon: checkboxOutline },
  { slug: 'radio',    title: 'ラジオボタン',    description: '択一選択',              icon: radioButtonOnOutline },
  { slug: 'list',     title: 'リストボックス',  description: '一覧表示',              icon: listOutline },
  { slug: 'tabs',     title: 'タブ',           description: '画面切替ナビゲーション', icon: tabletLandscapeOutline },
  { slug: 'icon',     title: 'アイコン',        description: 'Ionicons アイコン表示', icon: imageOutline },
  { slug: 'label',    title: 'ラベル',          description: 'テキストラベル要素',     icon: pricetagOutline },
  { slug: 'datetime', title: 'カレンダー',      description: '日付・時刻ピッカー',    icon: calendarOutline },
  { slug: 'textlink', title: 'テキストリンク',  description: 'タップでダイアログ表示', icon: linkOutline },
];
</script>

<style scoped>
.pickup-card {
  margin: 4px;
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pickup-card h3 {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
}
.pickup-card p {
  font-size: 11px;
  color: var(--ion-color-medium);
  margin-bottom: 4px;
}
</style>
