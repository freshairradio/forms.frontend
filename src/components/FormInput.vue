<template>
  <Card :title="input.title">
    <template v-slot:content>
      <p v-if="input.body">{{ input.body }}</p>

      <Input
        :key="idx"
        v-for="(inp, idx) in input.inputs"
        :text.sync="form[inp.key]"
        :type="inp.type"
        :placeholder="inp.placeholder"
      />
    </template>
    <template v-slot:actions>
      <button @click="next">{{ cont }}</button>
    </template>
  </Card>
</template>

<script>
import Card from "~/components/Card.vue";
import Input from "~/components/Input.vue";

export default {
  props: ["input", "output"],
  components: {
    Card,
    Input
  },
  mounted() {
    let form = {};
    this.input.inputs.forEach(i => {
      form[i.key] = this.output ? this.output[i.key] || "" : "";
    });
    this.form = form;
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    next() {
      this.$emit("update:output", this.form);
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
