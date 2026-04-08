<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Textarea</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <h2>Basic</h2>
      <p>通常・読み取り専用・無効化の3パターン。ion-item 内に配置する。</p>
      <ion-list>
        <ion-item>
          <ion-textarea label="Regular textarea" placeholder="Type something here" />
        </ion-item>
        <ion-item>
          <ion-textarea :readonly="true" label="Readonly textarea" placeholder="Can't edit this" />
        </ion-item>
        <ion-item>
          <ion-textarea :disabled="true" label="Disabled textarea" placeholder="Can't type here" />
        </ion-item>
      </ion-list>

      <h2>Label Placement</h2>
      <p>label-placement でラベルの位置を変更。floating はフォーカス時に上に浮き、stacked は常に上、fixed は左固定。</p>
      <ion-list>
        <ion-item>
          <ion-textarea label="Default label" placeholder="Enter text" />
        </ion-item>
        <ion-item>
          <ion-textarea label="Fixed label" label-placement="fixed" placeholder="Enter text" />
        </ion-item>
        <ion-item>
          <ion-textarea label="Stacked label" label-placement="stacked" placeholder="Enter text" />
        </ion-item>
        <ion-item>
          <ion-textarea label="Floating label" label-placement="floating" placeholder="Enter text" />
        </ion-item>
      </ion-list>

      <h2>Auto Grow</h2>
      <p>auto-grow を有効にすると、テキストに応じて高さが自動拡張される。備考・メモ欄に最適。</p>
      <ion-list>
        <ion-item>
          <ion-textarea
            placeholder="Type something here"
            :auto-grow="true"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus sem, auctor accumsan egestas sed, venenatis at ex. Nam consequat ex odio, suscipit rhoncus orci dictum eget."
          />
        </ion-item>
      </ion-list>

      <h2>Helper / Error Text</h2>
      <p>helper-text は入力ヒント、error-text はバリデーション失敗時のメッセージ。ion-invalid + ion-touched クラスで切替。</p>
      <ion-list>
        <ion-item>
          <ion-textarea
            label="メモ"
            label-placement="floating"
            helper-text="200文字以内で入力してください"
            error-text="入力内容が無効です"
            placeholder="ここに入力"
          />
        </ion-item>
      </ion-list>

      <h2>Counter + Maxlength</h2>
      <p>counter と maxlength を組み合わせると現在の文字数を表示。counter-formatter でカスタム表示も可能。</p>
      <ion-list>
        <ion-item>
          <ion-textarea
            label="Default counter"
            label-placement="floating"
            :counter="true"
            :maxlength="20"
          />
        </ion-item>
        <ion-item>
          <ion-textarea
            label="Custom Counter Format"
            label-placement="floating"
            :counter="true"
            :maxlength="20"
            :counter-formatter="customFormatter"
          />
        </ion-item>
      </ion-list>

      <h2>Rows / Cols (初期サイズ指定)</h2>
      <p>rows と cols で初期の表示行数・幅を指定できる。auto-grow なしで固定サイズにしたい場合に使う。</p>
      <ion-list>
        <ion-item>
          <ion-textarea
            label="Rows 4"
            label-placement="stacked"
            :rows="4"
            placeholder="4行分の高さで表示"
          />
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonTextarea,
} from '@ionic/vue';

const customFormatter = (inputLength: number, maxLength: number) => {
  return `${maxLength - inputLength} characters remaining`;
};
</script>
