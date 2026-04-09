<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Animations / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">Ionic Animations API の基本的な使い方。createAnimation() で要素にアニメーションを適用する例。</p>
      <ion-card ref="cardEl">
          <ion-card-content>Card</ion-card-content>
        </ion-card>
      
        <ion-button @click="play()">Play</ion-button>
        <ion-button @click="pause()">Pause</ion-button>
        <ion-button @click="stop()">Stop</ion-button>
      <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
        <details>
          <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
          <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
        </details>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { 
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  createAnimation,
 } from '@ionic/vue';
  import type { Animation } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

const sourceCode = `<template>
  <ion-card ref="cardEl">
    <ion-card-content>Card</ion-card-content>
  </ion-card>

  <ion-button @click="play()">Play</ion-button>
  <ion-button @click="pause()">Pause</ion-button>
  <ion-button @click="stop()">Stop</ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonCard, IonCardContent, createAnimation } from '@ionic/vue';
  import type { Animation } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

  const cardEl = ref(null);

  let animation: Animation;

  onMounted(() => {
    animation = createAnimation()
      .addElement(cardEl.value.$el)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
  });

  const play = () => animation.play();
  const pause = () => animation.pause();
  const stop = () => animation.stop();
<\/script>`;


  const cardEl = ref(null);

  let animation: Animation;

  onMounted(() => {
    animation = createAnimation()
      .addElement(cardEl.value.$el)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
  });

  const play = () => animation.play();
  const pause = () => animation.pause();
  const stop = () => animation.stop();
</script>
