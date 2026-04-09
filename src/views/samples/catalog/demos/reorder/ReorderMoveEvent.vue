<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Reorder / Reorder Move Event</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ionItemReorder イベントを使って並び替え後の順序を取得する例。</p>
      <ion-list lines="full">
          <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
          <ion-reorder-group :disabled="false" @ionReorderMove="handleReorderMove" @ionReorderEnd="handleReorderEnd">
            <ion-item v-for="(item, index) in items" :key="index" :id="`item-${index + 1}`">
              <b slot="start">{{ index + 1 }}</b>
              <ion-label>{{ item }}</ion-label>
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
  <ion-list lines="full">
    <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
    <ion-reorder-group :disabled="false" @ionReorderMove="handleReorderMove" @ionReorderEnd="handleReorderEnd">
      <ion-item v-for="(item, index) in items" :key="index" :id="\`item-\${index + 1}\`">
        <b slot="start">{{ index + 1 }}</b>
        <ion-label>{{ item }}</ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>
    </ion-reorder-group>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, ReorderEndCustomEvent } from '@ionic/vue';
  import { ref } from 'vue';

  const items = ref(['Buy groceries', 'Call the bank', 'Finish project report', 'Book flight tickets', 'Read a book']);

  const handleReorderMove = (event: ReorderEndCustomEvent) => {
    const from = event.detail.from;
    const to = event.detail.to;

    if (from !== to) {
      console.log('Dragged from index', from, 'to', to);
    }

    // Get all items and sort by their current id (item-1, item-2, ...)
    const itemElements = Array.from(document.querySelectorAll('ion-item')).sort((a, b) => {
      const aNum = parseInt(a.id.replace('item-', ''), 10);
      const bNum = parseInt(b.id.replace('item-', ''), 10);
      return aNum - bNum;
    });

    // Dragging down: shift up items between from+1 and to, set dragged to to+1
    if (from < to) {
      for (let i = from; i <= to; i++) {
        const item = itemElements[i];
        const itemNum = item.querySelector('b');
        if (i === from) {
          // Dragged item
          itemNum.textContent = String(to + 1);
          item.id = \`item-\${to + 1}\`;
        } else {
          // Items shift up
          itemNum.textContent = String(i);
          item.id = \`item-\${i}\`;
        }
      }
    } else if (from > to) {
      for (let i = to; i <= from; i++) {
        const item = itemElements[i];
        const itemNum = item.querySelector('b');
        if (i === from) {
          // Dragged item
          itemNum.textContent = String(to + 1);
          item.id = \`item-\${to + 1}\`;
        } else {
          // Items shift down
          itemNum.textContent = String(i + 2);
          item.id = \`item-\${i + 2}\`;
        }
      }
    }
  };

  const handleReorderEnd = (event: ReorderEndCustomEvent) => {
    // Finish the reorder and update the items data
    items.value = event.detail.complete(items.value);

    // Update all item numbers and IDs to match their new positions
    const itemElements = document.querySelectorAll('ion-item');
    itemElements.forEach((item, index) => {
      const itemNum = item.querySelector('b');
      itemNum.textContent = String(index + 1);
      item.id = \`item-\${index + 1}\`;
    });
  };
<\/script>`;


  const items = ref(['Buy groceries', 'Call the bank', 'Finish project report', 'Book flight tickets', 'Read a book']);

  const handleReorderMove = (event: ReorderEndCustomEvent) => {
    const from = event.detail.from;
    const to = event.detail.to;

    if (from !== to) {
      console.log('Dragged from index', from, 'to', to);
    }

    // Get all items and sort by their current id (item-1, item-2, ...)
    const itemElements = Array.from(document.querySelectorAll('ion-item')).sort((a, b) => {
      const aNum = parseInt(a.id.replace('item-', ''), 10);
      const bNum = parseInt(b.id.replace('item-', ''), 10);
      return aNum - bNum;
    });

    // Dragging down: shift up items between from+1 and to, set dragged to to+1
    if (from < to) {
      for (let i = from; i <= to; i++) {
        const item = itemElements[i];
        const itemNum = item.querySelector('b');
        if (i === from) {
          // Dragged item
          itemNum.textContent = String(to + 1);
          item.id = `item-${to + 1}`;
        } else {
          // Items shift up
          itemNum.textContent = String(i);
          item.id = `item-${i}`;
        }
      }
    } else if (from > to) {
      for (let i = to; i <= from; i++) {
        const item = itemElements[i];
        const itemNum = item.querySelector('b');
        if (i === from) {
          // Dragged item
          itemNum.textContent = String(to + 1);
          item.id = `item-${to + 1}`;
        } else {
          // Items shift down
          itemNum.textContent = String(i + 2);
          item.id = `item-${i + 2}`;
        }
      }
    }
  };

  const handleReorderEnd = (event: ReorderEndCustomEvent) => {
    // Finish the reorder and update the items data
    items.value = event.detail.complete(items.value);

    // Update all item numbers and IDs to match their new positions
    const itemElements = document.querySelectorAll('ion-item');
    itemElements.forEach((item, index) => {
      const itemNum = item.querySelector('b');
      itemNum.textContent = String(index + 1);
      item.id = `item-${index + 1}`;
    });
  };
</script>
