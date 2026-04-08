<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Infinite Scroll</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-margin ion-padding" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>
      <h2 class="ion-padding">Basic Infinite Scroll</h2>
      <p class="ion-padding-horizontal">リストの末尾に近づくと ionInfinite イベントが発火し、追加のデータを読み込む。ハンドラー内で処理完了後に event.target.complete() を呼ぶ。全データ読み込み後は :disabled="true" でスクロールを無効化する。</p>

      <ion-list>
        <ion-item v-for="item in items" :key="item">
          <ion-label>{{ item }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-infinite-scroll
        :disabled="!canLoadMore"
        threshold="100px"
        @ionInfinite="loadMore"
      >
        <ion-infinite-scroll-content
          loading-text="読み込み中..."
          loading-spinner="crescent"
        />
      </ion-infinite-scroll>

      <div v-if="!canLoadMore" class="ion-padding ion-text-center">
        <p><strong>全 {{ items.length }} 件を表示しました</strong></p>
      </div>

      <h2 class="ion-padding">Threshold</h2>
      <p class="ion-padding-horizontal">threshold プロパティで、スクロールがリスト末尾から何px手前で ionInfinite を発火するか指定できる。デフォルトは "15%"、上の例では "100px" を指定している。</p>

      <h2 class="ion-padding">Position</h2>
      <p class="ion-padding-horizontal">position プロパティで "bottom" (デフォルト) または "top" を指定できる。top にするとリスト先頭に近づいたとき (スクロール上端) にイベントが発火し、チャット履歴の遡り読み込みなどに使える。</p>

      <h2 class="ion-padding">Disabled</h2>
      <p class="ion-padding-horizontal">:disabled="true" にするとスクロールイベントが無効化される。全件読み込み完了後に disabled にすることで、不要なイベント発火を防止する。</p>
      <ion-list>
        <ion-item>
          <ion-label>読み込み済み: {{ items.length }} 件</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>最大件数: {{ maxItems }} 件</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>スクロール状態: <strong>{{ canLoadMore ? '有効 (読み込み可)' : '無効 (完了)' }}</strong></ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/infinite-scroll" target="_blank" rel="noopener">ionicframework.com/docs/api/infinite-scroll ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-card class="ion-margin">
        <ion-card-header>
          <ion-card-title>ion-infinite-scroll 基本構造</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">&lt;ion-content&gt;
  &lt;ion-list&gt;
    &lt;ion-item v-for="item in officialItems" :key="item"&gt;
      &lt;ion-label&gt;&#123;&#123; item &#125;&#125;&lt;/ion-label&gt;
    &lt;/ion-item&gt;
  &lt;/ion-list&gt;

  &lt;ion-infinite-scroll
    threshold="100px"
    :disabled="officialAllLoaded"
    @ionInfinite="handleOfficialInfinite"
  &gt;
    &lt;ion-infinite-scroll-content
      loading-spinner="bubbles"
      loading-text="読み込み中..."
    /&gt;
  &lt;/ion-infinite-scroll&gt;
&lt;/ion-content&gt;

&lt;script setup lang="ts"&gt;
const officialItems = ref&lt;string[]&gt;([]);
const officialAllLoaded = ref(false);
const handleOfficialInfinite = (event: CustomEvent) =&gt; {
  setTimeout(() =&gt; {
    // データ追加処理...
    (event.target as HTMLIonInfiniteScrollElement).complete();
  }, 500);
};
&lt;/script&gt;</pre>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonItem, IonLabel,
  IonInfiniteScroll, IonInfiniteScrollContent,
  IonNote, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
} from '@ionic/vue';

const maxItems = 100;
const pageSize = 20;

const generateItems = (start: number, count: number): string[] => {
  return Array.from({ length: count }, (_, i) => {
    const index = start + i + 1;
    return `商品 #${String(index).padStart(4, '0')} — ロット ${Math.floor(Math.random() * 900) + 100}`;
  });
};

const items = ref<string[]>(generateItems(0, pageSize));

const canLoadMore = computed(() => items.value.length < maxItems);

const loadMore = (event: CustomEvent) => {
  setTimeout(() => {
    const remaining = maxItems - items.value.length;
    const toLoad = Math.min(pageSize, remaining);
    if (toLoad > 0) {
      items.value = [...items.value, ...generateItems(items.value.length, toLoad)];
    }
    (event.target as HTMLIonInfiniteScrollElement).complete();
  }, 800);
};
</script>
