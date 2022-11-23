/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export default function location(state = "Seattle, WA", action) {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return action.payload;
    default:
      return state;
  }
}
