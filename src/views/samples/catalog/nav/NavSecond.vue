<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="Root へ戻る" />
        </ion-buttons>
        <ion-title>Nav — Second</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>Second ページ</h2>
      <p>
        <code>nav.push()</code> でスタックに積まれた2枚目のページ。
        左上の「Root へ戻る」ボタン、またはスワイプバックで前のページに戻れる。
      </p>

      <p v-if="title">
        受け取ったパラメータ: <strong>{{ title }}</strong>
      </p>

      <h2>pop でひとつ戻る</h2>
      <p><code>nav.pop()</code> を呼ぶとスタックからこのページが取り除かれ、Root に戻る。</p>
      <ion-button expand="block" color="medium" @click="goBack">
        pop() で Root へ戻る
      </ion-button>

      <h2>Third ページへ進む</h2>
      <p>さらに push してスタックを深くすることも可能。</p>
      <ion-nav-link :component="NavThird" router-direction="forward">
        <ion-button expand="block" fill="outline">
          Third ページへ進む
        </ion-button>
      </ion-nav-link>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonNavLink,
} from '@ionic/vue';
import { inject, markRaw, defineAsyncComponent } from 'vue';

defineProps<{ title?: string }>();

const NavThird = defineAsyncComponent(() => import('./NavThird.vue'));
const nav = inject<any>('navRef');

const goBack = async () => {
  if (nav?.value) {
    await nav.value.$el.pop();
  }
};
</script>
