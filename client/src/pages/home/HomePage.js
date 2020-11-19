import React, { useState } from 'react'
import ProverbList from './../proverb/ProverbList'
import AddProverb from './../proverb/AddProverb'
import Section from './../../components/Section'
import Breadcrumb from './../../components/Breadcrumb'
import Modal from './../../components/Modal'
import Button from './../../components/Button'
import ProgressBar from './../../components/ProgressBar'
import Search from './Search'
import { useTranslation } from 'react-i18next'
import { useProverb } from '../../redux/hooks'
import './HomePage.css'

const HomePage = () => {
  const { loading: proverbLoading } = useProverb()
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
  const { t, i18n } = useTranslation('homePage')

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

      <Section id='page-title' title={t('home_title')}>
        <Breadcrumb />
      </Section>

      <ProgressBar loading={proverbLoading} />

      <div className='homepage-actions-section container mt-3 d-flex flex-column flex-sm-row flex-lg-row align-items-md-center'>
        <Search />
        <Button
          variant='info'
          text={t('add_proverb')}
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
