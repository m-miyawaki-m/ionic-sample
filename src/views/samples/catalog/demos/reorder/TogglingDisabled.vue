<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Reorder / Toggling Disabled</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">disabled プロパティをトグルして並び替えモードのオン/オフを切り替える例。</p>
      <ion-list>
          <ion-reorder-group :disabled="isDisabled" @ionReorderEnd="handleReorderEnd($event)">
            <ion-item>
              <ion-label> Item 1 </ion-label>
              <ion-reorder slot="end"></ion-reorder>
            </ion-item>
      
            <ion-item>
              <ion-label> Item 2 </ion-label>
              <ion-reorder slot="end"></ion-reorder>
            </ion-item>
      
            <ion-item>
              <ion-label> Item 3 </ion-label>
              <ion-reorder slot="end"></ion-reorder>
            </ion-item>
      
            <ion-item>
              <ion-label> Item 4 </ion-label>
              <ion-reorder slot="end"></ion-reorder>
            </ion-item>
      
            <ion-item>
              <ion-label> Item 5 </ion-label>
              <ion-reorder slot="end"></ion-reorder>
            </ion-item>
          </ion-reorder-group>
        </ion-list>
      
        <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
        <ion-button @click="toggleReorder()"> Toggle Reorder </ion-button>
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
    <ion-reorder-group :disabled="isDisabled" @ionReorderEnd="handleReorderEnd($event)">
      <ion-item>
        <ion-label> Item 1 </ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>

      <ion-item>
        <ion-label> Item 2 </ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>

      <ion-item>
        <ion-label> Item 3 </ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>

      <ion-item>
        <ion-label> Item 4 </ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>

      <ion-item>
        <ion-label> Item 5 </ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>
    </ion-reorder-group>
  </ion-list>

  <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
  <ion-button @click="toggleReorder()"> Toggle Reorder </ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonReorder,
    IonReorderGroup,
    ReorderEndCustomEvent,
  } from '@ionic/vue';
  import { ref } from 'vue';

  const isDisabled = ref(true);

  const handleReorderEnd = (event: ReorderEndCustomEvent) => {
    // The \`from\` and \`to\` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group.
    event.detail.complete();
  };

  const toggleReorder = () => {
    isDisabled.value = !isDisabled.value;
  };
<\/script>`;


  const isDisabled = ref(true);

  const handleReorderEnd = (event: ReorderEndCustomEvent) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group.
    event.detail.complete();
  };

  const toggleReorder = () => {
    isDisabled.value = !isDisabled.value;
  };
</script>
