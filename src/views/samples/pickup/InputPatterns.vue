<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>入力フィールド パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- 1. Label Placement -->
      <h2>1. Label Placement</h2>
      <p>ラベル配置で見た目が大きく変わる。floating はモダンUI向け、stacked は従来型。</p>
      <ion-list>
        <ion-item>
          <ion-input label="Fixed" label-placement="fixed" placeholder="fixed"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Floating" label-placement="floating" placeholder="floating"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Stacked" label-placement="stacked" placeholder="stacked"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Start" label-placement="start" placeholder="start"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="End" label-placement="end" placeholder="end"></ion-input>
        </ion-item>
      </ion-list>

      <!-- 2. Fill -->
      <h2>2. Fill</h2>
      <p>fill で入力欄の枠線スタイルを切替。outline は明確な境界線を持つ。</p>
      <ion-list>
        <ion-item>
          <ion-input label="Solid" fill="solid" label-placement="floating" placeholder="solid"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Outline" fill="outline" label-placement="floating" placeholder="outline"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Default (no fill)" label-placement="floating" placeholder="default"></ion-input>
        </ion-item>
      </ion-list>

      <!-- 3. Type -->
      <h2>3. Type</h2>
      <p>type でキーボードと入力制約を制御。適切な type 指定でモバイル入力を最適化。</p>
      <ion-list>
        <ion-item>
          <ion-input label="text" type="text" label-placement="fixed" placeholder="テキスト"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="number" type="number" label-placement="fixed" placeholder="数値"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="email" type="email" label-placement="fixed" placeholder="example@mail.com"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="password" type="password" label-placement="fixed" placeholder="パスワード"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="tel" type="tel" label-placement="fixed" placeholder="090-0000-0000"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="url" type="url" label-placement="fixed" placeholder="https://"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="search" type="search" label-placement="fixed" placeholder="検索キーワード"></ion-input>
        </ion-item>
      </ion-list>

      <!-- 4. Helper & Error -->
      <h2>4. Helper & Error</h2>
      <p>helper-text で補足情報、error-text でバリデーション結果を表示。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="メールアドレス"
            label-placement="stacked"
            placeholder="example@mail.com"
            helper-text="登録済みのメールアドレスを入力してください"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            label="必須項目"
            label-placement="stacked"
            placeholder="未入力"
            error-text="この項目は必須です"
            class="ion-invalid ion-touched"
          ></ion-input>
        </ion-item>
      </ion-list>

      <!-- 5. Counter -->
      <h2>5. Counter</h2>
      <p>counter + maxlength で残り文字数をリアルタイム表示。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="コメント"
            label-placement="stacked"
            placeholder="100文字以内で入力"
            :maxlength="100"
            :counter="true"
          ></ion-input>
        </ion-item>
      </ion-list>

      <!-- 6. Clear Input -->
      <h2>6. Clear Input</h2>
      <p>clear-input で×ボタンを表示。ワンタップで入力内容をクリア。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="検索"
            label-placement="floating"
            placeholder="入力してクリアボタンを確認"
            :clear-input="true"
          ></ion-input>
        </ion-item>
      </ion-list>

      <!-- 7. Start/End Slots -->
      <h2>7. Start/End Slots</h2>
      <p>スロットでアイコンやテキストを入力欄の左右に配置できる。</p>
      <ion-list>
        <ion-item>
          <ion-input label="アイコン（start）" label-placement="stacked" placeholder="左にアイコン">
            <ion-icon slot="start" :icon="searchOutline" aria-hidden="true"></ion-icon>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="ボタン（end）" label-placement="stacked" placeholder="右にボタン">
            <ion-button slot="end" fill="clear" aria-label="スキャン">
              <ion-icon slot="icon-only" :icon="barcodeOutline" aria-hidden="true"></ion-icon>
            </ion-button>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="単位テキスト（end）" label-placement="stacked" type="number" placeholder="0">
            <span slot="end">個</span>
          </ion-input>
        </ion-item>
      </ion-list>

      <!-- 8. Disabled / Readonly -->
      <h2>8. Disabled / Readonly</h2>
      <p>disabled=操作不可でグレーアウト、readonly=表示のみで選択・コピーは可能。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="Disabled"
            label-placement="fixed"
            value="変更不可"
            :disabled="true"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            label="Readonly"
            label-placement="fixed"
            value="読み取り専用（コピー可）"
            :readonly="true"
          ></ion-input>
        </ion-item>
      </ion-list>

      <!-- 業務パターン -->
      <h2>9. 品番入力</h2>
      <p>バーコードアイコン付き。end slot にスキャンボタンを配置する。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="品番"
            label-placement="stacked"
            placeholder="スキャンまたは手入力"
          >
            <ion-button slot="end" fill="clear" aria-label="バーコードスキャン">
              <ion-icon slot="icon-only" :icon="barcodeOutline" aria-hidden="true"></ion-icon>
            </ion-button>
          </ion-input>
        </ion-item>
      </ion-list>

      <h2>10. 数量入力</h2>
      <p>type='number' + inputmode='numeric' で数字キーボードを表示。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="数量"
            label-placement="stacked"
            type="number"
            inputmode="numeric"
            min="0"
            placeholder="0"
          ></ion-input>
        </ion-item>
      </ion-list>

      <h2>11. 検索フィールド</h2>
      <p>searchOutline アイコン + clear-input で検索UIを構成。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="検索"
            label-placement="floating"
            type="search"
            placeholder="キーワードを入力"
            :clear-input="true"
          >
            <ion-icon slot="start" :icon="searchOutline" aria-hidden="true"></ion-icon>
          </ion-input>
        </ion-item>
      </ion-list>

      <h2>12. バリデーション付き</h2>
      <p>ion-invalid + ion-touched で赤枠+エラーメッセージを表示。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="担当者名"
            label-placement="stacked"
            placeholder="未入力"
            error-text="必須項目です"
            class="ion-invalid ion-touched"
          ></ion-input>
        </ion-item>
      </ion-list>

      <h2>13. パスワード入力</h2>
      <p>ion-input-password-toggle で表示/非表示を切替。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="パスワード"
            label-placement="stacked"
            type="password"
            placeholder="パスワードを入力"
          >
            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
          </ion-input>
        </ion-item>
      </ion-list>

      <h2>14. 複合入力行</h2>
      <p>ラベル+入力+単位（個/kg等）を1行に。end slot にテキストを配置。</p>
      <ion-list>
        <ion-item>
          <ion-input
            label="重量"
            label-placement="stacked"
            type="number"
            inputmode="decimal"
            placeholder="0.0"
          >
            <span slot="end">kg</span>
          </ion-input>
        </ion-item>
      </ion-list>

      <h2>15. フォーカス制御</h2>
      <p>ボタンクリックで setFocus() を呼び、プログラムでフォーカスを移動。</p>
      <ion-list>
        <ion-item>
          <ion-button @click="inputRef.$el.setFocus()">フォーカスをセット</ion-button>
        </ion-item>
        <ion-item>
          <ion-input ref="inputRef" label="フォーカス対象" label-placement="floating" placeholder="ボタンを押してフォーカス"></ion-input>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonInput,
  IonItem,
  IonList,
  IonButton,
  IonIcon,
  IonInputPasswordToggle,
} from '@ionic/vue';
import { ref } from 'vue';
import { barcodeOutline, searchOutline } from 'ionicons/icons';

const inputRef = ref();
</script>
