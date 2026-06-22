import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function ModalScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 16 }}>Modal</Text>
      <Link href="/" style={{ color: '#1D4ED8' }}>Go home</Link>
    </View>
  );
}
