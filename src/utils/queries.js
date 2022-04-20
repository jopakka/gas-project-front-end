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
            }`;

export {
  stationsByBounds,
};