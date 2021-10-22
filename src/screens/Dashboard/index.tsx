import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import HighlightCard from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { useAuth } from '../../hooks/auth'

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
  LogoutButton,
  LoadContainer
} from './styles';


export interface DataListProps extends TransactionCardProps { 
  id: string;
}

interface HighlightProps { 
  amount: string;
  lastTransaction: string;
}

interface HighlightData { 
  entries: HighlightProps,
  expensives: HighlightProps,
  total: HighlightProps
}

const Dashboard: React.FC = () => {
  const [ transactions, setTransactions ] = useState<DataListProps[]>([]);
  const [ highlightData, setHighlightData ] = useState<HighlightData>({} as HighlightData);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  const { colors } = useTheme();
  const { signOut, user } = useAuth();

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) { 

    const collectionFiltered = collection
      .filter((transaction) => transaction.type === type);

    if(collectionFiltered.length === 0) { 
      return 0
    }

    const lastTransactions = new Date(
      Math.max.apply(Math, collectionFiltered
        .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
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

    setTransactions(transactionsFormatted); 
    
    const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative');

    const totalInterval = lastTransactionsExpensives === 0 
    ? 'Não há transações'
    : `01 a ${lastTransactionsExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: { 
        amount: entriesTotal.toLocaleString('pt-BR', { 
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsEntries === 0 
        ? 'Não há transações' 
        : `Última entrada dia ${lastTransactionsEntries}`
      },
      expensives: { 
        amount: expensiveTotal.toLocaleString('pt-BR', { 
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsExpensives === 0 
        ? 'Não há transações'
        : `Última saída dia ${lastTransactionsExpensives}`
      },
      total: { 
        amount: total.toLocaleString('pt-BR', { 
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      },
    });

    setIsLoading(false);
  }

  return (
    <Container>
      {
        isLoading ? 
          <LoadContainer>
            <ActivityIndicator 
              color={colors.primary} 
              size='large'
            /> 
          </LoadContainer> : 
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{ uri: user.photo }}
                />
                <User>
                  <UserGreeting>Olá</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power"/>
              </LogoutButton>

            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard 
              title='Entradas'
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type='up'
            />
            <HighlightCard 
              title='Saídas'
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
              type='down'
            />
            <HighlightCard 
              title='Total'
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
        </>
      }
    </Container>
  );
}

export default Dashboard;