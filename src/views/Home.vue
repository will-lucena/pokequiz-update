<template>
  <div class="hello">
    <Question
      v-if="isPokemonDataLoaded"
      :pokemonData="randomPokemon"
      @next="onNext"
    />
  </div>
</template>

<script>
import { getRandomPokemons, getPokemonData } from "@/api/pokeApi";
import Question from "@/components/Question";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Question,
  },
  data() {
    return {
      pokemons: [],
      isPokemonDataLoaded: false,
      currentIndex: 0,
      randomPokemon: undefined,
    };
  },
  mounted() {
    this.populatePokemons();
  },
  methods: {
    async populatePokemons() {
      const results = await getRandomPokemons(10);
      await results.forEach(async ({ name: pokemon }) => {
        const {
          name,
          weight,
          height,
          sprites: { front_default },
          stats,
          base_experience,
        } = await getPokemonData(pokemon);

        this.pokemons.push({
          name,
          weight,
          height,
          front_default,
          stats,
          base_experience,
        });
      });
      this.isPokemonDataLoaded = true;
      this.randomPokemon = this.pokemons[this.currentIndex];
    },
    onNext() {
      this.currentIndex++;
      this.randomPokemon = this.pokemons[this.currentIndex];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
