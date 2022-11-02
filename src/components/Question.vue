<template>
  <div>
    <Pokemon :pokemonData="pokemonData" />
    <p>{{ question.question }}</p>
    <button
      v-for="(alternative, index) in alternatives"
      :key="index"
      @click="onClickAnswer(alternative)"
    >
      {{ alternative }}
    </button>

    <p v-if="answered">{{ correctValue }}</p>

    <button
      @click="onClickConfirmSelection"
      v-if="!answered"
      :disabled="isWaintingSelection"
    >
      Confirmar
    </button>
    <button @click="onClickNext" v-if="answered">Próximo</button>
  </div>
</template>

<script>
import { createQuestion, QUESTION_TYPE_ENUM } from "@/api/questionsEngine";
import { shuffle, getRndInteger } from "@/utils/index";
import Pokemon from "@/components/Pokemon";

export default {
  components: {
    Pokemon,
  },
  props: {
    pokemonData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      question: {},
      alternatives: [],
      correctValue: undefined,
      isWaintingSelection: true,
      answered: false,
    };
  },
  watch: {
    pokemonData: {
      handler() {
        this.makeQuestion();
      },
      immediate: true,
    },
  },
  methods: {
    makeQuestion() {
      const questionType = this.pickQuestionType();
      const payload = this.buildPayload(questionType);

      this.question = createQuestion(questionType, payload);
      this.correctValue = this.question.correctValue;

      this.createAlternatives(
        this.question.wrongValues,
        this.question.correctValue
      );
    },
    createAlternatives(wrongValues, correctValue) {
      this.alternatives = shuffle([...wrongValues, correctValue]);
    },
    pickQuestionType() {
      const questionsEnum = {
        0: QUESTION_TYPE_ENUM.HEIGHT,
        1: QUESTION_TYPE_ENUM.WEIGHT,
        2: QUESTION_TYPE_ENUM.STAT,
      };

      return questionsEnum[getRndInteger(0, 2)];
    },
    buildPayload(questionType) {
      if (
        questionType === QUESTION_TYPE_ENUM.HEIGHT ||
        questionType === QUESTION_TYPE_ENUM.WEIGHT
      ) {
        return this.buildWeightHeightPayload(questionType);
      }
      return this.buildStatsPayload();
    },
    buildWeightHeightPayload(questionType) {
      const correctValue =
        questionType === QUESTION_TYPE_ENUM.WEIGHT
          ? this.pokemonData.weight
          : this.pokemonData.height;

      return {
        pokemonName: this.pokemonData.name,
        correctValue,
      };
    },
    buildStatsPayload() {
      const statIndex = getRndInteger(0, 5);

      return {
        pokemonName: this.pokemonData.name,
        correctValue: this.pokemonData.stats[statIndex].base_stat,
        statName: this.pokemonData.stats[statIndex].stat.name,
      };
    },
    onClickAnswer(answer) {
      this.isWaintingSelection = false;
      this.selectedAnswer = answer;
    },
    onClickConfirmSelection() {
      this.answered = true;
    },
    onClickNext() {
      this.answered = false;
      this.isWaintingSelection = true;
      this.$emit("next");
    },
  },
};
</script>

<style>
</style>