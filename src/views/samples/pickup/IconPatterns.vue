<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>アイコン パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 8px">
        ion-icon は Ionic が提供する SVG アイコンコンポーネント。size / color / slot の組み合わせで
        倉庫管理 UI に必要なあらゆるアイコン表現を実現できる。
      </p>

      <!-- 1. サイズ -->
      <div class="section">
        <h2>サイズ</h2>
        <p>size で4段階。large はヘッダやカード内の主要アイコン向き。</p>
        <div class="icon-row ion-align-items-center">
          <div class="icon-cell">
            <ion-icon :icon="cubeOutline" size="small" />
            <span>small</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="cubeOutline" />
            <span>default</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="cubeOutline" size="large" />
            <span>large</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="cubeOutline" style="font-size:48px" />
            <span>custom 48px</span>
          </div>
        </div>
      </div>

      <!-- 2. カラー -->
      <div class="section">
        <h2>カラー</h2>
        <p>Ionic カラーを適用。ステータスや意味を色で伝える。</p>
        <div class="icon-row">
          <div class="icon-cell">
            <ion-icon :icon="starOutline" size="large" color="primary" />
            <span>primary</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="starOutline" size="large" color="secondary" />
            <span>secondary</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="starOutline" size="large" color="success" />
            <span>success</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="starOutline" size="large" color="warning" />
            <span>warning</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="starOutline" size="large" color="danger" />
            <span>danger</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="starOutline" size="large" color="medium" />
            <span>medium</span>
          </div>
        </div>
      </div>

      <!-- 3. スロット配置 -->
      <div class="section">
        <h2>スロット配置</h2>
        <p>ion-item 内の slot で位置を制御。</p>
        <ion-list>
          <ion-item>
            <ion-icon :icon="barcodeOutline" slot="start" />
            <ion-label>slot="start"</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>slot="end"</ion-label>
            <ion-icon :icon="chevronForwardOutline" slot="end" />
          </ion-item>
          <ion-item>
            <ion-label>icon-only ボタン</ion-label>
            <ion-button slot="end" fill="clear">
              <ion-icon slot="icon-only" :icon="ellipsisVerticalOutline" />
            </ion-button>
          </ion-item>
        </ion-list>
      </div>

      <!-- 4. Outline vs Filled -->
      <div class="section">
        <h2>Outline vs Filled</h2>
        <p>outline(線)はデフォルト。filled(塗り)は強調や選択状態に。</p>
        <div class="icon-row">
          <div class="icon-cell">
            <ion-icon :icon="addOutline" size="large" />
            <span>addOutline</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="add" size="large" />
            <span>add</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="heartOutline" size="large" />
            <span>heartOutline</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="heart" size="large" color="danger" />
            <span>heart</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="starOutline" size="large" />
            <span>starOutline</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="star" size="large" color="warning" />
            <span>star</span>
          </div>
        </div>
      </div>

      <!-- 5. 業務アイコンギャラリー -->
      <div class="section">
        <h2>業務アイコンギャラリー</h2>
        <p>倉庫管理で使う代表アイコン30個。名前付きグリッド一覧。</p>
        <ion-grid>
          <ion-row>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="barcodeOutline" size="large" />
              <div class="gallery-label">スキャン</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="cubeOutline" size="large" />
              <div class="gallery-label">在庫</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="cartOutline" size="large" />
              <div class="gallery-label">出荷</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="downloadOutline" size="large" />
              <div class="gallery-label">入荷</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="locationOutline" size="large" />
              <div class="gallery-label">ロケ</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="documentTextOutline" size="large" />
              <div class="gallery-label">伝票</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="searchOutline" size="large" />
              <div class="gallery-label">検索</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="settingsOutline" size="large" />
              <div class="gallery-label">設定</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="personOutline" size="large" />
              <div class="gallery-label">ユーザー</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="notificationsOutline" size="large" />
              <div class="gallery-label">通知</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="pricetagOutline" size="large" />
              <div class="gallery-label">品番</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="layersOutline" size="large" />
              <div class="gallery-label">棚</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="swapHorizontalOutline" size="large" />
              <div class="gallery-label">移動</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="clipboardOutline" size="large" />
              <div class="gallery-label">棚卸</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="checkmarkCircleOutline" size="large" />
              <div class="gallery-label">完了</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="alertCircleOutline" size="large" />
              <div class="gallery-label">警告</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="closeCircleOutline" size="large" />
              <div class="gallery-label">エラー</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="informationCircleOutline" size="large" />
              <div class="gallery-label">情報</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="helpCircleOutline" size="large" />
              <div class="gallery-label">ヘルプ</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="timeOutline" size="large" />
              <div class="gallery-label">履歴</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="calendarOutline" size="large" />
              <div class="gallery-label">日付</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="printOutline" size="large" />
              <div class="gallery-label">印刷</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="qrCodeOutline" size="large" />
              <div class="gallery-label">QR</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="wifiOutline" size="large" />
              <div class="gallery-label">通信</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="cloudUploadOutline" size="large" />
              <div class="gallery-label">送信</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="cloudDownloadOutline" size="large" />
              <div class="gallery-label">受信</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="trashOutline" size="large" />
              <div class="gallery-label">削除</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="createOutline" size="large" />
              <div class="gallery-label">編集</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="copyOutline" size="large" />
              <div class="gallery-label">コピー</div>
            </ion-col>
            <ion-col size="3" class="gallery-cell">
              <ion-icon :icon="shareOutline" size="large" />
              <div class="gallery-label">共有</div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- 6. ステータスアイコン -->
      <div class="section">
        <h2>ステータスアイコン</h2>
        <p>状態を色+アイコンで表現。一覧画面の行頭ステータスに。</p>
        <div class="icon-row">
          <div class="icon-cell">
            <ion-icon :icon="checkmarkCircle" size="large" color="success" />
            <span>完了</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="alertCircle" size="large" color="warning" />
            <span>警告</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="closeCircle" size="large" color="danger" />
            <span>エラー</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="informationCircle" size="large" color="primary" />
            <span>情報</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="helpCircle" size="large" color="medium" />
            <span>不明</span>
          </div>
        </div>
      </div>

      <!-- 7. ナビゲーションアイコン -->
      <div class="section">
        <h2>ナビゲーションアイコン</h2>
        <p>ヘッダ・フッタに使う操作系アイコン。</p>
        <div class="icon-row">
          <div class="icon-cell">
            <ion-icon :icon="arrowBack" size="large" />
            <span>arrowBack</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="close" size="large" />
            <span>close</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="menu" size="large" />
            <span>menu</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="searchOutline" size="large" />
            <span>search</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="ellipsisVertical" size="large" />
            <span>ellipsisVertical</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="add" size="large" />
            <span>add</span>
          </div>
        </div>
      </div>

      <!-- 8. アクションアイコン -->
      <div class="section">
        <h2>アクションアイコン</h2>
        <p>CRUD 操作のアイコン群。ツールバーやリストアクションに。</p>
        <div class="icon-row">
          <div class="icon-cell">
            <ion-icon :icon="createOutline" size="large" color="primary" />
            <span>編集</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="trashOutline" size="large" color="danger" />
            <span>削除</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="copyOutline" size="large" color="secondary" />
            <span>コピー</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="shareOutline" size="large" color="tertiary" />
            <span>共有</span>
          </div>
          <div class="icon-cell">
            <ion-icon :icon="downloadOutline" size="large" color="success" />
            <span>DL</span>
          </div>
        </div>
      </div>

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
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue';
import {
  add,
  addOutline,
  alertCircle,
  alertCircleOutline,
  arrowBack,
  barcodeOutline,
  calendarOutline,
  cartOutline,
  checkmarkCircle,
  checkmarkCircleOutline,
  chevronForwardOutline,
  clipboardOutline,
  close,
  closeCircle,
  closeCircleOutline,
  cloudDownloadOutline,
  cloudUploadOutline,
  copyOutline,
  createOutline,
  cubeOutline,
  documentTextOutline,
  downloadOutline,
  ellipsisVertical,
  ellipsisVerticalOutline,
  heart,
  heartOutline,
  helpCircle,
  helpCircleOutline,
  informationCircle,
  informationCircleOutline,
  layersOutline,
  locationOutline,
  menu,
  notificationsOutline,
  personOutline,
  pricetagOutline,
  printOutline,
  qrCodeOutline,
  searchOutline,
  settingsOutline,
  shareOutline,
  star,
  starOutline,
  swapHorizontalOutline,
  timeOutline,
  trashOutline,
  wifiOutline,
} from 'ionicons/icons';
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

.icon-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
}

.icon-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 56px;
}

.icon-cell span {
  font-size: 11px;
  color: var(--ion-color-medium);
  text-align: center;
}

.gallery-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  text-align: center;
}

.gallery-label {
  font-size: 11px;
  color: var(--ion-color-medium);
  margin-top: 4px;
  text-align: center;
}
</style>
