<template>
  <div class="coming-soon-container">
    <h1>Çok Yakında Hizmetinizdeyiz</h1>
    <p>Web sitemizin yeni sürümü üzerinde çalışıyoruz. Lütfen daha sonra tekrar kontrol edin.</p>
  </div>
</template>

<script setup>
const submit = async () => {};
</script>

<style scoped>
.coming-soon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  background: url('/the_port_pub.png') no-repeat center center fixed;
  background-size: cover;
}

h1 {
  margin-bottom: 120px;
}
</style>
