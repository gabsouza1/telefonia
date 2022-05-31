import styled from 'styled-components'

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto; 
  padding: 2.5rem 1rem;
  // 1rem = 16px -> 2.5rem x 16 = 40px
  // 1 rem x 16 = 16px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`
export const LabelStyle = styled.label`
  margin-top: 2rem;
  width: 100%;
  padding: 0 1.5rem;
  border-radius: 0.25rem;

  border: 1px solid #d7d7d7;
  background: #e7e9ee;

  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 400;
`

