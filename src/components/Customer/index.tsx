import {Dispatch} from 'react'
import {AppState} from '../../store'
import CustomerPage from './CustomerPage'
import {connect} from 'react-redux'
import { fetchCustomers } from '../../store/actions/customerActions';
import { CustomerActionTypes } from '../../store/types/customerTypes';


const mapStateToProps = (state: AppState) => ({
    customers: state.customer.customers
  })

const mapDispatchToProps = (dispatch: Dispatch<CustomerActionTypes>) => ({
  fetchCustomers: () => dispatch(fetchCustomers())
})
  
export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);