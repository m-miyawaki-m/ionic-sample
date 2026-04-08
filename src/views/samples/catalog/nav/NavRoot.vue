<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Nav — Root</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>ion-nav とは</h2>
      <p>
        <code>ion-nav</code> はスタック型ナビゲーションを提供するコンポーネント。
        vue-router とは独立しており、URL を変えずにコンポーネントを push / pop できる。
        タブ内のサブナビゲーションやモーダル内のウィザードなどに適している。
      </p>

      <h2>push でページを積む</h2>
      <p>
        ボタンを押すと <code>nav.push(NextComponent)</code> で新しいコンポーネントをスタックに積む。
        遷移先では <code>nav.pop()</code> で戻ることができる。
      </p>
      <ion-button expand="block" @click="goToSecond">
        Second ページへ進む
      </ion-button>

      <h2>NavLink (宣言的)</h2>
      <p>
        プログラマティックな push/pop の代わりに <code>ion-nav-link</code> を使うと、
        <code>router-direction="forward"</code> や <code>component</code> 属性で宣言的に遷移を記述できる。
      </p>
      <ion-nav-link
        :component="NavSecond"
        :component-props="{ title: 'NavLink経由' }"
        router-direction="forward"
      >
        <ion-button expand="block" fill="outline">
          NavLink で Second へ
        </ion-button>
      </ion-nav-link>

      <h2>push 時のパラメータ渡し</h2>
      <p>
        <code>nav.push(Component, { key: value })</code> の第2引数でパラメータを渡せる。
        遷移先コンポーネントは defineProps で受け取る。
      </p>

      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/nav" target="_blank" rel="noopener">ionicframework.com/docs/api/nav ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>ion-nav 基本構造</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">&lt;!-- ParentPage.vue --&gt;
&lt;template&gt;
  &lt;ion-nav :root="RootComponent" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { IonNav } from '@ionic/vue';
import RootComponent from './RootComponent.vue';
&lt;/script&gt;

&lt;!-- RootComponent.vue: inject navRef して push/pop --&gt;
&lt;!-- nav.value.$el.push(NextPage, { params }) --&gt;
&lt;!-- nav.value.$el.pop() --&gt;</pre>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonNavLink,
  IonNote, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  useIonRouter,
} from '@ionic/vue';
import { inject, markRaw } from 'vue';
import NavSecond from './NavSecond.vue';

const nav = inject<any>('navRef');

const goToSecond = async () => {
  if (nav?.value) {
    await nav.value.$el.push(markRaw(NavSecond), { title: 'push経由' });
  }
};
</script>
