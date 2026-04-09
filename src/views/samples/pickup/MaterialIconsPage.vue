<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>Material Icons 一覧</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment v-model="variant" scrollable>
          <ion-segment-button value="material-icons">
            <ion-label>Filled</ion-label>
          </ion-segment-button>
          <ion-segment-button value="material-icons-outlined">
            <ion-label>Outlined</ion-label>
          </ion-segment-button>
          <ion-segment-button value="material-icons-round">
            <ion-label>Round</ion-label>
          </ion-segment-button>
          <ion-segment-button value="material-icons-sharp">
            <ion-label>Sharp</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-searchbar v-model="query" placeholder="アイコン名で検索..." />

      <div v-for="cat in filteredCategories" :key="cat.name">
        <h2>{{ cat.name }} ({{ cat.icons.length }})</h2>
        <ion-grid>
          <ion-row>
            <ion-col
              size="3"
              v-for="icon in cat.icons"
              :key="icon"
              class="icon-cell"
              @click="copyIcon(icon)"
            >
              <span :class="variant">{{ icon }}</span>
              <div class="icon-name">{{ icon }}</div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <p v-if="filteredCategories.length === 0">一致するアイコンがありません</p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent, ref, computed } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  toastController,
} from '@ionic/vue';

const CATEGORIES = [
  {
    name: 'Action',
    icons: [
      'home',
      'search',
      'settings',
      'delete',
      'info',
      'check_circle',
      'favorite',
      'visibility',
      'lock',
      'account_circle',
      'shopping_cart',
      'thumb_up',
      'bookmark',
      'build',
      'code',
      'dashboard',
      'explore',
      'extension',
      'grade',
      'help',
      'history',
      'language',
      'launch',
      'list',
      'perm_identity',
      'power_settings_new',
      'print',
      'schedule',
      'today',
      'trending_up',
      'verified',
      'work',
    ],
  },
  {
    name: 'Navigation',
    icons: [
      'arrow_back',
      'arrow_forward',
      'arrow_upward',
      'arrow_downward',
      'chevron_left',
      'chevron_right',
      'expand_more',
      'expand_less',
      'menu',
      'close',
      'fullscreen',
      'more_horiz',
      'more_vert',
      'refresh',
      'unfold_more',
    ],
  },
  {
    name: 'Content',
    icons: [
      'add',
      'remove',
      'clear',
      'save',
      'send',
      'archive',
      'filter_list',
      'flag',
      'link',
      'mail',
      'push_pin',
      'redo',
      'reply',
      'report',
      'sort',
      'undo',
    ],
  },
  {
    name: 'Communication',
    icons: [
      'call',
      'chat',
      'comment',
      'email',
      'forum',
      'message',
      'notifications',
      'phone',
      'sms',
      'vpn_key',
    ],
  },
  {
    name: 'Editor',
    icons: [
      'attach_file',
      'format_bold',
      'format_italic',
      'format_list_bulleted',
      'format_list_numbered',
      'insert_chart',
      'insert_photo',
      'mode_edit',
      'publish',
      'title',
      'format_align_left',
      'format_align_center',
      'format_align_right',
      'text_fields',
      'vertical_align_bottom',
    ],
  },
  {
    name: 'File',
    icons: [
      'cloud',
      'cloud_download',
      'cloud_upload',
      'create_new_folder',
      'file_copy',
      'file_download',
      'file_upload',
      'folder',
      'folder_open',
      'upload_file',
    ],
  },
  {
    name: 'Hardware',
    icons: [
      'bluetooth',
      'computer',
      'keyboard',
      'mouse',
      'phone_android',
      'phone_iphone',
      'scanner',
      'security',
      'tablet',
      'watch',
      'cast',
    ],
  },
  {
    name: 'Image',
    icons: [
      'camera',
      'camera_alt',
      'image',
      'photo',
      'photo_library',
      'collections',
      'crop',
      'edit',
      'filter',
      'palette',
      'tune',
    ],
  },
  {
    name: 'Maps',
    icons: [
      'directions',
      'local_shipping',
      'map',
      'my_location',
      'navigation',
      'near_me',
      'place',
      'store',
      'traffic',
      'directions_car',
      'directions_walk',
      'flight',
      'hotel',
      'restaurant',
      'local_offer',
    ],
  },
  {
    name: 'Social',
    icons: [
      'group',
      'notifications',
      'person',
      'person_add',
      'person_remove',
      'public',
      'share',
      'thumb_down',
      'thumb_up',
      'whatshot',
    ],
  },
  {
    name: 'Alert',
    icons: [
      'error',
      'error_outline',
      'warning',
      'notification_important',
      'add_alert',
      'report_problem',
    ],
  },
  {
    name: 'Toggle',
    icons: [
      'check_box',
      'check_box_outline_blank',
      'radio_button_checked',
      'radio_button_unchecked',
      'toggle_on',
      'toggle_off',
      'star',
      'star_border',
      'star_half',
    ],
  },
  {
    name: 'Device',
    icons: [
      'battery_full',
      'battery_alert',
      'brightness_high',
      'brightness_low',
      'gps_fixed',
      'nfc',
      'signal_wifi_4_bar',
      'storage',
      'usb',
      'sd_card',
    ],
  },
  {
    name: 'Business',
    icons: [
      'assessment',
      'assignment',
      'bar_chart',
      'business',
      'contact_mail',
      'contact_phone',
      'domain',
      'euro',
      'payment',
      'receipt',
      'store',
      'trending_flat',
      'trending_down',
      'work_outline',
      'business_center',
      'monetization_on',
    ],
  },
];

export default defineComponent({
  name: 'MaterialIconsPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const variant = ref('material-icons-outlined');
    const query = ref('');

    const filteredCategories = computed(() => {
      const q = query.value.trim().toLowerCase();
      if (!q) return CATEGORIES;
      return CATEGORIES.map((cat) => ({
        ...cat,
        icons: cat.icons.filter((icon) => icon.includes(q)),
      })).filter((cat) => cat.icons.length > 0);
    });

    const copyIcon = async (name) => {
      const html = `<span class="${variant.value}">${name}</span>`;
      const toast = await toastController.create({
        message: html,
        duration: 3000,
        position: 'bottom',
        color: 'dark',
      });
      await toast.present();
    };

    return {
      variant,
      query,
      filteredCategories,
      copyIcon,
    };
  },
});
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
.icon-cell span {
  font-size: 28px;
  color: var(--ion-text-color);
}
.icon-name {
  font-size: 10px;
  color: var(--ion-color-medium);
  margin-top: 4px;
  word-break: break-all;
}
h2 {
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 8px;
  color: var(--ion-color-dark);
}
</style>
