import { getRndInteger } from "@/utils/index";

const QUESTION_TYPE_ENUM = {
  HEIGHT: "HEIGHT",
  WEIGHT: "WEIGHT",
  STAT: "STAT"
};

function createQuestion(type, props) {
  const questCreator = {
    [QUESTION_TYPE_ENUM.HEIGHT]: createHeightQuestion(props),
    [QUESTION_TYPE_ENUM.WEIGHT]: createWeightQuestion(props),
    [QUESTION_TYPE_ENUM.STAT]: createStatQuestion(props)
  };

  return questCreator[type];
}

function createHeightQuestion({ pokemonName, correctValue }) {
  const convertedCorrectValue = correctValue * 10;
  const minValue = convertedCorrectValue / 2;
  const maxValue = convertedCorrectValue + minValue;
  const randomValue1 = getRndInteger(minValue, maxValue);
  const randomValue2 = getRndInteger(minValue, maxValue);
  const randomValue3 = getRndInteger(minValue, maxValue);

  const question = `${pokemonName} tem quantos cm de altura?`;

  return {
    question,
    wrongValues: [randomValue1, randomValue2, randomValue3],
    correctValue: convertedCorrectValue
  };
}

function createWeightQuestion({ pokemonName, correctValue }) {
  const convertedCorrectValue = correctValue * 10;
  const minValue = convertedCorrectValue - convertedCorrectValue / 2;
  const maxValue = convertedCorrectValue + minValue;
  const randomValue1 = getRndInteger(minValue, maxValue);
  const randomValue2 = getRndInteger(minValue, maxValue);
  const randomValue3 = getRndInteger(minValue, maxValue);

  const question = `${pokemonName} pesa quantos g?`;

  return {
    question,
    wrongValues: [randomValue1, randomValue2, randomValue3],
    correctValue: convertedCorrectValue
  };
}

function createStatQuestion({ pokemonName, correctValue, statName }) {
  const minValue = correctValue - correctValue / 2;
  const maxValue = correctValue + minValue;
  const randomValue1 = getRndInteger(minValue, maxValue);
  const randomValue2 = getRndInteger(minValue, maxValue);
  const randomValue3 = getRndInteger(minValue, maxValue);

  const question = `${pokemonName} tem quanto de ${statName}?`;

  return {
    question,
    wrongValues: [randomValue1, randomValue2, randomValue3],
    correctValue
  };
}

export { createQuestion, QUESTION_TYPE_ENUM };
