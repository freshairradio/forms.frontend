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
body {
  background: linear-gradient(
    -45deg,
    rgba(204, 83, 51, 0.8),
    #1488cc,
    #2b32b2,
    #c31432,
    rgba(35, 7, 77, 0.8),
    #240b36,
    #f12711,
    #f5af19,
    #659999,
    #f4791f,
    #8360c3,
    #2ebf91,
    #009fff,
    #ec2f4b
  );
  background-size: 700% 700%;
  animation: gradient 100s ease infinite;
  min-height: 100vh;
  margin: 0px;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
html {
  margin: 0;
  padding: 0;
  font-size: 21px;
  line-height: 1.45;
}
html {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

h1 {
  margin: 0px;
  font-size: 28px;
  color: black;
}
h2 {
  margin: 0px;
  margin-top: 10px;
  font-size: 36px;
  font-weight: 100;
  color: black;
  line-height: 1.2;
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
  background: rgba(255, 255, 255, 0.2);
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
@import url('https://rsms.me/inter/inter.css');
html,
textarea {
  font-family: 'Inter', sans-serif;
}
@supports (font-variation-settings: normal) {
  html,
  textarea {
    font-family: 'Inter var', sans-serif;
  }
}
</style>
