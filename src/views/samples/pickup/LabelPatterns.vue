<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>ラベル パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">

      <!-- 1. Color -->
      <h2>1. Color</h2>
      <p>色でカテゴリやステータスを区別。danger は警告テキストに。</p>
      <ion-list>
        <ion-item>
          <ion-label color="primary">primary ラベル</ion-label>
        </ion-item>
        <ion-item>
          <ion-label color="secondary">secondary ラベル</ion-label>
        </ion-item>
        <ion-item>
          <ion-label color="success">success ラベル</ion-label>
        </ion-item>
        <ion-item>
          <ion-label color="warning">warning ラベル</ion-label>
        </ion-item>
        <ion-item>
          <ion-label color="danger">danger ラベル</ion-label>
        </ion-item>
        <ion-item>
          <ion-label color="medium">medium ラベル</ion-label>
        </ion-item>
      </ion-list>

      <!-- 2. Position (input 連携) -->
      <h2>2. Position (input 連携)</h2>
      <p>ion-input の label-placement と対応。floating はモダンフォーム向き。</p>
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
          <ion-input label="Default" placeholder="default (start)"></ion-input>
        </ion-item>
      </ion-list>

      <!-- 3. Item 内 Heading -->
      <h2>3. Item 内 Heading</h2>
      <p>ion-label 内の h1-h3/p タグで階層的なテキスト構成ができる。</p>
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>品名: ダンボール箱 (大)</h2>
            <p>品番: BOX-001 / ロケーション: A-01-01</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>入庫伝票 #20240115</h2>
            <p>担当: 山田太郎 / 2024-01-15 09:30</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- 4. Note slot -->
      <h2>4. Note slot</h2>
      <p>ion-note で補足情報を右寄せ表示。日時やステータスに。</p>
      <ion-list>
        <ion-item>
          <ion-label>ダンボール箱 (大)</ion-label>
          <ion-note slot="end">2024-01-15</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>緩衝材セット</ion-label>
          <ion-note slot="end">在庫: 50個</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>プチプチシート</ion-label>
          <ion-note slot="end" color="danger">要補充</ion-note>
        </ion-item>
      </ion-list>

      <!-- 5. Truncate / Wrap -->
      <h2>5. Truncate / Wrap</h2>
      <p>長いテキストの処理。デフォルトは省略、class で wrap 可能。</p>
      <ion-list>
        <ion-item>
          <ion-label>これは非常に長いラベルテキストです。デフォルトでは末尾が省略されて表示されます。</ion-label>
        </ion-item>
        <ion-item>
          <ion-label class="ion-text-wrap">これは非常に長いラベルテキストです。ion-text-wrap クラスを付与すると全文が折り返して表示されます。</ion-label>
        </ion-item>
      </ion-list>

      <!-- 6. フォームラベル -->
      <h2>6. フォームラベル</h2>
      <p>各 placement でのフォーム入力例。業務に合わせて使い分ける。</p>
      <ion-list>
        <ion-item>
          <ion-input label="品番" label-placement="fixed" placeholder="例: BOX-001"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="品名" label-placement="floating" placeholder="品名を入力"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="備考" label-placement="stacked" placeholder="備考があれば入力してください"></ion-input>
        </ion-item>
      </ion-list>

      <!-- 7. ステータスラベル -->
      <h2>7. ステータスラベル</h2>
      <p>色付きテキストでインライン状態表示。ion-text + CSS で badge 風に。</p>
      <ion-list>
        <ion-item>
          <ion-label>入庫処理 #1001</ion-label>
          <ion-text
            slot="end"
            color="success"
            :style="{ display: 'inline-block', padding: '2px 8px', borderRadius: '12px', backgroundColor: 'var(--ion-color-success-tint)', fontSize: '12px' }"
          >完了</ion-text>
        </ion-item>
        <ion-item>
          <ion-label>出庫処理 #2045</ion-label>
          <ion-text
            slot="end"
            color="warning"
            :style="{ display: 'inline-block', padding: '2px 8px', borderRadius: '12px', backgroundColor: 'var(--ion-color-warning-tint)', fontSize: '12px' }"
          >処理中</ion-text>
        </ion-item>
        <ion-item>
          <ion-label>棚卸 #3012</ion-label>
          <ion-text
            slot="end"
            color="danger"
            :style="{ display: 'inline-block', padding: '2px 8px', borderRadius: '12px', backgroundColor: 'var(--ion-color-danger-tint)', fontSize: '12px' }"
          >エラー</ion-text>
        </ion-item>
      </ion-list>

      <!-- 8. 説明テキスト -->
      <h2>8. 説明テキスト</h2>
      <p>ion-note で控えめな補足情報を表示。</p>
      <ion-list>
        <ion-item>
          <ion-label>ロケーション A-01-01</ion-label>
          <ion-note slot="end">第1倉庫 / 1階</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>品番 BOX-001</ion-label>
          <ion-note slot="end">最終更新: 2024-01-15</ion-note>
        </ion-item>
      </ion-list>

      <!-- 9. メタ情報表示 -->
      <h2>9. メタ情報表示</h2>
      <p>日時/ユーザー/ステータスを1行に横並び表示。</p>
      <ion-list>
        <ion-item>
          <ion-label>ダンボール箱 (大)</ion-label>
          <ion-note slot="end">2024-01-15</ion-note>
          <ion-badge slot="end" color="success" style="margin-left: 8px;">完了</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>緩衝材セット</ion-label>
          <ion-note slot="end">2024-01-14</ion-note>
          <ion-badge slot="end" color="warning" style="margin-left: 8px;">処理中</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>プチプチシート</ion-label>
          <ion-note slot="end">2024-01-13</ion-note>
          <ion-badge slot="end" color="danger" style="margin-left: 8px;">エラー</ion-badge>
        </ion-item>
      </ion-list>

      <!-- 10. セクションヘッダ -->
      <h2>10. セクションヘッダ</h2>
      <p>ion-list-header でリストのセクション見出しを作る。</p>
      <ion-list>
        <ion-list-header>
          <ion-label>最近の入庫</ion-label>
          <ion-button fill="clear" size="small">すべて見る</ion-button>
        </ion-list-header>
        <ion-item>
          <ion-label>ダンボール箱 (大) × 100</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>緩衝材セット × 50</ion-label>
        </ion-item>
        <ion-list-header>
          <ion-label>最近の出庫</ion-label>
          <ion-button fill="clear" size="small">すべて見る</ion-button>
        </ion-list-header>
        <ion-item>
          <ion-label>プチプチシート × 20</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>ダンボール箱 (小) × 30</ion-label>
        </ion-item>
      </ion-list>

      <!-- 11. キーバリュー表示 -->
      <h2>11. キーバリュー表示</h2>
      <p>ラベル:値のペア表示。詳細画面の情報表示に最適。</p>
      <ion-list>
        <ion-item>
          <ion-grid>
            <ion-row>
              <ion-col size="4"><ion-label color="medium">品番</ion-label></ion-col>
              <ion-col size="8"><ion-label>BOX-001</ion-label></ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="4"><ion-label color="medium">品名</ion-label></ion-col>
              <ion-col size="8"><ion-label>ダンボール箱 (大)</ion-label></ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="4"><ion-label color="medium">数量</ion-label></ion-col>
              <ion-col size="8"><ion-label>100 個</ion-label></ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="4"><ion-label color="medium">ロケーション</ion-label></ion-col>
              <ion-col size="8"><ion-label>A-01-01</ion-label></ion-col>
            </ion-row>
          </ion-grid>
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
  IonLabel,
  IonItem,
  IonList,
  IonListHeader,
  IonInput,
  IonNote,
  IonBadge,
  IonText,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/vue';
</script>
