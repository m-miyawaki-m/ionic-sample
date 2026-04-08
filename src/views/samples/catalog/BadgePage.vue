<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Badge</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>Basic</h2>
      <p>ion-badge はインライン要素として数値やラベルを小さなバッジで表示する。</p>
      <ion-badge>1</ion-badge>
      &nbsp;
      <ion-badge>99+</ion-badge>
      &nbsp;
      <ion-badge>NEW</ion-badge>

      <h2>Colors</h2>
      <p>color プロパティで色を変更できる。</p>
      <ion-badge color="primary">Primary</ion-badge>
      &nbsp;
      <ion-badge color="secondary">Secondary</ion-badge>
      &nbsp;
      <ion-badge color="tertiary">Tertiary</ion-badge>
      &nbsp;
      <ion-badge color="success">Success</ion-badge>
      &nbsp;
      <ion-badge color="warning">Warning</ion-badge>
      &nbsp;
      <ion-badge color="danger">Danger</ion-badge>
      &nbsp;
      <ion-badge color="medium">Medium</ion-badge>
      &nbsp;
      <ion-badge color="dark">Dark</ion-badge>

      <h2>In list item (slot="end")</h2>
      <p>ion-item の end スロットに置くと、リスト右端に未読数などを表示できる。</p>
    </ion-content>
    <ion-list>
      <ion-item>
        <ion-label>受信トレイ</ion-label>
        <ion-badge slot="end">5</ion-badge>
      </ion-item>
      <ion-item>
        <ion-label>通知</ion-label>
        <ion-badge slot="end" color="danger">12</ion-badge>
      </ion-item>
      <ion-item>
        <ion-label>下書き</ion-label>
        <ion-badge slot="end" color="medium">3</ion-badge>
      </ion-item>
      <ion-item>
        <ion-label>既読済み</ion-label>
        <ion-badge slot="end" color="success">✓</ion-badge>
      </ion-item>
    </ion-list>

    <div class="ion-padding">
      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/badge" target="_blank" rel="noopener">ionicframework.com/docs/api/badge ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-item>
        <ion-label>Notifications</ion-label>
        <ion-badge slot="end">5</ion-badge>
      </ion-item>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonBadge, IonList, IonItem, IonLabel, IonNote,
} from '@ionic/vue';
</script>
