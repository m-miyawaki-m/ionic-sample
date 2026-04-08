<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Searchbar</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>Basic</h2>
      <p>ion-searchbar は検索用の入力欄。デフォルトで虫眼鏡アイコン + クリアボタンが付く。v-model で値をバインドできる。</p>
      <ion-searchbar v-model="query" />
      <p>入力中: {{ query || '(空)' }}</p>

      <h2>Placeholder</h2>
      <p>placeholder でガイドテキストを設定できる。</p>
      <ion-searchbar placeholder="商品名を入力" />

      <h2>Show Cancel Button</h2>
      <p>show-cancel-button でキャンセルボタンの表示制御。always / focus / never が指定できる。</p>
      <ion-searchbar show-cancel-button="always" placeholder="always" />
      <ion-searchbar show-cancel-button="focus" placeholder="focus (フォーカス時のみ)" />

      <h2>Animated</h2>
      <p>:animated="true" でフォーカス時にアイコンや見た目がアニメーションする。</p>
      <ion-searchbar :animated="true" placeholder="フォーカスしてみて" />

      <h2>Debounce</h2>
      <p>debounce で ionInput イベントの遅延を設定 (ms)。検索リクエストを減らすときに使う。下は 500ms。</p>
      <ion-searchbar :debounce="500" placeholder="500ms 遅延" />

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/searchbar" target="_blank" rel="noopener">ionicframework.com/docs/api/searchbar ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-searchbar
        placeholder="Search"
        :debounce="500"
        @ionInput="(e: CustomEvent) => officialSearch = (e.target as HTMLIonSearchbarElement).value ?? ''"
      />
      <p>検索中: {{ officialSearch || '(空)' }}</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonSearchbar, IonNote,
} from '@ionic/vue';

const query = ref<string>('');
const officialSearch = ref<string>('');
</script>
