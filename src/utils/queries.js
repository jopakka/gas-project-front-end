import {gql} from '@apollo/client';

const stationsByBounds = gql`
query StationsByBounds($bounds: Bounds!) {
  stationsByBounds(bounds: $bounds) {
    id
    properties {
      brand
      name
      operator
    }
    prices {
      fuel95 {
        stationID
        price
        updatedAt
      }
      fuel98 {
        stationID
        price
        updatedAt
      }
      fuelDiesel {
        stationID
        price
        updatedAt
      }
    }
    geometry {
        coordinates
    }
  }
}
`;

const stationInfo = gql`
query Station($stationId: String!) {
  station(id: $stationId) {
    id
    properties {
      brand
      name
      operator
    }
    address {
      city
      country
      house_number
      postcode
    }
    geometry {
      coordinates
    }
    prices {
      fuel95 {
        price
        updatedAt
      }
      fuel98 {
        price
        updatedAt
      }
      fuelDiesel {
        price
        updatedAt
      }
    }
  }
}
`;

const login = gql`
query Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    id
    username
    token
  }
}
`;

const register = gql`
mutation RegisterUser($username: String!, $password: String!, $confirmPassword: String!) {
  registerUser(username: $username, password: $password, confirmPassword: $confirmPassword) {
    id
    username
    token
  }
}
`;

const addFavorite = gql`
mutation AddFavorite($stationId: String!) {
  addFavorite(stationID: $stationId) {
    userID
    stationID
  }
}
`;

const deleteFavorite = gql`
mutation DeleteFavorite($stationId: String!) {
  deleteFavorite(stationID: $stationId) 
}
`;

const checkFavorite = gql`
query Favorite($stationId: String!) {
  favorite(stationID: $stationId) {
    stationID
  }
}
`;

const favorites = gql`
query Favorite {
  favorites {
    stationID
    properties {
      brand
      name
      operator
    }
    prices {
      fuel95 {
        price
        updatedAt
      }
      fuel98 {
        price
        updatedAt
      }
      fuelDiesel {
        price
        updatedAt
      }
    }
  }
}
`;

const update95 = gql`
mutation Mutation($stationId: String!, $price: String!) {
  update95(stationID: $stationId, price: $price) {
    price
  }
}
`;

const update98 = gql`
mutation Mutation($stationId: String!, $price: String!) {
  update98(stationID: $stationId, price: $price) {
    price
  }
}
`;

const updateDiesel = gql`
mutation Mutation($stationId: String!, $price: String!) {
  updateDiesel(stationID: $stationId, price: $price) {
    price
  }
}
`;

export {
  stationsByBounds,
  login,
  register,
  stationInfo,
  addFavorite,
  deleteFavorite,
  checkFavorite,
  favorites,
  update95,
  update98,
  updateDiesel,
};