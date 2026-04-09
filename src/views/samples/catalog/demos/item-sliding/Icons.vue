<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item Sliding / Icons</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">スライドアイテムのアクションボタンにアイコンを追加する例。</p>
      <ion-list>
          <ion-item-sliding>
            <ion-item-options side="start">
              <ion-item-option color="success">
                <ion-icon slot="icon-only" :icon="archive"></ion-icon>
              </ion-item-option>
            </ion-item-options>
      
            <ion-item>
              <ion-label>Sliding Item with Icons Only</ion-label>
            </ion-item>
      
            <ion-item-options side="end">
              <ion-item-option>
                <ion-icon slot="icon-only" :icon="heart"></ion-icon>
              </ion-item-option>
              <ion-item-option color="danger">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item-options side="start">
              <ion-item-option color="success">
                <ion-icon slot="start" :icon="archive"></ion-icon>
                Archive
              </ion-item-option>
            </ion-item-options>
      
            <ion-item>
              <ion-label> Sliding Item with Start Icons </ion-label>
            </ion-item>
      
            <ion-item-options side="end">
              <ion-item-option>
                <ion-icon slot="start" :icon="heart"></ion-icon>
                Favorite
              </ion-item-option>
              <ion-item-option color="danger">
                <ion-icon slot="start" :icon="trash"></ion-icon>
                Delete
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item-options side="start">
              <ion-item-option color="success">
                <ion-icon slot="end" :icon="archive"></ion-icon>
                Archive
              </ion-item-option>
            </ion-item-options>
      
            <ion-item>
              <ion-label> Sliding Item with End Icons </ion-label>
            </ion-item>
      
            <ion-item-options>
              <ion-item-option>
                <ion-icon slot="end" :icon="heart"></ion-icon>
                Favorite
              </ion-item-option>
              <ion-item-option color="danger">
                <ion-icon slot="end" :icon="trash"></ion-icon>
                Delete
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item-options side="start">
              <ion-item-option color="success">
                <ion-icon slot="top" :icon="archive"></ion-icon>
                Archive
              </ion-item-option>
            </ion-item-options>
      
            <ion-item>
              <ion-label> Sliding Item with Top Icons </ion-label>
            </ion-item>
      
            <ion-item-options>
              <ion-item-option>
                <ion-icon slot="top" :icon="heart"></ion-icon>
                Favorite
              </ion-item-option>
              <ion-item-option color="danger">
                <ion-icon slot="top" :icon="trash"></ion-icon>
                Delete
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
      
          <ion-item-sliding>
            <ion-item-options side="start">
              <ion-item-option color="success">
                <ion-icon slot="bottom" :icon="archive"></ion-icon>
                Archive
              </ion-item-option>
            </ion-item-options>
      
            <ion-item>
              <ion-label> Sliding Item with Bottom Icons </ion-label>
            </ion-item>
      
            <ion-item-options>
              <ion-item-option>
                <ion-icon slot="bottom" :icon="heart"></ion-icon>
                Favorite
              </ion-item-option>
              <ion-item-option color="danger">
                <ion-icon slot="bottom" :icon="trash"></ion-icon>
                Delete
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
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
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { archive, heart, trash } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-list>
    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option color="success">
          <ion-icon slot="icon-only" :icon="archive"></ion-icon>
        </ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-label>Sliding Item with Icons Only</ion-label>
      </ion-item>

      <ion-item-options side="end">
        <ion-item-option>
          <ion-icon slot="icon-only" :icon="heart"></ion-icon>
        </ion-item-option>
        <ion-item-option color="danger">
          <ion-icon slot="icon-only" :icon="trash"></ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option color="success">
          <ion-icon slot="start" :icon="archive"></ion-icon>
          Archive
        </ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-label> Sliding Item with Start Icons </ion-label>
      </ion-item>

      <ion-item-options side="end">
        <ion-item-option>
          <ion-icon slot="start" :icon="heart"></ion-icon>
          Favorite
        </ion-item-option>
        <ion-item-option color="danger">
          <ion-icon slot="start" :icon="trash"></ion-icon>
          Delete
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option color="success">
          <ion-icon slot="end" :icon="archive"></ion-icon>
          Archive
        </ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-label> Sliding Item with End Icons </ion-label>
      </ion-item>

      <ion-item-options>
        <ion-item-option>
          <ion-icon slot="end" :icon="heart"></ion-icon>
          Favorite
        </ion-item-option>
        <ion-item-option color="danger">
          <ion-icon slot="end" :icon="trash"></ion-icon>
          Delete
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option color="success">
          <ion-icon slot="top" :icon="archive"></ion-icon>
          Archive
        </ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-label> Sliding Item with Top Icons </ion-label>
      </ion-item>

      <ion-item-options>
        <ion-item-option>
          <ion-icon slot="top" :icon="heart"></ion-icon>
          Favorite
        </ion-item-option>
        <ion-item-option color="danger">
          <ion-icon slot="top" :icon="trash"></ion-icon>
          Delete
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option color="success">
          <ion-icon slot="bottom" :icon="archive"></ion-icon>
          Archive
        </ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-label> Sliding Item with Bottom Icons </ion-label>
      </ion-item>

      <ion-item-options>
        <ion-item-option>
          <ion-icon slot="bottom" :icon="heart"></ion-icon>
          Favorite
        </ion-item-option>
        <ion-item-option color="danger">
          <ion-icon slot="bottom" :icon="trash"></ion-icon>
          Delete
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue';
  import { archive, heart, trash } from 'ionicons/icons';
<\/script>`;

</script>
