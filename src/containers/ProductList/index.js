/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import {
  Table,
  Divider,
  Popconfirm,
  message,
  Button,
  Modal,
  Input,
  Typography
} from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const { Text } = Typography

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
          <ActionSpan
            color='#1890ff'
            onClick={() => this.showModal({ action: 'edit', ...record })}
          >
            Edit
          </ActionSpan>
          <Divider type='vertical' />
          <Popconfirm
            title='Are you sure delete this product?'
            onConfirm={() => this.onDelete(record._id)}
          >
            <ActionSpan color='red'>Delete</ActionSpan>
          </Popconfirm>
        </span>
      ),
    },
  ]

  state = {
    modalVisible: false,
    modalAction: undefined,
    productForm: undefined,
    loading: false
  }

  componentDidMount() {
    const { fetchProducts } = this.props
    fetchProducts()
  }

  onEdit = async () => {
    try {
      const { productForm } = this.state
      const { editProduct, fetchProducts } = this.props
      const { _id, name, price } = productForm
      if(name && price) {
        await editProduct({
          id: _id,
          name,
          price: Number(price)
        })
        await fetchProducts()
        this.hideModal()
        message.success('Success')
      }
    } catch(error) {
      message.error('Oops something went wrong')
    }
  }

  onCreate = async () => {
    try {
      const { productForm } = this.state
      const { createProduct, fetchProducts } = this.props
      const { name, price } = productForm
      if(name && price) {
        await createProduct({
          name,
          price: Number(price)
        })
        await fetchProducts()
        this.hideModal()
        message.success('Success')
      }
    } catch(error) {
      message.error('Oops something went wrong')
    }
  }

  onDelete = async id => {
    try {
      const { deleteProduct, fetchProducts } = this.props
      await deleteProduct({ id })
      await fetchProducts()
      message.success('Success')
    } catch(error) {
      message.error('Oops something went wrong')
    }
  }

  showModal = ({ action, ...record }) => {
    this.setState({
      modalVisible: true,
      modalAction: action,
      productForm: record
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
      modalAction: undefined,
      productForm: undefined
    })
  }

  onInputChange = (key, input) => {
    const { productForm } = this.state
    this.setState({
      productForm: {
        ...productForm,
        [key]: input.target.value
      }
    })
  }
  
  render() {
    const { modalVisible, modalAction, productForm, loading } = this.state
    const { products } = this.props
    return (
      <>
        <Button
          type='primary'
          style={{ marginBottom: 24 }}
          onClick={() => this.showModal({ action: 'create' })}
        >
          Add New Product
        </Button>
        <Table dataSource={products} columns={this.columns} rowKey='_id' />
        <Modal
          title={modalAction === 'create' ? 'Create New Product' : 'Edit Product'}
          visible={modalVisible}
          onOk={modalAction === 'create' ? this.onCreate : this.onEdit}
          onCancel={this.hideModal}
        >
          <div style={{ display: 'flex', marginBottom: 24, flexDirection: 'row' }}>
            <div style={{ flex: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={{ marginRight: 5 }}>Name :</Text>
            </div>
            <div style={{ flex: 6 }}>
              <Input
                autoFocus
                required
                placeholder='Name'
                value={productForm && productForm.name}
                disabled={loading}
                onChange={data => this.onInputChange('name', data)}
              />
            </div>
            <div style={{ flex: 3 }} />
          </div>
          <div style={{ display: 'flex', marginBottom: 24, flexDirection: 'row' }}>
            <div style={{ flex: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={{ marginRight: 5 }}>Price :</Text>
            </div>
            <div style={{ flex: 6 }}>
              <Input
                required
                placeholder='Price'
                value={productForm && productForm.price}
                disabled={loading}
                onChange={data => this.onInputChange('price', data)}
              />
            </div>
            <div style={{ flex: 3 }} />
          </div>
        </Modal>
      </>
    )
  }
}

ProductList.propTypes = {
  products: PropTypes.array,
  fetchProducts: PropTypes.func,
  deleteProduct: PropTypes.func,
  createProduct: PropTypes.func,
  editProduct: PropTypes.func
}

const mapState = state => ({
  products: state.Products.products
})

const mapDispatch = dispatch => ({
  fetchProducts: dispatch.Products.fetchProducts,
  deleteProduct: dispatch.Products.deleteProduct,
  createProduct: dispatch.Products.createProduct,
  editProduct: dispatch.Products.editProduct
})

export default connect(mapState, mapDispatch)(ProductList)
