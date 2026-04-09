<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Reorder / Updating Data</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">並び替え後に完了（complete）メソッドを呼び出してデータを更新する例。</p>
      <ion-list>
          <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
          <ion-reorder-group :disabled="false" @ionReorderEnd="handleReorderEnd($event)">
            <ion-item v-for="item in items" :key="item">
              <ion-label> Item {{ item }} </ion-label>
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
  import { 
  IonButtons,
  IonContent,
  IonHeader,
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
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-list>
    <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
    <ion-reorder-group :disabled="false" @ionReorderEnd="handleReorderEnd($event)">
      <ion-item v-for="item in items" :key="item">
        <ion-label> Item {{ item }} </ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>
    </ion-reorder-group>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ReorderEndCustomEvent } from '@ionic/vue';
  import { ref } from 'vue';

  const items = ref([1, 2, 3, 4, 5]);

  const handleReorderEnd = (event: ReorderEndCustomEvent) => {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', items.value);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    items.value = event.detail.complete(items.value);

    // After complete is called the items will be in the new order
    console.log('After complete', items.value);
  };
<\/script>`;


  const items = ref([1, 2, 3, 4, 5]);

  const handleReorderEnd = (event: ReorderEndCustomEvent) => {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', items.value);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    items.value = event.detail.complete(items.value);

    // After complete is called the items will be in the new order
    console.log('After complete', items.value);
  };
</script>
