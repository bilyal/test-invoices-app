import customerReducer from './customerReducer'
import * as types from '../types/customerTypes'

describe ("customer reducer", () => {
      it('should handle ADD_CUSTOMER', () => {
        expect(
          customerReducer({
              customers: [],
              isFetching: false,
              errors: []
          }, {
            type: types.ADD_CUSTOMER,
            payload: {
                name: "first",
                location: "location",
                phone: "phone"
            }
          })
        ).toEqual({
            customers: [{
                id: 0,
                name: "first",
                location: "location",
                phone: "phone"
            }],
            isFetching: false,
            errors: []
        })

        expect(
          customerReducer({
            customers: [{
                id: 0,
                name: "first",
                location: "location",
                phone: "phone"
            }],
            isFetching: false,
            errors: []
          },
            {
              type: types.ADD_CUSTOMER,
              payload: {
                name: "second",
                location: "location",
                phone: "phone"
            }
            }
          )
        ).toEqual({
            customers: [{
                id: 0,
                name: "first",
                location: "location",
                phone: "phone"
            },
            {
                id: 1,
                name: "second",
                location: "location",
                phone: "phone"
            }
            ],
            isFetching: false,
            errors: []
        }
        )
      })
})
