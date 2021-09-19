<template>
  <div :class="{ card: true, loading }">
    <div class="heading">
      <h2>
        {{ title }}
        <span class="error" v-if="error">{{ error }}</span>
      </h2>
    </div>
    <div class="content" :style="{ 'padding-top': `10px` }">
      <slot name="content"></slot>
    </div>

    <div class="actions">
      <slot name="actions"></slot>
    </div>
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  props: ["loading", "title", "error", "contentPadding"],
};
</script>

<style scoped>
.card {
  width: 440px;
  background: white;
  border-radius: 8px;
  position: relative;
}
.card .heading {
  padding: 10px 20px 0px 20px;
}
.card .content {
  padding: 20px 20px 0px 20px;
}
.card .actions {
  display: flex;
  cursor: pointer;
  margin: 15px;
  border-radius: 8px;
}
.card .actions button,
.card .actions .button {
  flex-grow: 1;
  border-radius: 8px;
  padding: 10px 0px;
  margin: 5px;
  color: white;
  text-align: center;
  text-decoration:none;
  animation: gradient 30s ease infinite;
  background: linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-transition: background .5s ease-out;
  -moz-transition: background .5s ease-out;
  -o-transition: background .5s ease-out;
  transition: background .5s ease-out;

  -webkit-transition: color .3s ease-out;
  -moz-transition: color .3s ease-out;
  -o-transition: color .3s ease-out;
  transition: color .3s ease-out;
}
.card .actions button:hover,
.card .actions .button:hover {
  background: rgba(104, 104, 104, 0.5);
  color: black!important;
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

.card * {
  opacity: 1;
  transition: opacity 0.2s;
}
.card.loading * {
  opacity: 0;
  pointer-events: none;
}
.loader {
  display: none;
}
.card.loading .loader {
  opacity: 1;
  display: block;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.card .loader {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 5px dotted rgba(255, 148, 33, 1);
  animation: spinner 2s linear infinite;
  position: absolute;
  opacity: 0;
  left: calc(50% - 15px);
  top: calc(50% - 15px);
}
.card .error {
  font-size: 21px;
  color: red;
  font-style: italic;
  vertical-align: middle;
  font-weight: normal;
}
</style>
