<script setup lang="ts">
import { ref, reactive } from 'vue';

const drinks = [
  {
    type: 'Biralar',
    items: [
      { name: 'Carlsberg', description: 'Şişe', price: '65', imgSrc: 'carlsberg.jpeg' },
      { name: 'Tuborg', description: '%100 Malt', price: '60', imgSrc: 'tuborg_gold.jpeg' },
    ],
  },
  {
    type: 'Kokteyller',
    items: [
      { name: 'Long Island', description: 'Vodka, Rom, Cin, Tekila, Portakal likörü, kola, limon', price: '200', imgSrc: 'long_island.jpeg' },
      { name: 'Mojito', description: 'Rom, esmer şeker, nane, lime, soda', price: '150', imgSrc: 'mojito.jpeg' },
      { name: 'Cosmopolitan', description: 'Vodka, portakal likörü, kızılcık suyu, limon suyu', price: '150', imgSrc: 'cosmopolitan.jpeg' },
      { name: 'Cuba Libre', description: 'Rom, kola, limon suyu', price: '150', imgSrc: 'cuba_libre.jpeg' },
      { name: 'Tom Collins', description: 'Cin, tatlı ve ekşi, soda', price: '150', imgSrc: 'tom_collins.jpeg' },
      { name: 'Tequila Sunrise', description: 'Tekila, portal likörü, portakal suyu, nar şurubu', price: '160', imgSrc: 'tequila_sunrise.jpeg' },
      { name: 'Lynchburg Lemonade', description: 'Viski, portakal likörü, sprite, limon suyu', price: '150', imgSrc: 'lynchburg_lemonade.jpeg' },
    ],
  },
  {
    type: 'Shotlar',
    items: [
      { name: 'Tequila', description: 'Sombrero, Olmeca', price: '70', imgSrc: 'tequila_shot.jpeg' },
      { name: 'Viski', description: 'Chivas, Jack Daniels, Red Label, Black Label, Vat69', price: '75', imgSrc: 'whiskey_shot.webp' },
      { name: 'Vodka', description: 'Votka 1967', price: '60', imgSrc: 'tequila_shots.jpeg' },
      { name: 'Rom', description: 'Captain Morgan, Bacardi', price: '60', imgSrc: 'tequila_shots.jpeg' },
      { name: 'Cin', description: 'Gilbey\'s, Gordon\'s', price: '60', imgSrc: 'tequila_shots.jpeg' },
      { name: 'Likör', description: 'Jagermeister', price: '65', imgSrc: 'jager_shot.jpeg' },
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
  <div class="flex flex-col items-center" style="background: #b28d49; min-height: 100vh">
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
            <p class="text-sm giveMeEllipsis" :class="{'giveMeEllipsisDesktop': selectedItem.name === item.name && selectedItem.active}">{{ item.description }}</p>
            <p class="text-xs text-gray-500">{{ item.price }} TL</p>
          </div>
          <img
            :class="['h-100 object-cover', selectedItem.name === item.name && selectedItem.active ? 'w-100' : 'w-33']"
            :src="'/' + item.imgSrc"
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
.giveMeEllipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-height: 1.2rem; /* fallback */
  max-height: 3rem; /* fallback */
}
.giveMeEllipsisDesktop {
  -webkit-line-clamp: 5;
}
</style>