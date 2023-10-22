import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { LanguageList, LanguageType, changeLanguage } from '../lib/i18n'
import { useEffect, useState } from 'react'

interface Props {
  select: string
  updateSelect: (select: string | null) => void
}

function HeaderTab ({ select, updateSelect }: Props): JSX.Element {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState<LanguageType>('ja')

  const onLanguageSelect = (select: string | null): void => {
    if (select !== null && LanguageList.includes(select as LanguageType)) {
      setLanguage(select as LanguageType)
    }
  }

  useEffect(() => {
    void changeLanguage(language)
  }, [language, i18n])

  return (
    <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
      <Navbar.Brand href='#command'>{t('tableTitle')}</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto' activeKey={select} onSelect={updateSelect}>
          <Nav.Link eventKey='command' href='#command'>
            Command
          </Nav.Link>
          <Nav.Link eventKey='image' href='#image'>
            Image
          </Nav.Link>
          <Nav.Link eventKey='map' href='#map'>
            Map
          </Nav.Link>
          <Nav.Link eventKey='help' href='#help'>
            Help
          </Nav.Link>
          <NavDropdown title='Language' id='collasible-nav-dropdown' onSelect={onLanguageSelect}>
            <NavDropdown.Item eventKey='en'>English</NavDropdown.Item>
            <NavDropdown.Item eventKey='ja'>日本語</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default HeaderTab
