<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Animations / Group</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">複数のアニメーションを同時に実行するグループアニメーションの例。</p>
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

  let animation: Animation;

  onMounted(() => {
    const cardA = createAnimation()
      .addElement(cardAEl.value.$el)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.5) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(0) ' },
      ]);

    const cardB = createAnimation()
      .addElement(cardBEl.value.$el)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    const cardC = createAnimation()
      .addElement(cardCEl.value.$el)
      .duration(5000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.5)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);

    animation = createAnimation().duration(2000).iterations(Infinity).addAnimation([cardA, cardB, cardC]);
  });

  const play = () => animation.play();
  const pause = () => animation.pause();
  const stop = () => animation.stop();
<\/script>`;


  const cardAEl = ref(null);
  const cardBEl = ref(null);
  const cardCEl = ref(null);

  let animation: Animation;

  onMounted(() => {
    const cardA = createAnimation()
      .addElement(cardAEl.value.$el)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.5) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(0) ' },
      ]);

    const cardB = createAnimation()
      .addElement(cardBEl.value.$el)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    const cardC = createAnimation()
      .addElement(cardCEl.value.$el)
      .duration(5000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.5)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' },
      ]);

    animation = createAnimation().duration(2000).iterations(Infinity).addAnimation([cardA, cardB, cardC]);
  });

  const play = () => animation.play();
  const pause = () => animation.pause();
  const stop = () => animation.stop();
</script>
