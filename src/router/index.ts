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
    path: '/samples/coverage',
    name: 'SamplesCoverage',
    component: () => import('@/views/samples/CoveragePage.vue'),
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
    path: '/samples/catalog/toggle',
    component: () => import('@/views/samples/catalog/TogglePage.vue'),
  },
  {
    path: '/samples/catalog/select',
    component: () => import('@/views/samples/catalog/SelectPage.vue'),
  },
  {
    path: '/samples/catalog/searchbar',
    component: () => import('@/views/samples/catalog/SearchbarPage.vue'),
  },
  {
    path: '/samples/catalog/segment',
    component: () => import('@/views/samples/catalog/SegmentPage.vue'),
  },
  {
    path: '/samples/catalog/card',
    component: () => import('@/views/samples/catalog/CardPage.vue'),
  },
  {
    path: '/samples/catalog/badge',
    component: () => import('@/views/samples/catalog/BadgePage.vue'),
  },
  {
    path: '/samples/catalog/chip',
    component: () => import('@/views/samples/catalog/ChipPage.vue'),
  },
  {
    path: '/samples/catalog/avatar',
    component: () => import('@/views/samples/catalog/AvatarPage.vue'),
  },
  {
    path: '/samples/catalog/spinner',
    component: () => import('@/views/samples/catalog/SpinnerPage.vue'),
  },
  {
    path: '/samples/catalog/skeleton-text',
    component: () => import('@/views/samples/catalog/SkeletonTextPage.vue'),
  },
  {
    path: '/samples/catalog/progress-bar',
    component: () => import('@/views/samples/catalog/ProgressBarPage.vue'),
  },
  {
    path: '/samples/catalog/alert',
    component: () => import('@/views/samples/catalog/AlertPage.vue'),
  },
  {
    path: '/samples/catalog/action-sheet',
    component: () => import('@/views/samples/catalog/ActionSheetPage.vue'),
  },
  {
    path: '/samples/catalog/loading',
    component: () => import('@/views/samples/catalog/LoadingPage.vue'),
  },
  {
    path: '/samples/catalog/popover',
    component: () => import('@/views/samples/catalog/PopoverPage.vue'),
  },
  {
    path: '/samples/catalog/datetime',
    component: () => import('@/views/samples/catalog/DatetimePage.vue'),
  },
  {
    path: '/samples/catalog/range',
    component: () => import('@/views/samples/catalog/RangePage.vue'),
  },
  {
    path: '/samples/catalog/accordion',
    component: () => import('@/views/samples/catalog/AccordionPage.vue'),
  },
  {
    path: '/samples/catalog/item-sliding',
    component: () => import('@/views/samples/catalog/ItemSlidingPage.vue'),
  },
  {
    path: '/samples/catalog/reorder',
    component: () => import('@/views/samples/catalog/ReorderPage.vue'),
  },
  {
    path: '/samples/catalog/fab',
    component: () => import('@/views/samples/catalog/FabPage.vue'),
  },
  {
    path: '/samples/catalog/refresher',
    component: () => import('@/views/samples/catalog/RefresherPage.vue'),
  },
  {
    path: '/samples/catalog/infinite-scroll',
    component: () => import('@/views/samples/catalog/InfiniteScrollPage.vue'),
  },
  {
    path: '/samples/catalog/grid',
    component: () => import('@/views/samples/catalog/GridPage.vue'),
  },
  {
    path: '/samples/catalog/tabs',
    component: () => import('@/views/samples/catalog/tabs/TabsLayoutPage.vue'),
    children: [
      { path: '', redirect: '/samples/catalog/tabs/tab1' },
      { path: 'tab1', component: () => import('@/views/samples/catalog/tabs/Tab1Page.vue') },
      { path: 'tab2', component: () => import('@/views/samples/catalog/tabs/Tab2Page.vue') },
      { path: 'tab3', component: () => import('@/views/samples/catalog/tabs/Tab3Page.vue') },
    ],
  },
  {
    path: '/samples/catalog/menu',
    component: () => import('@/views/samples/catalog/menu/MenuHomePage.vue'),
  },
  {
    path: '/samples/catalog/menu/about',
    component: () => import('@/views/samples/catalog/menu/MenuAboutPage.vue'),
  },
  {
    path: '/samples/catalog/menu/settings',
    component: () => import('@/views/samples/catalog/menu/MenuSettingsPage.vue'),
  },
  {
    path: '/samples/catalog/breadcrumbs',
    component: () => import('@/views/samples/catalog/breadcrumbs/BreadcrumbsLevel1Page.vue'),
  },
  {
    path: '/samples/catalog/breadcrumbs/electronics',
    component: () => import('@/views/samples/catalog/breadcrumbs/BreadcrumbsLevel2Page.vue'),
  },
  {
    path: '/samples/catalog/breadcrumbs/electronics/laptops',
    component: () => import('@/views/samples/catalog/breadcrumbs/BreadcrumbsLevel3Page.vue'),
  },
  {
    path: '/samples/catalog/textarea',
    component: () => import('@/views/samples/catalog/TextareaPage.vue'),
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
