import axios from "axios";
import { LOCAL_STORAGE_POKEMONS_ARRAY_KEY } from "@/constants";
import { getRndInteger } from "@/utils/index";

const baseURL = "https://pokeapi.co/api/v2/";

const instance = axios.create({
  baseURL,
  timeout: 1000
});

async function getRandomPokemons(amount, ignoreLocalStorage = false) {
  if (
    !ignoreLocalStorage &&
    hasOnLocalStorage(LOCAL_STORAGE_POKEMONS_ARRAY_KEY)
  ) {
    return JSON.parse(getLocalStorageValue(LOCAL_STORAGE_POKEMONS_ARRAY_KEY));
  }

  //*
  const pokemonsAmount = 1154;
  const offset = getRndInteger(1, pokemonsAmount);
  const url = `pokemon?limit=${amount}&offset=${offset}`;

  const result = await instance.get(url);
  const {
    data: { results }
  } = result;
  saveOnLocalStorage(LOCAL_STORAGE_POKEMONS_ARRAY_KEY, JSON.stringify(results));
  return results;
  /**/
}

async function getPokemonData(pokemonName) {
  if (hasOnLocalStorage(pokemonName)) {
    return JSON.parse(getLocalStorageValue(pokemonName));
  }

  const url = `pokemon/${pokemonName}`;

  const result = await instance.get(url);
  const { data } = result;
  saveOnLocalStorage(pokemonName, JSON.stringify(data));
  return data;
}

function hasOnLocalStorage(key) {
  const value = getLocalStorageValue(key);
  return value !== undefined && value !== null;
}

function getLocalStorageValue(key) {
  return localStorage.getItem(key);
}

function saveOnLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export { getRandomPokemons, getPokemonData };
