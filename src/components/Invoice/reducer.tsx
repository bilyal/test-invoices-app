import {CustomerProduct} from '../../store/types/invoiceTypes'

export const ADD = "add";
export const REMOVE = "remove";
export const SET_QUANTITY = "setQuantity";
export const SET_DISCOUNT = "setDiscount";
export const CLEAR_TABLE = "clearTable";

interface addInvoiceProductAction{
    type: typeof ADD,
    product: CustomerProduct
}

interface removeInvoiceProductAction{
    type: typeof REMOVE,
    product: CustomerProduct
}

interface setQuantityAction
{
    type: typeof SET_QUANTITY,
    id: number
    quantity: number
}

interface setDiscountAction
{
    type: typeof SET_DISCOUNT,
    discount: number
}

interface clearTableAction
{
    type: typeof CLEAR_TABLE
}

type reducerActions = addInvoiceProductAction 
                    | removeInvoiceProductAction 
                    | setDiscountAction
                    | setQuantityAction 
                    | clearTableAction

interface InvoiceProductState {
    items: CustomerProduct[],
    discount: number
    total: number
  }

export const reducer = (state: InvoiceProductState, action: reducerActions) => {
  
  const calculateTotal = (list: CustomerProduct[], discount: number) : number => {
    
    if (list.length === 0) return 0;

    let coefficient = 1 - (discount / 100);

    let total = list.map(p => (p.price * p.quantity)).reduce((a, b) => (a + b)) * coefficient;

    return total;
  }
  
  switch (action.type) {
    case ADD: {
      let item = state.items.find(p => (p.id === action.product.id));

      if (item !== undefined) {
        let prod = item;

        let newList = state.items.map(p => (p.id === action.product.id) ? { ...prod, quantity: prod.quantity + 1 } : p);

        let newTotal = calculateTotal(newList, state.discount);

        return ({
          discount: state.discount,
          items: newList,
          total: newTotal
        });
      }

      let newList = [...state.items, { ...action.product, quantity: 1 }];

      let newTotal = calculateTotal(newList, state.discount)
      
      return ({
        discount: state.discount,
        items: newList,
        total: newTotal
      });
    }

    case REMOVE: {
      
      let newList = state.items.filter(p => (p.id !== action.product.id));

      let newTotal = calculateTotal(newList, state.discount)

      return ({
        discount: state.discount,
        items: newList,
        total: newTotal
      });
    }

    case SET_QUANTITY: {
      
      let newList = state.items.map(p => (p.id === action.id) ? { ...p, quantity: Number(action.quantity) } : p);

      let newTotal = calculateTotal(newList, state.discount);
      
      return ({
      discount: state.discount,
      items: newList,
      total: newTotal
    });
  }

    case SET_DISCOUNT: {
      
      let newDiscount = Number(action.discount);

      let newTotal = calculateTotal(state.items, newDiscount)

      return ({
      items: state.items,
      discount: newDiscount,
      total: newTotal
    });
  }

    case CLEAR_TABLE: return ({
      items: [],
      discount: 0,
      total: 0
    })

    default: return state;
  }
}