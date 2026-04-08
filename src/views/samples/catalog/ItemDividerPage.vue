<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Item Divider</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="ion-padding">Basic (アルファベット順グループ)</h2>
      <p class="ion-padding-horizontal">
        <code>ion-item-divider</code> はリスト内の視覚的な区切り。
        <code>ion-item-group</code> と組み合わせてセクション分けに使う。
      </p>
      <ion-list>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>A</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>Apple (リンゴ)</ion-label></ion-item>
          <ion-item><ion-label>Avocado (アボカド)</ion-label></ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>B</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>Banana (バナナ)</ion-label></ion-item>
          <ion-item><ion-label>Blueberry (ブルーベリー)</ion-label></ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>C</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>Cherry (さくらんぼ)</ion-label></ion-item>
        </ion-item-group>
      </ion-list>

      <h2 class="ion-padding">Sticky dividers</h2>
      <p class="ion-padding-horizontal">
        <code>:sticky="true"</code> を指定すると、スクロール中でもディバイダーが
        コンテンツ上部に固定表示される。
      </p>
      <ion-list style="height: 200px; overflow-y: auto;">
        <ion-item-group>
          <ion-item-divider :sticky="true">
            <ion-label>野菜</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>キャベツ</ion-label></ion-item>
          <ion-item><ion-label>にんじん</ion-label></ion-item>
          <ion-item><ion-label>たまねぎ</ion-label></ion-item>
          <ion-item><ion-label>ほうれん草</ion-label></ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider :sticky="true">
            <ion-label>肉類</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>鶏肉</ion-label></ion-item>
          <ion-item><ion-label>豚肉</ion-label></ion-item>
          <ion-item><ion-label>牛肉</ion-label></ion-item>
        </ion-item-group>
      </ion-list>

      <h2 class="ion-padding">Color 変化</h2>
      <p class="ion-padding-horizontal">
        <code>color</code> プロパティでディバイダーの背景色を変更できる。
        カテゴリの重要度や種類を視覚的に区別するのに使う。
      </p>
      <ion-list>
        <ion-item-group>
          <ion-item-divider color="primary">
            <ion-label>Priority: Primary</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>優先度の高いタスク A</ion-label></ion-item>
          <ion-item><ion-label>優先度の高いタスク B</ion-label></ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider color="warning">
            <ion-label>Priority: Warning</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>要注意タスク</ion-label></ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider color="success">
            <ion-label>Priority: Success</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>完了済みタスク</ion-label></ion-item>
        </ion-item-group>
      </ion-list>

      <h2 class="ion-padding">倉庫ロケーション例</h2>
      <p class="ion-padding-horizontal">
        倉庫管理アプリでのゾーン別グループ表示の実用例。
      </p>
      <ion-list>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>ゾーン A (冷蔵)</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label>
              <h2>A-001</h2>
              <p>チルド食品エリア</p>
            </ion-label>
            <ion-note slot="end">48 件</ion-note>
          </ion-item>
          <ion-item>
            <ion-label>
              <h2>A-002</h2>
              <p>冷凍食品エリア</p>
            </ion-label>
            <ion-note slot="end">32 件</ion-note>
          </ion-item>
        </ion-item-group>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>ゾーン B (常温)</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label>
              <h2>B-001</h2>
              <p>乾物エリア</p>
            </ion-label>
            <ion-note slot="end">120 件</ion-note>
          </ion-item>
          <ion-item>
            <ion-label>
              <h2>B-002</h2>
              <p>缶詰エリア</p>
            </ion-label>
            <ion-note slot="end">85 件</ion-note>
          </ion-item>
        </ion-item-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonItemGroup, IonItemDivider, IonNote,
} from '@ionic/vue';
</script>
