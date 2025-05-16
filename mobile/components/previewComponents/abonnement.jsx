import {View, Text, Image} from "react-native";
import { MOIS_DICTIONNAIRE } from "@/constants/CONST_TEMPOREL";
import styles from "../../assets/styles/abonnement";


// COMPOSANT ABONNEMENT
export function Abonnement({label, prix, date, image}){
    // Fonction qui formate la date correctement pour l'affichage (chaine de caractère)
    function formatDate(dateString) {
        const date = new Date(dateString); 
        const moisIndex = date.getMonth();
        const mois = MOIS_DICTIONNAIRE.find(item => Number(item.value) === moisIndex)?.label || "Mois inconnu";
        const dateFormatee = date.getDate() + " " + mois + " " + date.getFullYear();
        return dateFormatee;
    }
    
    return(
        <View style={styles.containerGlobal}>
            {/*Logo de l'abonnement */}
            <Image style={styles.imageAbonnement} source={{ uri: image }}/>
            {/*Informaiton sur l'abonnement*/}
            <View style={styles.containerInfosAbonnement}>
                <View style={styles.containerPrixLabel}>
                    <Text style={styles.textLabel}>{label}</Text>
                    <Text style={styles.textPrix}>{prix}€</Text>
                </View>
                <Text style={styles.textDate}>{formatDate(date)}</Text>
            </View>
        </View>
    );
}

