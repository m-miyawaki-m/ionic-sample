<template>
  <ion-page>
    <!-- サイドドロワー -->
    <ion-menu side="start" content-id="input-helpers-main">
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item router-link="/samples/pickup/scan-input">
            <ion-icon :icon="scanOutline" slot="start" />
            <ion-label>スキャン入力型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/scan-accumulate">
            <ion-icon :icon="layersOutline" slot="start" />
            <ion-label>スキャン蓄積型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/search-view">
            <ion-icon :icon="searchOutline" slot="start" />
            <ion-label>検索照会型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/input-helpers" class="menu-active">
            <ion-icon :icon="constructOutline" slot="start" />
            <ion-label>入力補助パターン</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/inline-edit">
            <ion-icon :icon="createOutline" slot="start" />
            <ion-label>インライン編集型</ion-label>
          </ion-item>
          <ion-item router-link="/samples/pickup/detail-screen">
            <ion-icon :icon="documentTextOutline" slot="start" />
            <ion-label>詳細表示・編集型</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="input-helpers-main">
      <ion-header>
        <ion-toolbar>
          <ion-menu-button slot="start" />
          <ion-title>入力補助パターン</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <!-- 条件エリア（入力補助UIフル活用） -->
        <div class="condition-area">
          <div class="condition-header">
            <span class="condition-title">入力条件</span>
            <div class="condition-buttons">
              <ion-button size="small" fill="solid" color="success" @click="isOpen = true">+</ion-button>
              <ion-button size="small" fill="solid" color="danger" @click="isOpen = false">−</ion-button>
            </div>
          </div>
          <div v-show="isOpen" class="condition-body">
            <ion-list>
              <!-- プルダウン -->
              <ion-item>
                <ion-select label="倉庫選択" label-placement="stacked" placeholder="倉庫を選択" v-model="form.warehouse">
                  <ion-select-option value="tokyo">東京倉庫</ion-select-option>
                  <ion-select-option value="osaka">大阪倉庫</ion-select-option>
                  <ion-select-option value="fukuoka">福岡倉庫</ion-select-option>
                </ion-select>
              </ion-item>
              <!-- 検索アイコン付き入力（モーダル起動想定） -->
              <ion-item>
                <ion-input label="品目検索" label-placement="stacked" placeholder="品目コードを入力" v-model="form.itemCode">
                  <ion-icon :icon="searchOutline" slot="end" @click="isItemModalOpen = true" />
                </ion-input>
              </ion-item>
              <!-- 日付 -->
              <ion-item>
                <ion-input label="登録日" label-placement="stacked" type="date" v-model="form.registeredDate" />
              </ion-item>
              <!-- ラジオ -->
              <ion-radio-group v-model="form.category">
                <ion-list-header>
                  <ion-label>区分</ion-label>
                </ion-list-header>
                <ion-item>
                  <ion-radio value="normal">通常</ion-radio>
                </ion-item>
                <ion-item>
                  <ion-radio value="urgent">緊急</ion-radio>
                </ion-item>
                <ion-item>
                  <ion-radio value="return">返品</ion-radio>
                </ion-item>
              </ion-radio-group>
              <!-- チェックボックス -->
              <ion-item>
                <ion-checkbox v-model="form.includeInactive">無効品を含む</ion-checkbox>
              </ion-item>
              <ion-item>
                <ion-checkbox v-model="form.onlyDiff">差異ありのみ</ion-checkbox>
              </ion-item>
            </ion-list>
            <ion-button expand="block" color="primary" class="ion-margin-top">検索</ion-button>
          </div>
        </div>

        <!-- コンテンツ: 入力補助UIカタログ -->
        <div class="content-area">
          <div class="section">
            <h2>プルダウン（ion-select）</h2>
            <p class="section-desc">単一選択・複数選択のプルダウン</p>
            <ion-list>
              <ion-item>
                <ion-select label="単一選択" label-placement="stacked" placeholder="1つ選択" v-model="demo.singleSelect">
                  <ion-select-option value="a">選択肢A</ion-select-option>
                  <ion-select-option value="b">選択肢B</ion-select-option>
                  <ion-select-option value="c">選択肢C</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-select label="複数選択" label-placement="stacked" :multiple="true" placeholder="複数選択可" v-model="demo.multiSelect">
                  <ion-select-option value="x">オプションX</ion-select-option>
                  <ion-select-option value="y">オプションY</ion-select-option>
                  <ion-select-option value="z">オプションZ</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
          </div>

          <div class="section">
            <h2>検索モーダル（ion-modal + ion-searchbar）</h2>
            <p class="section-desc">マスタ一覧から検索して選択</p>
            <ion-button @click="isItemModalOpen = true">品目マスタから選択</ion-button>
            <p v-if="form.itemCode" class="selected-value">選択中: {{ form.itemCode }}</p>
          </div>

          <div class="section">
            <h2>日付選択（ion-datetime）</h2>
            <p class="section-desc">カレンダーから日付を選択</p>
            <ion-datetime presentation="date" v-model="demo.selectedDate" />
          </div>

          <div class="section">
            <h2>確認ダイアログ（ion-alert）</h2>
            <p class="section-desc">OK/Cancel の確認ダイアログ</p>
            <ion-button @click="isAlertOpen = true">確認ダイアログを開く</ion-button>
          </div>
        </div>

        <!-- 品目検索モーダル -->
        <ion-modal :is-open="isItemModalOpen" @did-dismiss="isItemModalOpen = false">
          <ion-header>
            <ion-toolbar>
              <ion-title>品目検索</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="isItemModalOpen = false">閉じる</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-searchbar placeholder="品目コード/名称で検索" />
            <ion-list>
              <ion-item v-for="master in masterItems" :key="master.code" button @click="selectItem(master.code)">
                <ion-label>
                  <h3>{{ master.code }}</h3>
                  <p>{{ master.name }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>

        <!-- 確認ダイアログ -->
        <ion-alert
          :is-open="isAlertOpen"
          header="確認"
          message="この操作を実行しますか？"
          :buttons="['キャンセル', 'OK']"
          @did-dismiss="isAlertOpen = false"
        />
      </ion-content>

      <ion-footer>
        <ion-toolbar class="screen-buttons">
          <ion-buttons slot="start">
            <ion-button fill="outline" color="primary">登録確定</ion-button>
            <ion-button fill="outline" color="medium">リセット</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="common-buttons">
          <ion-buttons slot="start">
            <ion-button fill="solid" color="medium">
              <ion-icon :icon="menuOutline" slot="start" />
              メニュー
            </ion-button>
            <ion-button fill="solid" color="tertiary">
              <ion-icon :icon="scanOutline" slot="start" />
              スキャン
            </ion-button>
            <ion-button fill="solid" color="dark">
              <ion-icon :icon="printOutline" slot="start" />
              印刷
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonMenu, IonMenuButton, IonButtons, IonButton, IonList, IonListHeader,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonCheckbox, IonRadio, IonRadioGroup, IonSearchbar, IonDatetime,
  IonIcon, IonModal, IonAlert,
} from '@ionic/vue';
import {
  searchOutline, scanOutline, layersOutline, constructOutline,
  createOutline, documentTextOutline, menuOutline, printOutline,
} from 'ionicons/icons';

const isOpen = ref(true);
const isItemModalOpen = ref(false);
const isAlertOpen = ref(false);

const form = ref({
  warehouse: '',
  itemCode: '',
  registeredDate: '',
  category: 'normal',
  includeInactive: false,
  onlyDiff: false,
});

const demo = ref({
  singleSelect: '',
  multiSelect: [],
  selectedDate: '',
});

const masterItems = ref([
  { code: 'BP-001', name: 'ボールペン（黒）' },
  { code: 'PP-A4', name: 'コピー用紙 A4' },
  { code: 'CF-010', name: 'クリアファイル' },
  { code: 'TP-100', name: '梱包テープ' },
  { code: 'EN-050', name: '封筒（角2）' },
  { code: 'ST-020', name: 'ステープラー' },
]);

const selectItem = (code: string) => {
  form.value.itemCode = code;
  isItemModalOpen.value = false;
};
</script>

<style scoped>
.condition-area {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 16px;
}
.condition-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
}
.condition-title {
  font-weight: 600;
  font-size: 16px;
}
.condition-buttons {
  display: flex;
  gap: 4px;
}
.condition-body {
  padding-top: 8px;
}
.content-area {
  margin-top: 8px;
}
.section {
  margin-top: 24px;
}
.section h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}
.section-desc {
  color: var(--ion-color-medium);
  font-size: 14px;
  margin-bottom: 12px;
}
.selected-value {
  font-size: 13px;
  color: var(--ion-color-primary);
  margin-top: 4px;
}
.screen-buttons {
  --border-width: 1px 0 0 0;
}
.common-buttons {
  --background: var(--ion-color-light);
}
.menu-active {
  --background: var(--ion-color-primary-tint);
  font-weight: 600;
}
</style>
