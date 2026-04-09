<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>ボタン パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 8px">
        ion-button は Ionic の基本操作トリガー。color / size / fill / expand などのプロパティと
        ion-icon の組み合わせで、用途に合わせた多様なボタンを実現できる。
      </p>

      <!-- 1. Color -->
      <div class="section">
        <h2>Color</h2>
        <p>color プロパティで意味別に色分け。primary=主操作、danger=破壊的操作に使う。</p>
        <div class="button-row">
          <ion-button color="primary">primary</ion-button>
          <ion-button color="secondary">secondary</ion-button>
          <ion-button color="tertiary">tertiary</ion-button>
          <ion-button color="success">success</ion-button>
          <ion-button color="warning">warning</ion-button>
          <ion-button color="danger">danger</ion-button>
          <ion-button color="light">light</ion-button>
          <ion-button color="medium">medium</ion-button>
          <ion-button color="dark">dark</ion-button>
        </div>
      </div>

      <!-- 2. Size -->
      <div class="section">
        <h2>Size</h2>
        <p>size で 3 段階。メイン操作は large、補助操作は small を使う。</p>
        <div class="button-row ion-align-items-center">
          <ion-button size="small">small</ion-button>
          <ion-button>default</ion-button>
          <ion-button size="large">large</ion-button>
        </div>
      </div>

      <!-- 3. Fill -->
      <div class="section">
        <h2>Fill</h2>
        <p>fill で視覚的な重要度を表現。solid=最重要、outline=次点、clear=テキストリンク風。</p>
        <div class="button-row">
          <ion-button fill="solid">solid</ion-button>
          <ion-button fill="outline">outline</ion-button>
          <ion-button fill="clear">clear</ion-button>
        </div>
      </div>

      <!-- 4. Fill × Shape マトリクス -->
      <div class="section">
        <h2>Fill × Shape マトリクス</h2>
        <p>shape='round' と fill の組み合わせ。丸角はフレンドリーな印象を与える。</p>
        <div class="button-row">
          <ion-button fill="solid">solid</ion-button>
          <ion-button fill="solid" shape="round">solid + round</ion-button>
          <ion-button fill="outline">outline</ion-button>
          <ion-button fill="outline" shape="round">outline + round</ion-button>
          <ion-button fill="clear">clear</ion-button>
          <ion-button fill="clear" shape="round">clear + round</ion-button>
        </div>
      </div>

      <!-- 5. Expand -->
      <div class="section">
        <h2>Expand</h2>
        <p>expand で幅を制御。block はコンテナ幅、full は画面幅いっぱいに広がる。</p>
        <ion-button>default</ion-button>
        <ion-button expand="block" style="margin-top:8px">block</ion-button>
        <ion-button expand="full" style="margin-top:8px">full</ion-button>
      </div>

      <!-- 6. Icon 配置 -->
      <div class="section">
        <h2>Icon 配置</h2>
        <p>slot でアイコン位置を制御。icon-only はツールバーやアクションバー向き。</p>
        <div class="button-row">
          <ion-button>
            <ion-icon slot="start" :icon="addOutline" />
            icon start
          </ion-button>
          <ion-button>
            icon end
            <ion-icon slot="end" :icon="addOutline" />
          </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="trashOutline" />
          </ion-button>
          <ion-button>
            <ion-icon slot="start" :icon="addOutline" />
            both
            <ion-icon slot="end" :icon="trashOutline" />
          </ion-button>
        </div>
      </div>

      <!-- 7. Disabled 状態 -->
      <div class="section">
        <h2>Disabled 状態</h2>
        <p>disabled で操作不可を明示。全 fill パターンでグレーアウトされる。</p>
        <div class="button-row">
          <ion-button fill="solid" :disabled="true">solid disabled</ion-button>
          <ion-button fill="outline" :disabled="true">outline disabled</ion-button>
          <ion-button fill="clear" :disabled="true">clear disabled</ion-button>
        </div>
      </div>

      <!-- 8. 確定/キャンセル並び -->
      <div class="section">
        <h2>確定/キャンセル並び</h2>
        <p>キャンセルは outline、確定は solid で主副を視覚的に区別。右に主操作を配置する。</p>
        <div class="button-row">
          <ion-button fill="outline" color="medium">キャンセル</ion-button>
          <ion-button fill="solid" color="primary">確定</ion-button>
        </div>
      </div>

      <!-- 9. スキャン起動ボタン -->
      <div class="section">
        <h2>スキャン起動ボタン</h2>
        <p>expand='block' + size='large' で画面幅いっぱいの大ボタン。バーコード読取の起動に。</p>
        <ion-button expand="block" size="large" color="primary">
          <ion-icon slot="start" :icon="barcodeOutline" />
          バーコードをスキャン
        </ion-button>
      </div>

      <!-- 10. 一括操作バー -->
      <div class="section">
        <h2>一括操作バー</h2>
        <p>複数の small ボタンを横並び。リスト上部の一括操作に使う。</p>
        <div class="button-row">
          <ion-button fill="outline" size="small">全選択</ion-button>
          <ion-button fill="outline" size="small">全解除</ion-button>
          <ion-button fill="outline" size="small" color="danger">削除</ion-button>
        </div>
      </div>

      <!-- 11. ステータス切替 -->
      <div class="section">
        <h2>ステータス切替</h2>
        <p>色で状態を表現。success=有効、danger=無効のように意味を持たせる。</p>
        <div class="button-row">
          <ion-button color="success">有効</ion-button>
          <ion-button color="danger">無効</ion-button>
        </div>
      </div>

      <!-- 12. ツールバー内ボタン -->
      <div class="section">
        <h2>ツールバー内ボタン</h2>
        <p>ion-buttons + slot で header 内に配置。ナビゲーション操作に。</p>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button fill="clear">
              <ion-icon slot="icon-only" :icon="chevronBackOutline" />
            </ion-button>
          </ion-buttons>
          <ion-title>タイトル</ion-title>
          <ion-buttons slot="end">
            <ion-button fill="clear">
              <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </div>

      <!-- 13. ローディング付きボタン -->
      <div class="section">
        <h2>ローディング付きボタン</h2>
        <p>処理中は ion-spinner + disabled で連打防止。API 呼び出し中などに。</p>
        <div class="button-row">
          <ion-button :disabled="isLoading" @click="simulateLoading">
            <ion-spinner v-if="isLoading" name="crescent" slot="start" />
            <span v-if="!isLoading">送信する</span>
            <span v-else>送信中...</span>
          </ion-button>
        </div>
      </div>

      <!-- 14. アイコンボタン群 -->
      <div class="section">
        <h2>アイコンボタン群</h2>
        <p>icon-only で揃えたアクションバー。ラベルなしでコンパクトに。</p>
        <div class="button-row">
          <ion-button fill="outline">
            <ion-icon slot="icon-only" :icon="createOutline" />
          </ion-button>
          <ion-button fill="outline">
            <ion-icon slot="icon-only" :icon="copyOutline" />
          </ion-button>
          <ion-button fill="outline" color="danger">
            <ion-icon slot="icon-only" :icon="trashOutline" />
          </ion-button>
          <ion-button fill="outline" color="secondary">
            <ion-icon slot="icon-only" :icon="shareOutline" />
          </ion-button>
        </div>
      </div>

      <!-- 15. カラーグラデーション -->
      <div class="section">
        <h2>カラーグラデーション</h2>
        <p>同系色で重要度のグラデーションを表現。primary の solid→outline→clear。</p>
        <div class="button-row">
          <ion-button color="primary" fill="solid">solid</ion-button>
          <ion-button color="primary" fill="outline">outline</ion-button>
          <ion-button color="primary" fill="clear">clear</ion-button>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonSpinner,
} from '@ionic/vue';
import {
  addOutline,
  trashOutline,
  barcodeOutline,
  createOutline,
  copyOutline,
  shareOutline,
  chevronBackOutline,
  ellipsisVerticalOutline,
} from 'ionicons/icons';

const isLoading = ref(false);

function simulateLoading() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
}
</script>

<style scoped>
.section {
  margin-top: 24px;
}

.section h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.section p {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin-top: 0;
  margin-bottom: 12px;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}
</style>
