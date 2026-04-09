<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples" />
        </ion-buttons>
        <ion-title>Ionicons 全集 (514種)</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- バリアント切替 -->
      <ion-segment v-model="variant" class="ion-padding-horizontal" style="padding-top: 8px;">
        <ion-segment-button value="outline">
          <ion-label>Outline</ion-label>
        </ion-segment-button>
        <ion-segment-button value="filled">
          <ion-label>Filled</ion-label>
        </ion-segment-button>
        <ion-segment-button value="sharp">
          <ion-label>Sharp</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- 検索 -->
      <ion-searchbar
        v-model="searchQuery"
        placeholder="アイコン名で検索..."
        :debounce="200"
        animated
      />

      <!-- 表示件数 -->
      <p class="count-text">表示中: {{ filteredGroups.length }} / {{ iconGroups.length }}</p>

      <!-- アイコングリッド -->
      <ion-grid>
        <ion-row>
          <ion-col
            v-for="group in filteredGroups"
            :key="group.baseName"
            size="3"
          >
            <div class="icon-cell" @click="copyIcon(group)">
              <ion-icon
                v-if="getIcon(group)"
                :icon="getIcon(group)"
                class="grid-icon"
              />
              <ion-icon
                v-else
                :icon="helpCircleOutline"
                class="grid-icon icon-missing"
              />
              <div class="icon-name">{{ group.displayName }}</div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { computed, ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  toastController,
} from '@ionic/vue';
import { helpCircleOutline } from 'ionicons/icons';
import * as allIcons from 'ionicons/icons';

type IconGroup = {
  baseName: string;
  displayName: string;
  filled?: string;
  outline?: string;
  sharp?: string;
  filledKey?: string;
  outlineKey?: string;
  sharpKey?: string;
};

// camelCase → kebab-case
function toKebab(str: string): string {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}

// Parse all icons from ionicons/icons
function buildIconGroups(): IconGroup[] {
  const entries = Object.entries(allIcons).filter(
    ([key]) => !key.startsWith('_')
  );

  const map = new Map<string, IconGroup>();

  for (const [key, value] of entries) {
    let baseName: string;
    let variant: 'outline' | 'sharp' | 'filled';

    if (key.endsWith('Outline')) {
      baseName = key.slice(0, -7); // remove "Outline"
      variant = 'outline';
    } else if (key.endsWith('Sharp')) {
      baseName = key.slice(0, -5); // remove "Sharp"
      variant = 'sharp';
    } else {
      baseName = key;
      variant = 'filled';
    }

    if (!map.has(baseName)) {
      map.set(baseName, {
        baseName,
        displayName: toKebab(baseName),
      });
    }

    const group = map.get(baseName)!;
    if (variant === 'outline') {
      group.outline = value as string;
      group.outlineKey = key;
    } else if (variant === 'sharp') {
      group.sharp = value as string;
      group.sharpKey = key;
    } else {
      group.filled = value as string;
      group.filledKey = key;
    }
  }

  // Sort alphabetically by baseName
  return Array.from(map.values()).sort((a, b) =>
    a.baseName.localeCompare(b.baseName)
  );
}

const iconGroups = buildIconGroups();

const variant = ref<'outline' | 'filled' | 'sharp'>('outline');
const searchQuery = ref('');

function getIcon(group: IconGroup): string | undefined {
  if (variant.value === 'outline') return group.outline ?? group.filled ?? group.sharp;
  if (variant.value === 'sharp') return group.sharp ?? group.filled ?? group.outline;
  return group.filled ?? group.outline ?? group.sharp;
}

function getImportKey(group: IconGroup): string {
  if (variant.value === 'outline') return group.outlineKey ?? group.filledKey ?? group.sharpKey ?? group.baseName;
  if (variant.value === 'sharp') return group.sharpKey ?? group.filledKey ?? group.outlineKey ?? group.baseName;
  return group.filledKey ?? group.outlineKey ?? group.sharpKey ?? group.baseName;
}

const filteredGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return iconGroups;
  return iconGroups.filter(
    (g) =>
      g.baseName.toLowerCase().includes(q) ||
      g.displayName.toLowerCase().includes(q)
  );
});

const copyIcon = async (group: IconGroup) => {
  const key = getImportKey(group);
  const toast = await toastController.create({
    message: `import { ${key} } from 'ionicons/icons';`,
    duration: 3000,
    position: 'bottom',
  });
  await toast.present();
};
</script>

<style scoped>
.icon-cell {
  text-align: center;
  padding: 8px 4px;
  cursor: pointer;
  border-radius: 8px;
}
.icon-cell:active {
  background: var(--ion-color-light);
}
.grid-icon {
  font-size: 28px;
  color: var(--ion-text-color);
}
.icon-missing {
  color: var(--ion-color-medium);
  opacity: 0.3;
}
.icon-name {
  font-size: 10px;
  color: var(--ion-color-medium);
  margin-top: 4px;
  word-break: break-all;
  line-height: 1.2;
}
.count-text {
  color: var(--ion-color-medium);
  font-size: 13px;
  padding: 0 16px;
  margin: 4px 0 0;
}
</style>
