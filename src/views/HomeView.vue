<template>
  <div class="Home">
    <Navbar />
    <div class="container mt-4">
      <div v-if="serverError">
        <div class="alert alert-danger w-75">
          {{ serverError }}
        </div>
      </div>
      <div v-if="!serverError">
        <div v-if="loader" class="d-flex justify-content-center">
          <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-if="!loader" id="content">
          <div class="m-3 p-2 bg-light rounded-4 border pb-4">
            <h3 class="ms-4 mt-3 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                class="bi bi-star-fill me-1 mb-2" viewBox="0 0 16 16">
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              Best coins :
            </h3>
            <hr>
            <div class="row">
              <div v-for="(coin, index) in bestCoins" :key="index" class="col-md-3">
                <div class="card rounded-4 mt-3 me-2 ms-2 coin-item" @click="pushCoin(coin.id)">
                  <div class="card-body p-2 d-flex justify-content-start align-items-center">
                    <div class="ms-3 p-2 bg-light rounded-circle border position-relative">
                      <img class="img-fluid" :src="coin.image.large" :alt="coin.symbol" width="40">
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {{ coin.market_cap_rank }}
                        <span class="visually-hidden">coin rank</span>
                      </span>
                    </div>
                    <div class="mt-3 ms-3">
                      <h5 class="mb-0">{{ coin.name }}</h5>
                      <p class="text-muted mt-0">{{ coin.symbol }} | $ {{ coin.market_data.current_price.usd }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m-3 p-2 bg-light rounded-4 border pb-4">
            <h3 class="ms-4 mt-3 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                class="bi bi-heart-fill mb-2 me-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg>
              Trending :
            </h3>
            <hr>
            <div>
              <ul class="list-group list-group-horizontal mt-1 me-2 ms-2 mb-3">
                <li class="list-group-item border-end-0 w-50">
                  Coin
                </li>
                <li class="list-group-item w-25 border-end-0">Symbol</li>
                <li class="list-group-item w-25 ">Rank</li>
              </ul>
              <ul class="list-group list-group-horizontal me-2 ms-2 mt-2 coin-item" v-for="(coin, index) in trendCoins" :key="index" @click="pushCoin(coin.item.id)">
                <li class="list-group-item border-end-0 w-50">
                  <img class="img-fluid me-2" :src="coin.item.small" :alt="coin.symbol" width="25">
                    <span class="mt-1">
                      {{ coin.item.name }}
                    </span>
                </li>
                <li class="list-group-item w-25 border-end-0">{{ coin.item.symbol }}</li>
                <li class="list-group-item w-25">{{ coin.item.market_cap_rank }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref } from '@vue/reactivity';
import { axios_ins } from '@/main'
import { useRouter } from 'vue-router';

const router = useRouter()
const bestCoins = ref([])
const trendCoins = ref([])
const loader = ref(true);
const serverError = ref("");

async function serverStatus() {
  axios_ins.get("ping")
    .then((response) => {
      if (response.gecko_says === "V3) To the Moon!") {
        return true;
      } else {
        return false;
      }
    })
}
async function getCoins() {
  loader.value = true;
  if (serverStatus()) {
    await axios_ins.get("coins/bitcoin")
      .then((response) => {
        bestCoins.value.push(response.data);
      })
    await axios_ins.get("coins/ethereum")
      .then((response) => {
        bestCoins.value.push(response.data);
      })
    await axios_ins.get("coins/dogecoin")
      .then((response) => {
        bestCoins.value.push(response.data);
      })
    await axios_ins.get("coins/cardano")
      .then((response) => {
        bestCoins.value.push(response.data);
      })
    await axios_ins.get("search/trending")
      .then((response) => {
        console.log(response)
        trendCoins.value= response.data.coins;
      })
  } else {
    serverError.value = "Server is OFF !"
  }
  loader.value = false;
}
function pushCoin(id) {
  router.push({name: 'singleCoin', params: {id: id}})
}

getCoins()

</script>

<style scoped>
div#content {
  margin-bottom: 100px;
}
.coin-item:hover {
  background-color: #8DB3FE;
  transition: background-color 0.5s;
  cursor: pointer;
}
.coin-item:hover li {
  background-color: #8DB3FE;
  transition: background-color 0.5s;
}
</style>