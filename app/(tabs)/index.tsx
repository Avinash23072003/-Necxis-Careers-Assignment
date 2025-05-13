import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg' }}
        style={styles.banner}
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Our App</Text>
        <Text style={styles.subtitle}>
          Access your web application and receive notifications all in one place
        </Text>
        
        <View style={styles.featureContainer}>
          <View style={styles.featureCard}>
            <Bell size={32} color="#1976d2" style={styles.featureIcon} />
            <Text style={styles.featureTitle}>Real-time Notifications</Text>
            <Text style={styles.featureDescription}>
              Get instant updates through Firebase Cloud Messaging
            </Text>
          </View>
          
          <View style={styles.featureCard}>
            <Bell size={32} color="#1976d2" style={styles.featureIcon} />
            <Text style={styles.featureTitle}>Web Integration</Text>
            <Text style={styles.featureDescription}>
              Seamless access to our web application
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/web')}
        >
          <Text style={styles.buttonText}>Go to Web App</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    marginTop: -40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 24,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});