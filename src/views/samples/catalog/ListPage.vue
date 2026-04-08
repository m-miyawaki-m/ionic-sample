<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>List</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-margin ion-padding" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">デフォルトの ion-list。各 ion-item の下に薄い区切り線が出る。</p>
      <ion-list>
        <ion-item><ion-label>Item 1</ion-label></ion-item>
        <ion-item><ion-label>Item 2</ion-label></ion-item>
        <ion-item><ion-label>Item 3</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">Lines: none</h2>
      <p class="ion-padding-horizontal">lines="none" で区切り線を消す。フラットな設定画面風になる。</p>
      <ion-list lines="none">
        <ion-item><ion-label>No bottom line</ion-label></ion-item>
        <ion-item><ion-label>No bottom line</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">Inset list</h2>
      <p class="ion-padding-horizontal">:inset="true" で左右に余白を空けたカード状リスト。グループ化したいときに。</p>
      <ion-list :inset="true">
        <ion-item><ion-label>Inset item 1</ion-label></ion-item>
        <ion-item><ion-label>Inset item 2</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">With detail icon</h2>
      <p class="ion-padding-horizontal">ion-item に button detail を付けると右端に &gt; マークが出てタップ可能になる。</p>
      <ion-list>
        <ion-item button detail><ion-label>Tap me</ion-label></ion-item>
        <ion-item button detail><ion-label>Or me</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">List header</h2>
      <p class="ion-padding-horizontal">ion-list-header はリストの上に置くタイトル領域。普通の ion-item より目立つ。</p>
      <ion-list>
        <ion-list-header>
          <ion-label>Header</ion-label>
        </ion-list-header>
        <ion-item><ion-label>Item under header</ion-label></ion-item>
      </ion-list>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/list" target="_blank" rel="noopener">ionicframework.com/docs/api/list ↗</a>
      </p>
      <ion-list>
        <ion-item>
          <ion-label>Custom Label</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-label>Item (lines="none")</ion-label>
        </ion-item>
      </ion-list>
      <ion-list :inset="true">
        <ion-item>
          <ion-label>Inset List Item 1</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Inset List Item 2</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonListHeader, IonItem, IonLabel, IonNote,
} from '@ionic/vue';
</script>
