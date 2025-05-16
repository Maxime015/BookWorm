import { StyleSheet, Dimensions } from "react-native";
import { couleurs } from "../../constants/Couleurs";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    containerGeneral: {
        marginHorizontal: width * 0.05, // 5% du width
    },
    dropdown: {
        height: height * 0.040, // hauteur relative
        width: width * 0.25,    // 25% du width
        borderColor: couleurs.black,
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: width * 0.02,
        backgroundColor: couleurs.grey,
    },
    icon: {
        marginRight: width * 0.015,
    },
    label: {
        position: "absolute",
        backgroundColor: couleurs.grey,
        fontFamily: "HelveticaBold",
        left: width * 0.055,
        top: height * 0.01,
        zIndex: 999,
        paddingHorizontal: width * 0.025,
        fontSize: width * 0.035,
        borderRadius: 100,
    },
    placeholderStyle: {
        fontSize: width * 0.035,
    },
    selectedTextStyle: {
        fontSize: width * 0.035,
    },
    iconStyle: {
        width: width * 0.05,
        height: width * 0.05,
    },
    item: {
        padding: width * 0.025,
        borderBottomWidth: 1,
        borderBottomColor: couleurs.black,
    },
    itemText: {
        fontSize: width * 0.035,
        fontFamily: "HelveticaRegular",
        color: couleurs.black,
    },
    dropdownContainer: {
        backgroundColor: couleurs.grey,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: couleurs.black,
    },
    containerTitre: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textTitreTransactions: {
        fontFamily: "HelveticaBold",
        fontSize: width * 0.06,
        marginBottom: height * 0.01,
    },
    containerScrollView: {
        height: height * 0.41,
    },
});

export default styles;
