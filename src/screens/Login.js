import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../contexts';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { Button, Image, Input } from '../components';
import { images } from '../utils/Images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { login } from '../utils/firebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';

const Container = styled.View`
  flex: 1;
  justify-content: center
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
  `;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your Email'
    );
  };
  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const _handleLoginButtonPress = async () => {
    try {
      spinner.start();
      const user = await login({ email, password });
      dispatch(user);
    } catch (e) {
      Alert.alert('Login Error', e.message);
    } finally {
      spinner.stop();
    }
  };
  const passwordRef = useRef();

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={30}
    >
      <Container insets={insets}>
        {/* <Text style={{ fontSize: 30 }}>Login Screen</Text> */}
        <Image url={images.logo} imageStyle={{ borderRadius: 8 }} />
        <Input
          label='Email'
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          placeholder='Email'
          returnKeyType='next'
        />
        <Input
          ref={passwordRef}
          label='Password'
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder='Password'
          returnKeyType='done'
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title='Login'
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title='Sign up with email'
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
