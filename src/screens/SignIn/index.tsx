import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { AuthContext } from '../../AuthContext';

import SignInSocialButton from '../../components/SignInSocialButton';

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';

const SignIn: React.FC = () => {
  const data = useContext(AuthContext);
    
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
          />
          <SignInSocialButton
            title="Entrar com a Apple"
            svg={AppleSvg}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}

export default SignIn;