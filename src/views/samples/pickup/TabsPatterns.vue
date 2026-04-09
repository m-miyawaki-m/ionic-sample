// @ts-nocheck
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>タブ パターン集</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- 1. アイコン + テキスト -->
      <h2>1. アイコン + テキスト</h2>
      <p>標準的なタブバー。アイコンで視認性を高める。</p>
      <ion-segment v-model="tab1">
        <ion-segment-button value="home">
          <ion-icon :icon="homeOutline" />
          <ion-label>ホーム</ion-label>
        </ion-segment-button>
        <ion-segment-button value="search">
          <ion-icon :icon="searchOutline" />
          <ion-label>検索</ion-label>
        </ion-segment-button>
        <ion-segment-button value="settings">
          <ion-icon :icon="settingsOutline" />
          <ion-label>設定</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- 2. アイコンのみ -->
      <h2>2. アイコンのみ</h2>
      <p>省スペース。ラベルなしで横幅を節約。</p>
      <ion-segment v-model="tab2">
        <ion-segment-button value="home">
          <ion-icon :icon="homeOutline" />
        </ion-segment-button>
        <ion-segment-button value="search">
          <ion-icon :icon="searchOutline" />
        </ion-segment-button>
        <ion-segment-button value="settings">
          <ion-icon :icon="settingsOutline" />
        </ion-segment-button>
      </ion-segment>

      <!-- 3. テキストのみ -->
      <h2>3. テキストのみ</h2>
      <p>シンプル。アイコン不要な場面に。</p>
      <ion-segment v-model="tab3">
        <ion-segment-button value="a">
          <ion-label>概要</ion-label>
        </ion-segment-button>
        <ion-segment-button value="b">
          <ion-label>詳細</ion-label>
        </ion-segment-button>
        <ion-segment-button value="c">
          <ion-label>レビュー</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- 4. バッジ付き -->
      <h2>4. バッジ付き</h2>
      <p>ion-badge で未読件数などを表示。</p>
      <ion-segment v-model="tab4">
        <ion-segment-button value="mail">
          <div style="position: relative; display: inline-block;">
            <ion-icon :icon="mailOutline" />
            <ion-badge color="danger" style="position: absolute; top: -6px; right: -10px; font-size: 10px;">5</ion-badge>
          </div>
          <ion-label>メール</ion-label>
        </ion-segment-button>
        <ion-segment-button value="notifications">
          <div style="position: relative; display: inline-block;">
            <ion-icon :icon="notificationsOutline" />
            <ion-badge color="danger" style="position: absolute; top: -6px; right: -10px; font-size: 10px;">3</ion-badge>
          </div>
          <ion-label>通知</ion-label>
        </ion-segment-button>
        <ion-segment-button value="star">
          <ion-icon :icon="starOutline" />
          <ion-label>お気に入り</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- 5. カスタムカラー -->
      <h2>5. カスタムカラー</h2>
      <p>CSS 変数でタブバーの色をカスタマイズ。</p>
      <ion-segment
        v-model="tab5"
        style="--background: #1a1a2e; --background-checked: #e94560; color: #ffffff;"
      >
        <ion-segment-button value="x" style="color: #aaaaaa;">
          <ion-icon :icon="homeOutline" />
          <ion-label>ホーム</ion-label>
        </ion-segment-button>
        <ion-segment-button value="y" style="color: #aaaaaa;">
          <ion-icon :icon="heartOutline" />
          <ion-label>お気に入り</ion-label>
        </ion-segment-button>
        <ion-segment-button value="z" style="color: #aaaaaa;">
          <ion-icon :icon="personOutline" />
          <ion-label>プロフィール</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- 6. スクロール可能 -->
      <h2>6. スクロール可能</h2>
      <p>scrollable で多数のタブを横スクロール対応にする。</p>
      <ion-segment v-model="tab6" scrollable>
        <ion-segment-button value="t1"><ion-label>タブ1</ion-label></ion-segment-button>
        <ion-segment-button value="t2"><ion-label>タブ2</ion-label></ion-segment-button>
        <ion-segment-button value="t3"><ion-label>タブ3</ion-label></ion-segment-button>
        <ion-segment-button value="t4"><ion-label>タブ4</ion-label></ion-segment-button>
        <ion-segment-button value="t5"><ion-label>タブ5</ion-label></ion-segment-button>
        <ion-segment-button value="t6"><ion-label>タブ6</ion-label></ion-segment-button>
        <ion-segment-button value="t7"><ion-label>タブ7</ion-label></ion-segment-button>
        <ion-segment-button value="t8"><ion-label>タブ8</ion-label></ion-segment-button>
      </ion-segment>

      <!-- 7. Segment View 連動 -->
      <h2>7. Segment View 連動</h2>
      <p>segment-view でスワイプ対応コンテンツ切替。</p>
      <ion-segment v-model="tab7">
        <ion-segment-button value="sv1"><ion-label>最新</ion-label></ion-segment-button>
        <ion-segment-button value="sv2"><ion-label>人気</ion-label></ion-segment-button>
        <ion-segment-button value="sv3"><ion-label>おすすめ</ion-label></ion-segment-button>
      </ion-segment>
      <ion-segment-view>
        <ion-segment-content id="sv1">
          <div class="ion-padding" style="background: #f0f4ff; border-radius: 8px; margin-top: 8px;">
            最新コンテンツが表示されます。
          </div>
        </ion-segment-content>
        <ion-segment-content id="sv2">
          <div class="ion-padding" style="background: #fff0f4; border-radius: 8px; margin-top: 8px;">
            人気コンテンツが表示されます。
          </div>
        </ion-segment-content>
        <ion-segment-content id="sv3">
          <div class="ion-padding" style="background: #f0fff4; border-radius: 8px; margin-top: 8px;">
            おすすめコンテンツが表示されます。
          </div>
        </ion-segment-content>
      </ion-segment-view>

      <!-- 8. 業務切替タブ -->
      <h2>8. 業務切替タブ</h2>
      <p>入荷/出荷/在庫の3タブ。メイン画面の切替に使う。</p>
      <ion-segment v-model="tab8">
        <ion-segment-button value="receive">
          <ion-icon :icon="downloadOutline" />
          <ion-label>入荷</ion-label>
        </ion-segment-button>
        <ion-segment-button value="ship">
          <ion-icon :icon="pushOutline" />
          <ion-label>出荷</ion-label>
        </ion-segment-button>
        <ion-segment-button value="stock">
          <ion-icon :icon="cubeOutline" />
          <ion-label>在庫</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- 9. ステータスフィルタ -->
      <h2>9. ステータスフィルタ</h2>
      <p>全件/未処理/完了。badge で件数を表示。</p>
      <ion-segment v-model="tab9">
        <ion-segment-button value="all">
          <ion-label>全件</ion-label>
          <ion-badge color="medium">50</ion-badge>
        </ion-segment-button>
        <ion-segment-button value="pending">
          <ion-label>未処理</ion-label>
          <ion-badge color="warning">12</ion-badge>
        </ion-segment-button>
        <ion-segment-button value="done">
          <ion-label>完了</ion-label>
          <ion-badge color="success">38</ion-badge>
        </ion-segment-button>
      </ion-segment>

      <!-- 10. 詳細画面タブ -->
      <h2>10. 詳細画面タブ</h2>
      <p>基本情報/履歴/関連の上部タブ。segment として配置。</p>
      <ion-segment v-model="tab10">
        <ion-segment-button value="info">
          <ion-icon :icon="informationCircleOutline" />
          <ion-label>基本情報</ion-label>
        </ion-segment-button>
        <ion-segment-button value="history">
          <ion-icon :icon="timeOutline" />
          <ion-label>履歴</ion-label>
        </ion-segment-button>
        <ion-segment-button value="related">
          <ion-icon :icon="linkOutline" />
          <ion-label>関連</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- 11. バッジ付き業務タブ -->
      <h2>11. バッジ付き業務タブ</h2>
      <p>未処理件数を赤バッジで強調。注意喚起に。</p>
      <ion-segment v-model="tab11">
        <ion-segment-button value="receive">
          <div style="position: relative; display: inline-block;">
            <ion-icon :icon="downloadOutline" />
            <ion-badge color="danger" style="position: absolute; top: -6px; right: -10px; font-size: 10px;">7</ion-badge>
          </div>
          <ion-label>入荷</ion-label>
        </ion-segment-button>
        <ion-segment-button value="ship">
          <div style="position: relative; display: inline-block;">
            <ion-icon :icon="pushOutline" />
            <ion-badge color="danger" style="position: absolute; top: -6px; right: -10px; font-size: 10px;">3</ion-badge>
          </div>
          <ion-label>出荷</ion-label>
        </ion-segment-button>
        <ion-segment-button value="stock">
          <ion-icon :icon="cubeOutline" />
          <ion-label>在庫</ion-label>
        </ion-segment-button>
      </ion-segment>

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
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonIcon,
  IonLabel,
  IonBadge,
} from '@ionic/vue';
import {
  downloadOutline,
  pushOutline,
  cubeOutline,
  informationCircleOutline,
  timeOutline,
  linkOutline,
  homeOutline,
  personOutline,
  settingsOutline,
  searchOutline,
  notificationsOutline,
  mailOutline,
  starOutline,
  heartOutline,
} from 'ionicons/icons';

const tab1 = ref('home');
const tab2 = ref('home');
const tab3 = ref('a');
const tab4 = ref('mail');
const tab5 = ref('x');
const tab6 = ref('t1');
const tab7 = ref('sv1');
const tab8 = ref('receive');
const tab9 = ref('all');
const tab10 = ref('info');
const tab11 = ref('receive');
</script>
