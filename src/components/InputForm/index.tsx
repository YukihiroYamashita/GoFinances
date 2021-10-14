import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import Input from '../Input';

import { Container, Error } from './styles';

interface Props extends TextInputProps { 
  control: Control;
  name: string;
  error: string;
}

const InputForm: React.FC<Props> = ({ error, control, name, ...rest }) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value }}) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
      {error && <Error>{ error }</Error>}
    </Container>
  );
}

export default InputForm;