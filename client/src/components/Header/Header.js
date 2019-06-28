import React from 'react'
import styled from 'styled-components'
import {GoSignIn, GoSignOut} from 'react-icons/go'
import {useAuth} from '../../hooks'
import TextButton from '../TextButton'
import TextLink from '../TextLink'
import Nav from './Nav'
import Title from './Title'

const StyledHeader = styled.header`
  border-bottom: 1px solid ${({theme}) => theme.secondary};
  color: ${({theme}) => theme.secondary};
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 1rem;
  margin-bottom: 1rem;
`

const Mini = styled.span`
  font-size: 0.4em;
  position: relative;
  left: 0.2em;
`

export default props => {
  const [isUser, logout] = useAuth()

  return (
    <StyledHeader {...props}>
      <TextLink to="/">
        <Title>
          <Mini>mini</Mini>Tumblr
        </Title>
      </TextLink>
      <Nav>
        {!isUser ? (
          <TextLink aria-label="Sign in" title="Enter" to="auth">
            <GoSignIn />
          </TextLink>
        ) : (
          <TextButton aria-label="Sign out" label="Exit" onClick={logout}>
            <GoSignOut />
          </TextButton>
        )}
      </Nav>
    </StyledHeader>
  )
}