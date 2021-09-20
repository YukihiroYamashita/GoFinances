import React from 'react';
import { View } from 'react-native';
import Input from '../../components/Forms/Input';

import { 
  Container,
  Header,
  Title,
  Form
 } from './styles';

const Register: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Input 
          placeholder='Nome'
        />
        <Input 
          placeholder='Preço'
        />
      </Form>
    </Container>
  );
}

export default Register;