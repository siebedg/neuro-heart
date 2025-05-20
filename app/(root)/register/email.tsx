  import { useState } from "react";
  import { View, Text, TextInput, Button, Alert } from "react-native";
  import { router, useLocalSearchParams } from "expo-router";

  export default function RegisterEmailScreen() {
    const [email, setEmail] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const { name } = useLocalSearchParams();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    const handleContinue = async () => {
      if (!email.trim()) return;
    
      setIsValidating(true);
    
      try {
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    
        const response = await fetch('https://cortuneresend-login-production.up.railway.app/send-verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, verificationCode, name }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data?.message || 'Failed to send verification email');
        }
    
        router.push({
          pathname: "/register/password",
          params: { name, email, verificationCode },
        });
      } catch (error: unknown) {
        const message = error instanceof Error 
          ? error.message 
          : typeof error === 'string' 
            ? error 
            : 'Unexpected error';
        Alert.alert('Error', message);
      } finally {
        setIsValidating(false);
      }
    };
    
    


    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-xl mb-4">What's your email?</Text>
        <TextInput
          className="border w-full p-2 mb-4"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button
          title={isValidating ? "Sending..." : "Continue"}
          onPress={handleContinue}
          disabled={!email.trim() || !isValidEmail || isValidating}
        />
      </View>
    );
  }