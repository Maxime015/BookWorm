import { StyleSheet } from "react-native";
import { couleurs } from "../../constants/Couleurs";

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    containerModal: {
        width: "85%",
        padding: 24,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: "HelveticaBold",
        marginBottom: 20,
        color: couleurs.darkBlue,
        textAlign: "center",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#F9F9F9",
        color: couleurs.black,
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 14,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontFamily: "HelveticaBold",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
    placeholderStyle: {
        fontSize: 14,
        color: "#A0A0A0",
    },
    selectedTextStyle: {
        fontSize: 14,
        color: couleurs.black,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    itemText: {
        fontSize: 14,
        fontFamily: 'HelveticaRegular',
        color: couleurs.black,
    },
    dropdownContainer: {
        borderRadius: 12,
        borderColor: "#DCDCDC",
        paddingHorizontal: 8,
        backgroundColor: "white",
    },
});

export default styles;
