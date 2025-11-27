export default function RegisterScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function register() {
    try {
      const r = await API.post('/auth/register', { phone, email, password, name });
      await AsyncStorage.setItem('token', r.data.token);
      navigation.replace('Feed');
    } catch (e) {
      Alert.alert('Erreur', e.response?.data?.error || 'Erreur d\'inscription');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🦅 Créer un compte DEO</Text>
      <TextInput 
        placeholder="Nom" 
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Téléphone" 
        value={phone} 
        onChangeText={setPhone} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Mot de passe" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      />
      <Button title="S'inscrire" onPress={register} />
      <Button title="Se connecter" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 16,
    backgroundColor: '#1a1a1a'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffffff'
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#333',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    marginBottom: 12, 
    padding: 12,
    borderRadius: 8
  }
});
