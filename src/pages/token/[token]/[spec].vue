<template>
  <Layout> </Layout>
</template>

<script>
export default {
  async mounted() {
    const { token, spec } = this.$route.params;
    localStorage.setItem("token", token);
    this.$router.push(`/${spec}`);
  },
  metaInfo: {
    title: "Token"
  }
};
</script>
<style scoped>
.card {
  max-width: 400px;
  margin: 0 auto;
}
.circle {
  margin-bottom: 40px;
  margin-top: 100px;
}
.actions {
  margin-top: 20px;
}
</style>
