import { useState, useEffect } from 'react'
import { Header } from "../../components/Header";
import { Container, Content, LabelStyle } from "./styles";

import api from '../../services/api'

interface ITotal {
  id: string;
  line_number: string;
  chip_number: string;
  data_plan: string;
  account_number: string;
  telephone_operator: string;
}

export function Total() {
  // const [totalLineVivo, setTotalLineVivo] = useState(0)
  const [telefonia, setTelefonia] = useState<ITotal[]>([])
  // const [totalDDD24, setTotalDDD24] = useState(0)
  // const [totalDDD21, setTotalDDD21] = useState(0)
  // const [totalDDD31, setTotalDDD31] = useState(0)
  let telephone: ITotal[] = []

  async function loadTelephone() {
    const dataTelephone = await api.get('/telephoneline').then(dados => dados.data)
    if (dataTelephone) {
      setTelefonia(dataTelephone)






      // telephone = dataTelephone
      // setTotalLineVivo(telephone
      //   .filter(tel => tel.telephone_operator === 'VIVO')
      //   .length)
      // let totalDDD24 = 0
      // let totalDDD21 = 0
      // let totalDDD31 = 0
      // telephone.map(tel => {
      //   let [ddd, linha] = tel.line_number.split('-')
      //   if (ddd === '24') {
      //     totalDDD24 += 1
      //   } else if (ddd = '21') {
      //     totalDDD21 += 1
      //   } else if (ddd = '31') {
      //     totalDDD31 += 1
      //   }
      // })
      // setTotalDDD21(totalDDD21)
      // setTotalDDD24(totalDDD24)
      // setTotalDDD31(totalDDD31)
    }
  }

  useEffect(() => {
    loadTelephone()
  }, [])


  function totalOperators(props : string) {
    return telefonia.filter(tel => tel.telephone_operator === props).length
  }

  function totalPlane (props: string){
    return telefonia.filter(tel => tel.data_plan === props).length
  }

  function totalDDD (props: string){
    return telefonia.filter(tel => tel.line_number.substring(0,2) === props).length
  }

  return (
    <Container>
      <Header title="Totais" />

      <Content>
        <LabelStyle>Total de linhas Vivo: {totalOperators('VIVO')}</LabelStyle>
        <LabelStyle>Total de linhas Claro: {totalOperators('CLARO')}</LabelStyle>
        <LabelStyle>Total de linhas Tim: {totalOperators('TIM')}</LabelStyle>
        <LabelStyle>Total de linhas Oi: {totalOperators('OI')}</LabelStyle>
        <br />

        <LabelStyle>Total de Planos 10GB: {totalPlane('10GB')}</LabelStyle>
        <LabelStyle>Total de Planos 20GB: {totalPlane('20GB')}</LabelStyle>
        <LabelStyle>Total de Planos 30GB: {totalPlane('30GB')}</LabelStyle>

        <br />

        <LabelStyle>Total de numeros DDD 21: {totalDDD('21')}</LabelStyle>
        <LabelStyle>Total de numeros DDD 31: {totalDDD('31')}</LabelStyle>
        <LabelStyle>Total de numeros DDD 27: {totalDDD('27')}</LabelStyle>
        <LabelStyle>Total de numeros DDD 24: {totalDDD('24')}</LabelStyle>
      </Content>
    </Container>
  )
}