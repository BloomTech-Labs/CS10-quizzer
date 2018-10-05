export const navContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '160px'
}

export const navContainerLeftStyle = {
  display: 'flex',
  justifyContent: 'center',
  margin: '1rem 2rem 0'
}

export const buttonStyle = {
  fontWeight: 'bold',
  paddingLeft: '2rem',
  paddingRight: '2rem'
}

export const logout = {
  ...buttonStyle,
  background: '#fefefe',
  color: '#010101'
}

export const signup = {
  ...buttonStyle,
  background: 'hsla(210, 100%, 55%, 1)',
  color: '#fefefe',
  marginLeft: '0'
}
