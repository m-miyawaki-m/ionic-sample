<template>
  <CatalogMenu content-id="menu-home-content" />
  <ion-page id="menu-home-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button menu="catalog-side-menu" />
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Menu - Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>
      <h2>Menu Home</h2>
      <p>左上のハンバーガーボタンでサイドメニューが開く。メニュー項目で他のサブページに遷移。</p>
      <p><code>ion-menu</code> は <code>content-id</code> で対象ページと紐付ける。<code>ion-menu-button</code> は対応するメニューを自動で開く。</p>
      <p>このデモでは再利用可能な <code>CatalogMenu.vue</code> コンポーネントを各サブページにインポートしている。</p>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/menu" target="_blank" rel="noopener">ionicframework.com/docs/api/menu ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>ion-menu 基本構造</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">&lt;ion-menu content-id="main-content"&gt;
  &lt;ion-header&gt;
    &lt;ion-toolbar&gt;
      &lt;ion-title&gt;Menu&lt;/ion-title&gt;
    &lt;/ion-toolbar&gt;
  &lt;/ion-header&gt;
  &lt;ion-content&gt;
    &lt;ion-list&gt;
      &lt;ion-item button @click="close"&gt;Home&lt;/ion-item&gt;
    &lt;/ion-list&gt;
  &lt;/ion-content&gt;
&lt;/ion-menu&gt;

&lt;ion-page id="main-content"&gt;
  &lt;ion-header&gt;
    &lt;ion-toolbar&gt;
      &lt;ion-buttons slot="start"&gt;
        &lt;ion-menu-button /&gt;
      &lt;/ion-buttons&gt;
    &lt;/ion-toolbar&gt;
  &lt;/ion-header&gt;
&lt;/ion-page&gt;</pre>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonMenuButton,
  IonNote, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
} from '@ionic/vue';
import CatalogMenu from './CatalogMenu.vue';
</script>
