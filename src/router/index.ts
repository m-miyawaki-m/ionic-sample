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
    path: '/samples/mockups',
    name: 'MockupsIndex',
    component: () => import('@/views/samples/mockups/MockupsIndexPage.vue'),
  },
  {
    path: '/samples/components',
    name: 'SampleComponents',
    component: () => import('@/views/samples/ComponentsPage.vue'),
  },
  {
    path: '/samples/scan-demo',
    name: 'ScanDemo',
    component: () => import('@/views/samples/ScanDemoPage.vue'),
  },
  {
    path: '/samples/feedback',
    name: 'ScanFeedback',
    component: () => import('@/views/samples/FeedbackPage.vue'),
  },
  {
    path: '/samples/dialog-demo',
    name: 'DialogDemo',
    component: () => import('@/views/samples/DialogDemoPage.vue'),
  },
  {
    path: '/samples/dialog-demo/scan',
    name: 'DialogDemoScan',
    component: () => import('@/views/samples/dialogs/ScanParsePage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
