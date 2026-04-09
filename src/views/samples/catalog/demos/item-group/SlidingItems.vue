<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item Group / Sliding Items</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-item-group 内でスライドアイテム（ion-item-sliding）を使う例。</p>
      <ion-item-group>
          <ion-item-divider>
            <ion-label> Fruits </ion-label>
          </ion-item-divider>
      
          <ion-item-sliding>
            <ion-item>
              <ion-label> Grapes </ion-label>
            </ion-item>
            <ion-item-options>
              <ion-item-option> Favorite </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item>
              <ion-label> Apples </ion-label>
            </ion-item>
            <ion-item-options>
              <ion-item-option> Favorite </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item lines="none">
              <ion-label> Bananas </ion-label>
            </ion-item>
            <ion-item-options>
              <ion-item-option> Favorite </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-item-group>
      
        <ion-item-group>
          <ion-item-divider>
            <ion-label> Vegetables </ion-label>
          </ion-item-divider>
      
          <ion-item-sliding>
            <ion-item>
              <ion-label> Carrots </ion-label>
            </ion-item>
            <ion-item-options>
              <ion-item-option> Favorite </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item>
              <ion-label> Broccoli </ion-label>
            </ion-item>
            <ion-item-options>
              <ion-item-option> Favorite </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item lines="none">
              <ion-label> Celery </ion-label>
            </ion-item>
            <ion-item-options>
              <ion-item-option> Favorite </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-item-group>
      <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
        <details>
          <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
          <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
        </details>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { 
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item-group>
    <ion-item-divider>
      <ion-label> Fruits </ion-label>
    </ion-item-divider>

    <ion-item-sliding>
      <ion-item>
        <ion-label> Grapes </ion-label>
      </ion-item>
      <ion-item-options>
        <ion-item-option> Favorite </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item>
        <ion-label> Apples </ion-label>
      </ion-item>
      <ion-item-options>
        <ion-item-option> Favorite </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item lines="none">
        <ion-label> Bananas </ion-label>
      </ion-item>
      <ion-item-options>
        <ion-item-option> Favorite </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider>
      <ion-label> Vegetables </ion-label>
    </ion-item-divider>

    <ion-item-sliding>
      <ion-item>
        <ion-label> Carrots </ion-label>
      </ion-item>
      <ion-item-options>
        <ion-item-option> Favorite </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item>
        <ion-label> Broccoli </ion-label>
      </ion-item>
      <ion-item-options>
        <ion-item-option> Favorite </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item lines="none">
        <ion-label> Celery </ion-label>
      </ion-item>
      <ion-item-options>
        <ion-item-option> Favorite </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-item-group>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
  } from '@ionic/vue';
<\/script>`;

</script>
