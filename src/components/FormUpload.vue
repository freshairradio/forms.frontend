<template>
  <Card :title="input.title" :contentPadding="input.body ? 0 : 10">
    <template v-slot:content>
      <p v-if="input.body">{{ input.body }}</p>

      <file-pond
        name="upload"
        ref="pond"
        class-name="my-pond"
        :label-idle="input.prompt"
        :accepted-file-types="input.contentType"
        :server="{
          process: input.url,
          fetch: null,
          revert: null
        }"
        @processfile="file_uploaded"
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
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";
import FilePondPluginImagePreview from "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js";
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

import Card from "~/components/Card.vue";

export default {
  props: ["input", "output"],
  components: {
    Card,
    FilePond
  },
  data() {
    return {
      selected: this.output || this.selected
    };
  },

  methods: {
    next(which) {
      this.$emit("update:output", this.selected);
      this.$emit("next");
    },
    file_uploaded(err, file) {
      this.selected = file.serverId;
    }
  },

  computed: {
    cont() {
      return this.input.continue || "Continue";
    }
  }
};
</script>
<style>
.filepond--root {
  cursor: pointer;
}

.filepond--panel-root {
  border-radius: 8px;
}

/* the border radius of the file item */
.filepond--item-panel {
  border-radius: 8px;
}
.filepond--wrapper {
  margin-top: 10px;
}
</style>
