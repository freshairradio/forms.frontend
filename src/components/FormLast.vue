<template>
  <Card :title="input.title">
    <template v-slot:content>
      <p v-if="input.body">{{ input.body }}</p>
    </template>
    <template v-slot:actions> </template>
  </Card>
</template>

<script>
import Card from "~/components/Card.vue";

export default {
  props: ["input", "output"],
  components: {
    Card
  }
};
</script>

<style></style>
