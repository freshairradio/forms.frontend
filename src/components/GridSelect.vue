<template>
  <div class="grid-select">
    <div class="grid-headerbar">
      <div
        :key="i"
        class="grid-item title"
        v-for="i in [`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`]"
      >
        {{ i }}
      </div>
    </div>
    <div class="grid-selections">
      <div
        :key="row + '' + idx"
        class="grid-item"
        :active="scheduled.find(s => s[0] == row && s[1] == idx)"
        v-for="(row, idx) in rows"
        @click="() => schedule(row, idx)"
      >
        {{ row }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hours", "scheduled"],

  methods: {
    schedule(i, idx) {
      if (!this.scheduled.includes([i, idx])) {
        this.$emit("update:scheduled", [[i, idx], ...this.scheduled]);
      } else {
        this.$emit(
          "update:scheduled",
          this.scheduled.filter(s => s[0] != i && s[1] != idx)
        );
      }
    }
  },
  computed: {
    formattedHours() {
      return this.hours.map(h => {
        if (h == 0) {
          return "12am";
        }
        if (h == 12) {
          return "12pm";
        }
        if (h < 12) {
          return `${h}am`;
        } else {
          return `${h - 12}pm`;
        }
      });
    },
    rows() {
      return this.formattedHours.map(h => [...new Array(7)].map(u => h)).flat();
    }
  }
};
</script>

<style scoped>
.grid-select {
  margin-top: 10px;
}
.grid-select .grid-headerbar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: black;
  padding: 10px 20px;
  border-radius: 8px 8px 0px 0px;
}
.grid-select .grid-selections {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #eee;
  padding: 10px 20px;
  border-radius: 0px 0px 8px 8px;
}
.grid-select .grid-item {
  text-align: center;
  font-size: 18px;
  padding: 4px;
  margin: 2px;
  border-radius: 8px;
  cursor: pointer;
}
.grid-select .grid-item:hover {
  background: rgba(250, 165, 58, 0.2);
}
.grid-select .grid-item[active] {
  background: rgba(250, 165, 58, 0.2);
}
.grid-select .grid-item.title:hover {
  background: initial;
}
.grid-select .grid-item.title {
  color: white;
  font-weight: bold;
  padding: 0px;
  cursor: initial;
}
</style>
