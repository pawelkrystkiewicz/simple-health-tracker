import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-boost";

export const cache = new InMemoryCache();

export const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      resetState: (_, __, { cache }) => {
        cache.writeData({ defaultState });
        return null;
      }
    }
  }
});

const defaultState = {
  state: {
    __typename: "state",
    name: "Pawel Krystkiewicz",
    email: "pawel.krystkiewicz@4ls.pl"
  }
};

// const defaultState = {
//   state: {
//     __typename: "State",
//     user: {
//       name: "",
//       email: "",
//       avatar: ""
//     },
//     dashboard: {
//       ordersTotal: 0,
//       ordersInProgress: 0,
//       startDate: new Date().setDate(new Date().getDate() - 14)
//     },
//     orders: {},
//     reports: {},
//     vehicles: {
//       map: false,
//       viewMode: false
//     },
//     menu: {
//       selected: "1",
//       theme: "light",
//       collapsed: false,
//       background: "#061625",
//       elements: [
//         { name: "Dashboard", url: "/dashboard", icon: "bar-chart" },
//         { name: "Zamówienia", url: "/orders", icon: "barcode" },
//         { name: "Pojazdy", url: "/vehicles", icon: "calendar" },
//         { name: "Raport sumaryczny", url: "/report", icon: "audit" },
//         { name: "Ustawienia", url: "/settings", icon: "setting" }
//       ]
//     }
//   }
// };
