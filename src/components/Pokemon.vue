<template>
  <div>
    <p>
      {{ name }}
    </p>

    <img :src="front_default" :alt="`${name} sprite`" />

    <!-- 
    <div>
      <p>
        {{ weight }}
      </p>

      <p>
        {{ height }}
      </p>
    </div>

    <p v-for="(value, index) in mappedStats(stats)" :key="`stat${index}`">
      {{ value }}
    </p>
    -->
  </div>
</template>

<script>
export default {
  props: {
    pokemonData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name() {
      return this.pokemonData.name;
    },
    front_default() {
      return this.pokemonData.front_default;
    },
    weight() {
      return this.pokemonData.weight;
    },
    height() {
      return this.pokemonData.height;
    },
    stats() {
      return this.pokemonData.stats;
    },
  },
  methods: {
    mappedStats(stat) {
      return stat.map((stat) => {
        const {
          base_stat,
          stat: { name },
        } = stat;
        return `${name}: ${base_stat}`;
      });
    },
  },
};
</script>

<style>
</style>