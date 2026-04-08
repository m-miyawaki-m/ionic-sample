<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Skeleton Text</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">ion-skeleton-text はコンテンツ読み込み中のプレースホルダー。幅を % で指定する。</p>
      <div class="ion-padding">
        <ion-skeleton-text style="width: 80%;" />
        <ion-skeleton-text style="width: 60%;" />
        <ion-skeleton-text style="width: 70%;" />
      </div>

      <h2 class="ion-padding">Animated</h2>
      <p class="ion-padding-horizontal">animated プロパティで波紋アニメーションが付き、読み込み中であることが伝わりやすい。</p>
      <div class="ion-padding">
        <ion-skeleton-text :animated="true" style="width: 80%;" />
        <ion-skeleton-text :animated="true" style="width: 60%;" />
        <ion-skeleton-text :animated="true" style="width: 70%;" />
      </div>

      <h2 class="ion-padding">In list item layout</h2>
      <p class="ion-padding-horizontal">ion-item 内に配置することでコンテンツ読み込み中のリスト全体をスケルトン表示できる。</p>
      <ion-list>
        <ion-item v-for="i in 3" :key="i">
          <ion-avatar slot="start">
            <ion-skeleton-text :animated="true" />
          </ion-avatar>
          <ion-label>
            <h2><ion-skeleton-text :animated="true" style="width: 50%;" /></h2>
            <p><ion-skeleton-text :animated="true" style="width: 70%;" /></p>
            <p><ion-skeleton-text :animated="true" style="width: 40%;" /></p>
          </ion-label>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Paragraph layout</h2>
      <p class="ion-padding-horizontal">カード内の本文プレースホルダーとしても使える。</p>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <ion-skeleton-text :animated="true" style="width: 50%;" />
          </ion-card-title>
          <ion-card-subtitle>
            <ion-skeleton-text :animated="true" style="width: 30%;" />
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-skeleton-text :animated="true" style="width: 100%;" />
          <ion-skeleton-text :animated="true" style="width: 90%;" />
          <ion-skeleton-text :animated="true" style="width: 80%;" />
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonSkeletonText, IonList, IonItem, IonLabel, IonAvatar,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
} from '@ionic/vue';
</script>
