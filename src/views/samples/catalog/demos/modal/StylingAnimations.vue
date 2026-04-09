<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Modal / Styling Animations</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">カスタムアニメーションを使ったモーダルの表示/非表示を実装する例。</p>
        <ion-button id="open-modal" expand="block">Open Modal</ion-button>
    
        <ion-modal ref="modal" trigger="open-modal" :enter-animation="enterAnimation" :leave-animation="leaveAnimation">
          <ion-content>
            <ion-toolbar>
              <ion-title>Modal</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="dismiss()">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-list>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
                </ion-avatar>
                <ion-label>
                  <h2>Connor Smith</h2>
                  <p>Sales Rep</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
                </ion-avatar>
                <ion-label>
                  <h2>Daniel Smith</h2>
                  <p>Product Designer</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
                </ion-avatar>
                <ion-label>
                  <h2>Greg Smith</h2>
                  <p>Director of Operations</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
                </ion-avatar>
                <ion-label>
                  <h2>Zoey Smith</h2>
                  <p>CEO</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>
      
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
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  createAnimation,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>App</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-button id="open-modal" expand="block">Open Modal</ion-button>

    <ion-modal ref="modal" trigger="open-modal" :enter-animation="enterAnimation" :leave-animation="leaveAnimation">
      <ion-content>
        <ion-toolbar>
          <ion-title>Modal</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="dismiss()">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-list>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>Connor Smith</h2>
              <p>Sales Rep</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>Daniel Smith</h2>
              <p>Product Designer</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>Greg Smith</h2>
              <p>Director of Operations</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-avatar slot="start">
              <ion-img src="@/assets/img/demos/avatar.svg"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>Zoey Smith</h2>
              <p>CEO</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    createAnimation,
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
  } from '@ionic/vue';
  import { ref } from 'vue';

  const modal = ref();

  const dismiss = () => modal.value.$el.dismiss();

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root.querySelector('ion-backdrop'))
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(root.querySelector('.modal-wrapper'))
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl) => {
    return enterAnimation(baseEl).direction('reverse');
  };
<\/script>`;


  const modal = ref();

  const dismiss = () => modal.value.$el.dismiss();

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root.querySelector('ion-backdrop'))
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(root.querySelector('.modal-wrapper'))
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl) => {
    return enterAnimation(baseEl).direction('reverse');
  };
</script>
