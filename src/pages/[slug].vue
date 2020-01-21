<template>
  <Layout>
    <Form :spec="spec" v-if="spec" @sync="sync" :name="name" />
    <h2 class="me" v-if="person_name">{{ person_name }}</h2>
    <a class="problems" href="mailto:webmaster@freshair.org.uk">Need help?</a>
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

    if (!localStorage.getItem("token")) {
      window.location = `https://auth.freshair.org.uk/for/forms/${slug}`;
      return;
    }
    let me = await fetch(`https://auth.api.freshair.org.uk/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("token")
      }
    }).then(r => r.json());
    if (!me.ok) {
      console.error("Huh?");
      window.location = `http://auth.freshair.org.uk/force/forms/${slug}`;
      return;
    } else {
      this.person_name = me.name;
      console.log(me.name);
    }
    let spec = await fetch(
      `https://forms.api.freshair.org.uk/spec/${slug}`
    ).then(r => r.json());
    console.log(spec);
    this.slug = slug;
    this.spec = spec.spec;
    this.name = spec.name;
  },
  methods: {
    async sync(data) {
      let spec = await fetch(
        `https://forms.api.freshair.org.uk/submit/${this.slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem("token")
          },
          body: JSON.stringify(data)
        }
      ).then(r => r.json());
    }
  },

  data() {
    return {
      slug: "",
      spec: null,
      name: "",
      person_name: null
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
