<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Config / Mode</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">IonicConfig の mode を "ios" / "md" に切り替えてプラットフォームスタイルを変更する例。</p>
      <ion-button :color="color" :fill="fill"> Current mode: {{ mode }} </ion-button>
      <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
        <details>
          <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
          <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
        </details>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { 
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { getMode } from '@ionic/core';

const sourceCode = `<template>
  <ion-button :color="color" :fill="fill"> Current mode: {{ mode }} </ion-button>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { IonButton } from '@ionic/vue';
  import { getMode } from '@ionic/core';

  const mode = ref('');

  const color = computed(() => (mode.value === 'ios' ? 'secondary' : 'tertiary'));
  const fill = computed(() => (mode.value === 'ios' ? 'outline' : 'solid'));

  onMounted(() => {
    mode.value = getMode() || 'md';
  });
<\/script>`;


  const mode = ref('');

  const color = computed(() => (mode.value === 'ios' ? 'secondary' : 'tertiary'));
  const fill = computed(() => (mode.value === 'ios' ? 'outline' : 'solid'));

  onMounted(() => {
    mode.value = getMode() || 'md';
  });
</script>
