<template>
  <div class="form">
    <div id="info-bar">
      <button
        @click="() => back(focused)"
        v-if="
          focused &&
            spec[focused].type != 'first' &&
            spec[focused].type != 'last'
        "
      >
        Back
      </button>
      <h1>
        {{
          Object.keys(spec).length == 0
            ? 0
            : Math.round(
                (Object.keys(spec).indexOf(focused) /
                  (Object.keys(spec).length - 1)) *
                  100
              )
        }}% &mdash; {{ name }}
      </h1>
    </div>
    <component
      :is="typeToComponent[spec[focused].type]"
      v-if="focused"
      :input="spec[focused]"
      :output.sync="form[focused]"
      @next="() => next(focused)"
    />
  </div>
</template>
<script>
import FormInformation from "~/components/FormInformation.vue";
import FormOption from "~/components/FormOption.vue";
import FormSelect from "~/components/FormSelect.vue";
import FormInput from "~/components/FormInput.vue";
import FormUpload from "~/components/FormUpload.vue";
import FormFilter from "~/components/FormFilter.vue";
import FormAvailability from "~/components/FormAvailability.vue";
import FormLast from "~/components/FormLast.vue";
import FormFirst from "~/components/FormFirst.vue";

export default {
  props: ["spec", "name"],
  components: {
    FormInformation,
    FormOption,
    FormSelect,
    FormInput,
    FormUpload,
    FormFilter,
    FormAvailability,
    FormFirst,
    FormLast
  },
  methods: {
    evaluateLogic(obj) {
      const logic = obj.logic;
      if (logic == "start") {
        return true;
      }
      return this.operatorLogic(logic);
    },
    operatorLogic(obj) {
      let ops = Object.keys(obj);
      if (ops.length > 1) {
        console.error("Too many operations in", obj);
        return false;
      }
      switch (ops[0]) {
        case "$exists":
          return this.form[obj[ops[0]]];
        case "$equal":
          let keys = Object.keys(obj["$equal"]);
          return keys.every(k => this.form[k] == obj["$equal"][k]);
        case "$nequal":
          let nkeys = Object.keys(obj["$nequal"]);
          return nkeys.every(k => this.form[k] != obj["$nequal"][k]);
        case "$any":
          if (Array.isArray(obj["$any"])) {
            console.log(
              obj["$any"],
              obj["$any"].some(k => this.form[k])
            );
            return obj["$any"].some(k => this.form[k]);
          } else {
            return Object.keys(obj["$any"]).some(k =>
              this.operatorLogic({
                [k]: obj["$any"][k]
              })
            );
          }
      }
    },
    next(type) {
      console.log(type);

      this.focused = Object.keys(this.spec).find(k => {
        return (
          (typeof this.spec[k].after == "string"
            ? type == this.spec[k].after
            : this.spec[k].after.includes(type)) &&
          this.evaluateLogic(this.spec[k])
        );
      });
      console.log(this.focused);
      this.path = [...this.path, type];
      if (this.spec[this.focused].type == "last") {
        this.form[this.focused] = true;
        this.$emit("sync", { data: this.form, path: this.path });
      }
    },
    back(type) {
      console.log("Back");
      this.path = this.path.slice(0, this.path.length - 1);
      if (this.path.length == 0) {
        return this.start();
      } else {
        this.next(this.path.slice(-1)[0]);
        this.path = this.path.slice(0, this.path.length - 1);
      }
    },
    start() {
      if (this.done) {
        this.focused = "finished";
      } else {
        this.focused = Object.keys(this.spec).find(
          k => this.spec[k].type == "first"
        );
      }
    }
  },
  mounted() {
    let initial = {};
    Object.keys(this.spec).forEach(key => {
      initial[key] = null;
    });
    this.form = initial;
    this.start();
  },
  data() {
    return {
      form: {},
      focused: "",
      path: []
    };
  },
  computed: {
    keys() {
      return Object.keys(this.spec);
    },

    typeToComponent() {
      return {
        information: "FormInformation",
        option: "FormOption",
        select: "FormSelect",
        input: "FormInput",
        upload: "FormUpload",
        filter: "FormFilter",
        availability: "FormAvailability",
        last: "FormLast",
        first: "FormFirst"
      };
    }
  }
};
</script>

<style scoped>
.form {
  display: grid;
  justify-items: center;
  align-items: center;
  min-height: 100vh;
}
.card {
  max-width: 500px;
  width: calc(100% - 40px);
  margin: 80px 20px;
}

.card[disabled] {
  display: none;
}
#info-bar {
  position: absolute;
  top: 0px;
  height: 80px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content auto 1fr;
}
#info-bar h1 {
  margin: 0px 20px;
  color: white;
  height: 80px;
  display: inline-block;
  grid-column: 3;
  font-weight: normal;
  font-size: 24px;
  justify-content: center;
  align-content: center;
  display: grid;
}

#info-bar button {
  line-height: 40px;

  height: 40px;
  padding: 0px 20px;
  border-radius: 8px;
  margin: 20px 20px;
  display: inline-block;
  grid-column: 2;
}

#info-bar button:hover {
  background: rgb(255, 255, 255, 1);
  color: black!important;
}
</style>
