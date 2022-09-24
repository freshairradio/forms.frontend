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
          process: process,
          fetch: null,
          revert: null
        }"
        @processfile="file_uploaded"
      />
    </template>
    <template v-slot:actions>
      <button @click="next">
        {{ cont }}
      </button>
    </template>
  </Card>
</template>

<script>
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

import Card from '~/components/Card.vue';

export default {
  props: ['input', 'output'],
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
      this.$emit('update:output', this.selected || '');
      this.$emit('next');
    },
    file_uploaded(err, file) {
      this.selected = file.serverId;
    },
    async process(
      fieldName,
      file,
      metadata,
      load,
      error,
      progress,
      abort,
      transfer,
      options
    ) {
      if (this.input.contentType.every((c) => c.startsWith('image/'))) {
        const cf = await fetch(
          `https://freshair-forms-api.s.workers.dev/upload`
        ).then((r) => r.json());
        console.log(cf);
        // fieldName is the name of the input field
        // file is the actual file object to send
        const formData = new FormData();
        formData.append('file', file, file.name);

        const request = new XMLHttpRequest();
        request.open('POST', cf.result.uploadURL);

        // Should call the progress method to update the progress to 100% before calling load
        // Setting computable to false switches the loading indicator to infinite mode
        request.upload.onprogress = (e) => {
          progress(e.lengthComputable, e.loaded, e.total);
        };

        // Should call the load method when done and pass the returned server file id
        // this server file id is then used later on when reverting or restoring a file
        // so your server knows which file to return without exposing that info to the client
        request.onload = function() {
          if (request.status >= 200 && request.status < 300) {
            // the load method accepts either a string (id) or an object
            load(cf.result.id);
          } else {
            // Can call the error method if something is wrong, should exit after
            error('oh no');
          }
        };

        request.send(formData);

        // Should expose an abort method so the request can be cancelled
        return {
          abort: () => {
            // This function is entered if the user has tapped the cancel button
            request.abort();

            // Let FilePond know the request has been cancelled
            abort();
          }
        };
      } else {
        // fieldName is the name of the input field
        // file is the actual file object to send
        const formData = new FormData();
        formData.append('file', file, file.name);

        const request = new XMLHttpRequest();
        request.open(
          'PUT',
          `https://freshair-forms-api.s.workers.dev/upload-audio`
        );

        // Should call the progress method to update the progress to 100% before calling load
        // Setting computable to false switches the loading indicator to infinite mode
        request.upload.onprogress = (e) => {
          progress(e.lengthComputable, e.loaded, e.total);
        };

        // Should call the load method when done and pass the returned server file id
        // this server file id is then used later on when reverting or restoring a file
        // so your server knows which file to return without exposing that info to the client
        request.onload = function(e) {
          if (request.status >= 200 && request.status < 300) {
            // the load method accepts either a string (id) or an object
            load(JSON.parse(request.response).key);
          } else {
            // Can call the error method if something is wrong, should exit after
            error('oh no');
          }
        };

        request.send(formData);

        // Should expose an abort method so the request can be cancelled
        return {
          abort: () => {
            // This function is entered if the user has tapped the cancel button
            request.abort();

            // Let FilePond know the request has been cancelled
            abort();
          }
        };
      }
    }
  },

  computed: {
    cont() {
      return this.input.continue || 'Continue';
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
