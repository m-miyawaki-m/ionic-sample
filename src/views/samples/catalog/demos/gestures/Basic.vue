<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Gestures / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">Ionic Gestures API の基本的な使い方。カスタムジェスチャーを要素に設定する例。</p>
      <ion-card ref="card">
          <ion-card-header>
            <ion-card-subtitle>Pan the Screen</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <p ref="debug">Gesture information will display after interaction.</p>
          </ion-card-content>
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
  createGesture,
 } from '@ionic/vue';
  import type { GestureDetail } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

const sourceCode = `<style scoped>
  ion-card {
    position: absolute;

    left: 0;
    right: 0;

    user-select: none;
  }

  ion-card.active {
    box-shadow: var(--ion-color-warning) 0px 4px 16px;
  }
</style>
<template>
  <ion-card ref="card">
    <ion-card-header>
      <ion-card-subtitle>Pan the Screen</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <p ref="debug">Gesture information will display after interaction.</p>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonCard, IonCardContent, createGesture } from '@ionic/vue';
  import type { GestureDetail } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

  const card = ref(null);
  const debug = ref(null);

  onMounted(() => {
    const gesture = createGesture({
      el: card.value.$el.closest('ion-content'),
      onStart: () => onStart(),
      onMove: (detail) => onMove(detail),
      onEnd: () => onEnd(),
      gestureName: 'example',
    });

    gesture.enable();
  });

  const onStart = () => {
    card.value?.$el.classList.add('active');
  };

  const onMove = (detail: GestureDetail) => {
    const { type, currentX, deltaX, velocityX } = detail;

    if (debug.value) {
      debug.value.innerHTML = \`
      <div>Type: \${type}</div>
      <div>Current X: \${currentX}</div>
      <div>Delta X: \${deltaX}</div>
      <div>Velocity X: \${velocityX}</div>\`;
    }
  };

  const onEnd = () => {
    card.value?.$el.classList.remove('active');
  };
<\/script>`;


  const card = ref(null);
  const debug = ref(null);

  onMounted(() => {
    const gesture = createGesture({
      el: card.value.$el.closest('ion-content'),
      onStart: () => onStart(),
      onMove: (detail) => onMove(detail),
      onEnd: () => onEnd(),
      gestureName: 'example',
    });

    gesture.enable();
  });

  const onStart = () => {
    card.value?.$el.classList.add('active');
  };

  const onMove = (detail: GestureDetail) => {
    const { type, currentX, deltaX, velocityX } = detail;

    if (debug.value) {
      debug.value.innerHTML = `
      <div>Type: ${type}</div>
      <div>Current X: ${currentX}</div>
      <div>Delta X: ${deltaX}</div>
      <div>Velocity X: ${velocityX}</div>`;
    }
  };

  const onEnd = () => {
    card.value?.$el.classList.remove('active');
  };
</script>

<style scoped>
  ion-card {
    position: absolute;

    left: 0;
    right: 0;

    user-select: none;
  }

  ion-card.active {
    box-shadow: var(--ion-color-warning) 0px 4px 16px;
  }
</style>
