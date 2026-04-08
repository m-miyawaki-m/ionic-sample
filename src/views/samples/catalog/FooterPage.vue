<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Footer</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>Basic Footer (このページ下部)</h2>
      <p>
        <code>ion-footer</code> は <code>ion-page</code> 直下に配置する、画面下部に固定されるツールバーエリア。
        <code>ion-header</code> と同じ構造で <code>ion-toolbar</code> を子要素として使う。
        このページの最下部にシンプルなフッターが表示されている。
      </p>

      <h2>基本構造</h2>
      <p>
        <code>ion-page</code> 内での配置順序は <strong>header → content → footer</strong>。
        <code>ion-content</code> がヘッダーとフッターの高さを自動で計算し、コンテンツが下のフッターと重ならないよう余白を確保する。
      </p>
      <ion-card>
        <ion-card-header>
          <ion-card-title>構成例</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">&lt;ion-page&gt;
  &lt;ion-header&gt;
    &lt;ion-toolbar&gt;...&lt;/ion-toolbar&gt;
  &lt;/ion-header&gt;

  &lt;ion-content&gt;
    &lt;!-- メインコンテンツ --&gt;
  &lt;/ion-content&gt;

  &lt;ion-footer&gt;
    &lt;ion-toolbar&gt;
      &lt;ion-buttons slot="end"&gt;
        &lt;ion-button&gt;確定&lt;/ion-button&gt;
      &lt;/ion-buttons&gt;
    &lt;/ion-toolbar&gt;
  &lt;/ion-footer&gt;
&lt;/ion-page&gt;</pre>
        </ion-card-content>
      </ion-card>

      <h2>Translucent Footer</h2>
      <p>
        <code>:translucent="true"</code> を付けると、iOS でフッターが半透明になりコンテンツが透けて見える。
        このエフェクトは iOS のシステムUIと統一感のある表示を実現する (Android では通常表示)。
      </p>
      <ion-card>
        <ion-card-content>
          <code>&lt;ion-footer :translucent="true"&gt;</code>
        </ion-card-content>
      </ion-card>

      <h2>Fade on Scroll (collapse="fade")</h2>
      <p>
        <code>collapse="fade"</code> を指定すると、スクロール時にフッターがフェードアウトする。
        <code>ion-content</code> に <code>:scroll-events="true"</code> が必要。
        読み込みページや長いリストでフッターを邪魔にならなくするのに便利。
      </p>
      <ion-card>
        <ion-card-content>
          <code>&lt;ion-footer collapse="fade"&gt;</code>
        </ion-card-content>
      </ion-card>

      <h2>フッターのユースケース</h2>
      <p>フッターは以下のような用途でよく使われる。スクロールしてもフッターは画面下部に固定されたまま。</p>
      <ion-list>
        <ion-item>
          <ion-icon slot="start" :icon="checkmarkCircleOutline" color="success" />
          <ion-label>確定 / キャンセルボタンを固定配置</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon slot="start" :icon="sendOutline" color="primary" />
          <ion-label>チャットの送信エリア</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon slot="start" :icon="searchOutline" color="tertiary" />
          <ion-label>フィルター・検索バー</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon slot="start" :icon="informationCircleOutline" color="medium" />
          <ion-label>ページ数・ステータス表示</ion-label>
        </ion-item>
      </ion-list>

      <!-- スクロール確認用パディング -->
      <div style="height: 200px; display: flex; align-items: center; justify-content: center; color: var(--ion-color-medium);">
        ↓ スクロールしてもフッターは下部に固定されている
      </div>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/footer" target="_blank" rel="noopener">ionicframework.com/docs/api/footer ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>ion-footer 基本構造</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre style="margin: 0; font-size: 12px; white-space: pre-wrap;">&lt;ion-page&gt;
  &lt;ion-header&gt;
    &lt;ion-toolbar&gt;
      &lt;ion-title&gt;My Page&lt;/ion-title&gt;
    &lt;/ion-toolbar&gt;
  &lt;/ion-header&gt;

  &lt;ion-content&gt;...&lt;/ion-content&gt;

  &lt;ion-footer&gt;
    &lt;ion-toolbar&gt;
      &lt;ion-title&gt;Footer&lt;/ion-title&gt;
    &lt;/ion-toolbar&gt;
  &lt;/ion-footer&gt;
&lt;/ion-page&gt;

&lt;!-- translucent: iOS でフッターを半透明にする --&gt;
&lt;ion-footer :translucent="true"&gt;...&lt;/ion-footer&gt;

&lt;!-- collapse="fade": スクロール時にフェードアウト --&gt;
&lt;ion-footer collapse="fade"&gt;...&lt;/ion-footer&gt;</pre>
        </ion-card-content>
      </ion-card>

    </ion-content>

    <!-- このページ自体のフッターデモ -->
    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="clear" color="medium" @click="onCancel">キャンセル</ion-button>
        </ion-buttons>
        <ion-title style="font-size: 14px; color: var(--ion-color-medium);">ion-footer デモ</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="solid" color="primary" @click="onConfirm">確定</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonFooter,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonIcon, IonLabel, IonNote,
} from '@ionic/vue';
import {
  checkmarkCircleOutline, sendOutline, searchOutline, informationCircleOutline,
} from 'ionicons/icons';

const onCancel = () => {
  alert('キャンセルが押されました');
};
const onConfirm = () => {
  alert('確定が押されました');
};
</script>
