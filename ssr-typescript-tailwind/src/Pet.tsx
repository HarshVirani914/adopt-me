import { Link } from "react-router-dom";
import { FunctionComponent } from "react";
import { Animal } from "./APIResponsesTypes";

interface IProps {
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

const Pet: FunctionComponent<IProps> = ({
  name,
  animal,
  breed,
  images,
  location,
  id,
}) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="block relative">
      <div>
        <img className="rounded-lg" src={hero} alt={name} />
      </div>
      <div className="absolute bottom-0 rounded-r-lg left-0 bg-gradient-to-tr from-white to-transparent pt-2 pr-2">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
