<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Reorder / Reorder Start End Events</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ionReorderStart / ionReorderEnd イベントで並び替えの開始・終了を検知する例。</p>
      <ion-list>
          <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
          <ion-reorder-group :disabled="false" @ionReorderStart="handleReorderStart" @ionReorderEnd="handleReorderEnd">
            <ion-item v-for="item in items" :key="item.label">
              <ion-label>{{ item.label }}</ion-label>
              <ion-icon :icon="item.icon" :color="item.color" slot="end" :ref="(el) => setIconRef(el, item.label)"></ion-icon>
              <ion-reorder slot="end"></ion-reorder>
            </ion-item>
          </ion-reorder-group>
        </ion-list>
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
  import { ref } from 'vue';
  import { 
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
  ReorderEndCustomEvent,
 } from '@ionic/vue';
  import { caretDown, ellipse, warning } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-list>
    <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
    <ion-reorder-group :disabled="false" @ionReorderStart="handleReorderStart" @ionReorderEnd="handleReorderEnd">
      <ion-item v-for="item in items" :key="item.label">
        <ion-label>{{ item.label }}</ion-label>
        <ion-icon :icon="item.icon" :color="item.color" slot="end" :ref="(el) => setIconRef(el, item.label)"></ion-icon>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>
    </ion-reorder-group>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { ref } from 'vue';
  import { IonIcon, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ReorderEndCustomEvent } from '@ionic/vue';
  import { caretDown, ellipse, warning } from 'ionicons/icons';

  const items = ref([
    { label: 'Buy groceries', icon: warning, color: 'warning' },
    { label: 'Call the bank', icon: warning, color: 'warning' },
    { label: 'Finish project report', icon: ellipse, color: 'light' },
    { label: 'Book flight tickets', icon: ellipse, color: 'light' },
    { label: 'Read a book', icon: caretDown, color: 'secondary' },
  ]);

  const iconMap = ref(new Map<string, HTMLElement>());

  function setIconRef(el: HTMLElement | null, label: string) {
    if (el) {
      iconMap.value.set(label, el);
    } else {
      iconMap.value.delete(label);
    }
  }

  function handleReorderStart() {
    console.log('Reorder started');

    // Hide the icons when the reorder starts
    iconMap.value.forEach((icon) => {
      icon.$el.style.opacity = '0';
    });
  }

  function handleReorderEnd(event: ReorderEndCustomEvent) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Show the icons again
    iconMap.value.forEach((icon) => {
      icon.$el.style.opacity = '1';
    });

    // Finish the reorder and update the items data
    items.value = event.detail.complete(items.value);
  }
<\/script>`;


  const items = ref([
    { label: 'Buy groceries', icon: warning, color: 'warning' },
    { label: 'Call the bank', icon: warning, color: 'warning' },
    { label: 'Finish project report', icon: ellipse, color: 'light' },
    { label: 'Book flight tickets', icon: ellipse, color: 'light' },
    { label: 'Read a book', icon: caretDown, color: 'secondary' },
  ]);

  const iconMap = ref(new Map<string, HTMLElement>());

  function setIconRef(el: HTMLElement | null, label: string) {
    if (el) {
      iconMap.value.set(label, el);
    } else {
      iconMap.value.delete(label);
    }
  }

  function handleReorderStart() {
    console.log('Reorder started');

    // Hide the icons when the reorder starts
    iconMap.value.forEach((icon) => {
      icon.$el.style.opacity = '0';
    });
  }

  function handleReorderEnd(event: ReorderEndCustomEvent) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Show the icons again
    iconMap.value.forEach((icon) => {
      icon.$el.style.opacity = '1';
    });

    // Finish the reorder and update the items data
    items.value = event.detail.complete(items.value);
  }
</script>
