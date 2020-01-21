<template>
  <Card :title="input.title" :loading="loading" :error="error">
    <template v-slot:content>
      <p v-if="input.body">{{ input.body }}</p>

      <Item
        :name="item.name"
        :pic="item.pic"
        :slug="item.slug"
        :key="'small' + item.slug"
        v-for="item in inflatedSelection"
        :small="true"
      />
      <Input
        :text.sync="filter"
        type="text"
        placeholder="Start typing to find..."
      />
      <Item
        :active="selected == item.slug"
        @click.native="() => select(item.slug)"
        :name="item.name"
        :pic="item.pic"
        :slug="item.slug"
        :key="item.slug"
        v-for="item in filtered"
      />
    </template>
    <template v-slot:actions>
      <button @click="next" v-if="selected">
        {{ cont }}
      </button>
    </template>
  </Card>
</template>

<script>
import Card from "~/components/Card.vue";
import Item from "~/components/Item.vue";
import Input from "~/components/Input.vue";
import Fuse from "fuse.js";

export default {
  props: ["input", "output"],
  components: {
    Card,
    Item,
    Input
  },
  data() {
    return {
      selected: this.output || [],
      filter: ""
    };
  },
  methods: {
    next(which) {
      this.$emit("update:output", this.selected);
      this.$emit("next");
    },
    select(slug) {
      if (this.selected.includes(slug)) {
        this.selected = this.selected.filter(s => s != slug);
      } else {
        this.selected = [slug, ...this.selected];
      }
    }
  },
  mounted() {
    this.$store.dispatch(`${this.input.source}Load`);
  },
  computed: {
    inflatedSelection() {
      return this.selected
        .map(s => this.data.find(d => d.slug == s))
        .filter(e => e);
    },
    cont() {
      return this.input.continue || "Continue";
    },
    loading() {
      return this.$store.state[this.input.source].loading;
    },
    error() {
      return this.$store.state[this.input.source].error;
    },
    data() {
      return this.$store.state[this.input.source].data || [];
    },
    filtered() {
      if (!this.data || this.filter.length < 3) {
        return [];
      }

      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["name"]
      };
      const fuse = new Fuse(this.data, options); // "list" is the item array
      const result = fuse.search(this.filter);
      return result;
    }
  }
};
</script>
