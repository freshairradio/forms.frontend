<template>
  <Card :title="input.title">
    <template v-slot:content>
      <p v-if="input.body" v-html="input.body"></p>
    </template>
    <template v-slot:actions>
      <button @click="next">{{ cont }}</button>
    </template>
  </Card>
</template>

<script>
import Card from "~/components/Card.vue";

export default {
  props: ["input", "output"],
  components: {
    Card
  },
  methods: {
    next() {
      this.$emit("update:output", this.cont);
      this.$emit("next");
    }
  },
  computed: {
    cont() {
      return this.input.continue || "Continue";
    }
  }
};
</script>

<style></style>
