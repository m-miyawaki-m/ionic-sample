<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Grid</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic Grid (2・3・4カラム)</h2>
      <p>ion-grid → ion-row → ion-col の3層構造で12カラムグリッドを構成する。size プロパティで各カラムの幅を指定する (全体12分割)。</p>

      <p><strong>2カラム (size="6")</strong></p>
      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="n in 4" :key="`2col-${n}`">
            <ion-card>
              <ion-card-content class="ion-text-center">Col {{ n }}</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <p><strong>3カラム (size="4")</strong></p>
      <ion-grid>
        <ion-row>
          <ion-col size="4" v-for="n in 6" :key="`3col-${n}`">
            <ion-card>
              <ion-card-content class="ion-text-center">Col {{ n }}</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <p><strong>4カラム (size="3")</strong></p>
      <ion-grid>
        <ion-row>
          <ion-col size="3" v-for="n in 8" :key="`4col-${n}`">
            <ion-card>
              <ion-card-content class="ion-text-center">{{ n }}</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <h2>異なる幅のカラム</h2>
      <p>size の値を変えると各カラムの幅を個別に指定できる。合計が12になるように設計する。</p>
      <ion-grid>
        <ion-row>
          <ion-col size="3">
            <ion-card color="primary">
              <ion-card-content class="ion-text-center">size=3</ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="9">
            <ion-card color="secondary">
              <ion-card-content class="ion-text-center">size=9</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">
            <ion-card color="tertiary">
              <ion-card-content class="ion-text-center">size=4</ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="4">
            <ion-card color="success">
              <ion-card-content class="ion-text-center">size=4</ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="4">
            <ion-card color="warning">
              <ion-card-content class="ion-text-center">size=4</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="2">
            <ion-card color="danger">
              <ion-card-content class="ion-text-center">2</ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card color="medium">
              <ion-card-content class="ion-text-center">size=6</ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="4">
            <ion-card color="dark">
              <ion-card-content class="ion-text-center">size=4</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <h2>レスポンシブ (size-sm / size-md / size-lg)</h2>
      <p>ブレークポイント別に size を指定できる。小さい画面では縦1列、md (768px) 以上で2列、lg (992px) 以上で3列になる。</p>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="4" v-for="n in 6" :key="`resp-${n}`">
            <ion-card>
              <ion-card-content class="ion-text-center">
                <p>アイテム {{ n }}</p>
                <p style="font-size: 0.8em; color: var(--ion-color-medium);">sm:12 / md:6 / lg:4</p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <h2>Offset (カラムずらし)</h2>
      <p>offset プロパティでカラムを右にずらせる。offset="2" は左に2カラム分の空白を挿入する。</p>
      <ion-grid>
        <ion-row>
          <ion-col size="8" offset="2">
            <ion-card color="primary">
              <ion-card-content class="ion-text-center">size=8 offset=2</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">
            <ion-card color="secondary">
              <ion-card-content class="ion-text-center">size=4</ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="4" offset="4">
            <ion-card color="tertiary">
              <ion-card-content class="ion-text-center">size=4 offset=4</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <h2>Fixed Grid</h2>
      <p>ion-grid に fixed 属性を付けると、最大幅が固定されてコンテンツが中央寄せになる。大きな画面でレイアウトが広がりすぎるのを防げる。</p>
      <ion-grid fixed>
        <ion-row>
          <ion-col size="6" v-for="n in 2" :key="`fixed-${n}`">
            <ion-card color="medium">
              <ion-card-content class="ion-text-center">fixed grid col {{ n }}</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <h2>No Padding</h2>
      <p>ion-grid はデフォルトで padding を持つ。class="ion-no-padding" を付けると padding が除去される。各 ion-col にも同様に適用できる。</p>
      <ion-grid class="ion-no-padding">
        <ion-row>
          <ion-col size="4" class="ion-no-padding" v-for="n in 3" :key="`noPad-${n}`">
            <ion-card style="margin: 2px;">
              <ion-card-content class="ion-text-center ion-no-padding">パディングなし {{ n }}</ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonGrid, IonRow, IonCol,
  IonCard, IonCardContent,
} from '@ionic/vue';
</script>
