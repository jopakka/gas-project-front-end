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
    geometry {
        coordinates
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

export {
  stationsByBounds,
  login,
  register
};