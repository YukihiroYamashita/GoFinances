import React from 'react';

import { 
  Container,
  Amount,
  Title
} from './styles';

interface Props { 
  title: string;
  color: string;
  amount: string;
}

const HistoryCard: React.FC<Props> = ({ color, amount, title }) => {
  return (
    <Container 
      color={color}
    >
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}

export default HistoryCard;