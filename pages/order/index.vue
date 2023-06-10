<script setup lang="ts">
import { ref, reactive } from 'vue';

const drinks = [
  {
    type: 'Biralar',
    items: [
      { name: 'Carlsberg', description: 'Ürün açıklaması...', price: '65' },
      { name: 'Tuborg', description: 'Ürün açıklaması...', price: '60' },
    ],
  },
  {
    type: 'Kokteyller',
    items: [
      { name: 'Long Island', description: 'Ürün açıklaması...', price: '200' },
      { name: 'Mojito', description: 'Ürün açıklaması...', price: '150' },
      { name: 'Cosmopolitan', description: 'Ürün açıklaması...', price: '150' },
      { name: 'Cuba Libre', description: 'Ürün açıklaması...', price: '150' },
      { name: 'Tom Callino', description: 'Ürün açıklaması...', price: '150' },
      { name: 'Tequila Sunrise', description: 'Ürün açıklaması...', price: '160' },
      { name: 'Lynchburg Lemonade', description: 'Ürün açıklaması...', price: '150' },
    ],
  },
  {
    type: 'Shotlar',
    items: [
      { name: 'Tequila', description: 'Ürün açıklaması...', price: '70' },
      { name: 'Viski', description: 'Ürün açıklaması...', price: '75' },
      { name: 'Vodka', description: 'Ürün açıklaması...', price: '60' },
      { name: 'Rom', description: 'Ürün açıklaması...', price: '60' },
      { name: 'Cin', description: 'Ürün açıklaması...', price: '60' },
    ],
  },
];

const selectedDrinkType = ref(drinks[0]);
const selectDrinkType = (type: string) => {
  const drinkType = drinks.find((drink) => drink.type === type);
  if (drinkType) {
    selectedDrinkType.value = drinkType;
  } else {
    console.error(`Drink type ${type} not found.`);
    selectedDrinkType.value = drinks[0];
  }
};
const selectedItem = reactive({name: '', description: '', price: '', active: false});
const selectItem = (item: {name: string; description: string; price: string}) => {
  if (selectedItem.name === item.name && selectedItem.active) {
    selectedItem.active = false;
  } else {
    selectedItem.name = item.name;
    selectedItem.description = item.description;
    selectedItem.price = item.price;
    selectedItem.active = true
  }
};

</script>

<template>
  <div class="flex flex-col items-center" style="background: #b28d49; height: 100vh">
    <img src="/reservation_img.jpeg" alt="Resim" class="w-full" style="height: 10rem; width: 100vw" />

    <div class="flex justify-between p-2 w-100 align-center">
      <div class="w-2/5">
        <h1 class="text-xl">Menü</h1>
      </div>
      <div class="w-3/5">
<!--        <input type="text" placeholder="Ara" class="w-full px-4 py-2 rounded" style="border: 1px solid #ffffff" />-->
      </div>
    </div>

    <div class="flex w-100 mt-4">
      <div class="w-33">
        <v-btn
          v-for="drink in drinks"
          :key="drink.type"
          class="list-buttons"
          style="height: 2.375rem; width: 90%"
          :class="{ active: selectedDrinkType.type === drink.type }"
          @click="selectDrinkType(drink.type)"
        >
          {{ drink.type }}
        </v-btn>
      </div>
      <div class="w-66">
        <button
          v-for="item in selectedDrinkType.items"
          :key="item.name"
          class="menu-button text-left flex bg-white justify-between items-center rounded border-2 border-gray-400 hover:bg-gray-200 w-100"
          :style="{ height: selectedItem.name === item.name && selectedItem.active ? 'auto' : '5.25rem', flexDirection: selectedItem.name === item.name && selectedItem.active ? 'column-reverse' : 'row' }"
          @click="selectItem(item)"
        >
          <div
            class="ms-1"
            :class="['items-start', selectedItem.name === item.name && selectedItem.active ? 'w-100' : 'w-66']"
            :style="{marginBottom: selectedItem.name === item.name && selectedItem.active ? '1rem' : '0'}"
          >
            <h2 class="text-lg font-bold">{{ item.name }}</h2>
            <p class="text-sm">{{ item.description }}</p>
            <p class="text-xs text-gray-500">{{ item.price }} TL</p>
          </div>
          <img
            :class="['h-100 object-cover', selectedItem.name === item.name && selectedItem.active ? 'w-100' : 'w-33']"
            src="/reservation_img.jpeg"
            alt="Ürün görseli"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-button {
  margin-bottom: 0.5rem;
}
.list-buttons {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
  margin-bottom: 0.5rem;
}
.active {
  width: 98% !important;
}
</style>