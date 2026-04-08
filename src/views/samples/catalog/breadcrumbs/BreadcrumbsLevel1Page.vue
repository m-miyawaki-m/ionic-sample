<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Breadcrumbs (Level 1)</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-note color="medium" class="ion-margin ion-padding" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>
      <ion-breadcrumbs>
        <ion-breadcrumb router-link="/samples/catalog/breadcrumbs">Categories</ion-breadcrumb>
      </ion-breadcrumbs>

      <h2 class="ion-padding">カテゴリ一覧</h2>
      <p class="ion-padding-horizontal">パンくずリストの最上位。サブカテゴリをタップすると次の階層に進む。</p>
      <ion-list>
        <ion-item router-link="/samples/catalog/breadcrumbs/electronics" detail>
          <ion-label>Electronics</ion-label>
        </ion-item>
        <ion-item disabled>
          <ion-label>Books (デモ用にリンクなし)</ion-label>
        </ion-item>
        <ion-item disabled>
          <ion-label>Clothing (デモ用にリンクなし)</ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/breadcrumbs" target="_blank" rel="noopener">ionicframework.com/docs/api/breadcrumbs ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-card class="ion-margin">
        <ion-card-header>
          <ion-card-title>ion-breadcrumbs 基本構造</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">&lt;ion-breadcrumbs&gt;
  &lt;ion-breadcrumb href="/home"&gt;Home&lt;/ion-breadcrumb&gt;
  &lt;ion-breadcrumb href="/category"&gt;Category&lt;/ion-breadcrumb&gt;
  &lt;ion-breadcrumb&gt;Current Page&lt;/ion-breadcrumb&gt;
&lt;/ion-breadcrumbs&gt;

&lt;!-- maxItems: 表示する最大数を制限 --&gt;
&lt;ion-breadcrumbs :max-items="4"&gt;
  &lt;ion-breadcrumb href="/"&gt;Home&lt;/ion-breadcrumb&gt;
  &lt;ion-breadcrumb href="/a"&gt;A&lt;/ion-breadcrumb&gt;
  &lt;ion-breadcrumb href="/b"&gt;B&lt;/ion-breadcrumb&gt;
  &lt;ion-breadcrumb href="/c"&gt;C&lt;/ion-breadcrumb&gt;
  &lt;ion-breadcrumb&gt;D (current)&lt;/ion-breadcrumb&gt;
&lt;/ion-breadcrumbs&gt;</pre>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonBreadcrumbs, IonBreadcrumb,
  IonList, IonItem, IonLabel,
  IonNote, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
} from '@ionic/vue';
</script>
