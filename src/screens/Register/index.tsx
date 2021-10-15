import React, { useState } from 'react';
import { 
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

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
};

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
})

const Register: React.FC = () => {
  const [ transactionType, setTransactionType ] = useState('');
  const [ categoryModalOpen, setCategoryModalOpen ] = useState(false);
  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria',
  });


  const {
    control,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema)
  });

  const navigation = useNavigation();

  function handleTransactionTypeSelect(type: 'up' | 'down') { 
    setTransactionType(type);
  } 

  function handleCloseSelectCategoryModal() { 
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() { 
    setCategoryModalOpen(true)
  }

  async function handleRegister({ amount, name } :FormData) { 
    if(!transactionType) { 
      return Alert.alert("Selecione o tipo da transação");
    }

    if(category.key === "category") { 
      return Alert.alert("Selecione a categoria");
    }
    
    const newTransaction = {
      id: String(uuid.v4()),
      name,
      amount,
      transactionType,
      category: category.key,
      date: new Date()
    };

    try {
      const dataKey = '@gofinances:transactions';
      
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate("Listagem");

    } catch(error) { 
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            autoCapitalize="words"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          <InputForm 
            name='amount'
            control={control}
            placeholder='Preço'
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
  );
}

export default Register;