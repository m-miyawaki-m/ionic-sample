<template>
  <ion-split-pane content-id="split-pane-main" when="md">
    <!-- Left side: menu panel -->
    <ion-menu content-id="split-pane-main">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>サイドパネル</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item
            v-for="item in menuItems"
            :key="item.id"
            button
            :class="{ 'selected': selectedId === item.id }"
            @click="selectedId = item.id"
          >
            <ion-icon slot="start" :icon="item.icon" />
            <ion-label>{{ item.label }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Right side: main content -->
    <ion-page id="split-pane-main">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button />
            <ion-back-button default-href="/samples/catalog" />
          </ion-buttons>
          <ion-title>Split Pane</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
          📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
        </ion-note>
        <h2>Split Pane とは</h2>
        <p>
          <code>ion-split-pane</code> はレスポンシブな2ペインレイアウトを実現するコンポーネント。
          画面幅が <code>when</code> ブレークポイント以上のとき、サイドパネルとメインコンテンツを横並びで常時表示する。
          狭い画面ではサイドパネルは非表示になり、<code>ion-menu-button</code> で開くドロワーとして機能する。
        </p>

        <h2>このデモについて</h2>
        <p>
          この画面全体が <code>ion-split-pane</code> の実例。画面幅が <strong>md (768px)</strong> 以上のとき、
          左にサイドパネル、右にこのメインエリアが並んで表示される。
          スマートフォンサイズでは左パネルが隠れ、左上のハンバーガーボタンで開くことができる。
        </p>

        <h2>when プロパティ (ブレークポイント)</h2>
        <p>
          <code>when</code> に文字列またはカスタムメディアクエリを指定。
          組み込みブレークポイント: <code>xs</code> / <code>sm</code> / <code>md</code> / <code>lg</code> / <code>xl</code>。
          カスタム例: <code>when="(min-width: 1000px)"</code>。
          <code>:when="false"</code> で常に折り畳み (ドロワーのみ)、<code>:when="true"</code> で常時分割表示。
        </p>

        <h2>選択中のメニュー項目</h2>
        <p>左パネルでメニュー項目を選択すると、ここに反映される。</p>
        <ion-item lines="none">
          <ion-icon slot="start" :icon="currentItem.icon" />
          <ion-label>
            <h3>{{ currentItem.label }}</h3>
            <p>{{ currentItem.description }}</p>
          </ion-label>
        </ion-item>

        <h2>content-id の仕組み</h2>
        <p>
          <code>ion-split-pane</code> の <code>content-id</code> 属性と、
          メインコンテンツ (<code>ion-page</code>) の <code>id</code> 属性を同じ値に揃えることでペアを作る。
          <code>ion-menu</code> の <code>content-id</code> も同じ値を指定することで、
          狭い画面でのドロワー開閉が正しく動作する。
        </p>

        <h2>公式サンプル (Ionic Docs)</h2>
        <p>
          公式: <a href="https://ionicframework.com/docs/api/split-pane" target="_blank" rel="noopener">ionicframework.com/docs/api/split-pane ↗</a>
        </p>
        <!-- 公式ドキュメントの基本サンプル -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>ion-split-pane 基本構造</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">&lt;ion-split-pane content-id="main"&gt;
  &lt;ion-menu content-id="main"&gt;
    &lt;ion-header&gt;
      &lt;ion-toolbar&gt;
        &lt;ion-title&gt;Menu&lt;/ion-title&gt;
      &lt;/ion-toolbar&gt;
    &lt;/ion-header&gt;
    &lt;ion-content&gt;...&lt;/ion-content&gt;
  &lt;/ion-menu&gt;

  &lt;ion-page id="main"&gt;
    &lt;ion-header&gt;
      &lt;ion-toolbar&gt;
        &lt;ion-buttons slot="start"&gt;
          &lt;ion-menu-button /&gt;
        &lt;/ion-buttons&gt;
        &lt;ion-title&gt;Main&lt;/ion-title&gt;
      &lt;/ion-toolbar&gt;
    &lt;/ion-header&gt;
    &lt;ion-content&gt;...&lt;/ion-content&gt;
  &lt;/ion-page&gt;
&lt;/ion-split-pane&gt;</pre>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </ion-split-pane>
</template>

<script setup lang="ts">
import {
  IonSplitPane, IonMenu, IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonMenuButton,
  IonList, IonItem, IonIcon, IonLabel,
  IonNote, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
} from '@ionic/vue';
import { homeOutline, settingsOutline, barChartOutline, peopleOutline } from 'ionicons/icons';
import { ref, computed } from 'vue';

const menuItems = [
  { id: 1, label: 'ホーム',     icon: homeOutline,       description: 'アプリのトップページ。概要や最新情報を表示する。' },
  { id: 2, label: '分析',       icon: barChartOutline,   description: 'グラフやレポートで在庫状況を可視化する。' },
  { id: 3, label: 'ユーザー', icon: peopleOutline,       description: 'ユーザー管理・権限設定を行う。' },
  { id: 4, label: '設定',       icon: settingsOutline,   description: 'アプリの設定や環境変数を変更する。' },
];

const selectedId = ref(1);
const currentItem = computed(() => menuItems.find(m => m.id === selectedId.value) ?? menuItems[0]);
</script>
