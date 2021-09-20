import React from 'react';
import { View } from 'react-native';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryName,
  Date,
  Icon
} from './styles';

const TransactionCard: React.FC = () => {
  return (
    <Container>
      <Title>Desenvolvimento de site</Title>
      <Amount>R$ 12.000,00</Amount>
      <Footer>
        <Category>
          <Icon
            name='dollar-sign'
          />
          <CategoryName>Vendas</CategoryName>
        </Category>
        <Date>13/04/2021</Date>
      </Footer>
    </Container>
  );
}

export default TransactionCard;