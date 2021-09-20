import React from 'react';
import { View } from 'react-native';

import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields
 } from './styles';

const Register: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input 
            placeholder='Nome'
          />
          <Input 
            placeholder='Preço'
          />
        </Fields>
        <Button
          title='Enviar'
        />
      </Form>
    </Container>
  );
}

export default Register;