import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';

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
  TransactionsList
} from './styles';

const Dashboard: React.FC = () => {
  const data = [
    {
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign' 
      },
      date: '13/04/2021'
    },
    {
      type: 'negative',
      title: 'Hamburgueria Pizzy',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee' 
      },
      date: '10/04/2021'
    },
    {
      type: 'positive',
      title: 'Aluguel do apartamento',
      amount: 'R$ 1.200,00',
      category: {
        name: 'Casa',
        icon: 'shopping-bag' 
      },
      date: '10/04/2021'
    },
  ];

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
          <Icon name="power"/>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard 
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Ultima entrada dia 13 de abril'
          type='up'
        />
        <HighlightCard 
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Ultima entrada saída 03 de abril'
          type='down'
        />
        <HighlightCard 
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 à 16 de abril'
          type='total'
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace()
          }}
        >
        </TransactionsList>
      </Transactions>   
    </Container>
  );
}

export default Dashboard;