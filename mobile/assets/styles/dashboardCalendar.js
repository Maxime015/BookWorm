import { StyleSheet, Dimensions } from "react-native";
import { couleurs } from "../../constants/Couleurs";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  containerGeneral: {
    backgroundColor: couleurs.white,
    margin: width * 0.03, // 3% de la largeur
    padding: width * 0.025,
    borderRadius: width * 0.05,
    shadowColor: couleurs.black,
    shadowOffset: { width: 0, height: height * 0.012 },
    shadowOpacity: 0.3,
    shadowRadius: width * 0.05,
    elevation: 10,
    bottom: height * 0.018,
  },
  textTitreTransactions: {
    fontFamily: "HelveticaBold",
    fontSize: width * 0.06,
    color: couleurs.darkGreen,
    textAlign: "center",
    marginBottom: height * 0.014,
    marginTop: height * 0.007,
    bottom: height * 0.01,
    fontWeight: "bold",
  },
  calendarContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: -height * 0.025,
    gap: height * 0.005,
  },
  containerLigneTitre: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  boxCalendar: {
    width: width * 0.105,
    height: width * 0.105,
    borderRadius: width * 0.03,
    backgroundColor: couleurs.bluePastel,
    justifyContent: "center",
    alignItems: "center",
    margin: width * 0.01,
  },
  buttonImgBackground: {
    width: width * 0.105,
    height: width * 0.105,
    borderRadius: width * 0.03,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    margin: width * 0.01,
  },
  textJours: {
    fontSize: width * 0.032,
    fontFamily: "HelveticaBold",
    color: couleurs.grey,
  },
  textChiffre: {
    fontSize: width * 0.04,
    fontFamily: "HelveticaRegular",
    color: couleurs.black,
  },
  containerBoutons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -height * 0.015,
    marginBottom: height * 0.015,
  },
  bouton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: couleurs.darkGreen,
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.04,
    width: width * 0.4,
    height: height * 0.05,
    shadowColor: couleurs.black,
    shadowOffset: { width: 0, height: height * 0.005 },
    shadowOpacity: 0.2,
    shadowRadius: width * 0.02,
    elevation: 5,
  },
  textBouton: {
    fontFamily: "HelveticaBold",
    fontSize: width * 0.04,
    color: couleurs.white,
    marginLeft: width * 0.02,
  },
  image: {
    width: width * 0.05,
    height: width * 0.05,
  },
  boxCalendarJours: {
    width: width * 0.105,
    height: width * 0.105,
    borderRadius: width * 0.03,
    backgroundColor: couleurs.blue,
    justifyContent: "center",
    alignItems: "center",
    margin: width * 0.01,
  },
});

export default styles;

