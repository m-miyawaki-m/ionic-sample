<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Modal</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>Basic Modal</h2>
      <p>フルスクリーンのモーダル。ヘッダー + Close ボタン構成。背景タップでも閉じる。</p>
      <ion-button @click="basicOpen = true">Open Basic Modal</ion-button>

      <ion-modal :is-open="basicOpen" @did-dismiss="basicOpen = false">
        <ion-header>
          <ion-toolbar>
            <ion-title>Basic Modal</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="basicOpen = false">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>This is the modal content.</p>
        </ion-content>
      </ion-modal>

      <h2>Sheet Modal (Breakpoints)</h2>
      <p>下から出るシート型モーダル。breakpoints で停止位置を複数指定でき、ドラッグで上下に動かせる。配列に 0 を含めるとドラッグだけで閉じれる。</p>
      <ion-button @click="sheetOpen = true">Open Sheet Modal</ion-button>

      <ion-modal
        :is-open="sheetOpen"
        :initial-breakpoint="0.5"
        :breakpoints="[0, 0.25, 0.5, 0.75, 1]"
        @did-dismiss="sheetOpen = false"
      >
        <ion-content class="ion-padding">
          <h3>Drag me up or down</h3>
          <p>Breakpoints: 0, 25%, 50%, 75%, 100%</p>
          <ion-button expand="block" @click="sheetOpen = false">Close</ion-button>
        </ion-content>
      </ion-modal>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/modal" target="_blank" rel="noopener">ionicframework.com/docs/api/modal ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-button @click="officialModalOpen = true">Open Official Modal</ion-button>

      <ion-modal :is-open="officialModalOpen" @did-dismiss="officialModalOpen = false">
        <ion-header>
          <ion-toolbar>
            <ion-title>Official Sample</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="officialModalOpen = false">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>This is a basic modal from the official Ionic docs example.</p>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonModal, IonNote,
} from '@ionic/vue';

const basicOpen = ref(false);
const sheetOpen = ref(false);
const officialModalOpen = ref(false);
</script>
