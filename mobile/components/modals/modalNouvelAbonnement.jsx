import {
    TouchableOpacity,
    Modal,
    TextInput,
    View,
    Text,
    ImageBackground,
    ActivityIndicator
} from "react-native";
import { couleurs } from "@/constants/Couleurs";
import { BlurView } from "expo-blur";
import { Dropdown } from 'react-native-element-dropdown';
import { database } from "@/constants/configFirebase";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { MOIS_DICTIONNAIRE } from "@/constants/CONST_TEMPOREL";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styles from "../../assets/styles/createAbonnement";

// FORMULAIRE POUR AJOUTER UN ABONNEMENT
export function ModalNouvelAbonnement({ visibiliteModalNouvelAbonnement, setVisibiliteModalNouvelAbonnement }) {
    const [nomAbonnement, setNomAbonnement] = useState("");
    const [prixAbonnement, setPrixAbonnement] = useState("");
    const [recurrence, setRecurrence] = useState("");
    const [erreur, setErreur] = useState("blablablaest hgdfoqgf");
    const [image, setImage] = useState("");
    // Date
    const [jourDate, setJourDate] = useState("");
    const [moisDate, setMoisDate] = useState(null);
    const [anneeDate, setAnneeDate] = useState(null);
    const [chargement, setChargement] = useState(false);


    const recurrenceLabel = [
        { label: "Monthly", value: "mensuel" },
        { label: "Annual", value: "annuel" }
    ];

    // Fonction qui génère une liste avec les années depuis 2010
    function genererTableauAnnee() {
        let tableau = [];
        for (let i = 2025; i > 2010; i--) {
            tableau.push({ label: i.toString(), value: i });
        }
        return tableau;
    }

    // Foncrion qui reset les valeurs des labels dans les variables locales
    function resetLabels() {
        setNomAbonnement("");
        setPrixAbonnement("");
        setRecurrence("");
        setJourDate("");
        setMoisDate(null);
        setAnneeDate(null);
        setImage("");
    }

    // Fonction qui vérifie si une date entrée est une date valide
    function checkDateExiste(jour, mois, annee) {
        if (mois < 0 || mois > 11) return false;
        console.log("jour : " + jour + "mois : " + mois + "année : " + annee);
        let estUneDate = true;
        const estBissextile = (annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0);
        const joursFevrier = estBissextile ? 29 : 28;
        const mois31 = [0, 2, 4, 6, 7, 9, 11];
        const mois30 = [3, 5, 8, 10];
        mois = Number(mois);
        if (mois31.includes(mois)) {
            console.log("mois 31");
            if (jour < 1 || jour > 31) estUneDate = false;
        } else if (mois30.includes(mois)) {
            console.log("mois 30");
            if (jour < 1 || jour > 30) estUneDate = false;
        } else if (mois === 1) {
            console.log("mois fevrier");
            if (jour < 1 || jour > joursFevrier) estUneDate = false;
        } else {
            estUneDate = false;
        }
        console.log("date ? " + estUneDate);
        return estUneDate;
    }

    // Fonction qui upload le logo de l'abonnement sélectionnée dans la base de données firebase
    const uploadImageAsync = async (uri) => {
        try {
            const cloudName = "dms5h42sp"; // Ex: "demo"
            const uploadPreset = "ml_default"; // Ex: "my_preset"
    
            const base64Img = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
    
            const data = {
                file: `data:image/jpeg;base64,${base64Img}`,
                upload_preset: uploadPreset
              };
                  
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (result.secure_url) {
                console.log("Image uploaded to Cloudinary:", result.secure_url);
                return result.secure_url;
            } else {
                throw new Error("Error Cloudinary : " + JSON.stringify(result));
            }
        } catch (error) {
            console.error("Error upload Cloudinary :", error);
            throw error;
        }
    };
    

    // Fonction qui vérifie que les entrées de l'utilisateurs sont valides puis qui vient ajouter l'abonnement (firebase et maj des variables locales)
    async function validationEntreeArgent() {
        setChargement(true);
        try {
            if (image === "" || nomAbonnement === "" || prixAbonnement === "" || recurrence === "" || jourDate === "" || moisDate === null || anneeDate === null || checkDateExiste(jourDate, moisDate, anneeDate) === false) {
                if (checkDateExiste(jourDate, moisDate, anneeDate) === false) {
                    setErreur("Oops, the date you entered appears to be invalid. Could you please double-check it?");
                } else {
                    setErreur("It appears that not all fields have been completed. Kindly ensure all required information is provided !");
                }
                resetLabels();
                setVisibiliteModalNouvelAbonnement(true);
                setChargement(false);
                return;
            }
    
            const nouvelID = Date.now();
            const transactionsRef = ref(database, "abonnement/" + nouvelID);
            const dateTransaction = new Date(anneeDate, moisDate, Number(jourDate));
    
            let downloadURL = null;
            if (image) {
                downloadURL = await uploadImageAsync(image);
            }
    
            await set(transactionsRef, {
                label: nomAbonnement,
                date: dateTransaction.toISOString(),
                prix: prixAbonnement,
                recurrence: recurrence,
                imageUrl: downloadURL || null 
            });
    
            resetLabels();
            setVisibiliteModalNouvelAbonnement(false);
        } catch (error) {
            console.error("Error adding subscription:", error);
            setErreur("An error occurred. Please try again!");
        } finally {
            setChargement(false);
        }
    }
    

    // Génération des composants pour le dropdown
    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.label}</Text>
            </View>
        );
    };

        // Fonction pour sélectionner une image dans notre gallerie
        const pickImage = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('We apologize, but we require your permission to access your gallery!');
                return;
            }
        
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                setImage(uri);
                console.log("Selected URI image :", uri);
            }
        };
        
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibiliteModalNouvelAbonnement}
            onRequestClose={() => setVisibiliteModalNouvelAbonnement(false)}
        >
            <BlurView intensity={10} style={styles.modalOverlay}>
                <View style={styles.containerModal}>
                    <Text style={styles.modalTitle}>Add a subscription</Text>
                    {/*Input pour le nom de l'abonnement*/}
                    <TextInput
                        style={styles.input}
                        placeholder="Label"
                        placeholderTextColor="black"
                        onChangeText={setNomAbonnement}
                        value={nomAbonnement}
                    />
                    <View style={styles.containerInputDate}>
                        {/*Input pour le prix de l'abonnement*/}
                        <TextInput
                            style={[styles.input, { width: 135 }]}
                            placeholder="Amount"
                            keyboardType="numeric"
                            placeholderTextColor="black"
                            onChangeText={setPrixAbonnement}
                            value={prixAbonnement}
                        />
                        {/*Menu déroulant pour choisir la récurrence de l'abonnement*/}
                        <Dropdown
                        style={[styles.input, styles.dropdownContainerRecurrence]}
                        placeholderStyle={[styles.placeholderStyle, { color: 'black' }]} // <-- couleur du placeholder
                        selectedTextStyle={styles.selectedTextStyle}
                        data={recurrenceLabel}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Recurrence"
                        value={recurrence}
                        onChange={item => setRecurrence(item.value)}
                        renderItem={renderItem}
                        containerStyle={[styles.dropdownContainer, { width: 120 }]}
                        renderRightIcon={() => null}
                        />

                    </View>
                    {/*Container des inputs pour choisir la date de l'abonnement*/}
                    <View style={styles.containerInputDate}>
                        {/*Input pour choisir le jour de l'abonnement*/}
                        <TextInput
                            style={styles.inputJour}
                            placeholder="Day"
                            placeholderTextColor="black"
                            keyboardType="numeric"
                            onChangeText={setJourDate}
                            value={jourDate}
                        />
                        {/*Menu déroulant pour choisir le mois de l'abonnement*/}
                        <Dropdown
                            style={[styles.input, styles.dropdownContainer]}
                            placeholderStyle={[styles.placeholderStyle, { color: 'black' }]}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={MOIS_DICTIONNAIRE}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={"Month"}
                            value={moisDate}
                            onChange={item => setMoisDate(item.value)}
                            renderItem={renderItem}
                            containerStyle={styles.dropdownContainer}
                            renderRightIcon={() => null}
                        />
                        {/*Menu déroulant pour choisir l'année de l'abonnement*/}
                        <Dropdown
                            style={[styles.input, styles.dropdownContainerAnnee]}
                            placeholderStyle={[styles.placeholderStyle, { color: 'black' }]}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={genererTableauAnnee()}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={"Year"}
                            value={anneeDate} 
                            onChange={item => setAnneeDate(item.value)} 
                            renderItem={renderItem}
                            containerStyle={[styles.dropdownContainer, { width: 80 }]}
                            renderRightIcon={() => null}
                        />
                    </View>
                    {/*Container pour choisir le logo de l'abonnement et affiche l'image sélectionnée en background si elle existe*/}
                    {image ? (
                        <>
                            <ImageBackground source={{ uri: image }} style={[styles.buttonImgBackground, { overflow: 'hidden' }]} imageStyle={{ borderRadius: 5 }} resizeMode="cover">
                                <Text style={[styles.buttonText, { color: couleurs.white }]}>Logo added</Text>
                            </ImageBackground>
                        </>
                    ) : (
                        <TouchableOpacity
                                style={[
                                    styles.button,
                                    { 
                                        backgroundColor: couleurs.grey,
                                        marginBottom: 30,
                                        borderWidth: 2,
                                        borderColor: couleurs.darkBlue
                                    }
                                ]}
                                onPress={pickImage}
                            >
                                <Text style={[styles.buttonText, { color: couleurs.black }]}>Add a logo</Text>
                        </TouchableOpacity>

                    )}
                    {/*Bouton annuler*/}
                    <TouchableOpacity style={[styles.button, { backgroundColor: couleurs.darkBlue }]} onPress={() => {
                        setVisibiliteModalNouvelAbonnement(false);
                        resetLabels();
                    }}>
                        <Text style={[styles.buttonText, { color: couleurs.white }]}>Close</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: couleurs.bluePastel, opacity: chargement ? 0.7 : 1 }]}
                        onPress={validationEntreeArgent}
                        disabled={chargement}
                    >
                        {chargement ? (
                            <ActivityIndicator size="small" color={couleurs.white} />
                        ) : (
                            <Text style={[styles.buttonText, { color: couleurs.darkBlue }]}>Save</Text>
                        )}
                    </TouchableOpacity>

                </View>
            </BlurView>
        </Modal>
    );
}
