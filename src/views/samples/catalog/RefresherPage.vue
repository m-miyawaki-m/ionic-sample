<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Refresher</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-margin ion-padding" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>
      <!-- Basic pull-to-refresh -->
      <ion-refresher slot="fixed" @ionRefresh="handleRefreshBasic">
        <ion-refresher-content />
      </ion-refresher>

      <h2 class="ion-padding">Basic Pull-to-Refresh</h2>
      <p class="ion-padding-horizontal">画面上部から引っ張ると更新インジケーターが表示される。ionRefresh イベントのハンドラー内で処理完了後に event.target.complete() を呼ぶと元の状態に戻る。</p>
      <ion-list>
        <ion-list-header>
          <ion-label>入荷リスト（上に引っ張って更新）</ion-label>
        </ion-list-header>
        <ion-item v-for="item in basicItems" :key="item">
          <ion-label>{{ item }}</ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">カスタムテキスト</h2>
      <p class="ion-padding-horizontal">ion-refresher-content の pullingText・refreshingText プロパティでリフレッシュ中に表示するテキストをカスタマイズできる。pullingText は引っ張り中、refreshingText は更新中のメッセージ。</p>
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>pullingText="引っ張って更新"</h2>
            <p>引き下げ中に表示されるテキスト</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>refreshingText="更新中..."</h2>
            <p>データ取得中に表示されるテキスト</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>pullingIcon (アイコン変更)</h2>
            <p>pullingIcon プロパティで引き下げ中のアイコンを変更できる</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Disabled</h2>
      <p class="ion-padding-horizontal">:disabled="true" を指定するとリフレッシュ操作を無効化できる。条件によって動的に制御したい場合に使用する。</p>
      <ion-button
        class="ion-margin-horizontal"
        :color="refreshEnabled ? 'warning' : 'primary'"
        @click="refreshEnabled = !refreshEnabled"
      >
        {{ refreshEnabled ? 'リフレッシュを無効化' : 'リフレッシュを有効化' }}
      </ion-button>
      <ion-list>
        <ion-item>
          <ion-label>現在のリフレッシュ状態: <strong>{{ refreshEnabled ? '有効' : '無効' }}</strong></ion-label>
        </ion-item>
        <ion-item>
          <ion-label>更新回数: {{ refreshCount }}</ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/refresher" target="_blank" rel="noopener">ionicframework.com/docs/api/refresher ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-card class="ion-margin">
        <ion-card-header>
          <ion-card-title>ion-refresher 基本構造</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">&lt;ion-content&gt;
  &lt;ion-refresher slot="fixed" @ionRefresh="handleOfficialRefresh"&gt;
    &lt;ion-refresher-content /&gt;
  &lt;/ion-refresher&gt;

  &lt;!-- カスタムテキスト --&gt;
  &lt;ion-refresher slot="fixed" @ionRefresh="handleOfficialRefresh"&gt;
    &lt;ion-refresher-content
      pulling-text="引っ張って更新"
      refreshing-text="更新中..."
    /&gt;
  &lt;/ion-refresher&gt;
&lt;/ion-content&gt;

&lt;script setup lang="ts"&gt;
const handleOfficialRefresh = (event: CustomEvent) =&gt; {
  setTimeout(() =&gt; {
    // データ更新処理...
    (event.target as HTMLIonRefresherElement).complete();
  }, 2000);
};
&lt;/script&gt;</pre>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
  IonList, IonListHeader, IonItem, IonLabel,
  IonRefresher, IonRefresherContent,
  IonNote, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
} from '@ionic/vue';

const refreshCount = ref(0);
const refreshEnabled = ref(true);

const basicItems = ref([
  '入荷伝票 #1001 — 商品A × 50',
  '入荷伝票 #1002 — 商品B × 30',
  '入荷伝票 #1003 — 商品C × 20',
  '入荷伝票 #1004 — 商品D × 15',
  '入荷伝票 #1005 — 商品E × 10',
]);

const handleRefreshBasic = (event: CustomEvent) => {
  setTimeout(() => {
    refreshCount.value += 1;
    basicItems.value = [
      `入荷伝票 #${1001 + refreshCount.value * 5} — 商品A × ${50 + refreshCount.value}`,
      `入荷伝票 #${1002 + refreshCount.value * 5} — 商品B × ${30 + refreshCount.value}`,
      `入荷伝票 #${1003 + refreshCount.value * 5} — 商品C × ${20 + refreshCount.value}`,
      `入荷伝票 #${1004 + refreshCount.value * 5} — 商品D × ${15 + refreshCount.value}`,
      `入荷伝票 #${1005 + refreshCount.value * 5} — 商品E × ${10 + refreshCount.value}`,
    ];
    (event.target as HTMLIonRefresherElement).complete();
  }, 1500);
};
</script>
