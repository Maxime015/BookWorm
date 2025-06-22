import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import moment from "moment";
import styles from "../../assets/styles/home.styles";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import { formatPublishDate } from "../../lib/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import Loader from "../../components/Loader";


export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const { token } = useAuthStore();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=2`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch books");

      if (refresh) {
        setBooks(data.books);
      } else {
        setBooks((prevBooks) => [...prevBooks, ...data.books]);
      }

          const uniqueBooks = refresh || pageNum === 1
        ? data.books
        : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
            [...books, ...data.books].find((book) => book._id === id)
          );

          setBooks(uniqueBooks);

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching books", error);
    } finally {
      if (refresh) {
        await sleep(800); 
        setRefreshing(false);
      }
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      await sleep(1000);
      await fetchBooks(page + 1);
    }
  };

  const renderStars = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome key={`full-${i}`} name="star" size={16} color="#FFD700" />);
    }
    for (let j = stars.length; j < 5; j++) {
      stars.push(<FontAwesome key={`empty-${j}`} name="star-o" size={16} color="#FFD700" />);
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={index * 100} duration={600} style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item?.user?.profileImage?.replace("svg", "png") || "https://via.placeholder.com/50" }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user?.username || "John Doe"}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image
          source={{ uri: item.image || "https://via.placeholder.com/300x200" }}
          style={styles.bookImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title || "Untitled"}</Text>
        {renderStars(item.rating)}
        <Text style={styles.caption}>{item.caption || "No caption"}</Text>
        <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>
      </View>
    </Animatable.View>
  );

  console.log(books);

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />

      ) : (
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item._id || item.title || "book"}-${index}`}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchBooks(1, true)}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }

          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={() => fetchBooks(1, true)}
          ListHeaderComponent={
            <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
              <Text style={styles.headerTitle}>BookWorm 🐛</Text>
              <Text style={styles.headerSubtitle}>
                Discover great reads from the community 👇
              </Text>
            </Animatable.View>
          }

          ListEmptyComponent ={
            <View style={styles.emptyContainer}>
              <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>No recommendations yet</Text>
              <Text style={styles.emptySubtext}>Be the first to share a book!</Text>
            </View>
          }

          ListFooterComponent={
            hasMore && books.length > 0 ? (
              <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
            ) : null
          }

        />
      )}
    </View>
  );
}

