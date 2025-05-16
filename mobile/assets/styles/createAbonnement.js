import { StyleSheet } from "react-native";
import {couleurs} from "../../constants/Couleurs";


const styles = StyleSheet.create({
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Couche semi-transparente
        justifyContent: "center",
        alignItems: "center",
    },
    // Dropdown
    dropdown: { // dropdown replié
        height: 30,
        width: 120,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: couleurs.grey,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    label: {
        position: 'absolute',
        backgroundColor: couleurs.grey,
        fontFamily: "HelveticaBold",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 10,
        fontSize: 14,
        borderRadius: 100
    },
    placeholderStyle: {
        fontSize: 14,
        color: "#CBCBCC",
    },
    selectedTextStyle: {
        fontSize: 14,
        color: couleurs.black,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    item: {
        padding: 10,
    },
    itemText: {
        fontSize: 14,
        fontFamily: 'HelveticaRegular',
        color: couleurs.black,
    },
    dropdownContainer: {
        width: 100,
        borderRadius: 5
    },
    dropdownContainerAnnee: {
        width: 80,
        borderRadius: 5
    },
    dropdownContainerRecurrence: {
        width: 120,
        borderRadius: 5
    },
    // Containers
    containerInputDate: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    notificationContainer: {
        width: "100%",
        height: 130,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    notification: {
        width: "80%",
        height: 70,
        backgroundColor: couleurs.darkRed,
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        padding: 10
    },
    containerCroisTexte: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    // Texte
    notificationTitre: {
        fontFamily: "HelveticaBold",
        fontSize: 20,
        color: couleurs.lightRed
    },
    notificationTexte: {
        fontFamily: "HelveticaRegular",
        fontSize: 14,
        color: couleurs.lightRed
    },
    image: {
        width: 100,
        height: 100
    },
    
    containerModal: {
        width: "90%",
        padding: 25,
        backgroundColor: "#F9FAFB",
        borderRadius: 20,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: "HelveticaBold",
        marginBottom: 20,
        color: couleurs.darkBlue,
        alignSelf: "center"
    },
    inputJour: {
        width: 70,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 5,
        padding: 12,
        color: couleurs.black,
        marginBottom: 15,
        fontFamily: "HelveticaRegular",
        marginBottom: 15,
        fontSize: 15,
        backgroundColor: "#FFF", 
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        fontSize: 15,
        color: couleurs.black,
        fontFamily: "HelveticaRegular",
    },
    button: {
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 12,
        width: "100%",
        alignItems: "center",
        backgroundColor: couleurs.darkBlue,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontFamily: "HelveticaBold",
    },
    buttonImgBackground: {
        width: "100%",
        height: 140,
        borderRadius: 12,
        marginBottom: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: couleurs.darkBlue
    },
    
});


export default styles;