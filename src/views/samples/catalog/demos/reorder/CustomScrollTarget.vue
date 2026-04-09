<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">カスタムスクロールコンテナで並び替えを使う例。</p>
        <div class="ion-content-scroll-host">
          <ion-list>
            <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
            <ion-reorder-group :disabled="false" @ionReorderEnd="handleReorderEnd($event)">
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
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonReorder,
  IonReorderGroup,
  ReorderEndCustomEvent,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-content :scroll-y="false">
    <div class="ion-content-scroll-host">
      <ion-list>
        <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
        <ion-reorder-group :disabled="false" @ionReorderEnd="handleReorderEnd($event)">
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
    </div>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonReorder,
    IonReorderGroup,
    ReorderEndCustomEvent,
  } from '@ionic/vue';

  const handleReorderEnd = (event: ReorderEndCustomEvent) => {
    // The \`from\` and \`to\` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group.
    event.detail.complete();
  };
<\/script>

<style scoped>
  .ion-content-scroll-host {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;
    overflow-y: auto;
  }
</style>`;


  const handleReorderEnd = (event: ReorderEndCustomEvent) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group.
    event.detail.complete();
  };
</script>

<style scoped>
  .ion-content-scroll-host {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;
    overflow-y: auto;
  }
</style>
