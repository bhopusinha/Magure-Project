import { ChangeEvent, useEffect, useState } from "react";
import { forcastType, optionType } from "../types";

const SearchHooks = () => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
  const [forCaste, setForCaste] = useState<forcastType | null>(null);

  const getSeearchApi = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => setOptions(data))
      .catch((err) => console.log("ERROR", err));
  };

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);

    if (value == "") return;

    getSeearchApi(value);
  };

  const getForcaste = (option: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${option.lat}&lon=${
        option.lon
      }&appid=${import.meta.env.VITE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const forCasteItem = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForCaste(forCasteItem);
      })
      .catch((error) => console.log("ERROR", error));
  };

  const onSubmit = () => {
    if (!city) return;

    getForcaste(city);
  };

  const onOptionSelect = (option: optionType) => {
    // console.log(option.name)
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    term,
    options,
    city,
    forCaste,
    onInputChange,
    onOptionSelect,
    onSubmit,
    getForcaste,
    getSeearchApi,
  };
};

export default SearchHooks;
