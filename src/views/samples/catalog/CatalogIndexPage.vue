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
  { name: 'Card',        path: '/samples/catalog/card',        description: 'コンテンツをまとめるカード。ヘッダー・タイトル・サブタイトル・ボタン配置など' },
  { name: 'Badge',       path: '/samples/catalog/badge',       description: '数値・ラベルを小さなバッジで表示。リスト末尾の未読数表示に便利' },
  { name: 'Chip',        path: '/samples/catalog/chip',        description: 'タグ・フィルター表示に使うコンパクト要素。アイコン・アバター付き可' },
  { name: 'Avatar',      path: '/samples/catalog/avatar',      description: '丸型のプロフィール画像。リストや chip と組み合わせて使う' },
  { name: 'Spinner',     path: '/samples/catalog/spinner',     description: 'ローディング中を示すアニメーション。8種類の形状と色指定に対応' },
  { name: 'Skeleton Text', path: '/samples/catalog/skeleton-text', description: 'データ読み込み中のプレースホルダー。animated でウェーブアニメーション付き' },
  { name: 'Progress Bar', path: '/samples/catalog/progress-bar', description: '進捗バー。determinate / indeterminate / buffer の3モードあり' },
  { name: 'Alert',        path: '/samples/catalog/alert',        description: 'ダイアログ型の確認・入力オーバーレイ。buttons/inputs/header など柔軟に構成可' },
  { name: 'Action Sheet', path: '/samples/catalog/action-sheet', description: '下から出るボタン群オーバーレイ。アイコン/destructive/cancel など複数ロールに対応' },
  { name: 'Loading',      path: '/samples/catalog/loading',      description: '全画面ローディングオーバーレイ。メッセージ・スピナー種別・duration 指定可' },
  { name: 'Popover',      path: '/samples/catalog/popover',      description: '要素にアンカーするポップオーバー。trigger 属性または is-open で制御可' },
];
</script>
