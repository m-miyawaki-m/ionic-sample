<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Chip</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic</h2>
      <p>ion-chip はタグ・フィルター・選択状態などを表すコンパクトなUI要素。</p>
      <ion-chip>Default</ion-chip>
      <ion-chip>カテゴリ</ion-chip>
      <ion-chip>タグ</ion-chip>

      <h2>Colors</h2>
      <p>color プロパティで背景色・文字色を変更できる。</p>
      <ion-chip color="primary">Primary</ion-chip>
      <ion-chip color="secondary">Secondary</ion-chip>
      <ion-chip color="tertiary">Tertiary</ion-chip>
      <ion-chip color="success">Success</ion-chip>
      <ion-chip color="warning">Warning</ion-chip>
      <ion-chip color="danger">Danger</ion-chip>
      <ion-chip color="medium">Medium</ion-chip>
      <ion-chip color="dark">Dark</ion-chip>

      <h2>Outline</h2>
      <p>outline プロパティを付けると枠線スタイルになる。</p>
      <ion-chip outline>Default outline</ion-chip>
      <ion-chip outline color="primary">Primary outline</ion-chip>
      <ion-chip outline color="danger">Danger outline</ion-chip>

      <h2>With icon</h2>
      <p>ion-icon を slot="start" に配置してアイコン付きチップを作れる。</p>
      <ion-chip color="primary">
        <ion-icon :icon="personCircle" />
        <ion-label>ユーザー</ion-label>
      </ion-chip>
      <ion-chip color="success">
        <ion-icon :icon="checkmarkCircle" />
        <ion-label>完了</ion-label>
      </ion-chip>
      <ion-chip color="danger">
        <ion-icon :icon="closeCircle" />
        <ion-label>エラー</ion-label>
      </ion-chip>

      <h2>With avatar</h2>
      <p>ion-avatar を先頭に入れてアバター付きチップを作れる。</p>
      <ion-chip>
        <ion-avatar>
          <img src="https://i.pravatar.cc/40?img=1" alt="avatar" />
        </ion-avatar>
        <ion-label>山田 太郎</ion-label>
      </ion-chip>
      <ion-chip>
        <ion-avatar>
          <img src="https://i.pravatar.cc/40?img=2" alt="avatar" />
        </ion-avatar>
        <ion-label>佐藤 花子</ion-label>
      </ion-chip>

      <h2>Disabled</h2>
      <p>disabled プロパティで操作不可にする。</p>
      <ion-chip disabled>Disabled chip</ion-chip>
      <ion-chip disabled color="primary">Disabled primary</ion-chip>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonChip, IonLabel, IonIcon, IonAvatar,
} from '@ionic/vue';
import { personCircle, checkmarkCircle, closeCircle } from 'ionicons/icons';
</script>
