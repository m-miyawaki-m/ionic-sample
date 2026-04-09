<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>コンボボックス パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- 1. Interface -->
      <div class="section">
        <h2>Interface</h2>
        <p>表示方法を3種から選択。popover はインラインで省スペース、alert はダイアログ形式。</p>
        <ion-list>
          <ion-item>
            <ion-label>alert（デフォルト）</ion-label>
            <ion-select interface="alert" placeholder="選択">
              <ion-select-option value="apple">りんご</ion-select-option>
              <ion-select-option value="orange">みかん</ion-select-option>
              <ion-select-option value="grape">ぶどう</ion-select-option>
              <ion-select-option value="peach">もも</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>popover</ion-label>
            <ion-select interface="popover" placeholder="選択">
              <ion-select-option value="apple">りんご</ion-select-option>
              <ion-select-option value="orange">みかん</ion-select-option>
              <ion-select-option value="grape">ぶどう</ion-select-option>
              <ion-select-option value="peach">もも</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>action-sheet</ion-label>
            <ion-select interface="action-sheet" placeholder="選択">
              <ion-select-option value="apple">りんご</ion-select-option>
              <ion-select-option value="orange">みかん</ion-select-option>
              <ion-select-option value="grape">ぶどう</ion-select-option>
              <ion-select-option value="peach">もも</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>

      <!-- 2. Multiple -->
      <div class="section">
        <h2>Multiple</h2>
        <p>multiple で複数選択可能に。選択結果はカンマ区切りで表示される。</p>
        <ion-list>
          <ion-item>
            <ion-label>複数選択</ion-label>
            <ion-select :multiple="true" placeholder="選択（複数可）">
              <ion-select-option value="tokyo">東京</ion-select-option>
              <ion-select-option value="osaka">大阪</ion-select-option>
              <ion-select-option value="nagoya">名古屋</ion-select-option>
              <ion-select-option value="fukuoka">福岡</ion-select-option>
              <ion-select-option value="sapporo">札幌</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>

      <!-- 3. Fill -->
      <div class="section">
        <h2>Fill</h2>
        <p>入力フィールドと揃える場合は fill を合わせてデザインの統一感を出す。</p>
        <ion-list>
          <ion-item>
            <ion-select fill="solid" label="solid" placeholder="選択">
              <ion-select-option value="a">選択肢 A</ion-select-option>
              <ion-select-option value="b">選択肢 B</ion-select-option>
              <ion-select-option value="c">選択肢 C</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-select fill="outline" label="outline" placeholder="選択">
              <ion-select-option value="a">選択肢 A</ion-select-option>
              <ion-select-option value="b">選択肢 B</ion-select-option>
              <ion-select-option value="c">選択肢 C</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-select label="default（fill なし）" placeholder="選択">
              <ion-select-option value="a">選択肢 A</ion-select-option>
              <ion-select-option value="b">選択肢 B</ion-select-option>
              <ion-select-option value="c">選択肢 C</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>

      <!-- 4. Label Placement -->
      <div class="section">
        <h2>Label Placement</h2>
        <p>floating ラベルは未選択時にプレースホルダ風に表示される。</p>
        <ion-list>
          <ion-item>
            <ion-select label-placement="fixed" label="fixed" placeholder="選択">
              <ion-select-option value="a">選択肢 A</ion-select-option>
              <ion-select-option value="b">選択肢 B</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-select label-placement="floating" label="floating" placeholder="選択">
              <ion-select-option value="a">選択肢 A</ion-select-option>
              <ion-select-option value="b">選択肢 B</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-select label-placement="stacked" label="stacked" placeholder="選択">
              <ion-select-option value="a">選択肢 A</ion-select-option>
              <ion-select-option value="b">選択肢 B</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>

      <!-- 5. Placeholder -->
      <div class="section">
        <h2>Placeholder</h2>
        <p>placeholder で未選択時のヒントテキストを表示。</p>
        <ion-list>
          <ion-item>
            <ion-label>フルーツ</ion-label>
            <ion-select placeholder="選択してください">
              <ion-select-option value="apple">りんご</ion-select-option>
              <ion-select-option value="orange">みかん</ion-select-option>
              <ion-select-option value="grape">ぶどう</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>

      <!-- 6. Disabled -->
      <div class="section">
        <h2>Disabled</h2>
        <p>disabled で選択不可に。権限がない項目に使う。</p>
        <ion-list>
          <ion-item>
            <ion-label>操作不可</ion-label>
            <ion-select :disabled="true" placeholder="選択不可">
              <ion-select-option value="a">選択肢 A</ion-select-option>
              <ion-select-option value="b">選択肢 B</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>

      <!-- 7. Start/End Slots -->
      <div class="section">
        <h2>Start/End Slots</h2>
        <p>アイコン付きでカテゴリを視覚的に示す。</p>
        <ion-list>
          <ion-item>
            <ion-icon :icon="cubeOutline" slot="start" color="primary" />
            <ion-label>倉庫カテゴリ</ion-label>
            <ion-select placeholder="選択">
              <ion-select-option value="dry">ドライ倉庫</ion-select-option>
              <ion-select-option value="cold">冷蔵倉庫</ion-select-option>
              <ion-select-option value="frozen">冷凍倉庫</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-icon :icon="layersOutline" slot="start" color="secondary" />
            <ion-label>ロケーション</ion-label>
            <ion-select placeholder="選択">
              <ion-select-option value="a1">A-1</ion-select-option>
              <ion-select-option value="a2">A-2</ion-select-option>
              <ion-select-option value="b1">B-1</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>

      <!-- 8. 倉庫選択 -->
      <div class="section">
        <h2>倉庫選択</h2>
        <p>popover で省スペースの単一選択。倉庫マスタから選択する。</p>
        <ion-list>
          <ion-item>
            <ion-label>倉庫</ion-label>
            <ion-select
              v-model="selectedWarehouse"
              interface="popover"
              placeholder="倉庫を選択"
            >
              <ion-select-option value="wh-a">倉庫A</ion-select-option>
              <ion-select-option value="wh-b">倉庫B</ion-select-option>
              <ion-select-option value="wh-c">倉庫C</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <p v-if="selectedWarehouse" class="result-text">選択中: {{ selectedWarehouse }}</p>
      </div>

      <!-- 9. ステータス絞込 -->
      <div class="section">
        <h2>ステータス絞込</h2>
        <p>multiple で複数ステータスを同時にフィルタ。</p>
        <ion-list>
          <ion-item>
            <ion-label>ステータス</ion-label>
            <ion-select
              v-model="selectedStatuses"
              :multiple="true"
              placeholder="ステータスを選択"
            >
              <ion-select-option value="all">全件</ion-select-option>
              <ion-select-option value="pending">未処理</ion-select-option>
              <ion-select-option value="processing">処理中</ion-select-option>
              <ion-select-option value="done">完了</ion-select-option>
              <ion-select-option value="error">エラー</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <p v-if="selectedStatuses.length" class="result-text">
          選択中: {{ selectedStatuses.join(', ') }}
        </p>
      </div>

      <!-- 10. カテゴリ選択（グループ付き） -->
      <div class="section">
        <h2>カテゴリ選択（グループ付き）</h2>
        <p>選択肢をグループ分けして見やすく整理。</p>
        <ion-list>
          <ion-item>
            <ion-label>品目カテゴリ</ion-label>
            <ion-select placeholder="カテゴリを選択">
              <ion-select-option value="" disabled class="group-header">── 食品 ──</ion-select-option>
              <ion-select-option value="food-dry">乾物</ion-select-option>
              <ion-select-option value="food-fresh">生鮮</ion-select-option>
              <ion-select-option value="food-frozen">冷凍食品</ion-select-option>
              <ion-select-option value="" disabled class="group-header">── 日用品 ──</ion-select-option>
              <ion-select-option value="daily-clean">洗剤・清掃</ion-select-option>
              <ion-select-option value="daily-paper">紙製品</ion-select-option>
              <ion-select-option value="" disabled class="group-header">── 工業用品 ──</ion-select-option>
              <ion-select-option value="ind-tool">工具</ion-select-option>
              <ion-select-option value="ind-parts">部品</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>

      <!-- 11. 連動セレクト -->
      <div class="section">
        <h2>連動セレクト</h2>
        <p>親の選択で子の選択肢が変わる。@ionChange で動的に制御。</p>
        <ion-list>
          <ion-item>
            <ion-label>地域</ion-label>
            <ion-select
              v-model="selectedRegion"
              interface="popover"
              placeholder="地域を選択"
              @ion-change="onRegionChange"
            >
              <ion-select-option value="kanto">関東</ion-select-option>
              <ion-select-option value="kansai">関西</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>都市</ion-label>
            <ion-select
              v-model="selectedCity"
              interface="popover"
              placeholder="都市を選択"
              :disabled="!selectedRegion"
            >
              <ion-select-option
                v-for="city in citiesForRegion"
                :key="city.value"
                :value="city.value"
              >
                {{ city.label }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <p v-if="selectedCity" class="result-text">
          選択中: {{ selectedRegion }} → {{ selectedCity }}
        </p>
      </div>

      <!-- 12. オブジェクト値 -->
      <div class="section">
        <h2>オブジェクト値</h2>
        <p>compareWith で id ベースの比較を行う。選択肢がオブジェクトの場合に必須。</p>
        <ion-list>
          <ion-item>
            <ion-label>担当者</ion-label>
            <ion-select
              v-model="selectedUser"
              :compare-with="compareById"
              interface="popover"
              placeholder="担当者を選択"
            >
              <ion-select-option
                v-for="user in users"
                :key="user.id"
                :value="user"
              >
                {{ user.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <p v-if="selectedUser" class="result-text">
          選択中: id={{ selectedUser.id }} name={{ selectedUser.name }}
        </p>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonList,
  IonIcon,
  IonLabel,
} from '@ionic/vue';
import { cubeOutline, layersOutline } from 'ionicons/icons';

// 8. 倉庫選択
const selectedWarehouse = ref('');

// 9. ステータス絞込
const selectedStatuses = ref([]);

// 11. 連動セレクト
const selectedRegion = ref('');
const selectedCity = ref('');

const regionCities = {
  kanto: [
    { value: 'tokyo', label: '東京' },
    { value: 'kanagawa', label: '神奈川' },
  ],
  kansai: [
    { value: 'osaka', label: '大阪' },
    { value: 'kyoto', label: '京都' },
  ],
};

const citiesForRegion = computed(() => {
  return selectedRegion.value ? regionCities[selectedRegion.value] ?? [] : [];
});

function onRegionChange() {
  selectedCity.value = '';
}

// 12. オブジェクト値
const users = [
  { id: 1, name: '山田 太郎' },
  { id: 2, name: '鈴木 花子' },
  { id: 3, name: '田中 一郎' },
];

const selectedUser = ref(null);

function compareById(o1, o2) {
  return o1?.id === o2?.id;
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

.section > p {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin-top: 0;
  margin-bottom: 12px;
}

.result-text {
  font-size: 13px;
  color: var(--ion-color-primary);
  margin: 8px 0 0;
  padding-left: 4px;
}
</style>
