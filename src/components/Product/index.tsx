import {Dispatch} from 'react'
import {AppState} from '../../store'
import ProductPage from './ProductPage'
import {connect} from 'react-redux'
import { fetchProducts } from '../../store/actions/productActions';
import { ProductActionTypes } from '../../store/types/productTypes';


const mapStateToProps = (state: AppState) => ({
    products: state.product.products
  })

const mapDispatchToProps = (dispatch: Dispatch<ProductActionTypes>) => ({
  fetchProducts: () => dispatch(fetchProducts())
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);