import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import TransactionTypeButton from '../../components/TransactionTypeButton';
import CategorySelectButton from '../../components/CategorySelectButton';
import InputForm from '../../components/InputForm';

import CategorySelect from '../CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
 } from './styles';

interface FormData {
  name: string;
  amount: string;
}

const Register: React.FC = () => {
  const [ transactionType, setTransactionType ] = useState('');
  const [ categoryModalOpen, setCategoryModalOpen ] = useState(false);
  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit
  } = useForm();

  function handleTransactionTypeSelect(type: 'up' | 'down') { 
    setTransactionType(type);
  } 

  function handleCloseSelectCategoryModal() { 
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() { 
    setCategoryModalOpen(true)
  }

  function handleRegister({ amount, name } :FormData) { 
    const data = {
      name,
      amount,
      transactionType,
      category: category.key
    };

    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm 
            name='name'
            control={control}
            placeholder='Nome'
          />
          <InputForm 
            name='amount'
            control={control}
            placeholder='Preço'
          />
          <TransactionTypes>
            <TransactionTypeButton
              type='up'
              title='Income'
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionTypeSelect('up')}
            />
            <TransactionTypeButton
              type='down'
              title='Outcome'
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionTypeSelect('down')}
            />
          </TransactionTypes>
          <CategorySelectButton 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button
          title='Enviar'
          onPress={handleSubmit(handleRegister)}
        />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}

export default Register;