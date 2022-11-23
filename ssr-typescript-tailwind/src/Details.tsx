import { Component, lazy } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundry from "./ErrorBoundry";
import ThemeContext from "./ThemeContext";
import { PetAPIResponse, Animal } from "./APIResponsesTypes";

const Modal = lazy(() => import("./Modal"));

class Details extends Component<{ params: { id?: string } }> {
  state = {
    loading: true,
    showModal: false,
    animal: "" as Animal,
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[],
  };

  async componentDidMount() {
    if (!this.props.params.id) {
      return;
    }
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = (await res.json()) as PetAPIResponse;

    this.setState({ loading: false, ...json.pets[0] });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return (
        <h2 className="flex justify-center items-center w-full font-black">
          Loading...
        </h2>
      );
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="w-[1100px] my-0 mx-auto p-4 mb-6 rounded-md bg-[#faeff0] shadow-[0_0_12px_#aaa_-0px_-0px_12px_#fff]">
        <Carousel images={images} />
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl">{name}</h1>
          <h2 className="font-medium">{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                className="rounded px-6 py-2 text-white hover:opacity-50 border-none"
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div className=" p-15 bg-[#faeff0] text-center rounded-3xl p-2 flex flex-col w-80 h-40 flex-wrap content-center justify-evenly">
                <h1>Would you like to adopt {name}?</h1>
                <div className="max-w-[500px] w-auto flex flex-row">
                  <a
                    className="rounded-md px-6 py-1 bg-[#5f1d22] text-white text-lg my-0 mx-auto"
                    href="https://bit.ly/pet-adopt"
                  >
                    Yes
                  </a>
                  <button
                    className="rounded-md px-6 py-1 bg-[#5f1d22] text-white text-lg block my-0 mx-auto"
                    onClick={this.toggleModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams<{ id: string }>();
  return (
    <ErrorBoundry>
      <Details params={params} />
    </ErrorBoundry>
  );
};

export default WrappedDetails;
