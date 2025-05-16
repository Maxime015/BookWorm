import { Text, View, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";
import { couleurs } from '@/constants/Couleurs';
import { database } from "@/constants/configFirebase";
import { ref, get } from "firebase/database";
import { useState, useEffect } from "react";
import { MOIS_DICTIONNAIRE, JOURS_DICTIONNAIRE } from "@/constants/CONST_TEMPOREL";
import styles from "../../assets/styles/dashboardCalendar";

// CALENDRIER POUR VISUALISER LES ABONNEMENTS À VENIR
export function DashboardCalendar({ setVisibiliteModalNouvelAbonnement, setVisibiliteModalDeleteAbonnement, visbiliteModalNouvelAbonnement, visibiliteModalDeleteAbonnement }) {
    const [abonnements, setAbonnements] = useState([]);

    // Fonction qui génère le titre du dashboard (mois + année)
    function getTitreDashboard() {
        const date = new Date();
        const moisIndex = date.getMonth();
        const annee = date.getFullYear();
        const mois = MOIS_DICTIONNAIRE.find(item => Number(item.value) === moisIndex)?.label || "Mois inconnu";
        const chaine = mois.charAt(0).toUpperCase() + mois.slice(1).toLowerCase() + " " + annee;
        return chaine
    }

    // Fonction qui filtre les logo des abonnements à afficher en fonction du mois
    function filterAbonnementsCalendar() {
        const anciensAbonnements = abonnements; 
        const updatedAbonnements = [];
        for (const abonnement of anciensAbonnements) {
            const abonnementDate = new Date(abonnement.date);
            const moisAbonnement = abonnementDate.getMonth();
            const moisActuel = new Date().getMonth();
            const finMois = new Date(new Date().getFullYear(), Number(moisActuel) + 1, 0);
            if (abonnementDate <= finMois) {
                if (abonnement.recurrence === "mensuel") {
                    const tempDico = {
                        jour: abonnementDate.getDate(),
                        photoUri: abonnement.imageUrl
                    };
                    updatedAbonnements.push(tempDico);
                } else if (abonnement.recurrence === "annuel") {
                    if (moisAbonnement === Number(moisActuel)) {
                        const tempDico = {
                            jour: abonnementDate.getDate(),
                            photoUri: abonnement.imageUrl
                        };
                        updatedAbonnements.push(tempDico);
                    }
                }
            }
        }
        return updatedAbonnements;
    }

    // Fonction qui récupère les abonnements depuis firebase
    async function getAbonnementsFromFirebase() {
        const reference = ref(database, "abonnement");
        try {
            const snapshot = await get(reference);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available for this path.");
                return [];
            }
        } catch (error) {
            console.error("Error retrieving data:", error);
            return [];
        }
    }

    // Garantie que les abonnements sont tjrs à jour en local
    useEffect(() => {
        async function fetchData() {
            const data = await getAbonnementsFromFirebase();
            setAbonnements(Object.values(data)); 
        }

        fetchData();
    }, [visbiliteModalNouvelAbonnement, visibiliteModalDeleteAbonnement]);

    // Fonction qui retourne un tableau formaté pour correspondre les chiffres avec les jours de la semaine
    // ajoute des cases vides avant et apres les chiffres pour garantir le décalage
    function calculerDecalage() {
        const date = new Date();
        const annee = date.getFullYear();
        const mois = date.getMonth();

        // Premier jour du mois
        const premierDuMois = new Date(annee, mois, 1);
        const difference = (7 + premierDuMois.getDay()) % 7;

        // Calcul du nombre de jours dans le mois
        const estBissextile = (annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0);
        const joursFevrier = estBissextile ? 29 : 28;
        const mois31 = [0, 2, 4, 6, 7, 9, 11];
        const mois30 = [3, 5, 8, 10];

        let nbJoursMois = 0;
        if (mois31.includes(mois)) {
            nbJoursMois = 31;
        } else if (mois30.includes(mois)) {
            nbJoursMois = 30;
        } else if (mois === 1) {
            nbJoursMois = joursFevrier;
        }

        const tab = [];
        let ligne = [];

        // Ajouter les jours du mois au tableau
        for (let i = 0; i < difference; i++) {
            ligne.push(""); 
        }

        for (let jour = 1; jour <= nbJoursMois; jour++) {
            ligne.push(jour);
            if (ligne.length === 7) {
                tab.push(ligne);
                ligne = [];
            }
        }

        // Compléter la dernière ligne si nécessaire (case vide à la fin du mois)
        if (ligne.length > 0) {
            while (ligne.length < 7) {
                ligne.push(""); 
            }
            tab.push(ligne);
        }

        console.log(tab);
        return tab;
    }

    const abonnementsFiltres = filterAbonnementsCalendar();

    return (
        <>
        <View style={styles.containerGeneral}>
            <View style={styles.containerChiffres}>
                {/*Titre du dashboard*/}
                <Text style={styles.textTitreTransactions}>{getTitreDashboard()}</Text>
                <View style={styles.calendarContainer}>
                    {/*Ligne avec les jours (lun mar mer jeu ven sam dim*/}
                    <View style={styles.containerLigneTitre}>
                        {
                            JOURS_DICTIONNAIRE.map((jour, index) => (
                                <View key={jour.value} style={styles.boxCalendarJours}>
                                    <Text style={styles.textJours}>{jour.label.slice(0, 3)}</Text>
                                </View>
                            ))
                        }
                    </View>
                    {/*Calendrier avec les chiffres alignés aux jours*/}
                    {   
                        calculerDecalage().map((ligne, index) => (
                            <View key={index} style={styles.containerLigneTitre}>
                                {ligne.map((jour, idx) =>
                                    // Ajoute le logo de l'abonnement en background si c'est le jour du prélèvement
                                    abonnementsFiltres.some(abonnement => abonnement.jour === jour) ? (
                                        <ImageBackground
                                            key={`${jour}-${idx}`}
                                            source={{ uri: abonnementsFiltres.find(abonnement => abonnement.jour === jour)?.photoUri }}
                                            style={[styles.buttonImgBackground, { overflow: "hidden" }]}
                                            imageStyle={{ borderRadius: 100 }}
                                            resizeMode="cover"
                                        >
                                            <Text style={[styles.textChiffre, {color: couleurs.white, fontFamily: "HelveticaBold"}]}>{jour}</Text>
                                        </ImageBackground>
                                    ) : (
                                        <View key={`${jour}-${idx}`} style={styles.boxCalendar}>
                                            <Text style={styles.textChiffre}>{jour}</Text>
                                        </View>
                                    )
                                )}
                            </View>
                        ))
                    }
                </View>
            </View>

        </View >

        <View style={styles.containerBoutons}>
                <TouchableOpacity style={[styles.bouton, { backgroundColor: couleurs.primary }]} onPress={() => setVisibiliteModalNouvelAbonnement(true)}>
                    <Text style={[styles.textBouton, { color: "#fff" }]}>Add</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.bouton, { backgroundColor: couleurs.darkBlue }]} onPress={() => setVisibiliteModalDeleteAbonnement(true)}>
                    <Text style={[styles.textBouton, { color: "#fff"  }]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}