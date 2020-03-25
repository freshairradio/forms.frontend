<template>
  <div :class="{ card: true, loading }">
    <div class="heading">
      <h2>
        {{ title }}
        <span class="error" v-if="error">{{ error }}</span>
      </h2>
    </div>
    <div class="content" :style="{ 'padding-top': `${contentPadding || 0}px` }">
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
  props: ["loading", "title", "error", "contentPadding"]
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
  padding: 0px 20px 0px 20px;
}
.card .actions {
  display: flex;
  margin-top: 15px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
}
.card .actions button,
.card .actions .button {
  flex-grow: 1;
  border-radius: 8px;
  background: transparent;
  text-align: center;
}
.card .actions button:hover,
.card .actions .button:hover {
  background: black;
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
