<template>
  <Card
    :title="input.title"
    :loading="loading"
    :error="error"
    :contentPadding="input.body ? 0 : 10"
  >
    <template v-slot:content>
      <p v-if="input.body" style="padding-bottom:10px">{{ input.body }}</p>

      <Item
        :active="selected == item.slug"
        @click.native="() => select(item.slug)"
        :name="item.name"
        :pic="item.pic"
        :slug="item.slug"
        :key="item.slug"
        v-for="item in data"
        :half="data.length > 5"
      />
    </template>
    <template v-slot:actions>
      <button @click="next" v-if="selected">{{ cont }}</button>
    </template>
  </Card>
</template>

<script>
import Card from "~/components/Card.vue";
import Item from "~/components/Item.vue";

export default {
  props: ["input", "output"],
  components: {
    Card,
    Item
  },
  data() {
    return {
      selected: this.output || "",
      loading: false,
      error: false,
      data: []
    };
  },
  watch: {
    input(n) {
      this.load();
    },
    output(n) {
      this.selected = n || "";
    }
  },
  methods: {
    async load() {
      this.loading = true;
      let data = await fetch(this.input.source, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token")
        }
      }).then(r => r.json());
      this.loading = false;
      this.data = data;
    },
    next(which) {
      this.$emit("update:output", this.selected);
      this.$emit("next");
    },
    select(which) {
      this.selected = which;
    }
  },
  mounted() {
    this.load();
  },
  computed: {
    cont() {
      return this.input.continue || "Continue";
    }
  }
};
</script>
