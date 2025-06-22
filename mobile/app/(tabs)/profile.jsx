import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import styles from "../../assets/styles/profile.styles";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import { formatPublishDate } from "../../lib/utils";
import COLORS from "../../constants/colors";
import { useRouter } from "expo-router";
import Loader from "../../components/Loader";

const Profile = () => {
  const { token, user, logout } = useAuthStore();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

  const fetchUserBooks = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const res = await fetch(`${API_URL}/books/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Failed to load user books", err);
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const onRefresh = () => fetchUserBooks(true);

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: logout, style: "destructive" }
      ]
    );
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this book?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleteBookId(id);
              const res = await fetch(`${API_URL}/books/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              const data = await res.json();
              if (!res.ok) {
                Alert.alert("Error", data.message || "Failed to delete book.");
                return;
              }

              setBooks(prev => prev.filter(book => book._id !== id));
              Alert.alert("Success", "Book deleted successfully!");
            } catch (error) {
              console.error("Delete error:", error);
              Alert.alert("Error", "An error occurred while deleting the book.");
            } finally {
              setDeleteBookId(null);
            }
          },
        },
      ]
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FontAwesome
        key={i}
        name={i < rating ? "star" : "star-o"}
        size={14}
        color="#FBBF24"
        style={{ marginRight: 2 }}
      />
    ));
  };

  const renderBookItem = useCallback(({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={index * 120}
      useNativeDriver
      style={styles.bookItem}
    >
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
        <Text numberOfLines={2} style={styles.bookCaption}>{item.caption}</Text>
        <Text style={styles.bookDate}>{formatPublishDate(item.createdAt)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item._id)}
        accessibilityLabel="Delete this book"
      >
        {deleteBookId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Ionicons name="trash-outline" size={20} color="#DC2626" />
        )}
      </TouchableOpacity>
    </Animatable.View>
  ), [deleteBookId]);

  if (loading && !refreshing) return <Loader />;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
    >
      <Animatable.View animation="fadeInDown" duration={800} style={styles.profileHeader}>
        <Image
          source={{ uri: user?.profileImage?.replace("svg", "png") }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}> 
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.memberSince}>
            📆 Joined {formatPublishDate(user?.createdAt)}
          </Text>
        </View>
      </Animatable.View>

      <Animatable.View animation="zoomIn" delay={400}>
        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animatable.View>

      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations 📚</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      {books.length === 0 ? (
        <Animatable.View animation="fadeIn" delay={500} style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={64} color="#888" />
          <Text style={styles.emptyText}>No books yet</Text>
          <Text style={styles.emptySubtext}>Start sharing your favorite reads!</Text>
          <TouchableOpacity onPress={() => router.push("/add-book")}>
            <Text style={styles.addBookButton}>+ Add a new book</Text>
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
          renderItem={renderBookItem}
          contentContainerStyle={styles.booksList}
          scrollEnabled={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        />
      )}
    </ScrollView>
  );
};

export default Profile;
