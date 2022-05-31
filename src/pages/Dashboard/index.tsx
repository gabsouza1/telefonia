import { useState, FormEvent, useEffect } from 'react'
import { FiDelete, FiEdit, } from 'react-icons/fi'

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container, Form, Table, ButtonIcon } from "./styles";

import api from '../../services/api'

interface IDashboard {
  id: string;
  cliente: string;
  email: string;
  telefone: string;
}

export function Dashboard() {
  const [cliente, setCliente] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [clients, setClients] = useState<IDashboard[]>([])
  const [status, setStatus] = useState('addClient')


  async function handleAddClient(event: FormEvent) {
    event.preventDefault()
    const client = {
      cliente,
      email,
      telefone
    }
    if (status === 'addClient') {
      const { id } = await api.post('/clients', client)
        .then(dados => dados.data)
      setClients([...clients, { id, cliente, email, telefone }])
    } else {
      await api.put(`/clients/${status}`, client)
    }
    setCliente('')
    setEmail('')
    setTelefone('')
    setStatus('addClient')
  }

  async function handleDeleteClient(id: string) {
    setClients(clients.filter(cli => cli.id !== id))
    await api.delete(`/clients/${id}`)
  }

  async function handleUpdateClient(id: string) {
    const dados = await api.get(`/clients/${id}`).then(clientReturn => clientReturn.data)
    setCliente(dados.cliente)
    setEmail(dados.email)
    setTelefone(dados.telefone)
    setStatus(id)
  }

  async function loadClients() {
    const dataClient = await api.get('/clients').then(dados => dados.data)
    // console.log(dataClient)
    setClients(dataClient)
  }

  useEffect(() => {
    loadClients()
  }, [clients])

  return (
    <Container>
      <Header title="Cadastro de Clientes" />

      <Form onSubmit={handleAddClient}>
        <Input
          placeholder='Cliente'
          value={cliente}
          onChange={event => setCliente(event.target.value)}
        />

        <Input
          placeholder='E-mail'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <Input
          placeholder='Telefone'
          value={telefone}
          onChange={event => setTelefone(event.target.value)}
        />

        <Button
          title="Enviar"
          type="submit"
        />
      </Form>

      <Table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(cli => (
            <tr key={cli.id}>
              <td>{cli.cliente}</td>
              <td>{cli.email}</td>
              <td>{cli.telefone}</td>
              <td>
                <ButtonIcon
                  type='button'
                  onClick={() => handleDeleteClient(cli.id)}
                >
                  <FiDelete size={30} />
                </ButtonIcon>
                <ButtonIcon
                  type='button'
                  onClick={() => handleUpdateClient(cli.id)}
                >
                  <FiEdit size={30} />
                </ButtonIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  )
}