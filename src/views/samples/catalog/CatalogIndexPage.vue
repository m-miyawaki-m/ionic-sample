<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples" />
        </ion-buttons>
        <ion-title>コンポーネントカタログ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="c in components" :key="c.path" :router-link="c.path" detail>
          <ion-label>
            <h2>{{ c.name }}</h2>
            <p>{{ c.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
} from '@ionic/vue';

const components = [
  { name: 'Button',      path: '/samples/catalog/button',      description: 'タップ可能なボタン。色・サイズ・fill (clear/outline/solid) のバリエーションあり' },
  { name: 'Input',       path: '/samples/catalog/input',       description: 'テキスト入力フィールド。label-placement・type・helper-text・counter を指定可' },
  { name: 'List',        path: '/samples/catalog/list',        description: '縦スクロールの一覧。区切り線・inset・detail icon を切替可' },
  { name: 'Modal',       path: '/samples/catalog/modal',       description: '全画面モーダルとシート (breakpoints) モーダルの2パターン' },
  { name: 'Toast',       path: '/samples/catalog/toast',       description: '一定時間で消える通知。色・位置・ボタンを指定可' },
  { name: 'Radio Group', path: '/samples/catalog/radio-group', description: '複数候補から1つだけ選ぶラジオボタン' },
  { name: 'Checkbox',    path: '/samples/catalog/checkbox',    description: '単独で使うチェックボックス。複数選択や ON/OFF フラグに使う' },
  { name: 'Toggle',      path: '/samples/catalog/toggle',      description: 'ON/OFF のスイッチ。設定画面でよく使う' },
  { name: 'Select',      path: '/samples/catalog/select',      description: 'ドロップダウン選択。Alert/Popover/ActionSheet の3UI と複数選択対応' },
  { name: 'Searchbar',   path: '/samples/catalog/searchbar',   description: '検索用入力欄。虫眼鏡アイコン・キャンセルボタン・debounce 付き' },
  { name: 'Segment',     path: '/samples/catalog/segment',     description: 'タブ風の選択UI。横スクロール対応' },
];
</script>
