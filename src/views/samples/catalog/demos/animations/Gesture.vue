<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Animations / Gesture</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">Ionic Gesture API と連携してジェスチャー操作にアニメーションを連動させる例。</p>
      <div class="container">
          <div class="track">
            <ion-card id="card" button="true" ref="cardEl">
              <ion-card-content>Card</ion-card-content>
            </ion-card>
          </div>
      
          <p>Drag the square along the track.</p>
        </div>
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
  createAnimation,
  createGesture,
 } from '@ionic/vue';
  import type { GestureDetail } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

const sourceCode = `<template>
  <div class="container">
    <div class="track">
      <ion-card id="card" button="true" ref="cardEl">
        <ion-card-content>Card</ion-card-content>
      </ion-card>
    </div>

    <p>Drag the square along the track.</p>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCard, IonCardContent, createAnimation, createGesture } from '@ionic/vue';
  import type { GestureDetail } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

  const cardEl = ref(null);

  onMounted(() => {
    let initialStep = 0;
    let started = false;

    /**
     * The track is 344px wide.
     * The card is 100px wide.
     * We want 16px of margin on each end of the track.
     */
    const MAX_TRANSLATE = 344 - 100 - 32;

    const animation = createAnimation()
      .addElement(cardEl.value.$el)
      .duration(1000)
      .fromTo('transform', 'translateX(0)', \`translateX(\${MAX_TRANSLATE}px)\`);

    const gesture = createGesture({
      el: cardEl.value.$el,
      threshold: 0,
      gestureName: 'card-drag',
      onMove: (event) => onMove(event),
      onEnd: (event) => onEnd(event),
    });

    gesture.enable(true);

    const onMove = (event: GestureDetail) => {
      if (!started) {
        animation.progressStart();
        started = true;
      }

      animation.progressStep(getStep(event));
    };

    const onEnd = (event: GestureDetail) => {
      if (!started) {
        return;
      }

      gesture.enable(false);

      const step = getStep(event);
      const shouldComplete = step > 0.5;

      animation.progressEnd(shouldComplete ? 1 : 0, step).onFinish(() => {
        gesture.enable(true);
      });

      initialStep = shouldComplete ? MAX_TRANSLATE : 0;
      started = false;
    };

    const clamp = (min: number, n: number, max: number) => {
      return Math.max(min, Math.min(n, max));
    };

    const getStep = (event: GestureDetail) => {
      const delta = initialStep + event.deltaX;
      return clamp(0, delta / MAX_TRANSLATE, 1);
    };
  });
<\/script>

<style scoped>
  .container {
    flex-direction: column;
  }

  .track {
    width: 344px;
    background: var(--ion-color-medium);
    padding: 16px;
  }

  ion-card {
    width: 100px;
    box-shadow: none;
    margin: 0px;
  }
</style>`;


  const cardEl = ref(null);

  onMounted(() => {
    let initialStep = 0;
    let started = false;

    /**
     * The track is 344px wide.
     * The card is 100px wide.
     * We want 16px of margin on each end of the track.
     */
    const MAX_TRANSLATE = 344 - 100 - 32;

    const animation = createAnimation()
      .addElement(cardEl.value.$el)
      .duration(1000)
      .fromTo('transform', 'translateX(0)', `translateX(${MAX_TRANSLATE}px)`);

    const gesture = createGesture({
      el: cardEl.value.$el,
      threshold: 0,
      gestureName: 'card-drag',
      onMove: (event) => onMove(event),
      onEnd: (event) => onEnd(event),
    });

    gesture.enable(true);

    const onMove = (event: GestureDetail) => {
      if (!started) {
        animation.progressStart();
        started = true;
      }

      animation.progressStep(getStep(event));
    };

    const onEnd = (event: GestureDetail) => {
      if (!started) {
        return;
      }

      gesture.enable(false);

      const step = getStep(event);
      const shouldComplete = step > 0.5;

      animation.progressEnd(shouldComplete ? 1 : 0, step).onFinish(() => {
        gesture.enable(true);
      });

      initialStep = shouldComplete ? MAX_TRANSLATE : 0;
      started = false;
    };

    const clamp = (min: number, n: number, max: number) => {
      return Math.max(min, Math.min(n, max));
    };

    const getStep = (event: GestureDetail) => {
      const delta = initialStep + event.deltaX;
      return clamp(0, delta / MAX_TRANSLATE, 1);
    };
  });
</script>

<style scoped>
  .container {
    flex-direction: column;
  }

  .track {
    width: 344px;
    background: var(--ion-color-medium);
    padding: 16px;
  }

  ion-card {
    width: 100px;
    box-shadow: none;
    margin: 0px;
  }
</style>
