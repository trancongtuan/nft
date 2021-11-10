import React, { useState } from 'react'

const OrderBox = ({ buyOrder, sellOrder, owner, onAcceptBid }) => {
  const [loading, setLoading] = useState(false)

  const _onAcceptBid = async () => {
    try {
      setLoading(true)
      await onAcceptBid()
    } catch(e) {
      alert(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="font-bold mt-8">Buy Order</h1>
      {
        buyOrder.map(item => (
          <div className="flex flex-row">
            <p className="flex-1">{item.takerAccount.user.username || `${item.taker.substr(0, 5)}...`}</p>
            <p className="flex-1">Bid for: {item.basePrice.toString() / 1000000000000000000} {item.paymentTokenContract.symbol}</p>
            <div className="flex-1">{
              owner &&
              <button
                disabled={loading}
                className="border rounded-full border-gray-300 px-4 hover:bg-gray-600 transition-colors duration-50"
                onClick={_onAcceptBid}
              >{
                loading ? 'Loading...' : 'Accept'
              }</button>
            }</div>
          </div>
        ))
      }

      <h1 className="font-bold mt-8">Sell Order</h1>
      {
        sellOrder.map(item => (
          <div className="flex flex-row">
            <p className="flex-1">{item.makerAccount.user.username || `${item.maker.substr(0, 5)}...`}</p>
            <p className="flex-1">Ask for: {item.basePrice.toString() / 1000000000000000000} {item.paymentTokenContract.symbol}</p>
            <div className="flex-1"></div>
          </div>
        ))
      }
    </div>
  )
}

export default OrderBox