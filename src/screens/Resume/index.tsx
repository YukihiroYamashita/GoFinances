import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { categories } from '../../utils/categories';

import HistoryCard from './HistoryCard';

import { 
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month
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
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

const Resume: React.FC = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { colors } = useTheme();

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  function handleDateChange(action: 'next' | 'previous') { 
    if(action === 'next') { 
      setSelectedDate(addMonths(selectedDate, 1));
    } else { 
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() { 
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const totalByCategory: CategoryData[] = [];

    const expensives = responseFormatted
      .filter((expensive: TransactionData) => 
        expensive.type === 'negative' && 
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      );

    const expensiveTotal = expensives
      .reduce((accumulator: number, expensive: TransactionData) => {
        return accumulator + Number(expensive.amount)
      }, 0);

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => { 
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if(categorySum > 0) { 
        const totalFormatted = categorySum
          .toLocaleString('pt-BR', { 
            style: 'currency',
            currency: 'BRL'
          });

        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          name: category.name,
          totalFormatted,
          total: categorySum,
          color: category.color,
          key: category.key,
          percent
        });
      }
    });

    setTotalByCategories(totalByCategory);
  };

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight()
        }}
      >

        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('previous')}>
            <SelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <SelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: colors.shape
              }
            }}
            labelRadius={50}
            x="percent"
            y="total"
          />
        </ChartContainer>
        {
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  );
}

export default Resume;