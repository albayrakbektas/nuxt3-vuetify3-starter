<template>
  <v-app>
    <v-img class="position-absolute" src="/bar_bg.jpeg" height="100vh" width="100vw" cover></v-img>

    <v-container class="d-flex flex-column align-center justify-start custom-container">
      <div style="position: relative; height: 35vh; width: 100%">
        <v-img class="custom-img" src="/reservation_img.jpeg" height="35vh" width="100%" cover />
        <div class="brand-logo-container" style="position: absolute; width: 100%; top: 0">
          <div class="brand-logo-inner">
            <div class="brand-logo"></div>
          </div>
        </div>
      </div>
      <form class="w-50 mt-5" @submit.prevent="submit">
        <v-row class="my-3">
          <v-col class="my-3" cols="12">
            <v-text-field
              outlined
              hide-details
              class="custom-field"
              prepend-inner-icon="mdi-account"
              label="İsminiz"
              v-model="name"
            ></v-text-field>
          </v-col>
          <v-col class="my-3" cols="12">
            <v-text-field
              outlined
              hide-details
              class="custom-field"
              prepend-inner-icon="mdi-email"
              label="Mail adresinizi girin"
              v-model="email"
            ></v-text-field>
          </v-col>
          <v-col class="my-3" cols="12">
            <v-text-field
              outlined
              v-model="phone"
              hide-details
              class="custom-field"
              prepend-inner-icon="mdi-phone"
              label="Telefon numaranızı girin(Opsiyonel)"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="my-3">
          <v-col class="my-3" cols="6">
            <v-dialog transition="dialog-bottom-transition" width="auto">
              <template v-slot:activator="{ props }">
                <v-btn
                  prepend-icon="mdi-account-group-outline"
                  class="custom-btn w-100"
                  variant="outlined"
                  v-bind="props"
                >
                  {{ guests }} Kisi
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <div class="dialog-container">
                  <v-card>
                    <v-toolbar class="text-center" color="primary" title="Misafir Sayısı"
                      ><v-card-actions class="justify-end">
                        <v-btn
                          style="color: rgb(178, 141, 73); position: absolute"
                          variant="text"
                          @click="isActive.value = false"
                          >Close</v-btn
                        >
                      </v-card-actions></v-toolbar
                    >
                    <v-card-text
                      class="d-flex align-center justify-space-between text-white"
                      style="border: none"
                    >
                      <v-btn icon @click="decrementGuestCount">
                        <v-icon color="red">mdi-minus</v-icon>
                      </v-btn>
                      {{ guests }}
                      <v-btn icon @click="incrementGuestCount">
                        <v-icon color="green">mdi-plus</v-icon>
                      </v-btn>
                    </v-card-text>

                    <v-col class="my-3" cols="12">
                      <v-btn
                        type="button"
                        @click="isActive.value = false"
                        style="color: rgb(178, 141, 73)"
                        class="btn"
                        block
                      >
                        Onayla
                      </v-btn>
                    </v-col>
                  </v-card>
                </div>
              </template>
            </v-dialog>
          </v-col>
          <v-col class="my-3" cols="6">
            <v-dialog transition="dialog-bottom-transition" width="auto">
              <template v-slot:activator="{ props }">
                <v-btn
                  prepend-icon="mdi-calendar"
                  class="custom-btn w-100"
                  variant="outlined"
                  v-bind="props"
                >
                  {{ dateTime ? convert(dateTime) : "Tarih ve Saat" }}
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-text style="height: 80vh; width: 30vw">
                    <v-toolbar class="text-center" color="primary" title="Tarih Seçin"
                      ><v-card-actions class="justify-end">
                        <v-btn
                          style="color: rgb(178, 141, 73); position: absolute"
                          variant="text"
                          @click="isActive.value = false"
                          >Close</v-btn
                        >
                      </v-card-actions></v-toolbar
                    >
                    <vue-date-picker
                      auto-apply
                      @update:model-value="handleDateTime"
                      id="my-datepicker"
                      inline
                      :month-change-on-scroll="false"
                      class="justify-center"
                      v-model="dateTime"
                    ></vue-date-picker>
                  </v-card-text>
                  <v-col class="my-3" cols="12">
                    <v-btn
                      type="button"
                      @click="isActive.value = false"
                      style="color: rgb(178, 141, 73)"
                      class="btn"
                      block
                    >
                      Onayla
                    </v-btn>
                  </v-col>
                </v-card>
              </template>
            </v-dialog>
          </v-col>

          <v-col class="my-3" cols="12">
            <v-btn type="button" @click="submit" class="submit-btn" block>
              Rezervasyon isteği gönder
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
const name = ref("");
const email = ref("");
const phone = ref("");
const guests = ref(2);
const dateTime = ref("");
const emailRules = ref([
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

const submit = async () => {
  // Form verileri bir JSON nesnesi olarak gönderilir
  const formData = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    guests: guests.value,
    dateTime: dateTime.value,
  };
  try {
    // Fetch ile post isteği yapılıyor.
    const response = await fetch("https://theportpubserver.vercel.app/api/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.status === "success") {
      // İstek başarılıysa kullanıcıya başarı mesajı gösterilir
      alert("Rezervasyon isteğiniz başarıyla gönderildi.");
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Rezervasyon isteğiniz gönderilirken bir hata oluştu.");
  }
};

const incrementGuestCount = () => {
  guests.value++;
};

const decrementGuestCount = () => {
  if (guests.value > 1) {
    guests.value--;
  }
};
const handleDateTime = (modelData: string) => {
  dateTime.value = modelData;
};
const convert = (str: string) => {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
};
</script>


<style scoped>
.custom-container {
  position: relative;
  background-color: rgba(0, 0, 0, 1);
  height: 100vh;
  width: 50%;
  padding: 0;
}

.custom-img {
  margin: auto;
}

.custom-field {
  color: #b28d49 !important;
}

.custom-btn {
  color: rgb(178, 141, 73) !important;
  background-color: transparent !important;
  border: 1px solid rgb(178, 141, 73) !important;
}

.submit-btn {
  background-color: #ffffff !important;
  color: rgb(178, 141, 73) !important;
}

.custom-icon {
  color: rgb(178, 141, 73) !important;
}
.v-col {
  padding-bottom: 0;
  padding-top: 0;
  align-self: center;
}
.brand-logo-container {
  max-width: 800px;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)) center center / cover,
    url("https://1.image.cdn.tablecheck.com/unsafe/1920x500/smart/https%3A%2F%2Fcdn2.tablecheck.com%2Fbooking_themes%2F628300e…%2Fdark_banner_images%2Foriginal%2F7c3e9b53.jpg%3F1682671556");
  background-position: center center;
}
.brand-logo-inner {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100%;
}
.brand-logo {
  height: 100px;
  width: 100%;
  max-width: 240px;
  max-height: 100px;
  background: url("https://1.image.cdn.tablecheck.com/unsafe/fit-in/480x200/smart/https%3A%2F%2Fcdn0.tablecheck.com%2Fbooking_themes%2F628300e9c052c80045583631%2Fdark_logo_images%2Foriginal%2F3dbd0a33.png%3F1682671556")
    center center / contain no-repeat;
}
.v-card {
  background-color: #000000 !important;
}

.v-toolbar {
  background-color: transparent !important;
}
.v-card {
  width: 100vw !important;
}
@media (min-width: 768px) {
  .v-card {
    width: 25vw !important;
  }
}
@media (max-width: 768px) {
  .custom-container {
    width: 100vw;
  }

  form {
    width: 100% !important;
    padding-left: 2%;
    padding-right: 2%;
  }
  .v-card-text {
    width: 100vw !important;
    height: auto !important;
  }
}
</style>
