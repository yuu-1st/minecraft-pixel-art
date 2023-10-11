import { Navbar, Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

interface Props {
  select: string
  updateSelect: (select: string) => void
}

function HeaderTab ({ select, updateSelect }: Props): JSX.Element {
  const { t } = useTranslation()
  const handleSelect = (eventKey: string | null): void => {
    if (eventKey !== null) {
      updateSelect(eventKey)
    }
  }

  return (
    <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
      <Navbar.Brand href='#command'>{t('tableTitle')}</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto' activeKey={select} onSelect={handleSelect}>
          <Nav.Link eventKey='command' href='#command'>
            Command
          </Nav.Link>
          <Nav.Link eventKey='image' href='#image'>
            Image
          </Nav.Link>
          <Nav.Link eventKey='map' href='#map'>
            Map
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default HeaderTab
