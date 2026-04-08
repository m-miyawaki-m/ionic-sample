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
  { name: 'Datetime',    path: '/samples/catalog/datetime',    description: '日付・時刻ピッカー。インライン表示とボタン+モーダル形式の両方に対応' },
  { name: 'Range',       path: '/samples/catalog/range',       description: 'スライダー型の数値入力。デュアルノブ・スナップ・ピン表示など多機能' },
  { name: 'Accordion',   path: '/samples/catalog/accordion',   description: '折り畳みコンテンツ。複数同時展開・inset・disabled に対応' },
  { name: 'Item Sliding', path: '/samples/catalog/item-sliding', description: 'スワイプで出るアクションボタン。左右両サイドのオプションに対応' },
  { name: 'Reorder',     path: '/samples/catalog/reorder',     description: 'ドラッグで並び順を変更できるリスト。ハンドル位置・有効/無効の切替に対応' },
  { name: 'FAB',         path: '/samples/catalog/fab',         description: '画面に固定されるフローティングアクションボタン。FAB リスト・配置・Edge モードに対応' },
  { name: 'Refresher',     path: '/samples/catalog/refresher',     description: '上に引っ張って更新するプルトゥリフレッシュ。カスタムテキスト・アイコン・有効/無効切替に対応' },
  { name: 'Infinite Scroll', path: '/samples/catalog/infinite-scroll', description: 'スクロール末尾で追加データを自動読み込み。threshold・position・全件完了後の無効化に対応' },
  { name: 'Grid',            path: '/samples/catalog/grid',            description: '12カラムグリッドレイアウト。レスポンシブ・Offset・Fixed・No Padding に対応' },
  { name: 'Tabs',        path: '/samples/catalog/tabs',        description: 'タブナビゲーション。子ルートで複数ページを切替' },
  { name: 'Menu',        path: '/samples/catalog/menu',        description: 'サイドドロワーメニュー。複数サブページを行き来できる' },
  { name: 'Breadcrumbs', path: '/samples/catalog/breadcrumbs', description: '階層パンくずリスト。3階層のサンプルあり' },
  { name: 'Textarea',  path: '/samples/catalog/textarea',  description: '複数行テキスト入力。auto-grow で行数自動拡張。備考・メモ入力に' },
  { name: 'Picker',    path: '/samples/catalog/picker',    description: '複数列のホイール選択。時刻・カスタム値の入力に' },
  { name: 'Input OTP', path: '/samples/catalog/input-otp', description: 'OTP/認証コード入力。1文字ごとに自動フォーカス遷移' },
  { name: 'Split Pane', path: '/samples/catalog/split-pane', description: 'レスポンシブな2ペイン layout。タブレットで side menu 常時表示' },
  { name: 'Footer',     path: '/samples/catalog/footer',     description: 'ページ下部固定ツールバー。確定/キャンセル等のアクション配置' },
  { name: 'Nav',        path: '/samples/catalog/nav',        description: 'スタック型ナビゲーション。vue-router の代替で push/pop 操作' },
  { name: 'Backdrop',   path: '/samples/catalog/backdrop',   description: '画面を暗くするオーバーレイ。modal/alert の背景として内部使用される基本要素' },
];
</script>
