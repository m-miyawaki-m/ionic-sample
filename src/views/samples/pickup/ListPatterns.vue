<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>リストボックス パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 8px">
        ion-list は Ionic の基本リストコンテナ。lines / inset / ion-item-divider / ion-item-sliding /
        ion-reorder-group など多彩な組み合わせで、倉庫管理に必要なリスト UI を構築できる。
      </p>

      <!-- 1. Lines -->
      <div class="section">
        <h2>Lines</h2>
        <p>区切り線スタイル。none は境界なしでカード風に見える。</p>
        <p class="sub-label">full</p>
        <ion-list lines="full">
          <ion-item><ion-label>アイテム A</ion-label></ion-item>
          <ion-item><ion-label>アイテム B</ion-label></ion-item>
          <ion-item><ion-label>アイテム C</ion-label></ion-item>
        </ion-list>
        <p class="sub-label">inset</p>
        <ion-list lines="inset">
          <ion-item><ion-label>アイテム A</ion-label></ion-item>
          <ion-item><ion-label>アイテム B</ion-label></ion-item>
          <ion-item><ion-label>アイテム C</ion-label></ion-item>
        </ion-list>
        <p class="sub-label">none</p>
        <ion-list lines="none">
          <ion-item><ion-label>アイテム A</ion-label></ion-item>
          <ion-item><ion-label>アイテム B</ion-label></ion-item>
          <ion-item><ion-label>アイテム C</ion-label></ion-item>
        </ion-list>
      </div>

      <!-- 2. Inset -->
      <div class="section">
        <h2>Inset</h2>
        <p>inset でリスト全体に左右マージン。カード風の見た目になる。</p>
        <p class="sub-label">inset=true</p>
        <ion-list :inset="true">
          <ion-item><ion-label>マージンあり A</ion-label></ion-item>
          <ion-item><ion-label>マージンあり B</ion-label></ion-item>
          <ion-item><ion-label>マージンあり C</ion-label></ion-item>
        </ion-list>
        <p class="sub-label">inset=false (デフォルト)</p>
        <ion-list :inset="false">
          <ion-item><ion-label>マージンなし A</ion-label></ion-item>
          <ion-item><ion-label>マージンなし B</ion-label></ion-item>
          <ion-item><ion-label>マージンなし C</ion-label></ion-item>
        </ion-list>
      </div>

      <!-- 3. List Header -->
      <div class="section">
        <h2>List Header</h2>
        <p>セクションタイトル。ボタン付きで「すべて見る」などのアクションも追加可能。</p>
        <p class="sub-label">テキストのみ</p>
        <ion-list>
          <ion-list-header>
            <ion-label>入荷予定</ion-label>
          </ion-list-header>
          <ion-item><ion-label>品目 A</ion-label></ion-item>
          <ion-item><ion-label>品目 B</ion-label></ion-item>
        </ion-list>
        <p class="sub-label">ボタン付き</p>
        <ion-list>
          <ion-list-header>
            <ion-label>出荷済み</ion-label>
            <ion-button slot="end" fill="clear" size="small">すべて見る</ion-button>
          </ion-list-header>
          <ion-item><ion-label>品目 C</ion-label></ion-item>
          <ion-item><ion-label>品目 D</ion-label></ion-item>
        </ion-list>
      </div>

      <!-- 4. Item Divider -->
      <div class="section">
        <h2>Item Divider</h2>
        <p>カテゴリ区切り。sticky で上部固定。</p>
        <ion-list>
          <ion-item-divider sticky>
            <ion-label>カテゴリ A</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>アイテム A-1</ion-label></ion-item>
          <ion-item><ion-label>アイテム A-2</ion-label></ion-item>
          <ion-item-divider sticky>
            <ion-label>カテゴリ B</ion-label>
          </ion-item-divider>
          <ion-item><ion-label>アイテム B-1</ion-label></ion-item>
          <ion-item><ion-label>アイテム B-2</ion-label></ion-item>
        </ion-list>
      </div>

      <!-- 5. Item Sliding -->
      <div class="section">
        <h2>Item Sliding</h2>
        <p>スワイプでアクションボタンを表示。編集・削除の操作に。</p>
        <ion-list>
          <ion-item-sliding v-for="item in slidingItems" :key="item.id">
            <ion-item-options side="start">
              <ion-item-option color="success">
                <ion-icon slot="icon-only" :icon="archiveOutline" />
              </ion-item-option>
            </ion-item-options>
            <ion-item>
              <ion-icon slot="start" :icon="cubeOutline" />
              <ion-label>{{ item.name }}</ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option color="primary">
                <ion-icon slot="icon-only" :icon="createOutline" />
              </ion-item-option>
              <ion-item-option color="danger">
                <ion-icon slot="icon-only" :icon="trashOutline" />
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
      </div>

      <!-- 6. Reorder -->
      <div class="section">
        <h2>Reorder</h2>
        <p>ドラッグで並び替え。ハンドルアイコンで操作。</p>
        <ion-list>
          <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder">
            <ion-item v-for="item in reorderItems" :key="item.id">
              <ion-label>{{ item.name }}</ion-label>
              <ion-reorder slot="end" />
            </ion-item>
          </ion-reorder-group>
        </ion-list>
      </div>

      <!-- 7. Detail Arrows -->
      <div class="section">
        <h2>Detail Arrows</h2>
        <p>detail で右矢印を表示。遷移先がある項目に付ける。</p>
        <ion-list>
          <ion-item :detail="true">
            <ion-label>
              <h2>detail=true</h2>
              <p>タップで詳細画面へ遷移することを示す</p>
            </ion-label>
          </ion-item>
          <ion-item :detail="false">
            <ion-label>
              <h2>detail=false</h2>
              <p>矢印なし。アクションがない項目に</p>
            </ion-label>
          </ion-item>
          <ion-item :detail="true" button>
            <ion-label>
              <h2>detail=true + button</h2>
              <p>クリック可能な行として見た目も変わる</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- 8. Item Media -->
      <div class="section">
        <h2>Item Media</h2>
        <p>avatar/thumbnail/icon の3種類の画像配置。</p>
        <ion-list>
          <ion-item>
            <ion-avatar slot="start">
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="var(--ion-color-primary)" />
                <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="16">A</text>
              </svg>
            </ion-avatar>
            <ion-label>
              <h2>Avatar</h2>
              <p>丸型。ユーザーアイコン向け</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-thumbnail slot="start">
              <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" fill="var(--ion-color-light)" />
                <rect x="14" y="14" width="28" height="28" rx="4" fill="var(--ion-color-medium)" />
              </svg>
            </ion-thumbnail>
            <ion-label>
              <h2>Thumbnail</h2>
              <p>正方形。商品画像向け</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" :icon="cubeOutline" size="large" color="primary" />
            <ion-label>
              <h2>Icon</h2>
              <p>ベクターアイコン。カテゴリ表示向け</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- ===== 業務パターン ===== -->
      <h2 style="margin-top:32px;font-size:20px;font-weight:700;border-bottom:2px solid var(--ion-color-primary);padding-bottom:4px">
        業務パターン
      </h2>

      <!-- 9. 在庫一覧 -->
      <div class="section">
        <h2>在庫一覧</h2>
        <p>サムネ+品名+数量バッジ。倉庫管理の基本リストパターン。</p>
        <ion-list>
          <ion-item v-for="stock in stockItems" :key="stock.id" :detail="true" button>
            <ion-thumbnail slot="start">
              <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" fill="var(--ion-color-light)" />
                <rect x="12" y="12" width="32" height="32" rx="4" fill="var(--ion-color-medium)" opacity="0.4" />
                <text x="50%" y="56%" text-anchor="middle" dominant-baseline="middle" fill="var(--ion-color-dark)" font-size="10">{{ stock.code.slice(0,3) }}</text>
              </svg>
            </ion-thumbnail>
            <ion-label>
              <h2>{{ stock.name }}</h2>
              <p>品番: {{ stock.code }}</p>
            </ion-label>
            <ion-badge slot="end" :color="stock.qty < 10 ? 'warning' : 'primary'">{{ stock.qty }}</ion-badge>
          </ion-item>
        </ion-list>
      </div>

      <!-- 10. 検品結果リスト -->
      <div class="section">
        <h2>検品結果リスト</h2>
        <p>ステータスアイコン+スワイプ削除。完了/エラーを色分け。</p>
        <ion-list>
          <ion-item-sliding v-for="result in inspectionResults" :key="result.id">
            <ion-item>
              <ion-icon
                slot="start"
                :icon="result.ok ? checkmarkCircleOutline : closeCircleOutline"
                :color="result.ok ? 'success' : 'danger'"
                size="large"
              />
              <ion-label>
                <h2>{{ result.name }}</h2>
                <p>{{ result.ok ? '検品完了' : 'エラー — 要確認' }}</p>
              </ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option color="danger" @click="deleteInspection(result.id)">
                <ion-icon slot="icon-only" :icon="trashOutline" />
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
      </div>

      <!-- 11. セクション付きリスト -->
      <div class="section">
        <h2>セクション付きリスト</h2>
        <p>divider でカテゴリ分け。件数バッジ付きヘッダ。</p>
        <ion-list>
          <ion-item-divider>
            <ion-label>食品</ion-label>
            <ion-badge slot="end" color="primary">3件</ion-badge>
          </ion-item-divider>
          <ion-item><ion-icon slot="start" :icon="cubeOutline" /><ion-label>米 5kg</ion-label></ion-item>
          <ion-item><ion-icon slot="start" :icon="cubeOutline" /><ion-label>醤油 1L</ion-label></ion-item>
          <ion-item><ion-icon slot="start" :icon="cubeOutline" /><ion-label>砂糖 1kg</ion-label></ion-item>
          <ion-item-divider>
            <ion-label>日用品</ion-label>
            <ion-badge slot="end" color="secondary">2件</ion-badge>
          </ion-item-divider>
          <ion-item><ion-icon slot="start" :icon="cubeOutline" /><ion-label>洗剤 900ml</ion-label></ion-item>
          <ion-item><ion-icon slot="start" :icon="cubeOutline" /><ion-label>ティッシュ 5箱</ion-label></ion-item>
        </ion-list>
      </div>

      <!-- 12. マスタ選択リスト -->
      <div class="section">
        <h2>マスタ選択リスト</h2>
        <p>detail arrow 付き。タップで詳細画面への遷移を示唆。</p>
        <ion-list>
          <ion-item v-for="master in masterItems" :key="master.id" :detail="true" button>
            <ion-icon slot="start" :icon="cubeOutline" :color="master.color" />
            <ion-label>
              <h2>{{ master.name }}</h2>
              <p>{{ master.desc }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- 13. アクション付きリスト -->
      <div class="section">
        <h2>アクション付きリスト</h2>
        <p>スライドで編集/削除。expandable で全幅ボタンに展開。</p>
        <ion-list>
          <ion-item-sliding v-for="task in actionItems" :key="task.id">
            <ion-item>
              <ion-label>{{ task.name }}</ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option color="primary" :expandable="false">
                <ion-icon slot="icon-only" :icon="createOutline" />
              </ion-item-option>
              <ion-item-option color="danger" :expandable="true">
                <ion-icon slot="icon-only" :icon="trashOutline" />
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
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
  IonList,
  IonListHeader,
  IonItem,
  IonItemDivider,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonIcon,
  IonBadge,
  IonAvatar,
  IonThumbnail,
  IonReorder,
  IonReorderGroup,
  IonButton,
} from '@ionic/vue';
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  trashOutline,
  createOutline,
  archiveOutline,
  cubeOutline,
} from 'ionicons/icons';

// --- Section 5: Item Sliding ---
const slidingItems = ref([
  { id: 1, name: '品目 A — 在庫あり' },
  { id: 2, name: '品目 B — 在庫少' },
  { id: 3, name: '品目 C — 在庫なし' },
]);

// --- Section 6: Reorder ---
const reorderItems = ref([
  { id: 1, name: 'ステップ 1: 受領確認' },
  { id: 2, name: 'ステップ 2: 数量検品' },
  { id: 3, name: 'ステップ 3: ラベル貼付' },
  { id: 4, name: 'ステップ 4: 棚入れ' },
  { id: 5, name: 'ステップ 5: 完了登録' },
]);

function handleReorder(event) {
  reorderItems.value = event.detail.complete(reorderItems.value);
}

// --- Section 9: 在庫一覧 ---
const stockItems = ref([
  { id: 1, name: 'ボールペン (黒)', code: 'BP-001', qty: 150 },
  { id: 2, name: 'コピー用紙 A4', code: 'PP-A4-500', qty: 8 },
  { id: 3, name: 'クリアファイル', code: 'CF-010', qty: 45 },
]);

// --- Section 10: 検品結果リスト ---
const inspectionResults = ref([
  { id: 1, name: '段ボール箱 (大) × 20', ok: true },
  { id: 2, name: '緩衝材ロール × 5', ok: false },
  { id: 3, name: 'ストレッチフィルム × 3', ok: true },
  { id: 4, name: 'テープ (透明) × 10', ok: false },
]);

function deleteInspection(id) {
  inspectionResults.value = inspectionResults.value.filter((r) => r.id !== id);
}

// --- Section 12: マスタ選択リスト ---
const masterItems = ref([
  { id: 1, name: '倉庫マスタ', desc: '拠点・棚番管理', color: 'primary' },
  { id: 2, name: '商品マスタ', desc: '品番・単位管理', color: 'secondary' },
  { id: 3, name: '仕入先マスタ', desc: '取引先情報管理', color: 'tertiary' },
  { id: 4, name: '担当者マスタ', desc: 'ユーザー権限管理', color: 'success' },
]);

// --- Section 13: アクション付きリスト ---
const actionItems = ref([
  { id: 1, name: '作業指示 #1001 — 棚 A-01 入庫' },
  { id: 2, name: '作業指示 #1002 — 棚 B-03 移動' },
  { id: 3, name: '作業指示 #1003 — 棚 C-07 出庫' },
]);
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
  margin-bottom: 8px;
}

.sub-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--ion-color-medium);
  margin: 8px 0 2px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
</style>
