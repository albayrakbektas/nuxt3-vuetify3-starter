<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col items-center" style="background: #b28d49">
    <img src="/reservation_img.jpeg" alt="Resim" class="w-full" style="height: 10rem; width: 100vw" />

    <div class="flex justify-between p-2 w-100 align-center">
      <div class="w-2/5">
        <h1 class="text-xl">Menü</h1>
      </div>
      <div class="w-3/5">
        <input type="text" placeholder="Ara" class="w-full px-4 py-2 rounded" />
      </div>
    </div>

    <div class="flex justify-between w-100 mt-4">
      <div class="w-2/5">
        <v-btn>
          Button-1
        </v-btn>
        <v-btn>
          Button-2
        </v-btn>
      </div>
      <div class="w-3/5">
        <h2 class="text-lg">Sağ İçerik</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
v-btn {
  border-bottom-left-radius: 0 !important;
}
</style> 