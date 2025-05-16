import { StyleSheet } from "react-native";
import { couleurs } from "../../constants/Couleurs";

const styles = StyleSheet.create({
    containerGlobal: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        padding: 8,
        paddingRight: 20,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    imageAbonnement: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
    },
    containerInfosAbonnement: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
    },
    containerPrixLabel: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textLabel: {
        fontFamily: "HelveticaBold",
        fontSize: 18,
        color: couleurs.black,
        fontWeight: 'bold',
    },
    textPrix: {
        fontFamily: "HelveticaBold",
        fontSize: 20,
        color: couleurs.darkBlue,
        fontWeight: 'bold',
        top: 10
    },
    textDate: {
        fontFamily: "HelveticaRegular",
        fontSize: 15,
        color: "#7D7D7D",
        marginTop: 4,
    },
    smileyText: {
        fontSize: 24,
    },
});

export default styles;
