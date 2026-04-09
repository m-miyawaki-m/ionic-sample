<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Animations / Chain</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">アニメーションを連鎖（チェーン）させて順番に実行する例。</p>
      <ion-card ref="cardAEl">
          <ion-card-content>Card 1</ion-card-content>
        </ion-card>
      
        <ion-card ref="cardBEl">
          <ion-card-content>Card 2</ion-card-content>
        </ion-card>
      
        <ion-card ref="cardCEl">
          <ion-card-content>Card 3</ion-card-content>
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
  <ion-card ref="cardAEl">
    <ion-card-content>Card 1</ion-card-content>
  </ion-card>

  <ion-card ref="cardBEl">
    <ion-card-content>Card 2</ion-card-content>
  </ion-card>

  <ion-card ref="cardCEl">
    <ion-card-content>Card 3</ion-card-content>
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

  const cardAEl = ref(null);
  const cardBEl = ref(null);
  const cardCEl = ref(null);

  let cardA: Animation | undefined;
  let cardB: Animation | undefined;
  let cardC: Animation | undefined;

  onMounted(() => {
    cardA = createAnimation()
      .addElement(cardAEl.value.$el)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(0)' },
      ]);

    cardB = createAnimation()
      .addElement(cardBEl.value.$el)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    cardC = createAnimation()
      .addElement(cardCEl.value.$el)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);
  });

  const play = async () => {
    await cardA?.play();
    await cardB?.play();
    await cardC?.play();
  };
  const pause = () => {
    cardA?.pause();
    cardB?.pause();
    cardC?.pause();
  };
  const stop = () => {
    cardA?.stop();
    cardB?.stop();
    cardC?.stop();
  };
<\/script>`;


  const cardAEl = ref(null);
  const cardBEl = ref(null);
  const cardCEl = ref(null);

  let cardA: Animation | undefined;
  let cardB: Animation | undefined;
  let cardC: Animation | undefined;

  onMounted(() => {
    cardA = createAnimation()
      .addElement(cardAEl.value.$el)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(0)' },
      ]);

    cardB = createAnimation()
      .addElement(cardBEl.value.$el)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    cardC = createAnimation()
      .addElement(cardCEl.value.$el)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);
  });

  const play = async () => {
    await cardA?.play();
    await cardB?.play();
    await cardC?.play();
  };
  const pause = () => {
    cardA?.pause();
    cardB?.pause();
    cardC?.pause();
  };
  const stop = () => {
    cardA?.stop();
    cardB?.stop();
    cardC?.stop();
  };
</script>
