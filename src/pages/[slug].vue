<template>
  <Layout>
    <Form :spec="spec" v-if="spec" @sync="sync" :name="name" />
  </Layout>
</template>

<script>
// Import FilePond

import Form from "~/components/Form.vue";

export default {
  metaInfo: {
    title: "Freshair Forms"
  },
  components: {
    Form
  },
  async mounted() {
    const { slug } = this.$route.params;
    let spec = await fetch(`http://localhost:8764/spec/${slug}`).then(r =>
      r.json()
    );
    console.log(spec);
    this.slug = slug;
    this.spec = spec.spec;
    this.name = spec.name;
  },
  methods: {
    async sync(data) {
      let spec = await fetch(`http://localhost:8764/submit/${this.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      }).then(r => r.json());
    }
  },

  data() {
    return {
      slug: "",
      spec: null,
      name: ""
    };
  }
};
</script>

<style scoped>
h1.page-title {
  color: white;
  max-width: 500px;
  margin: 0 auto;
}
.container {
  display: grid;
  justify-items: center;
  align-items: center;
  height: 100vh;
}
</style>
