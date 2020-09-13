<template>
  <Layout>
    <Form :spec="spec" v-if="spec" @sync="sync" :name="name" />
    <h2 class="me" v-if="person_name">{{ person_name }}</h2>
    <a class="problems" href="mailto:webmaster@freshair.radio">Need help?</a>
  </Layout>
</template>

<script>
// Import FilePond

import Form from "~/components/Form.vue";
import Card from "~/components/Card.vue";
export default {
  metaInfo: {
    title: "Freshair Forms"
  },
  components: {
    Form
  },
  async mounted() {
    const { slug } = this.$route.params;

    let spec = await fetch(
      `https://forms.api.freshair.radio/spec/${slug}`
    ).then((r) => r.json());
    console.log(spec);
    this.slug = slug;
    this.spec = spec.spec;
    this.name = spec.name;
  },
  methods: {
    async sync(data) {
      try {
        let spec = await fetch(
          `https://forms.api.freshair.radio/submit/${this.slug}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        );
        if (spec.status != 200) {
          alert(
            "Something went wrong, please contact webmaster@freshair.radio"
          );
        }
      } catch (e) {
        alert("Something went wrong, please contact webmaster@freshair.radio");
      }
    }
  },

  data() {
    return {
      slug: "",
      spec: null,
      name: "",
      person_name: null,
      error: false
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
.me {
  position: fixed;
  z-index: 90;
  bottom: 10px;
  left: 20px;
  color: white;
}
.problems {
  position: fixed;
  z-index: 90;
  bottom: 10px;
  right: 20px;
  color: white;
}
</style>
