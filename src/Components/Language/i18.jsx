
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    resources: {
      en: {
        translation: {
          SignIn: "Sign In",
          SignUp: "Sign Up",
          MovieDekho: "MovieDekho",
          English: "English",
          Hindi: "Hindi",
          MobileNo: "Mobile Number",
          Password: "Password",
          Or: "Or",
          signincode: "Use a sign-in code",
          new: "New to MovieDekho?",
          signupNow: "Sign up now.",
          FirstName: "First Name",
          LastName: "Last Name",
          HaveAnAc: "Have an account?",
          Login: "Login Here",
          SendOtp: "Send OTP",
          SigningIn: "Signing In...",
          SigningUp:'SigningUp....',
          Submit:'Submit'
        },
      },
      hi: {
        translation: {
          SignIn: "साइन इन",
          SignUp: "साइन अप",
          MovieDekho: "मूवी देखो",
          English: "अंग्रेज़ी",
          Hindi: "हिंदी",
          MobileNo: "मोबाइल नंबर",
          Password: "पासवर्ड",
          Or: "या",
          signincode: "साइन-इन कोड का उपयोग करें",
          new: "मूवी देखो पर नए हैं?",
          signupNow: "अभी साइन अप करें।",
          FirstName: "पहला नाम",
          LastName: "अंतिम नाम",
          HaveAnAc: "खाता है?",
          Login: "यहां लॉगिन करें।",
          SendOtp: "ओटीपी भेजें",
          SigningIn: "साइन इन कर रहा है...",
          SigningUp: 'साइन अप कर रहे हैं...',
          Submit: 'जमा करें'
        },
      },
    },
  });
