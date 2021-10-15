import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import HighlightCard from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps { 
  id: string;
}

interface HighlightProps { 
  amount: string;
}

interface HighlightData { 
  entries: HighlightProps,
  expensives: HighlightProps,
  total: HighlightProps
}

const Dashboard: React.FC = () => {
  const [ transactions, setTransactions ] = useState<DataListProps[]>([]);
  const [ highlightData, setHighlightData ] = useState<HighlightData>({} as HighlightData);

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if(item.type === 'positive') { 
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return { 
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      });
    
    const total = entriesTotal - expensiveTotal;

    setTransactions(transactionsFormatted); 
    setHighlightData({
      entries: { 
        amount: entriesTotal.toLocaleString('pt-BR', { 
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: { 
        amount: expensiveTotal.toLocaleString('pt-BR', { 
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: { 
        amount: total.toLocaleString('pt-BR', { 
          style: 'currency',
          currency: 'BRL'
        })
      },
    })
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/28933515?v=4' }}
            />
            <User>
              <UserGreeting>Olá</UserGreeting>
              <UserName>Yukihiro</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power"/>
          </LogoutButton>

        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard 
          title='Entradas'
          amount={highlightData.entries.amount}
          lastTransaction='Ultima entrada dia 13 de abril'
          type='up'
        />
        <HighlightCard 
          title='Saídas'
          amount={highlightData.expensives.amount}
          lastTransaction='Ultima entrada saída 03 de abril'
          type='down'
        />
        <HighlightCard 
          title='Total'
          amount={highlightData.total.amount}
          lastTransaction='01 à 16 de abril'
          type='total'
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/>}
        >
        </TransactionsList>
      </Transactions>   
    </Container>
  );
}

export default Dashboard;