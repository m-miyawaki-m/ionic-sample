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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonSearchbar,
} from '@ionic/vue';

const query = ref<string>('');
</script>
