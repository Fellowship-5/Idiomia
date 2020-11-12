import React, { useState } from 'react'

import ProverbList from './../proverb/ProverbList'
import AddProverb from './../proverb/AddProverb'
import Section from './../../components/Section'
import Breadcrumb from './../../components/Breadcrumb'
import Modal from './../../components/Modal'
import Button from './../../components/Button'
import Search from './Search'

import './HomePage.css'

const HomePage = () => {
  //Modal States
  const [modal, setModal] = useState({
    isOpen: false,
    type: ''
  })

  //Modal Handlers

  const handleShowModal = type => async e => {
    e.preventDefault()
    if (type === 'add') {
      setModal({
        isOpen: true,
        type: 'Add'
      })
    }
  }
  const handleCloseModal = () => {
    setModal({ isOpen: false, type: undefined })
  }
  return (
    <div>
      <Modal
        isOpen={modal.isOpen}
        modalClose={handleCloseModal}
        centered={true}
        dialogClassName='add-proverb-modal'
      >
        {modal.type === 'Add' && (
          <AddProverb actionType='Add' handleCloseModal={handleCloseModal} />
        )}
      </Modal>

      <Section
        id='page-title'
        title='PROVERBS'
        containerClass='d-flex justify-content-between mx-5 align-items-center'
      >
        <Breadcrumb />
      </Section>
      <div className='homepage-actions-section container'>
        <Search />
        <Button
          variant='info'
          text='Add Proverb'
          onClick={handleShowModal('add')}
          color='white'
          type='submit'
          className='button-custom ml-auto'
          id='homepage-add-proverb-button'
        />
      </div>
      <ProverbList />
    </div>
  )
}

export default HomePage
