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

export interface TransactionCardProps { 
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface Props { 
  data: TransactionCardProps
}

export const TransactionCard: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <Title>
        {data.title}
      </Title>
      <Amount type={data.type}>
        { data.type === 'negative' && '- ' }
        { data.amount }
      </Amount>
      <Footer>
        <Category>
          <Icon
            name={data.category.icon}
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