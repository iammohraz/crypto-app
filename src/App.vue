<template>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');

@font-face {
    font-family: vazir;
    src: url(./assets/font/Vazir.ttf);
}

#app {
  font-family: 'Ubuntu', vazir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav a.router-link-active {
  box-shadow: 3px 3px 8px #0000001c;
  background-color: #8DB3FE;
}
</style>
