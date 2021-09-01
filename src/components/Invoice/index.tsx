import {connect} from 'react-redux'
import {AppState} from '../../store'
import InvoicePage from './InvoicePage'

const mapStateToProps = (state: AppState) => ({
    invoices: state.invoice
  })

export default connect(mapStateToProps)(InvoicePage);