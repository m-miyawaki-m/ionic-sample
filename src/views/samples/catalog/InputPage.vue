<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Input</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>Basic</h2>
      <p>デフォルトの ion-input。label と placeholder を持つ。</p>
      <ion-input label="Default" placeholder="Enter text" />

      <h2>Label Placement</h2>
      <p>label-placement でラベルの位置を切替。floating はフォーカス時に上に浮く、stacked は常に上、fixed は左固定。下4つにフォーカスして比較してみて。</p>
      <ion-input label="Floating" label-placement="floating" placeholder="Enter text" />
      <ion-input label="Stacked" label-placement="stacked" placeholder="Enter text" />
      <ion-input label="Fixed" label-placement="fixed" placeholder="Enter text" />

      <h2>Helper Text</h2>
      <p>helper-text は常時のヒント、error-text はバリデーション失敗時に表示。Email欄にフォーカス→空欄のままぼかすと出る。</p>
      <ion-input
        label="Email"
        type="email"
        helper-text="Enter your email"
        error-text="Invalid email"
      />

      <h2>Types</h2>
      <p>type 属性でソフトウェアキーボードや入力制限が変わる。実機 (スマホ) で確認するとキーボードの違いが明確。</p>
      <ion-input label="Text" type="text" />
      <ion-input label="Password" type="password" />
      <ion-input label="Number" type="number" />
      <ion-input label="Tel" type="tel" />

      <h2>Clear Button</h2>
      <p>↓何か入力すると右端に × (clear) ボタンが出る。タップで全消去。</p>
      <ion-input label="With clear" :clear-input="true" placeholder="Type to see clear" />

      <h2>Counter</h2>
      <p>↓文字を打つと下に文字数カウンタ (例: 5/20) が表示される。</p>
      <ion-input label="Max 20" :counter="true" :maxlength="20" />

      <h2>Password Toggle</h2>
      <p>type="password" の ion-input に ion-input-password-toggle を slot="end" に入れると、目アイコンで表示/非表示を切り替えられる。</p>
      <ion-input label="Password" type="password" value="secret123">
        <ion-input-password-toggle slot="end" />
      </ion-input>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/input" target="_blank" rel="noopener">ionicframework.com/docs/api/input ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプルをそのまま実装 -->
      <ion-list>
        <ion-item>
          <ion-input label="Default input"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Input with placeholder" placeholder="Enter company name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Input with value" value="121 S Pinckney St #300"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Readonly input" value="Madison" :readonly="true"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Disabled input" value="53703" :disabled="true"></ion-input>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonInput, IonInputPasswordToggle,
  IonNote, IonList, IonItem,
} from '@ionic/vue';
</script>
