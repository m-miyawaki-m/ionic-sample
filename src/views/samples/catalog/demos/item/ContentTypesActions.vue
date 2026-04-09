<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Item / Content Types Actions</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content color="light">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">アクション要素（ボタンなど）を含む ion-item のコンテンツタイプの例。</p>
        <ion-list :inset="true">
          <ion-item-sliding>
            <ion-item :button="true">
              <ion-avatar aria-hidden="true" slot="start">
                <img alt="" src="@/assets/img/demos/avatar.svg" />
              </ion-avatar>
              <ion-label>Rick Astley</ion-label>
            </ion-item>
            <ion-item-options slot="end">
              <ion-item-option color="warning">
                <ion-icon slot="icon-only" :icon="pin"></ion-icon>
              </ion-item-option>
              <ion-item-option color="tertiary">
                <ion-icon slot="icon-only" :icon="share"></ion-icon>
              </ion-item-option>
              <ion-item-option color="danger" expandable="true">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
    
          <ion-item-sliding>
            <ion-item :button="true">
              <ion-avatar aria-hidden="true" slot="start">
                <img alt="" src="@/assets/img/demos/avatar.svg" />
              </ion-avatar>
              <ion-label>Leeroy Jenkins</ion-label>
            </ion-item>
            <ion-item-options slot="end">
              <ion-item-option color="warning">
                <ion-icon slot="icon-only" :icon="pin"></ion-icon>
              </ion-item-option>
              <ion-item-option color="tertiary">
                <ion-icon slot="icon-only" :icon="share"></ion-icon>
              </ion-item-option>
              <ion-item-option color="danger" expandable="true">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
    
          <ion-item-sliding>
            <ion-item :button="true">
              <ion-avatar aria-hidden="true" slot="start">
                <img alt="" src="@/assets/img/demos/avatar.svg" />
              </ion-avatar>
              <ion-label>Ionitron</ion-label>
            </ion-item>
            <ion-item-options slot="end">
              <ion-item-option color="warning">
                <ion-icon slot="icon-only" :icon="pin"></ion-icon>
              </ion-item-option>
              <ion-item-option color="tertiary">
                <ion-icon slot="icon-only" :icon="share"></ion-icon>
              </ion-item-option>
              <ion-item-option color="danger" expandable="true">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
    
          <ion-item-sliding>
            <ion-item :button="true">
              <ion-avatar aria-hidden="true" slot="start">
                <img alt="" src="@/assets/img/demos/avatar.svg" />
              </ion-avatar>
              <ion-label>Wall-E</ion-label>
            </ion-item>
            <ion-item-options slot="end">
              <ion-item-option color="warning">
                <ion-icon slot="icon-only" :icon="pin"></ion-icon>
              </ion-item-option>
              <ion-item-option color="tertiary">
                <ion-icon slot="icon-only" :icon="share"></ion-icon>
              </ion-item-option>
              <ion-item-option color="danger" expandable="true">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
    
          <ion-item-sliding>
            <ion-item :button="true">
              <ion-avatar aria-hidden="true" slot="start">
                <img alt="" src="@/assets/img/demos/avatar.svg" />
              </ion-avatar>
              <ion-label>Cortana</ion-label>
            </ion-item>
            <ion-item-options slot="end">
              <ion-item-option color="warning">
                <ion-icon slot="icon-only" :icon="pin"></ion-icon>
              </ion-item-option>
              <ion-item-option color="tertiary">
                <ion-icon slot="icon-only" :icon="share"></ion-icon>
              </ion-item-option>
              <ion-item-option color="danger" expandable="true">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
    
          <ion-item-sliding>
            <ion-item :button="true">
              <ion-avatar aria-hidden="true" slot="start">
                <img alt="" src="@/assets/img/demos/avatar.svg" />
              </ion-avatar>
              <ion-label>Bender</ion-label>
            </ion-item>
            <ion-item-options slot="end">
              <ion-item-option color="warning">
                <ion-icon slot="icon-only" :icon="pin"></ion-icon>
              </ion-item-option>
              <ion-item-option color="tertiary">
                <ion-icon slot="icon-only" :icon="share"></ion-icon>
              </ion-item-option>
              <ion-item-option color="danger" expandable="true">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
    
          <ion-item-sliding>
            <ion-item :button="true">
              <ion-avatar aria-hidden="true" slot="start">
                <img alt="" src="@/assets/img/demos/avatar.svg" />
              </ion-avatar>
              <ion-label>BB-8</ion-label>
            </ion-item>
            <ion-item-options slot="end">
              <ion-item-option color="warning">
                <ion-icon slot="icon-only" :icon="pin"></ion-icon>
              </ion-item-option>
              <ion-item-option color="tertiary">
                <ion-icon slot="icon-only" :icon="share"></ion-icon>
              </ion-item-option>
              <ion-item-option color="danger" expandable="true">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
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
  IonAvatar,
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
  import { pin, share, trash } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Example</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content color="light">
    <ion-list :inset="true">
      <ion-item-sliding>
        <ion-item :button="true">
          <ion-avatar aria-hidden="true" slot="start">
            <img alt="" src="@/assets/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>Rick Astley</ion-label>
        </ion-item>
        <ion-item-options slot="end">
          <ion-item-option color="warning">
            <ion-icon slot="icon-only" :icon="pin"></ion-icon>
          </ion-item-option>
          <ion-item-option color="tertiary">
            <ion-icon slot="icon-only" :icon="share"></ion-icon>
          </ion-item-option>
          <ion-item-option color="danger" expandable="true">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>

      <ion-item-sliding>
        <ion-item :button="true">
          <ion-avatar aria-hidden="true" slot="start">
            <img alt="" src="@/assets/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>Leeroy Jenkins</ion-label>
        </ion-item>
        <ion-item-options slot="end">
          <ion-item-option color="warning">
            <ion-icon slot="icon-only" :icon="pin"></ion-icon>
          </ion-item-option>
          <ion-item-option color="tertiary">
            <ion-icon slot="icon-only" :icon="share"></ion-icon>
          </ion-item-option>
          <ion-item-option color="danger" expandable="true">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>

      <ion-item-sliding>
        <ion-item :button="true">
          <ion-avatar aria-hidden="true" slot="start">
            <img alt="" src="@/assets/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>Ionitron</ion-label>
        </ion-item>
        <ion-item-options slot="end">
          <ion-item-option color="warning">
            <ion-icon slot="icon-only" :icon="pin"></ion-icon>
          </ion-item-option>
          <ion-item-option color="tertiary">
            <ion-icon slot="icon-only" :icon="share"></ion-icon>
          </ion-item-option>
          <ion-item-option color="danger" expandable="true">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>

      <ion-item-sliding>
        <ion-item :button="true">
          <ion-avatar aria-hidden="true" slot="start">
            <img alt="" src="@/assets/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>Wall-E</ion-label>
        </ion-item>
        <ion-item-options slot="end">
          <ion-item-option color="warning">
            <ion-icon slot="icon-only" :icon="pin"></ion-icon>
          </ion-item-option>
          <ion-item-option color="tertiary">
            <ion-icon slot="icon-only" :icon="share"></ion-icon>
          </ion-item-option>
          <ion-item-option color="danger" expandable="true">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>

      <ion-item-sliding>
        <ion-item :button="true">
          <ion-avatar aria-hidden="true" slot="start">
            <img alt="" src="@/assets/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>Cortana</ion-label>
        </ion-item>
        <ion-item-options slot="end">
          <ion-item-option color="warning">
            <ion-icon slot="icon-only" :icon="pin"></ion-icon>
          </ion-item-option>
          <ion-item-option color="tertiary">
            <ion-icon slot="icon-only" :icon="share"></ion-icon>
          </ion-item-option>
          <ion-item-option color="danger" expandable="true">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>

      <ion-item-sliding>
        <ion-item :button="true">
          <ion-avatar aria-hidden="true" slot="start">
            <img alt="" src="@/assets/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>Bender</ion-label>
        </ion-item>
        <ion-item-options slot="end">
          <ion-item-option color="warning">
            <ion-icon slot="icon-only" :icon="pin"></ion-icon>
          </ion-item-option>
          <ion-item-option color="tertiary">
            <ion-icon slot="icon-only" :icon="share"></ion-icon>
          </ion-item-option>
          <ion-item-option color="danger" expandable="true">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>

      <ion-item-sliding>
        <ion-item :button="true">
          <ion-avatar aria-hidden="true" slot="start">
            <img alt="" src="@/assets/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>BB-8</ion-label>
        </ion-item>
        <ion-item-options slot="end">
          <ion-item-option color="warning">
            <ion-icon slot="icon-only" :icon="pin"></ion-icon>
          </ion-item-option>
          <ion-item-option color="tertiary">
            <ion-icon slot="icon-only" :icon="share"></ion-icon>
          </ion-item-option>
          <ion-item-option color="danger" expandable="true">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonAvatar,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
  } from '@ionic/vue';
  import { pin, share, trash } from 'ionicons/icons';
<\/script>`;

</script>
