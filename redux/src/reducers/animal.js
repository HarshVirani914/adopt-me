/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export default function animal(state = "", action) {
  switch (action.type) {
    case "CHANGE_ANIMAL":
      return action.payload;
    default:
      return state;
  }
}
