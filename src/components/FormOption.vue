<template>
  <Card :title="input.title">
    <template v-slot:content>
      <p v-if="input.body">{{ input.body }}</p>
    </template>
    <template v-slot:actions>
      <button v-for="o in input.options" :key="o" @click="() => answer(o)">
        {{ o }}
      </button>
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
    answer(which) {
      this.$emit("update:output", which);
      this.$emit("next");
    }
  }
};
</script>

<style></style>
