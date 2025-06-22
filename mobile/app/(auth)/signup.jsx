import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons, Feather } from "@expo/vector-icons";
import styles from "../../assets/styles/signup.styles";
import COLORS from "../../constants/colors";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { Alert } from "react-native";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [buttonRef, setButtonRef] = useState(null);

  const { user, isLoading, register, token } = useAuthStore();

  const router = useRouter();

  const handleSignup = async () => {

      const result = await register(username, email, password);

        if (result.success) {
          console.log("Inscription réussie avec succès", username, email, password);
          Alert.alert("Success", "Successful registration!");
        } else {
            console.error("Erreur d'inscription :", result.error);
            Alert.alert("Error", result.error || "An unknown error occurred");
        }

      
      if (buttonRef) {
        buttonRef.bounceIn(800); // rebond rapide
      }

     
  };


  console.log(user);
  console.log(token);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
                style={{flex:1}} 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
          <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
            <Text style={styles.title}>
              BookWorm
              <Text style={{ fontSize: 24 }}>🐞</Text>
            </Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </Animatable.View>

          <Animatable.View animation="fadeIn" delay={400} style={styles.formContainer}>
            {/* Full Name */}
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="John Doe"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                  placeholderTextColor="#999"
                />
              </View>
            </Animatable.View>

            {/* Email */}
            <Animatable.View animation="fadeInLeft" delay={650} style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                />
              </View>
            </Animatable.View>

            {/* Password */}
            <Animatable.View animation="fadeInLeft" delay={800} style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Feather
                  name="lock"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="******"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  secureTextEntry={hidePassword}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={hidePassword ? "eye-off" : "eye"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </Animatable.View>

            {/* Sign Up Button */}
            <Animatable.View
              ref={(ref) => setButtonRef(ref)}
              style={styles.button}
            >
              <TouchableOpacity
                onPress={handleSignup}
                disabled={isLoading}
                style={{ alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </Animatable.View>
          </Animatable.View>

          {/* Footer */}
          <Animatable.View animation="fadeInUp" delay={1100} style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>

                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>

          </Animatable.View>
        </Animatable.View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
