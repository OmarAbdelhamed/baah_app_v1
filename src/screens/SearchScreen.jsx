import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SwipeCards from 'react-native-swipe-cards';
import { useFavorites } from './tabScreens/FavoritesContext';
import axios from 'axios';
import Card from '../components/Card';

const SearchScreen = () => {

    const [searchWord, setSearchWord] = useState('');
    const { favorites, toggleFavorite } = useFavorites();
    const [itemArr, setItem] = useState([]);
    const [favArr, setFavArr] = useState([]);
    const NoMoreCards = () => (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreCardsText}>لا توجد بطاقات أخرى</Text>
        </View>
      );
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='ابحث هنا .....'
                value={searchWord}
                onChangeText={async (text) => {
                    setSearchWord(text)
                    try {
                        const response = await axios.post(
                            `https://marriage-application.onrender.com/search?search=${text?text:null}`
                        );
                        setItem(response.data);
                    } catch (err) {
                        Alert.alert(err);
                    }
                }}
            />


            <SwipeCards
                cards={itemArr}
                renderCard={(cardData) => (
                    <Card
                        card={cardData}
                        toggleFavorite={toggleFavorite}
                        isFavorite={favorites.includes(cardData.id)}
                        favArr={favArr}
                    />
                )}
                renderNoMoreCards={() => <NoMoreCards />}
                useNativeDriver={true}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingbottom:12,

        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'right',
    },
    circularButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    circularButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#F2F2F2',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#b2b8bf',
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom:20,
        marginTop:10
    },
});
export default SearchScreen