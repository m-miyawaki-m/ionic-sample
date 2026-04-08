<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Text</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>Color 変化</h2>
      <p>
        <code>ion-text</code> はインラインテキストに色やタイポグラフィを適用するラッパ要素。
        <code>color</code> プロパティでテーマカラーを指定できる。
      </p>
      <p>
        <ion-text color="primary">Primary テキスト</ion-text>
        &nbsp;/&nbsp;
        <ion-text color="secondary">Secondary テキスト</ion-text>
        &nbsp;/&nbsp;
        <ion-text color="tertiary">Tertiary テキスト</ion-text>
      </p>
      <p>
        <ion-text color="success">Success テキスト</ion-text>
        &nbsp;/&nbsp;
        <ion-text color="warning">Warning テキスト</ion-text>
        &nbsp;/&nbsp;
        <ion-text color="danger">Danger テキスト</ion-text>
      </p>
      <p>
        <ion-text color="medium">Medium テキスト</ion-text>
        &nbsp;/&nbsp;
        <ion-text color="dark">Dark テキスト</ion-text>
        &nbsp;/&nbsp;
        <ion-text color="light">Light テキスト</ion-text>
      </p>

      <h2>見出し要素の色変更</h2>
      <p>
        <code>&lt;h1&gt;</code>〜<code>&lt;h6&gt;</code> などのブロック要素を内包して
        テーマカラーを適用できる。
      </p>
      <ion-text color="primary"><h2>Primary の見出し</h2></ion-text>
      <ion-text color="danger"><h3>Danger の見出し</h3></ion-text>
      <ion-text color="success"><h4>Success の見出し</h4></ion-text>

      <h2>段落内のインライン使用</h2>
      <p>
        文中の一部のみ色を変えたい場合にインライン要素として使う。
        <ion-text color="primary">重要な部分</ion-text>は色を変えて強調できる。
        エラーメッセージも <ion-text color="danger">このように赤で表示</ion-text>することで視認性が上がる。
      </p>

      <h2>実用例: フォームバリデーションメッセージ</h2>
      <p>
        入力欄の下にバリデーション結果を表示する用途に向いている。
      </p>
      <p>
        <ion-text color="success">入力内容は正しい形式です。</ion-text>
      </p>
      <p>
        <ion-text color="danger">メールアドレスの形式が正しくありません。</ion-text>
      </p>
      <p>
        <ion-text color="warning">パスワードが弱いです。英数字と記号を組み合わせてください。</ion-text>
      </p>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/text" target="_blank" rel="noopener">ionicframework.com/docs/api/text ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <p>
        <ion-text color="primary">
          <h1>H1 Primary</h1>
        </ion-text>
        <ion-text color="secondary">
          <h2>H2 Secondary</h2>
        </ion-text>
        <ion-text color="danger">
          <p>Danger paragraph text.</p>
        </ion-text>
      </p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonText, IonNote,
} from '@ionic/vue';
</script>
