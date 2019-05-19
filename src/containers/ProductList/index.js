/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Table, Divider, Popconfirm, message } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ActionSpan = styled.span`
  ${({ color }) => color && `color: ${color}`}
  cursor: pointer;
`

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
      render: (text, record) => (
        <span>
          <ActionSpan color='#1890ff' onClick={() => this.onEdit(record._id)}>
            Edit
          </ActionSpan>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this product?"
            onConfirm={() => this.onDelete(record._id)}
          >
            <ActionSpan color='red'>Delete</ActionSpan>
          </Popconfirm>
        </span>
      ),
    },
  ]

  componentDidMount() {
    const { fetchProducts } = this.props
    fetchProducts()
  }

  onEdit = id => {
    alert('Edit')
  }

  onDelete = async id => {
    try {
      const { deleteProduct } = this.props
      await deleteProduct({ id })
      message.success('Success')
    } catch(error) {
      message.error('Oops something went wrong')
    }
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
  fetchProducts: PropTypes.func,
  deleteProduct: PropTypes.func
}

const mapState = state => ({
  products: state.Products.products
})

const mapDispatch = dispatch => ({
  fetchProducts: dispatch.Products.fetchProducts,
  deleteProduct: dispatch.Products.deleteProduct
})

export default connect(mapState, mapDispatch)(ProductList)
