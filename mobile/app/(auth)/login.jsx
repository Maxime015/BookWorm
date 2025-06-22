// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import styles from "../../assets/styles/login.styles";
import COLORS from "../../constants/colors";
import { Link } from "expo-router";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { useAuthStore } from "../../store/authStore";
import { Alert } from "react-native";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [buttonRef, setButtonRef] = useState(null);

  const { isLoading, login, isCheckingAuth} = useAuthStore();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {

     const result = await login(email, password);
    
      if (result.success) {
        console.log("Connexion réussie avec succès", email, password);
        Alert.alert("Success", "Successful login!");
        } else {
            console.error("Erreur de connexion :", result.error);
            Alert.alert("Error", result.error || "An unknown error occurred");
        }
  

    if (buttonRef) {
      buttonRef.bounceIn(800); // rebond rapide
    }

  };

    if (isCheckingAuth) return null;
 
  return (
    <SafeAreaView style={styles.scrollViewStyle}>
      <KeyboardAvoidingView 
          style={{flex:1}} 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.View
          animation="fadeInDown"
          delay={200}
          duration={1000}
          style={styles.topIllustration}
        >
          <Image
            source={require("../../assets/images/i.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={400}
          duration={1000}
          style={styles.card}
        >
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Icon name="mail" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#aaa"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                  <Icon name={showPassword ? "eye-off" : "eye"} size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <Animatable.View
              ref={(ref) => setButtonRef(ref)}
              style={styles.button}
            >
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                style={{ alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </Animatable.View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
            </Link>
          </View>
        </Animatable.View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
