<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Select / Customization Interface Options</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">interfaceOptions でポップオーバー・アクションシートなど各インターフェースの見た目をカスタマイズする例。</p>
      <ion-list>
          <ion-item>
            <ion-select label="Alert" :interface-options="customAlertOptions" interface="alert" placeholder="Select One">
              <ion-select-option value="bacon">Bacon</ion-select-option>
              <ion-select-option value="onions">Onions</ion-select-option>
              <ion-select-option value="pepperoni">Pepperoni</ion-select-option>
            </ion-select>
          </ion-item>
      
          <ion-item>
            <ion-select
              label="Popover"
              :interface-options="customPopoverOptions"
              interface="popover"
              placeholder="Select One"
            >
              <ion-select-option value="brown">Brown</ion-select-option>
              <ion-select-option value="blonde">Blonde</ion-select-option>
              <ion-select-option value="red">Red</ion-select-option>
            </ion-select>
          </ion-item>
      
          <ion-item>
            <ion-select
              label="Action Sheet"
              :interface-options="customActionSheetOptions"
              interface="action-sheet"
              placeholder="Select One"
            >
              <ion-select-option value="red">Red</ion-select-option>
              <ion-select-option value="green">Green</ion-select-option>
              <ion-select-option value="blue">Blue</ion-select-option>
            </ion-select>
          </ion-item>
      
          <ion-item>
            <ion-select label="Modal" :interface-options="customModalOptions" interface="modal" placeholder="Select One">
              <ion-select-option value="reese's">Reese's</ion-select-option>
              <ion-select-option value="snickers">Snickers</ion-select-option>
              <ion-select-option value="twix">Twix</ion-select-option>
            </ion-select>
          </ion-item>
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
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-select label="Alert" :interface-options="customAlertOptions" interface="alert" placeholder="Select One">
        <ion-select-option value="bacon">Bacon</ion-select-option>
        <ion-select-option value="onions">Onions</ion-select-option>
        <ion-select-option value="pepperoni">Pepperoni</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item>
      <ion-select
        label="Popover"
        :interface-options="customPopoverOptions"
        interface="popover"
        placeholder="Select One"
      >
        <ion-select-option value="brown">Brown</ion-select-option>
        <ion-select-option value="blonde">Blonde</ion-select-option>
        <ion-select-option value="red">Red</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item>
      <ion-select
        label="Action Sheet"
        :interface-options="customActionSheetOptions"
        interface="action-sheet"
        placeholder="Select One"
      >
        <ion-select-option value="red">Red</ion-select-option>
        <ion-select-option value="green">Green</ion-select-option>
        <ion-select-option value="blue">Blue</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item>
      <ion-select label="Modal" :interface-options="customModalOptions" interface="modal" placeholder="Select One">
        <ion-select-option value="reese's">Reese's</ion-select-option>
        <ion-select-option value="snickers">Snickers</ion-select-option>
        <ion-select-option value="twix">Twix</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/vue';

  const customAlertOptions = {
    header: 'Pizza Toppings',
    subHeader: 'Select your favorite topping',
    message: 'Choose only one',
    translucent: true,
  };

  const customPopoverOptions = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color',
  };

  const customActionSheetOptions = {
    header: 'Colors',
    subHeader: 'Select your favorite color',
  };

  const customModalOptions = {
    header: 'Favorite Candy',
    breakpoints: [0, 0.5],
    initialBreakpoint: 0.5,
  };
<\/script>`;


  const customAlertOptions = {
    header: 'Pizza Toppings',
    subHeader: 'Select your favorite topping',
    message: 'Choose only one',
    translucent: true,
  };

  const customPopoverOptions = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color',
  };

  const customActionSheetOptions = {
    header: 'Colors',
    subHeader: 'Select your favorite color',
  };

  const customModalOptions = {
    header: 'Favorite Candy',
    breakpoints: [0, 0.5],
    initialBreakpoint: 0.5,
  };
</script>
