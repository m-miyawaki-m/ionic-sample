<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Gestures / Double Click</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ダブルクリック（ダブルタップ）ジェスチャーを検知する例。</p>
      <ion-card ref="card">
          <ion-card-content>Double click me to move the card.</ion-card-content>
        </ion-card>
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
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  createGesture,
 } from '@ionic/vue';
  import { onMounted, ref } from 'vue';

const sourceCode = `<template>
  <ion-card ref="card">
    <ion-card-content>Double click me to move the card.</ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCard, IonCardContent, createGesture } from '@ionic/vue';
  import { onMounted, ref } from 'vue';

  const DOUBLE_CLICK_THRESHOLD = 500;
  const card = ref();

  let lastOnStart = 0;
  let currentOffset = 0;

  onMounted(() => {
    const gesture = createGesture({
      el: card.value.$el,
      threshold: 0,
      onStart,
      gestureName: 'double-click',
    });

    gesture.enable();
  });

  const onStart = () => {
    const now = Date.now();

    if (Math.abs(now - lastOnStart) <= DOUBLE_CLICK_THRESHOLD) {
      card.value.$el.style.setProperty('transform', getNewTransform());
      lastOnStart = 0;
    } else {
      lastOnStart = now;
    }
  };

  const getNewTransform = () => {
    if (currentOffset >= 100) {
      currentOffset = 0;
    } else {
      currentOffset += 20;
    }

    return \`translateX(\${currentOffset}px)\`;
  };
<\/script>

<style scoped>
  ion-card {
    transform: translateX(0);
    user-select: none;
  }
</style>`;


  const DOUBLE_CLICK_THRESHOLD = 500;
  const card = ref();

  let lastOnStart = 0;
  let currentOffset = 0;

  onMounted(() => {
    const gesture = createGesture({
      el: card.value.$el,
      threshold: 0,
      onStart,
      gestureName: 'double-click',
    });

    gesture.enable();
  });

  const onStart = () => {
    const now = Date.now();

    if (Math.abs(now - lastOnStart) <= DOUBLE_CLICK_THRESHOLD) {
      card.value.$el.style.setProperty('transform', getNewTransform());
      lastOnStart = 0;
    } else {
      lastOnStart = now;
    }
  };

  const getNewTransform = () => {
    if (currentOffset >= 100) {
      currentOffset = 0;
    } else {
      currentOffset += 20;
    }

    return `translateX(${currentOffset}px)`;
  };
</script>

<style scoped>
  ion-card {
    transform: translateX(0);
    user-select: none;
  }
</style>
