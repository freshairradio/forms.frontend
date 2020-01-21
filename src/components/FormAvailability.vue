<template>
  <Card :title="input.title">
    <template v-slot:content>
      <p v-if="input.body">{{ input.body }}</p>
      <GridSelect :hours="input.options" :scheduled.sync="scheduled" />
    </template>
    <template v-slot:actions>
      <button @click="next">{{ cont }}</button>
    </template>
  </Card>
</template>

<script>
import Card from "~/components/Card.vue";
import GridSelect from "~/components/GridSelect.vue";

export default {
  props: ["input", "output"],
  components: {
    Card,
    GridSelect
  },

  data() {
    return {
      scheduled: this.output || []
    };
  },
  methods: {
    next() {
      this.$emit("update:output", this.scheduled);
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
