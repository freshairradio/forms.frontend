<template>
  <div class="layout">
    <main>
      <slot />
    </main>
  </div>
</template>
<script>
export default {};
</script>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
p:first-of-type {
  margin-top: 0px;
}
p:last-of-type {
  margin-bottom: 0px;
}
body,
html {
  margin: 0;
  padding: 0;
  font-size: 21px;
  line-height: 1.45;
  background: #faa53a;
}

h1 {
  margin: 0px;
  font-size: 28px;
  color: black;
}
h2 {
  margin: 0px;
  font-size: 24px;
  color: black;
}
h3 {
  margin: 0px;
  font-size: 21px;
  font-weight: normal;
  color: black;
  padding: 0px 10px;
}

button,
.button {
  text-decoration: none;
  background: black;
  font-size: 21px;
  border: none;
  border-radius: 200px;
  padding: 8px 20px;
  color: white;
  cursor: pointer;
  display: inline-block;
}

.circle {
  width: 210px;
  height: 210px;
  margin: 20px auto;
  border-radius: 100%;
  background: white;
}
.circle img {
  width: 210px;
  height: 210px;
  border-radius: 100%;
}
</style>
<style>
@import url("https://rsms.me/inter/inter.css");
html {
  font-family: "Inter", sans-serif;
}
@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}
</style>
