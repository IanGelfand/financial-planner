/* eslint-disable no-unused-vars */
/* eslint-disable require-await */
/* eslint-disable camelcase */
import React, {Component} from 'react'
import {PlaidLink} from 'react-plaid-link'
import {connect} from 'react-redux'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {setAccessTokenFetch} from '../store/user'

class PlaidLogin extends Component {
  constructor() {
    super()
    this.state = {
      plaidAccess: false
    }

    this.handleOnSuccess = this.handleOnSuccess.bind(this)
    this.getTransactions = this.getTransactions.bind(this)
  }
  async getTransactions() {
    await this.props.setAccessTokenFetch(this.props.userId)
    this.props.history.push('/overview')
  }

  async handleOnSuccess(public_token, metadata) {
    const publicToken = axios.post('/auth/public_token', {
      public_token: public_token
    })
    this.setState({plaidAccess: true})
  }

  handleOnExit() {}

  render() {
    return (
      <div>
        {!this.state.plaidAccess ? (
          <div className="" id="plaid-container">
            <PlaidLink
              clientName="eBudget"
              env="sandbox"
              product={['auth', 'transactions']}
              publicKey="ae9b699cddb974bc89c10074b92e85"
              onExit={this.handleOnExit}
              onSuccess={this.handleOnSuccess}
              className="plaidLink"
            >
              <button
                type="submit"
                className="btn-large light-blue lighten-2"
                id="plaidButton"
              >
                Click here to connect your bank!
              </button>
            </PlaidLink>
          </div>
        ) : (
          <div id="plaid-container">
            <button
              type="submit"
              className="btn-large orange"
              id="plaidButton"
              onClick={this.getTransactions}
            >
              Click here to get transactions!
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    plaidAccessToken: state.user.plaidAccessToken,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    setAccessTokenFetch: id => dispatch(setAccessTokenFetch(id))
  }
}
export default withRouter(connect(mapState, mapDispatch)(PlaidLogin))
