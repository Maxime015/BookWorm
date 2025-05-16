import {
    TouchableOpacity,
    Modal,
    View,
    Text
} from "react-native";
import { couleurs } from "@/constants/Couleurs";
import { BlurView } from "expo-blur";
import { Dropdown } from "react-native-element-dropdown";
import { useState, useEffect } from "react";
import { ref, set, get } from "firebase/database";
import { database } from "@/constants/configFirebase";
import styles from "../../assets/styles/deleteAbonnement";

// FORMULAIRE SUPPRIMER ABONNEMENT
export function ModalDeleteAbonnement({ visibiliteModalDeleteAbonnement, setVisibiliteModalDeleteAbonnement }) {
    const [abonnements, setAbonnements] = useState([]);
    const [abonnementSelectionne, setAbonnementSelectionne] = useState(null);
    const [erreur, setErreur] = useState("");

    // Fonction qui supprimer un abonnement à partir de sa key (dans firebase et dans les variables locales)
    async function supprimerAbonnement(key) {
        try {
            if (!key) {
                setErreur("Please select a subscription.");
                return;
            }
            const abonnementRef = ref(database, `abonnement/${key}`);
            await set(abonnementRef, null);
            setAbonnements(prev => prev.filter(ab => ab.key !== key));
            setVisibiliteModalDeleteAbonnement(false);
        } catch (error) {
            console.error("Error deleting subscription:", error);
            setErreur("An error occurred while deleting");
        }
    }

    // Récupère les abonnements depuis firebase
    async function getAbonnementsFromFirebase() {
        try {
            const reference = ref(database, "abonnement");
            const snapshot = await get(reference);
            if (snapshot.exists()) {
                return Object.entries(snapshot.val()).map(([key, value]) => ({
                    key,
                    label: value.label,
                    value: key
                }));
            } else {
                console.log("No data available for this path.");
                return [];
            }
        } catch (error) {
            console.error("Error retrieving data:", error);
            return [];
        }
    }

    // Garantie que les abonnements sont bien à jour au chargement du composant
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            const data = await getAbonnementsFromFirebase();
            if (isMounted) {
                setAbonnements(data);
            }
        }

        fetchData();

        return () => {
            isMounted = false; 
        };
    }, [visibiliteModalDeleteAbonnement]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibiliteModalDeleteAbonnement}
            onRequestClose={() => setVisibiliteModalDeleteAbonnement(false)}
        >
            <BlurView intensity={10} style={styles.modalOverlay}>
                <View style={styles.containerModal}>
                    <Text style={styles.modalTitle}>Delete a subscription</Text>

                    {/*Dropdown avec la liste de tous les abonnements*/}
                    <Dropdown
                    style={styles.input}
                    placeholderStyle={[styles.placeholderStyle, { color: 'black' }]} // <-- ici pour la couleur du placeholder
                    selectedTextStyle={[styles.selectedTextStyle, { color: 'black' }]} // <-- ici pour le texte sélectionné
                    data={abonnements}
                    value={abonnementSelectionne}
                    onChange={item => setAbonnementSelectionne(item.value)}
                    labelField="label"
                    valueField="value"
                    placeholder="Choose a subscription"
                    renderItem={item => (
                        <View style={styles.item}>
                        <Text style={styles.itemText}>{item.label}</Text>
                        </View>
                    )}
                    containerStyle={styles.dropdownContainer}
                    />

                    {erreur ? <Text style={styles.errorText}>{erreur}</Text> : null}

                    {/*Bouton annuler*/}
                    <TouchableOpacity style={[styles.button, { backgroundColor: couleurs.darkBlue }]} onPress={() => setVisibiliteModalDeleteAbonnement(false)}>
                        <Text style={[styles.buttonText, { color: couleurs.white }]}>Close</Text>
                    </TouchableOpacity>
                    
                    {/*Formulaire valider*/}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: couleurs.bluePastel }]}
                        onPress={() => supprimerAbonnement(abonnementSelectionne)}
                    >
                        <Text style={[styles.buttonText, { color: couleurs.darkBlue }]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    );
}

