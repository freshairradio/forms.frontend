<template>
  <div
    :class="{
      item: true,
      active,
      small,
      half
    }"
  >
    <div class="circle">
      <img :src="pic || '/FreshairLogoColour.svg'" />
    </div>
    <h3>{{ name }}</h3>
  </div>
</template>

<script>
export default {
  props: ["active", "pic", "name", "slug", "small", "half"]
};
</script>

<style>
.item {
  display: grid;
  grid-template-columns: 40px 1fr;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}
.item.half {
  grid-template-columns: 30px 1fr;
  padding: 6px 6px;
}
.item.small {
  cursor: initial;
  display: inline-grid;
  grid-template-columns: 20px 1fr;
  padding: 6px 6px;
}
.item.small:hover {
  background: initial;
}
.item.small .circle,
.item.small img {
  height: 20px;
  width: 20px;
}
.item.half .circle,
.item.half img {
  height: 30px;
  width: 30px;
}
.item.half h3 {
  font-size: 18px;
  line-height: 30px;
  padding: 0px 6px;
}
.item.small h3 {
  font-size: 14px;
  line-height: 20px;
  padding: 0px 6px;
}
.item:hover,
.item.active {
  background: rgba(250, 165, 58, 0.2);
}
.item .circle {
  height: 40px;
  width: 40px;

  background: white;
  border-radius: 100%;
  margin: 0px;
}

.item img {
  object-fit: cover;
  height: 40px;
  width: 40px;
  display: block;
  border-radius: 100%;
}
.item h3 {
  line-height: 40px;
}
.item + .item {
  margin-top: 10px;
}
.item.half + .item.half {
  margin-top: 5px;
}
.item.small + .item.small {
  margin-top: 0px;
}
</style>
