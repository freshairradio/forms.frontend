<template>
  <textarea
    ref="textarea"
    rows="1"
    :style="{ height: height ? `${height}px` : 'auto' }"
    :placeholder="placeholder"
    :value="text"
    @input="resize"
  />
</template>

<script>
export default {
  props: ["text", "type", "placeholder"],
  data() {
    return {
      height: 0
    };
  },
  methods: {
    resize(e) {
      this.$emit("update:text", e.target.value);
      this.height = 0;
      this.$nextTick(() => {
        this.height = this.$refs.textarea.scrollHeight - 16;
      });
    }
  }
};
</script>

<style scoped>
input,
textarea {
  display: block;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px;
  color: black;
  margin: 10px 0px;
  width: calc(100% - 16px);
  font-size: 21px;
}
textarea {
  resize: none;
}
</style>
