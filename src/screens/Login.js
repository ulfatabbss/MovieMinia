import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Text,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StatusBar,
  View,
  Image,
} from 'react-native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;
const FormWrapper = styled.View`
  width: 100%;
  justifycontent: center;
  alignitems: center;
  height: 60%;
`;

const Form = styled.View`
  height: 400px;
  width: 90%;
  background-color: black;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
`;

const SubmitForm = styled.TouchableOpacity`
    width: 95%;
    height: 50px;
    color: white;
    border-radius: 10px;
    border: none;
    justify-content: center;
    align-items: center
    margin-top: 20px;
    background-color: #E7442E;
`;

const Input = styled.TextInput`
  width: 95%;
  height: 50px;
  border: none;
  padding: 10px;
  border-radius: 15px;
  background-color: #333333;
  color: white;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;
  color: white;
`;
const SignInText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin: 10px;
  text-align: left;
`;

const NewToNetflixTextWrapper = styled.TouchableOpacity`
  width: 100%;
`;

const NewToNetflix = styled.Text`
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  color: #ccc;
  margin: 15px;
  text-align: center;
`;

const Overlay = styled.View`
  background-color: 'rgba(0,0,0,0.5)';
  flex: 1;
`;

const Login = ({navigation}) => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const login = () => {
    setLoading(true);
    if (!email || !password) {
      alert('All fields are mandatory');
      setPassword('');
      setEmail('');
      setLoading(false);
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(authUser => {
        navigation.replace('BottomStack');
        setPassword('');
        setEmail('');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert(err);
      });
  };
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const validate = text => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    console.log(text, reg.test(text));
  };

  return (
    <>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <ImageBackground
          source={{
            uri: 'https://www.logitheque.com/en/wp-content/uploads/sites/6/2019/07/netflix-image.jpg',
          }}
          resizeMode="cover"
          style={{flex: 1, height: Dimensions.get('window').height}}>
          <Overlay>
            <View style={{justifyContent: 'center', alignSelf: 'center'}}>
              <Image
                style={{height: 250, width: 250}}
                source={require('../assets/logo.png')}></Image>
            </View>
            {/* <Header login={false} /> */}
            <FormWrapper>
              <Form>
                <SignInText>Sign In</SignInText>
                <Input
                  placeholder="Enter your email"
                  placeholderTextColor="grey"
                  value={email}
                  onChangeText={validate => setEmail(validate)}
                />
                <Input
                  placeholder="Password"
                  placeholderTextColor="grey"
                  secureTextEntry
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <SubmitForm onPress={login} disabled={loading}>
                  <ButtonText>{loading ? 'Loading...' : 'Sign In'}</ButtonText>
                </SubmitForm>

                <NewToNetflixTextWrapper
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('Register')}>
                  <NewToNetflix>New to MovieMania? Sign Up</NewToNetflix>
                </NewToNetflixTextWrapper>
              </Form>
            </FormWrapper>
          </Overlay>
        </ImageBackground>
      </Container>
    </>
  );
};

export default Login;
