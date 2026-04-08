import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/receiving',
    name: 'Receiving',
    component: () => import('@/views/ReceivingPage.vue'),
  },
  {
    path: '/shipping',
    name: 'Shipping',
    component: () => import('@/views/ShippingPage.vue'),
  },
  {
    path: '/stocktaking',
    name: 'Stocktaking',
    component: () => import('@/views/StocktakingPage.vue'),
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('@/views/InventoryPage.vue'),
  },
  {
    path: '/relocation',
    name: 'Relocation',
    component: () => import('@/views/RelocationPage.vue'),
  },
  {
    path: '/samples',
    name: 'SamplesIndex',
    component: () => import('@/views/samples/SamplesIndexPage.vue'),
  },
  {
    path: '/samples/catalog',
    name: 'CatalogIndex',
    component: () => import('@/views/samples/catalog/CatalogIndexPage.vue'),
  },
  {
    path: '/samples/catalog/button',
    component: () => import('@/views/samples/catalog/ButtonPage.vue'),
  },
  {
    path: '/samples/catalog/input',
    component: () => import('@/views/samples/catalog/InputPage.vue'),
  },
  {
    path: '/samples/catalog/list',
    component: () => import('@/views/samples/catalog/ListPage.vue'),
  },
  {
    path: '/samples/catalog/modal',
    component: () => import('@/views/samples/catalog/ModalPage.vue'),
  },
  {
    path: '/samples/catalog/toast',
    component: () => import('@/views/samples/catalog/ToastPage.vue'),
  },
  {
    path: '/samples/catalog/radio-group',
    component: () => import('@/views/samples/catalog/RadioGroupPage.vue'),
  },
  {
    path: '/samples/catalog/checkbox',
    component: () => import('@/views/samples/catalog/CheckboxPage.vue'),
  },
  {
    path: '/samples/mockups',
    name: 'MockupsIndex',
    component: () => import('@/views/samples/mockups/MockupsIndexPage.vue'),
  },
  {
    path: '/samples/mockups/components',
    name: 'MockupComponents',
    component: () => import('@/views/samples/mockups/ComponentsPage.vue'),
  },
  {
    path: '/samples/mockups/scan-demo',
    name: 'MockupScanDemo',
    component: () => import('@/views/samples/mockups/ScanDemoPage.vue'),
  },
  {
    path: '/samples/mockups/feedback',
    name: 'MockupFeedback',
    component: () => import('@/views/samples/mockups/FeedbackPage.vue'),
  },
  {
    path: '/samples/mockups/dialog-demo',
    name: 'MockupDialogDemo',
    component: () => import('@/views/samples/mockups/DialogDemoPage.vue'),
  },
  {
    path: '/samples/mockups/dialog-demo/scan',
    name: 'MockupDialogDemoScan',
    component: () => import('@/views/samples/mockups/dialogs/ScanParsePage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
