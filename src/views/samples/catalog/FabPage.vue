<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>FAB</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>
      <!-- Fixed FAB (list) anchored to content -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="fabOpen = !fabOpen" :color="fabOpen ? 'danger' : 'primary'">
          <ion-icon :icon="fabOpen ? close : add" />
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button color="secondary">
            <ion-icon :icon="share" />
          </ion-fab-button>
          <ion-fab-button color="tertiary">
            <ion-icon :icon="mail" />
          </ion-fab-button>
          <ion-fab-button color="success">
            <ion-icon :icon="copy" />
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>

      <h2>Basic FAB</h2>
      <p>ion-fab を ion-content 内に slot="fixed" で配置すると、コンテンツに対して固定表示される。vertical と horizontal で画面上の位置を指定する。</p>
      <ion-card>
        <ion-card-content>
          <ion-label>右下に FAB ボタンが固定表示されています。タップすると FAB リストが展開します。</ion-label>
        </ion-card-content>
      </ion-card>

      <h2>FAB List (サブボタン展開)</h2>
      <p>ion-fab-list を ion-fab 内に置くと、メインボタンをタップしたときにサブボタンが展開する。side="top" でボタンが上方向に展開する。右下の FAB を開くと share・mail・copy の3つのサブボタンが表示される。</p>
      <ion-card>
        <ion-card-content>
          <p>展開中: <strong>{{ fabOpen ? 'はい (✕ で閉じる)' : 'いいえ (+ で開く)' }}</strong></p>
        </ion-card-content>
      </ion-card>

      <h2>Positions (配置バリエーション)</h2>
      <p>vertical は "top" / "center" / "bottom"、horizontal は "start" / "center" / "end" を指定できる。以下はそれぞれの位置の説明。</p>
      <ion-list>
        <ion-item>
          <ion-label>
            <h2>vertical="top" horizontal="start"</h2>
            <p>左上</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>vertical="top" horizontal="end"</h2>
            <p>右上</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>vertical="center" horizontal="end"</h2>
            <p>右中央（edge モードで使うとヘッダーとコンテンツの境界に配置）</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>vertical="bottom" horizontal="end"</h2>
            <p>右下（最もよく使う配置）</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <h2>Edge Mode</h2>
      <p>edge="true" を付けると、ヘッダーとコンテンツの境界線上に FAB が重なるように配置される。vertical="top" と組み合わせて使う。</p>
      <ion-card>
        <ion-card-content>
          <ion-label>edge 属性はヘッダー下端と重なる位置に FAB を固定したいときに使用する。実際のアプリでは vertical="top" horizontal="end" edge="true" の組み合わせが一般的。</ion-label>
        </ion-card-content>
      </ion-card>

      <h2>Color Variants</h2>
      <p>ion-fab-button には color プロパティで色を指定できる。primary・secondary・tertiary・success・warning・danger・light・dark に対応。</p>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; padding: 8px 0 80px;">
        <ion-fab-button color="primary" size="small">
          <ion-icon :icon="add" />
        </ion-fab-button>
        <ion-fab-button color="secondary" size="small">
          <ion-icon :icon="share" />
        </ion-fab-button>
        <ion-fab-button color="tertiary" size="small">
          <ion-icon :icon="mail" />
        </ion-fab-button>
        <ion-fab-button color="success" size="small">
          <ion-icon :icon="copy" />
        </ion-fab-button>
        <ion-fab-button color="warning" size="small">
          <ion-icon :icon="add" />
        </ion-fab-button>
        <ion-fab-button color="danger" size="small">
          <ion-icon :icon="close" />
        </ion-fab-button>
        <ion-fab-button color="dark" size="small">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </div>

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/fab" target="_blank" rel="noopener">ionicframework.com/docs/api/fab ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <!-- NOTE: slot="fixed" を重ねると既存FABと重複するため、ion-card 内にコード例として掲示 -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>公式の基本構造 (slot="fixed" は右下FABを参照)</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <pre style="font-size: 0.8em; white-space: pre-wrap; word-break: break-all;">&lt;!-- ion-content 内に配置 --&gt;
&lt;ion-fab slot="fixed" vertical="bottom" horizontal="end"&gt;
  &lt;ion-fab-button&gt;
    &lt;ion-icon :icon="add" /&gt;
  &lt;/ion-fab-button&gt;
&lt;/ion-fab&gt;</pre>
          <p style="font-size: 0.85em; color: var(--ion-color-medium);">
            ※ このページ右下の FAB ボタンが上記コードの実装例です。
          </p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonFab, IonFabButton, IonFabList,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel, IonIcon, IonNote,
} from '@ionic/vue';
import { add, close, share, mail, copy } from 'ionicons/icons';

const fabOpen = ref(false);
</script>
