<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>ラジオボタン パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 8px">
        ion-radio / ion-radio-group は排他的な単一選択を実現するコンポーネント。
        color・justify・label-placement など豊富なプロパティで業務フォームに対応できる。
      </p>

      <!-- 1. Color -->
      <div class="section">
        <h2>Color</h2>
        <p>色分けで選択肢の意味を補強。danger=注意が必要な選択肢に使う。</p>
        <ion-list>
          <ion-radio-group value="primary">
            <ion-item>
              <ion-radio slot="start" value="primary" color="primary">primary</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio slot="start" value="success" color="success">success</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio slot="start" value="warning" color="warning">warning</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio slot="start" value="danger" color="danger">danger</ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </div>

      <!-- 2. Justify -->
      <div class="section">
        <h2>Justify</h2>
        <p>justify でラベルとラジオの配置を調整。</p>
        <ion-list>
          <ion-radio-group value="start">
            <ion-item>
              <ion-radio value="start" justify="start">justify="start"</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="end" justify="end">justify="end"</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="space-between" justify="space-between">justify="space-between"</ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </div>

      <!-- 3. Alignment -->
      <div class="section">
        <h2>Alignment</h2>
        <p>長い説明付きラジオの垂直揃え。</p>
        <ion-list>
          <ion-radio-group value="center">
            <ion-item>
              <ion-radio value="start" alignment="start">
                <ion-label>
                  alignment="start"<br />
                  <span style="font-size:12px;color:var(--ion-color-medium)">ラジオが上端に揃う。複数行テキストに。</span>
                </ion-label>
              </ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="center" alignment="center">
                <ion-label>
                  alignment="center"<br />
                  <span style="font-size:12px;color:var(--ion-color-medium)">ラジオが中央に揃う。デフォルト動作。</span>
                </ion-label>
              </ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </div>

      <!-- 4. Label Placement -->
      <div class="section">
        <h2>Label Placement</h2>
        <p>配置パターン。業務フォームでは start が一般的。</p>
        <ion-list>
          <ion-radio-group value="start">
            <ion-item>
              <ion-radio value="start" label-placement="start">label-placement="start"</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="end" label-placement="end">label-placement="end"</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="fixed" label-placement="fixed">label-placement="fixed"</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="stacked" label-placement="stacked">label-placement="stacked"</ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </div>

      <!-- 5. Label Wrap -->
      <div class="section">
        <h2>Label Wrap</h2>
        <p>長文ラベルの折返し。説明文付き選択肢に。</p>
        <ion-list>
          <ion-radio-group value="a">
            <ion-item>
              <ion-radio value="a">
                通常ラベル
              </ion-radio>
            </ion-item>
            <ion-item class="ion-text-wrap">
              <ion-radio value="b">
                長い説明文が入る選択肢。ion-text-wrap クラスを ion-item に付与すると折り返しが有効になり、複数行にわたる説明文でも正しく表示される。
              </ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </div>

      <!-- 6. Helper & Error -->
      <div class="section">
        <h2>Helper &amp; Error</h2>
        <p>未選択時のエラー表示。必須項目に。</p>
        <ion-list>
          <ion-radio-group v-model="helperValue">
            <ion-item>
              <ion-radio value="yes">はい</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="no">いいえ</ion-radio>
            </ion-item>
          </ion-radio-group>
          <div style="padding:4px 16px;font-size:12px;color:var(--ion-color-medium)" v-if="!helperValue">
            いずれかを選択してください（ヘルパーテキスト）
          </div>
          <div style="padding:4px 16px;font-size:12px;color:var(--ion-color-danger)" v-if="!helperValue">
            この項目は必須です（エラーテキスト）
          </div>
        </ion-list>
      </div>

      <!-- 7. Disabled -->
      <div class="section">
        <h2>Disabled</h2>
        <p>個別またはグループ全体を無効化。権限制御に。</p>
        <ion-list>
          <ion-radio-group value="b">
            <ion-item>
              <ion-radio value="a" :disabled="true">個別 disabled</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="b">通常</ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
        <ion-list style="margin-top:8px">
          <ion-radio-group value="x" :disabled="true">
            <ion-item>
              <ion-radio value="x">グループ全体 disabled (1)</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="y">グループ全体 disabled (2)</ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </div>

      <!-- 8. 出荷方法選択 -->
      <div class="section">
        <h2>出荷方法選択</h2>
        <p>3択ラジオ。各選択肢に補足説明テキスト付き。</p>
        <ion-list>
          <ion-radio-group v-model="shipMethod">
            <ion-item class="ion-text-wrap">
              <ion-radio value="normal" alignment="start">
                <ion-label>
                  <h2>通常配送</h2>
                  <p>2〜3 営業日でお届け。標準的な出荷手段。</p>
                </ion-label>
              </ion-radio>
            </ion-item>
            <ion-item class="ion-text-wrap">
              <ion-radio value="express" alignment="start">
                <ion-label>
                  <h2>速達</h2>
                  <p>翌営業日お届け。急ぎの出荷に対応。</p>
                </ion-label>
              </ion-radio>
            </ion-item>
            <ion-item class="ion-text-wrap">
              <ion-radio value="charter" alignment="start">
                <ion-label>
                  <h2>チャーター</h2>
                  <p>当日お届け。専用車両による緊急配送。</p>
                </ion-label>
              </ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
        <p style="font-size:12px;color:var(--ion-color-medium);margin-top:4px">
          選択中: {{ shipMethod || '未選択' }}
        </p>
      </div>

      <!-- 9. 優先度設定 -->
      <div class="section">
        <h2>優先度設定</h2>
        <p>色分けで緊急度を直感的に表現。</p>
        <ion-list>
          <ion-radio-group v-model="priority">
            <ion-item>
              <ion-radio value="high" color="danger">高（緊急）</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="mid" color="warning">中（通常）</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="low" color="success">低（余裕あり）</ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
        <p style="font-size:12px;color:var(--ion-color-medium);margin-top:4px">
          選択中: {{ priority || '未選択' }}
        </p>
      </div>

      <!-- 10. 並び順切替 -->
      <div class="section">
        <h2>並び順切替</h2>
        <p>横並びラジオ。display:flex でコンパクトに。</p>
        <ion-radio-group v-model="sortOrder" class="radio-row">
          <ion-item lines="none" class="radio-row-item">
            <ion-radio value="name">名前順</ion-radio>
          </ion-item>
          <ion-item lines="none" class="radio-row-item">
            <ion-radio value="date">日付順</ion-radio>
          </ion-item>
          <ion-item lines="none" class="radio-row-item">
            <ion-radio value="qty">数量順</ion-radio>
          </ion-item>
        </ion-radio-group>
        <p style="font-size:12px;color:var(--ion-color-medium);margin-top:4px">
          選択中: {{ sortOrder || '未選択' }}
        </p>
      </div>

      <!-- 11. 配送先選択（カード型） -->
      <div class="section">
        <h2>配送先選択（カード型）</h2>
        <p>ion-card 内にラジオを配置。選択で枠色変更。</p>
        <ion-radio-group v-model="deliveryDest">
          <ion-card
            v-for="dest in destinations"
            :key="dest.value"
            :style="deliveryDest === dest.value ? 'border: 2px solid var(--ion-color-primary)' : 'border: 2px solid transparent'"
            style="margin-bottom:8px;cursor:pointer"
            @click="deliveryDest = dest.value"
          >
            <ion-card-content>
              <div style="display:flex;align-items:center;gap:12px">
                <ion-radio :value="dest.value" @click.stop />
                <div>
                  <div style="font-weight:600">{{ dest.label }}</div>
                  <div style="font-size:12px;color:var(--ion-color-medium)">{{ dest.address }}</div>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </ion-radio-group>
        <p style="font-size:12px;color:var(--ion-color-medium);margin-top:4px">
          選択中: {{ deliveryDest || '未選択' }}
        </p>
      </div>

      <!-- 12. Yes/No 二択 -->
      <div class="section">
        <h2>Yes/No 二択</h2>
        <p>シンプルな二択。justify='space-between' で左右に配置。</p>
        <ion-list>
          <ion-radio-group v-model="yesNo">
            <ion-item>
              <ion-radio value="yes" justify="space-between">はい</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="no" justify="space-between">いいえ</ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
        <p style="font-size:12px;color:var(--ion-color-medium);margin-top:4px">
          選択中: {{ yesNo || '未選択' }}
        </p>
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
  IonRadio,
  IonRadioGroup,
  IonItem,
  IonList,
  IonLabel,
  IonCard,
  IonCardContent,
} from '@ionic/vue';

const helperValue = ref('');
const shipMethod = ref('normal');
const priority = ref('mid');
const sortOrder = ref('name');
const deliveryDest = ref('a');
const yesNo = ref('');

const destinations = [
  { value: 'a', label: '東京倉庫', address: '東京都江東区有明 1-2-3' },
  { value: 'b', label: '大阪倉庫', address: '大阪府大阪市住之江区南港北 4-5-6' },
  { value: 'c', label: '福岡倉庫', address: '福岡県福岡市博多区博多駅東 7-8-9' },
];
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

.radio-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
}

.radio-row-item {
  flex: 0 0 auto;
}
</style>
