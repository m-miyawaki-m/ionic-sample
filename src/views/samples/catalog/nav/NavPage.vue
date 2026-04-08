<template>
  <ion-nav ref="navRef" :root="NavRoot" :animated="true" />
</template>

<script setup lang="ts">
import { IonNav } from '@ionic/vue';
import { ref, provide, markRaw } from 'vue';
import NavRoot from './NavRoot.vue';

const navRef = ref();
provide('navRef', navRef);
</script>
