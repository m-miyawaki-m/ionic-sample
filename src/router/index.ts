import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

// ── Catalog demo routes (auto-discovered from file system) ──
const demoModules = import.meta.glob('../views/samples/catalog/demos/**/*.vue');

function pascalToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

const catalogDemoRoutes: RouteRecordRaw[] = Object.keys(demoModules)
  .map((modulePath) => {
    const match = modulePath.match(/\/demos\/([^/]+)\/(.+)\.vue$/);
    if (!match) return null;
    const [, componentSlug, fileName] = match;
    const demoSlug = pascalToKebab(fileName);
    return {
      path: `${componentSlug}/${demoSlug}`,
      component: demoModules[modulePath],
    } as RouteRecordRaw;
  })
  .filter((r): r is RouteRecordRaw => r !== null);

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
    path: '/shipping-record',
    name: 'ShippingRecord',
    component: () => import('@/views/ShippingRecordPage.vue'),
  },
  {
    path: '/shipping-record/detail/:id',
    name: 'ShippingRecordDetail',
    component: () => import('@/views/ShippingRecordDetailPage.vue'),
    props: (route: { params: { id: string } }) => ({ id: Number(route.params.id) }),
  },
  {
    path: '/samples',
    name: 'SamplesIndex',
    component: () => import('@/views/samples/SamplesIndexPage.vue'),
  },
  {
    path: '/samples/pickup',
    name: 'SamplesPickup',
    component: () => import('@/views/samples/pickup/PickupIndex.vue'),
  },
  {
    path: '/samples/pickup/button',
    component: () => import('@/views/samples/pickup/ButtonPatterns.vue'),
  },
  {
    path: '/samples/pickup/input',
    component: () => import('@/views/samples/pickup/InputPatterns.vue'),
  },
  {
    path: '/samples/pickup/select',
    component: () => import('@/views/samples/pickup/SelectPatterns.vue'),
  },
  {
    path: '/samples/pickup/checkbox',
    component: () => import('@/views/samples/pickup/CheckboxPatterns.vue'),
  },
  {
    path: '/samples/pickup/radio',
    component: () => import('@/views/samples/pickup/RadioPatterns.vue'),
  },
  {
    path: '/samples/pickup/list',
    component: () => import('@/views/samples/pickup/ListPatterns.vue'),
  },
  {
    path: '/samples/pickup/tabs',
    component: () => import('@/views/samples/pickup/TabsPatterns.vue'),
  },
  {
    path: '/samples/pickup/icon',
    component: () => import('@/views/samples/pickup/IconPatterns.vue'),
  },
  {
    path: '/samples/pickup/label',
    component: () => import('@/views/samples/pickup/LabelPatterns.vue'),
  },
  {
    path: '/samples/pickup/datetime',
    component: () => import('@/views/samples/pickup/DatetimePatterns.vue'),
  },
  {
    path: '/samples/pickup/textlink',
    component: () => import('@/views/samples/pickup/TextLinkPatterns.vue'),
  },
  {
    path: '/pattern/scan-input',
    component: () => import('@/views/samples/pickup/ScanInputPattern.vue'),
  },
  {
    path: '/pattern/scan-input/read',
    component: () => import('@/views/samples/pickup/ScanInputReadPage.vue'),
  },
  {
    path: '/pattern/scan-input/:id',
    component: () => import('@/views/samples/pickup/ScanInputDetailPage.vue'),
  },
  {
    path: '/pattern/scan-accumulate',
    component: () => import('@/views/samples/pickup/ScanAccumulatePattern.vue'),
  },
  {
    path: '/pattern/search-view',
    component: () => import('@/views/samples/pickup/SearchViewPattern.vue'),
  },
  {
    path: '/pattern/input-helpers',
    component: () => import('@/views/samples/pickup/InputHelpersPattern.vue'),
  },
  {
    path: '/pattern/inline-edit',
    component: () => import('@/views/samples/pickup/InlineEditPattern.vue'),
  },
  {
    path: '/pattern/detail-screen',
    component: () => import('@/views/samples/pickup/DetailScreenPattern.vue'),
  },
  {
    path: '/pattern/detail-screen/detail/:id',
    component: () => import('@/views/samples/pickup/DetailScreenDetailPage.vue'),
  },
  {
    path: '/samples/screen-patterns',
    component: () => import('@/views/samples/screen-patterns/ScreenPatternsIndex.vue'),
  },
  {
    path: '/samples/screen-patterns/receiving',
    component: () => import('@/views/samples/screen-patterns/ReceivingPattern.vue'),
  },
  {
    path: '/samples/screen-patterns/shipping',
    component: () => import('@/views/samples/screen-patterns/ShippingPattern.vue'),
  },
  {
    path: '/samples/screen-patterns/inventory',
    component: () => import('@/views/samples/screen-patterns/InventoryPattern.vue'),
  },
  {
    path: '/samples/screen-patterns/inventory-card',
    component: () => import('@/views/samples/screen-patterns/InventoryCardPattern.vue'),
  },
  {
    path: '/samples/coverage',
    name: 'SamplesCoverage',
    component: () => import('@/views/samples/CoveragePage.vue'),
  },
  {
    path: '/samples/ionicons',
    name: 'IoniconsCatalog',
    component: () => import('@/views/samples/IoniconsCatalog.vue'),
  },
  {
    path: '/samples/catalog',
    component: () => import('@/views/samples/catalog/CatalogLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/samples/catalog/CatalogWelcome.vue'),
      },
      ...catalogDemoRoutes,
    ],
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
