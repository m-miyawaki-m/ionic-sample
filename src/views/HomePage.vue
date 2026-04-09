<template>
  <PageLayout
    title="倉庫管理"
    back-href=""
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <!-- A) リスト型 -->
    <template v-if="layout === 'list'">
      <ion-list>
        <ion-item
          v-for="menu in menus"
          :key="menu.path"
          :router-link="menu.path"
          detail
        >
          <ion-icon :icon="menu.icon" slot="start" />
          <ion-label>
            <h2>{{ menu.title }}</h2>
            <p>{{ menu.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </template>

    <!-- B) グリッド（カード）型 -->
    <template v-if="layout === 'grid'">
      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="menu in menus" :key="menu.path">
            <ion-card button :router-link="menu.path" class="grid-card">
              <ion-card-content class="ion-text-center">
                <ion-icon :icon="menu.icon" size="large" color="primary" />
                <h3>{{ menu.title }}</h3>
                <p>{{ menu.description }}</p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>

    <!-- C) 大ボタン型 -->
    <template v-if="layout === 'buttons'">
      <div class="ion-padding-horizontal">
        <ion-button
          v-for="menu in menus"
          :key="menu.path"
          expand="block"
          size="large"
          class="big-menu-button"
          :router-link="menu.path"
        >
          <ion-icon :icon="menu.icon" slot="start" />
          {{ menu.title }}
        </ion-button>
      </div>
    </template>

    <!-- サンプルリンク（常にリスト） -->
    <ion-list-header class="ion-margin-top">
      <ion-label>サンプル</ion-label>
    </ion-list-header>
    <ion-list>
      <ion-item router-link="/samples/screen-patterns" detail>
        <ion-icon :icon="laptopOutline" slot="start" />
        <ion-label>
          <h2>画面パターン集</h2>
          <p>入荷検品・出庫・在庫照会の画面モック</p>
        </ion-label>
      </ion-item>
      <ion-item router-link="/samples/pickup" detail>
        <ion-icon :icon="colorPaletteOutline" slot="start" />
        <ion-label>
          <h2>ピックアップ部品</h2>
          <p>よく使う UI 部品を厳選</p>
        </ion-label>
      </ion-item>
      <ion-item router-link="/samples" detail>
        <ion-icon :icon="appsOutline" slot="start" />
        <ion-label>サンプル一覧</ion-label>
      </ion-item>
    </ion-list>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonList, IonListHeader, IonItem, IonLabel, IonIcon,
  IonGrid, IonRow, IonCol,
  IonCard, IonCardContent,
  IonButton,
} from '@ionic/vue';
import {
  downloadOutline, pushOutline, clipboardOutline,
  searchOutline, swapHorizontalOutline,
  appsOutline,
  colorPaletteOutline,
  laptopOutline,
} from 'ionicons/icons';
import PageLayout from '@/components/PageLayout.vue';
import type { MenuAction } from '@/types';

type LayoutType = 'list' | 'grid' | 'buttons';

const layout = ref<LayoutType>(
  (localStorage.getItem('homeLayout') as LayoutType) || 'list'
);

const menuItems: MenuAction[] = [
  { label: 'A) リスト表示', action: 'list' },
  { label: 'B) グリッド表示', action: 'grid' },
  { label: 'C) 大ボタン表示', action: 'buttons' },
];

const onMenuSelect = (action: string) => {
  layout.value = action as LayoutType;
  localStorage.setItem('homeLayout', action);
};

const menus = [
  { title: '入荷検品', description: '商品スキャン → 入荷登録', path: '/receiving', icon: downloadOutline },
  { title: '出荷検品', description: '出荷指示照合 → 結果送信', path: '/shipping', icon: pushOutline },
  { title: '棚卸し', description: 'ロケーション・品目 → 数量確認', path: '/stocktaking', icon: clipboardOutline },
  { title: '在庫照会', description: '品目スキャン → 在庫情報表示', path: '/inventory', icon: searchOutline },
  { title: 'ロケーション移動', description: '移動元・移動先・品目を記録', path: '/relocation', icon: swapHorizontalOutline },
];
</script>

<style scoped>
.grid-card {
  margin: 4px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-card h3 {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
}

.grid-card p {
  font-size: 11px;
  color: var(--ion-color-medium);
}

.big-menu-button {
  margin-top: 12px;
  height: 60px;
  font-size: 18px;
}
</style>
