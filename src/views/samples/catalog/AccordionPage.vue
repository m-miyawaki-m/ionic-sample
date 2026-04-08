<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Accordion</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-margin-bottom ion-margin-horizontal" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2 class="ion-padding">Basic (シングル展開)</h2>
      <p class="ion-padding-horizontal">ion-accordion-group 内の ion-accordion は、デフォルトで一度に1つだけ開く。ヘッダータップで開閉できる。</p>
      <ion-accordion-group>
        <ion-accordion value="first">
          <ion-item slot="header" color="light">
            <ion-label>入荷について</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            入荷とは商品を受け取る作業です。バーコードをスキャンして数量を確認し、棚へ配置します。
          </div>
        </ion-accordion>
        <ion-accordion value="second">
          <ion-item slot="header" color="light">
            <ion-label>出荷について</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            出荷とは注文された商品をピッキングして梱包し、発送する作業です。ピッキングリストに従って商品を集めます。
          </div>
        </ion-accordion>
        <ion-accordion value="third">
          <ion-item slot="header" color="light">
            <ion-label>棚卸しについて</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            棚卸しは在庫の実数を数えてシステムと照合する作業です。定期的に実施して在庫差異を解消します。
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <h2 class="ion-padding">Multiple (複数同時展開)</h2>
      <p class="ion-padding-horizontal">:multiple="true" を指定すると複数のアコーディオンを同時に展開できる。FAQ ページなどに向いている。</p>
      <ion-accordion-group :multiple="true" :value="['faq1', 'faq3']">
        <ion-accordion value="faq1">
          <ion-item slot="header" color="light">
            <ion-label>Q: 在庫はリアルタイムで更新されますか？</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            A: はい。スキャン操作を完了した時点でサーバーの在庫数が即時更新されます。
          </div>
        </ion-accordion>
        <ion-accordion value="faq2">
          <ion-item slot="header" color="light">
            <ion-label>Q: オフライン時はどうなりますか？</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            A: オフラインモードでは操作をローカルに保存し、接続が回復したときに自動同期します。
          </div>
        </ion-accordion>
        <ion-accordion value="faq3">
          <ion-item slot="header" color="light">
            <ion-label>Q: 複数ユーザーで同時操作できますか？</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            A: はい。ロック機構を使って同一商品の同時編集による競合を防ぎます。
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <h2 class="ion-padding">Inset</h2>
      <p class="ion-padding-horizontal">:inset="true" で左右に余白が付いたカード型アコーディオンになる。グループを視覚的に切り分けるときに使う。</p>
      <ion-accordion-group :inset="true">
        <ion-accordion value="a">
          <ion-item slot="header" color="light">
            <ion-label>セクション A</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            Inset スタイルのアコーディオン内容 A。
          </div>
        </ion-accordion>
        <ion-accordion value="b">
          <ion-item slot="header" color="light">
            <ion-label>セクション B</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            Inset スタイルのアコーディオン内容 B。
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <h2 class="ion-padding">Disabled Accordion</h2>
      <p class="ion-padding-horizontal">ion-accordion に :disabled="true" を付けるとそのパネルだけ開閉できなくなる。メンテナンス中や権限外の項目をグレーアウトするのに使う。</p>
      <ion-accordion-group>
        <ion-accordion value="active">
          <ion-item slot="header" color="light">
            <ion-label>有効な項目</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            この項目は開閉できます。
          </div>
        </ion-accordion>
        <ion-accordion value="disabled" :disabled="true">
          <ion-item slot="header" color="light">
            <ion-label>無効な項目 (disabled)</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            この内容は表示されません。
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/accordion" target="_blank" rel="noopener">ionicframework.com/docs/api/accordion ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-accordion-group>
        <ion-accordion value="colors">
          <ion-item slot="header" color="light">
            <ion-label>Colors</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            Red, Orange, Yellow are warm colors.
          </div>
        </ion-accordion>
        <ion-accordion value="shapes">
          <ion-item slot="header" color="light">
            <ion-label>Shapes</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            Triangles, Squares, Circles are fundamental shapes.
          </div>
        </ion-accordion>
        <ion-accordion value="lines">
          <ion-item slot="header" color="light">
            <ion-label>Lines</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding">
            Curved, Straight, Diagonal are types of lines.
          </div>
        </ion-accordion>
      </ion-accordion-group>

      <div class="ion-padding" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonNote,
  IonAccordionGroup, IonAccordion, IonItem, IonLabel,
} from '@ionic/vue';
</script>
