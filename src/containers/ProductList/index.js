/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Table, Divider } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class ProductList extends Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <span>
          <a onClick={this.onEdit}>Edit</a>
          <Divider type="vertical" />
          <a onClick={this.onDelete} style={{ color: 'red' }}>Delete</a>
        </span>
      ),
    },
  ]

  componentDidMount() {
    const { fetchProducts } = this.props
    fetchProducts()
  }

  onEdit = () => {
    alert('Edit')
  }

  onDelete = () => {
    alert('delete')
  }
  
  render() {
    const { products } = this.props
    return (
      <Table dataSource={products} columns={this.columns} rowKey='_id' />
    )
  }
}

ProductList.propTypes = {
  products: PropTypes.array,
  fetchProducts: PropTypes.func
}

const mapState = state => ({
  products: state.Products.products
})

const mapDispatch = dispatch => ({
  fetchProducts: dispatch.Products.fetchProducts
})

export default connect(mapState, mapDispatch)(ProductList)
