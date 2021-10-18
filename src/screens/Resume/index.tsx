import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HistoryCard from './HistoryCard';

import { categories } from '../../utils/categories';

import { 
  Container,
  Header,
  Title,
  Content
} from './styles';


interface TransactionData { 
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData { 
  key: string;
  name: string;
  total: string;
  color: string;
}

const Resume: React.FC = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() { 
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const totalByCategory: CategoryData[] = [];

    const expensives = responseFormatted
      .filter((expensive: TransactionData) => expensive.type === 'negative');

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => { 
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0) { 
        const total = categorySum
          .toLocaleString('pt-BR', { 
            style: 'currency',
            currency: 'BRL'
          });

        totalByCategory.push({
          name: category.name,
          total,
          color: category.color,
          key: category.key
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  );
}

export default Resume;