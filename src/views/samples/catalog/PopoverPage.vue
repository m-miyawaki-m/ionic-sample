<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Popover</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic (trigger)</h2>
      <p>trigger プロパティにボタンの id を指定するだけで、そのボタンにアンカーした Popover が開く。最もシンプルな使い方。</p>
      <ion-button id="trigger-basic">Open Basic Popover</ion-button>
      <ion-popover trigger="trigger-basic" :dismiss-on-select="true">
        <ion-content class="ion-padding">
          <p>これはポップオーバーの内容です。</p>
          <ion-list lines="none">
            <ion-item button>選択肢 A</ion-item>
            <ion-item button>選択肢 B</ion-item>
            <ion-item button>選択肢 C</ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>

      <h2>Manual Control (is-open + event)</h2>
      <p>:is-open と :event を使って手動でポップオーバーの開閉を制御する。クリック位置にアンカーされる。</p>
      <ion-button @click="openManual">Open Manual Popover</ion-button>
      <ion-popover
        :is-open="manualOpen"
        :event="manualEvent"
        @did-dismiss="manualOpen = false"
      >
        <ion-content class="ion-padding">
          <p>手動制御ポップオーバー。</p>
          <ion-button expand="block" @click="manualOpen = false">閉じる</ion-button>
        </ion-content>
      </ion-popover>

      <h2>Side (上側に表示)</h2>
      <p>side プロパティで Popover をトリガーの上・下・左・右に表示できる。デフォルトは下 (bottom)。</p>
      <ion-button id="trigger-top">側面: top</ion-button>
      <ion-popover trigger="trigger-top" side="top">
        <ion-content class="ion-padding">
          <p>ボタンの上に表示されます。</p>
        </ion-content>
      </ion-popover>

      <h2>Translucent</h2>
      <p>translucent プロパティで iOS のガラス調スタイルになる。iOS の標準 UI に近いデザインが得られる。</p>
      <ion-button id="trigger-translucent">Translucent Popover</ion-button>
      <ion-popover trigger="trigger-translucent" :translucent="true">
        <ion-content class="ion-padding">
          <p>Translucent スタイルのポップオーバー。iOS で特に効果的。</p>
        </ion-content>
      </ion-popover>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonPopover,
  IonList, IonItem,
} from '@ionic/vue';

const manualOpen = ref(false);
const manualEvent = ref<Event | undefined>(undefined);

const openManual = (event: Event) => {
  manualEvent.value = event;
  manualOpen.value = true;
};
</script>
