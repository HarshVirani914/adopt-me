import { FunctionComponent, useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import { Animal, PetAPIResponse, Pet } from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams: FunctionComponent = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("" as Animal);
  const [breed, setBreed] = useState("" as string);
  const [pets, setPets] = useState([] as Pet[]);
  const [breeds] = useBreedList(animal as Animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    void requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = (await res.json()) as PetAPIResponse;
    setPets(json.pets);
  }

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-[#faeff0] shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          void requestPets();
        }}
      >
        <label htmlFor="location">
          <b>Location</b>
          <input
            className="w-60 mb-5 block rounded-lg"
            id="location"
            type="text"
            value={location}
            placeholder="Location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </label>
        <label htmlFor="animal">
          <b>Animal</b>
          <select
            id="animal"
            className="w-60 mb-5 block rounded-lg"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          <b>Breed</b>
          <select
            disabled={!breeds.length}
            className="w-60 mb-5 block disabled:opacity-50 rounded-lg"
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            onBlur={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((allBreed) => (
              <option value={allBreed} key={allBreed}>
                {allBreed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          <b>Theme</b>
          <select
            className="w-60 mb-5 block rounded-lg"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button
          className="rounded-lg px-6 py-2 text-white hover:opacity-50 border-none"
          style={{ backgroundColor: theme }}
        >
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
