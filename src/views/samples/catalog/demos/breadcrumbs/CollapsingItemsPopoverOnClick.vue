<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Breadcrumbs / Collapsing Items Popover On Click</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">折り畳まれたパンくずアイテムをクリックするとポップオーバーで一覧を表示する例。</p>
      <ion-breadcrumbs :max-items="4" @ionCollapsedClick="presentPopover($event)">
          <ion-breadcrumb href="#home">Home</ion-breadcrumb>
          <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
          <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
          <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
          <ion-breadcrumb href="#film">Film</ion-breadcrumb>
          <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
        </ion-breadcrumbs>
        <ion-popover :is-open="popoverOpen" :event="event" @didDismiss="popoverOpen = false">
          <ion-content>
            <ion-list>
              <ion-item
                v-for="(breadcrumb, i) in collapsedBreadcrumbs"
                :href="breadcrumb.href"
                :lines="i === collapsedBreadcrumbs.length - 1 ? 'none' : undefined"
              >
                <ion-label>{{ breadcrumb.textContent }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
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
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';
  import Popover from './Popover.vue';

const sourceCode = `<template>
  <ion-breadcrumbs :max-items="4" @ionCollapsedClick="presentPopover($event)">
    <ion-breadcrumb href="#home">Home</ion-breadcrumb>
    <ion-breadcrumb href="#electronics">Electronics</ion-breadcrumb>
    <ion-breadcrumb href="#photography">Photography</ion-breadcrumb>
    <ion-breadcrumb href="#cameras">Cameras</ion-breadcrumb>
    <ion-breadcrumb href="#film">Film</ion-breadcrumb>
    <ion-breadcrumb href="#35mm">35 mm</ion-breadcrumb>
  </ion-breadcrumbs>
  <ion-popover :is-open="popoverOpen" :event="event" @didDismiss="popoverOpen = false">
    <ion-content>
      <ion-list>
        <ion-item
          v-for="(breadcrumb, i) in collapsedBreadcrumbs"
          :href="breadcrumb.href"
          :lines="i === collapsedBreadcrumbs.length - 1 ? 'none' : undefined"
        >
          <ion-label>{{ breadcrumb.textContent }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonBreadcrumb, IonBreadcrumbs, IonContent, IonItem, IonLabel, IonList, IonPopover } from '@ionic/vue';
  import { ref } from 'vue';
  import Popover from './Popover.vue';

  const popoverOpen = ref(false);
  const collapsedBreadcrumbs = ref([]);
  const event = ref(null);

  const presentPopover = (e: Event) => {
    collapsedBreadcrumbs.value = (e as CustomEvent).detail.collapsedBreadcrumbs;
    event.value = e;
    popoverOpen.value = true;
  };
<\/script>`;


  const popoverOpen = ref(false);
  const collapsedBreadcrumbs = ref([]);
  const event = ref(null);

  const presentPopover = (e: Event) => {
    collapsedBreadcrumbs.value = (e as CustomEvent).detail.collapsedBreadcrumbs;
    event.value = e;
    popoverOpen.value = true;
  };
</script>
