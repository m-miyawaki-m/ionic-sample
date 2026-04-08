<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Note</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-margin ion-padding" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">
        <code>ion-note</code> は補足情報を小さめ・薄めのテキストで表示するインライン要素。
        単独で使うとスタンドアロンの注釈として機能する。
      </p>
      <ion-list>
        <ion-item>
          <ion-label>
            <ion-note>これは補足テキストです</ion-note>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <ion-note>最終更新: 2024-04-08</ion-note>
          </ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">In list item (slot="end")</h2>
      <p class="ion-padding-horizontal">
        <code>slot="end"</code> に置くとリスト右端にカウントやラベルを表示できる。
        バッジより控えめな表現が必要なときに使う。
      </p>
      <ion-list>
        <ion-item>
          <ion-label>受信トレイ</ion-label>
          <ion-note slot="end">5 件</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>下書き</ion-label>
          <ion-note slot="end">3 件</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>送信済み</ion-label>
          <ion-note slot="end">24 件</ion-note>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Color 変化</h2>
      <p class="ion-padding-horizontal">
        <code>color</code> プロパティで色を指定できる。エラーや警告の補足表示に便利。
      </p>
      <ion-list>
        <ion-item>
          <ion-label>Primary</ion-label>
          <ion-note slot="end" color="primary">注記</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Success</ion-label>
          <ion-note slot="end" color="success">正常</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Warning</ion-label>
          <ion-note slot="end" color="warning">要確認</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Danger</ion-label>
          <ion-note slot="end" color="danger">エラー</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Medium</ion-label>
          <ion-note slot="end" color="medium">非表示</ion-note>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Inside ion-item helper text</h2>
      <p class="ion-padding-horizontal">
        <code>ion-label</code> の <code>&lt;p&gt;</code> 内で <code>ion-note</code> を使うと、
        リスト項目の補助説明として機能する。
      </p>
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>商品名</h2>
            <p>
              <ion-note>在庫: 残りわずか</ion-note>
            </p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>配送予定</h2>
            <p>
              <ion-note color="success">明日中に到着予定</ion-note>
            </p>
          </ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/note" target="_blank" rel="noopener">ionicframework.com/docs/api/note ↗</a>
      </p>
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>Item Label</h2>
            <p>
              <ion-note>This is a note under the label</ion-note>
            </p>
          </ion-label>
          <ion-note slot="end">Note</ion-note>
        </ion-item>
      </ion-list>
      <div class="ion-padding-horizontal">
        <ion-note>Standalone note outside a list item.</ion-note>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonNote,
} from '@ionic/vue';
</script>
