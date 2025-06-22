import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";
import styles from "../../assets/styles/create.styles";
import COLORS from "../../constants/colors";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import * as ImageManipulator from "expo-image-manipulator"; // ajout ici


const Create = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null); // To display the selected image
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { token } = useAuthStore();

  console.log(token);


const pickImage = async () => {
  try {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, // qualité d’origine (compression plus tard)
      base64: false, // pas besoin ici, car on va compresser nous-mêmes
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setImage(asset.uri); // Affichage

      // ✅ Compression de l’image avec réduction de taille et qualité
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        asset.uri,
        [{ resize: { width: 800 } }], // redimensionner à 800px de large
        {
          compress: 0.3, // compresser à 30%
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true, // générer le base64 compressé
        }
      );

      setImageBase64(manipulatedImage.base64);
    }
  } catch (error) {
    console.error("An error occurred while picking an image:", error);
    Alert.alert("Error", "There was a problem selecting your image");
  }
};

  
  const renderRatingPicker = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    // Logic for form submission goes here

    try {
      setLoading(true);

      // get file extension from URI or default to jpeg
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";


      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;


      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl,
        }),
      });
      
      const contentType = response.headers.get("content-type");
      
      if (!response.ok) {
        const errorMessage = contentType?.includes("application/json")
          ? (await response.json()).message
          : await response.text();
        throw new Error(errorMessage || "Something went wrong");
      }
      
      const data = await response.json();
      

      Alert.alert("Success", "Your book recommendation has been posted !");

      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      router.push("/");
    } catch (error) {
          console.error("Error creating post:", error);
          Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }

  };

  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.scrollViewStyle}
          contentContainerStyle={[styles.container, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
            <Animatable.View animation="fadeInDown" delay={200} style={styles.header}>
              <Text style={styles.title}>Add Book Recommendation</Text>
              <Text style={styles.subtitle}>
                Share your favorite reads with others
              </Text>
            </Animatable.View>

            <View style={styles.form}>
              {/* Book Title */}
              <Animatable.View animation="fadeIn" delay={300} style={styles.formGroup}>
                <Text style={styles.label}>Book Title</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="book-outline" size={20} color="#A0AEC0" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Enter book title"
                    placeholderTextColor="#A0AEC0"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>
              </Animatable.View>

              {/* Rating */}
              <Animatable.View animation="fadeIn" delay={400} style={styles.formGroup}>
                <Text style={styles.label}>Your Rating</Text>
                {renderRatingPicker()}
              </Animatable.View>

              {/* Book Image */}
              <Animatable.View animation="fadeIn" delay={500} style={styles.formGroup}>
                <Text style={styles.label}>Book Image</Text>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                  {image ? (
                    <Animatable.Image
                      animation="fadeIn"
                      duration={600}
                      source={{ uri: image }}
                      style={styles.previewImage}
                    />
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                      <Text style={styles.placeholderText}>Tap to select image</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Animatable.View>

              {/* Caption */}
              <Animatable.View animation="fadeIn" delay={600} style={styles.formGroup}>
                <Text style={styles.label}>Caption</Text>
                <TextInput
                  multiline
                  placeholder="Write your review or thoughts about this book..."
                  placeholderTextColor="#A0AEC0"
                  style={styles.textArea}
                  value={caption}
                  onChangeText={setCaption}
                />
              </Animatable.View>

              {/* Submit Button */}
              <Animatable.View animation="zoomIn" delay={700}>

                <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleSubmit} 
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color={COLORS.white} />
                        ) : (
                          <>
                            <Ionicons
                              name="cloud-upload-outline"
                              size={20}
                              color={COLORS.white}
                              style={styles.buttonIcon}
                            />
                            <Text style={styles.buttonText}>Post Recommendation</Text>
                          </>
                        )}
                </TouchableOpacity>

              </Animatable.View>
            </View>
          </Animatable.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Create;
