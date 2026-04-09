<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>テキストリンク パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 8px">
        テキストをタップしてダイアログ（alert / modal / action-sheet / popover）やトーストを
        表示するパターン集。ページ遷移ではなくインラインフィードバックに使う。
      </p>

      <!-- 1. ion-text → alert -->
      <div class="section">
        <h2>ion-text → alert</h2>
        <p>最もシンプル。テキストタップで alert ダイアログを表示。</p>
        <ion-text color="primary" @click="showBasicAlert" style="cursor:pointer;text-decoration:underline">
          詳細を見る
        </ion-text>
      </div>

      <!-- 2. ion-text → toast -->
      <div class="section">
        <h2>ion-text → toast</h2>
        <p>軽い通知フィードバック。操作結果の確認に。</p>
        <ion-text color="primary" @click="showToast" style="cursor:pointer;text-decoration:underline">
          コピー完了
        </ion-text>
      </div>

      <!-- 3. ion-label リンク風 → modal -->
      <div class="section">
        <h2>ion-label リンク風 → modal</h2>
        <p>下線+色でリンクに見せて、長文は modal で表示。</p>
        <ion-label>
          <span
            style="color:var(--ion-color-primary);text-decoration:underline;cursor:pointer"
            @click="openLabelModal"
          >
            詳細説明を読む
          </span>
        </ion-label>

        <ion-modal :is-open="isLabelModalOpen" @did-dismiss="isLabelModalOpen = false">
          <ion-header>
            <ion-toolbar>
              <ion-title>詳細説明</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="isLabelModalOpen = false">閉じる</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <p>ion-label の中に span を配置し、色と下線でリンク風に見せたパターンです。</p>
            <p>ion-item や ion-list の中でも自然に使えます。長文のコンテンツを別画面に分離したい場合に有効です。</p>
            <p>モーダルのヘッダーに閉じるボタンを配置することで、ユーザーが操作に迷わないようにします。</p>
          </ion-content>
        </ion-modal>
      </div>

      <!-- 4. ion-button fill="clear" → alert -->
      <div class="section">
        <h2>ion-button fill="clear" → alert</h2>
        <p>ボタンだがリンク風に見える。padding 最小でインライン配置。</p>
        <ion-button fill="clear" size="small" @click="showClearButtonAlert" style="padding:0;height:auto">
          詳しく見る
        </ion-button>
      </div>

      <!-- 5. ion-item button → action-sheet -->
      <div class="section">
        <h2>ion-item button → action-sheet</h2>
        <p>リスト項目タップで選択肢を表示。</p>
        <ion-list>
          <ion-item :button="true" @click="showActionSheet">
            <ion-label>注文 #00123 — 操作を選ぶ</ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- 6. テキスト色バリエーション -->
      <div class="section">
        <h2>テキスト色バリエーション</h2>
        <p>色で意味を変える。danger=注意喚起、primary=情報リンク。</p>
        <div class="text-row">
          <ion-text color="primary" style="cursor:pointer;text-decoration:underline" @click="showColorAlert('primary')">情報リンク</ion-text>
          <ion-text color="secondary" style="cursor:pointer;text-decoration:underline" @click="showColorAlert('secondary')">サブリンク</ion-text>
          <ion-text color="danger" style="cursor:pointer;text-decoration:underline" @click="showColorAlert('danger')">注意リンク</ion-text>
          <ion-text color="success" style="cursor:pointer;text-decoration:underline" @click="showColorAlert('success')">完了リンク</ion-text>
        </div>
      </div>

      <!-- 7. Disabled 状態 -->
      <div class="section">
        <h2>Disabled 状態</h2>
        <p>グレーアウトでタップ無効。権限なし等に。</p>
        <ion-text color="medium" style="pointer-events:none;opacity:0.5;text-decoration:underline">
          権限がありません（タップ無効）
        </ion-text>
      </div>

      <!-- 8. 利用規約リンク -->
      <div class="section">
        <h2>利用規約リンク</h2>
        <p>テキスト押下で規約全文を modal で表示。スクロール可能な長文。</p>
        <ion-text color="primary" @click="openTermsModal" style="cursor:pointer;text-decoration:underline">
          利用規約を確認
        </ion-text>

        <ion-modal :is-open="isTermsModalOpen" @did-dismiss="isTermsModalOpen = false">
          <ion-header>
            <ion-toolbar>
              <ion-title>利用規約</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="isTermsModalOpen = false">閉じる</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <h3>第1条（適用）</h3>
            <p>本規約は、当社が提供する倉庫管理サービス（以下「本サービス」）の利用条件を定めるものです。登録ユーザーの皆さまには、本規約に従って本サービスをご利用いただきます。</p>
            <h3>第2条（利用登録）</h3>
            <p>登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。</p>
            <h3>第3条（禁止事項）</h3>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。法令または公序良俗に違反する行為、犯罪行為に関連する行為、当社または第三者の知的財産権を侵害する行為、その他当社が不適切と判断する行為。</p>
            <h3>第4条（本サービスの提供の停止等）</h3>
            <p>当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。本サービスにかかるコンピュータシステムの保守点検または更新を行う場合。</p>
            <h3>第5条（著作権）</h3>
            <p>ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章、画像や映像等の情報のみ、本サービスを利用して投稿または編集することができるものとします。</p>
            <h3>第6条（免責事項）</h3>
            <p>当社の債務不履行責任は、当社の故意または重過失によらない場合には免責されるものとします。当社は、何らかの理由によって責任を負う場合にも、通常生じうる損害の範囲内かつ有料サービスにおいては代金額の範囲内においてのみ賠償の責任を負うものとします。</p>
          </ion-content>
        </ion-modal>
      </div>

      <!-- 9. エラー詳細 -->
      <div class="section">
        <h2>エラー詳細</h2>
        <p>赤テキスト押下でエラー詳細を alert 表示。</p>
        <ion-text color="danger" @click="showErrorDetail" style="cursor:pointer;text-decoration:underline">
          エラーが発生しました（詳細）
        </ion-text>
      </div>

      <!-- 10. ヘルプ表示 -->
      <div class="section">
        <h2>ヘルプ表示</h2>
        <p>?アイコン付きテキスト → 説明を toast で3秒表示。</p>
        <div class="icon-text-row" @click="showHelpToast" style="cursor:pointer">
          <ion-icon :icon="helpCircleOutline" color="primary" />
          <ion-text color="primary" style="text-decoration:underline">この項目について</ion-text>
        </div>
      </div>

      <!-- 11. 確認ダイアログ -->
      <div class="section">
        <h2>確認ダイアログ</h2>
        <p>取消テキスト → confirm alert（はい/いいえ）で確認を取る。</p>
        <ion-text color="danger" @click="showConfirmDialog" style="cursor:pointer;text-decoration:underline">
          この操作を取り消す
        </ion-text>
      </div>

      <!-- 12. ステータス詳細 (popover) -->
      <div class="section">
        <h2>ステータス詳細 (popover)</h2>
        <p>バッジ風テキスト → popover で状態の詳細説明を表示。</p>
        <ion-badge id="status-badge" color="warning" @click="isPopoverOpen = true" style="cursor:pointer">
          処理中
        </ion-badge>

        <ion-popover trigger="status-badge" :is-open="isPopoverOpen" @did-dismiss="isPopoverOpen = false">
          <ion-content class="ion-padding">
            <p style="margin:0;font-size:14px"><strong>処理中</strong></p>
            <p style="margin:8px 0 0;font-size:13px;color:var(--ion-color-medium)">
              入庫データを倉庫管理システムへ登録中です。<br>完了まで数分かかる場合があります。
            </p>
          </ion-content>
        </ion-popover>
      </div>

      <!-- 13. 注記リンク -->
      <div class="section">
        <h2>注記リンク</h2>
        <p>※テキスト → 補足説明を modal で表示。</p>
        <ion-text color="medium" @click="openShippingModal" style="cursor:pointer;text-decoration:underline;font-size:13px">
          ※配送は翌営業日以降
        </ion-text>

        <ion-modal :is-open="isShippingModalOpen" @did-dismiss="isShippingModalOpen = false">
          <ion-header>
            <ion-toolbar>
              <ion-title>配送について</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="isShippingModalOpen = false">閉じる</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <h3>配送ルール詳細</h3>
            <p>ご注文の配送は、原則として翌営業日以降の発送となります。</p>
            <p><strong>配送不可日</strong><br>土曜・日曜・祝日、年末年始（12/29〜1/3）、夏季休業期間。</p>
            <p><strong>締め時刻</strong><br>当日 15:00 までのご注文は、翌営業日の午前中発送を目標とします。15:00 以降のご注文は、翌々営業日の発送となる場合があります。</p>
            <p><strong>離島・一部地域</strong><br>離島や山間部など一部地域では、追加日数がかかる場合があります。詳しくはお問い合わせください。</p>
          </ion-content>
        </ion-modal>
      </div>

      <!-- 14. 複数アクション -->
      <div class="section">
        <h2>複数アクション</h2>
        <p>テキスト押下 → action-sheet で選択肢を提示。</p>
        <ion-text color="primary" @click="showMultiActionSheet" style="cursor:pointer;text-decoration:underline">
          操作を選択
        </ion-text>
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
  IonText,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
  IonBadge,
  IonModal,
  IonPopover,
  alertController,
  toastController,
  actionSheetController,
} from '@ionic/vue';
import { helpCircleOutline, informationCircleOutline } from 'ionicons/icons';

const isLabelModalOpen = ref(false);
const isTermsModalOpen = ref(false);
const isShippingModalOpen = ref(false);
const isPopoverOpen = ref(false);

// 1. ion-text → alert
async function showBasicAlert() {
  const alert = await alertController.create({
    header: '詳細情報',
    message: 'これはシンプルな alert ダイアログです。ion-text をタップするだけで表示できます。',
    buttons: ['OK'],
  });
  await alert.present();
}

// 2. ion-text → toast
async function showToast() {
  const toast = await toastController.create({
    message: 'クリップボードにコピーしました',
    duration: 2000,
    position: 'bottom',
    color: 'success',
  });
  await toast.present();
}

// 3. ion-label リンク風 → modal
function openLabelModal() {
  isLabelModalOpen.value = true;
}

// 4. ion-button fill="clear" → alert
async function showClearButtonAlert() {
  const alert = await alertController.create({
    header: '詳細',
    message: 'fill="clear" + size="small" のボタンはテキストリンクに見えます。インライン配置に適しています。',
    buttons: ['閉じる'],
  });
  await alert.present();
}

// 5. ion-item button → action-sheet
async function showActionSheet() {
  const sheet = await actionSheetController.create({
    header: '注文 #00123',
    buttons: [
      { text: '詳細を見る', icon: informationCircleOutline, handler: () => showSimpleToast('詳細を表示します') },
      { text: 'キャンセル', role: 'cancel' },
    ],
  });
  await sheet.present();
}

// 6. テキスト色バリエーション
async function showColorAlert(color: string) {
  const alert = await alertController.create({
    header: `color="${color}"`,
    message: `ion-text の color プロパティに "${color}" を指定したリンクをタップしました。`,
    buttons: ['OK'],
  });
  await alert.present();
}

// 9. エラー詳細
async function showErrorDetail() {
  const alert = await alertController.create({
    header: 'エラー詳細',
    message: '接続タイムアウト。サーバーへの接続がタイムアウトしました。ネットワーク環境を確認の上、再度お試しください。問題が解決しない場合はシステム管理者へお問い合わせください。',
    buttons: ['閉じる'],
  });
  await alert.present();
}

// 10. ヘルプ表示
async function showHelpToast() {
  const toast = await toastController.create({
    message: 'この項目は入庫確認日を入力します。伝票の受領日付を記入してください。',
    duration: 3000,
    position: 'bottom',
    color: 'dark',
  });
  await toast.present();
}

// 11. 確認ダイアログ
async function showConfirmDialog() {
  const alert = await alertController.create({
    header: '確認',
    message: 'この操作を取り消しますか？取り消した内容は元に戻せません。',
    buttons: [
      { text: 'いいえ', role: 'cancel' },
      {
        text: 'はい',
        handler: async () => {
          const toast = await toastController.create({
            message: '操作を取り消しました',
            duration: 2000,
            position: 'bottom',
            color: 'warning',
          });
          await toast.present();
        },
      },
    ],
  });
  await alert.present();
}

// 13. 注記リンク → modal
function openShippingModal() {
  isShippingModalOpen.value = true;
}

// 8. 利用規約 → modal
function openTermsModal() {
  isTermsModalOpen.value = true;
}

// 14. 複数アクション → action-sheet
async function showMultiActionSheet() {
  const sheet = await actionSheetController.create({
    header: '操作を選択してください',
    buttons: [
      { text: '編集', handler: () => showSimpleToast('編集を開始します') },
      { text: '複製', handler: () => showSimpleToast('複製しました') },
      { text: '削除', role: 'destructive', handler: () => showSimpleToast('削除しました') },
      { text: 'キャンセル', role: 'cancel' },
    ],
  });
  await sheet.present();
}

// 共通: シンプルなトースト表示
async function showSimpleToast(message: string) {
  const toast = await toastController.create({
    message,
    duration: 2000,
    position: 'bottom',
  });
  await toast.present();
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

.text-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.icon-text-row {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
