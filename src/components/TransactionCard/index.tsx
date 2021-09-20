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

interface Category { 
  name: string;
  icon: string;
}

interface Data { 
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface Props { 
  data: Data
}

const TransactionCard: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <Title>
        {data.title}
      </Title>
      <Amount>
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon
            name='dollar-sign'
          />
          <CategoryName>
            {data.category.name}
          </CategoryName>
        </Category>

        <Date>
          {data.date}
        </Date>
      </Footer>
    </Container>
  );
}

export default TransactionCard;