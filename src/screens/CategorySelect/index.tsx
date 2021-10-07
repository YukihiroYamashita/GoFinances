import React from 'react';
import { FlatList, View } from 'react-native';
import { categories } from '../../utils/categories';

import Button from '../../components/Forms/Button';

import { 
  Container,
  Header,
  Title,
  Icon,
  Name,
  Category,
  Separator,
  Footer,
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: string;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

const CategorySelect: React.FC<Props> = ({
  category,
  setCategory,
  closeSelectCategory
}) => {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon}/>
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator/>}
      />
      <Footer>
        <Button
          title="Selecionar"
        />
      </Footer>
    </Container>
  )
}

export default CategorySelect;