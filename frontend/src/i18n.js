import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      pageTitle: "Appointment Details",
      someText: "Some text on the page in English",
      appointmentForm: {
        customerName: "Customer Name",
        serviceType: "Service Type",
        date: "Date",
        timeSlot: "Time Slot",
        notes: "Notes",
        submit: "Submit",
        error: "You must be logged in",
        selectService: "-- Select a service --",
        childrenHaircut: "Children's Haircut",
        adultHaircut: "Adult Haircut",
        shaving: "Shaving",
        hairColoring: "Hair Coloring",
        bookAppointment: "Book an Appointment",
        dateAndTimeInvalid: "Date and Time",
      },
      home: {
        title: "Home",
        welcome: "Welcome to Barbershop MP",
        description: "One stop for getting the perfect haircut!",
        bookNow: "Book Now",
      },

      aboutUs: {
        title: "About Us",
        description:
          "BarbershopMP, founded in 2023 by two senior Hair Stylists, is a testament to a shared vision of delivering exceptional grooming experiences. At the heart of BarbershopMP is a dedication to craftsmanship, where each haircut is a canvas and every service is a masterpiece. We invite you to indulge in a journey of style, guided by our expert barbers who blend tradition with modern techniques. BarbershopMP’s commitment to excellence extends beyond the chair, offering carefully curated products and a warm atmosphere that reflects our passion for grooming. Join us at BarbershopMP, where every visit is an opportunity to redefine your style and elevate your confidence.",
        mapTitle: "BarbershopMP map",
        contactTitle: "Contact Us",
        contactInfo:
          "For appointments and inquiries, please reach out to us at",
        contactText:
          "Feel free to contact us with any questions or to book your grooming experience",
        openingHoursTitle: "Opening Hours",
        openingHoursText:
          "Monday to Friday: 9:00 AM to 8:00 PM\nSaturday: 11:00 AM to 4:00 PM\nSunday: Closed",
      },
      services: {
        title: "Services and Pricing",
        serviceTypes: {
          childrenHaircut: "Children's Haircut",
          adultHaircut: "Adult Haircut",
          shaving: "Shaving",
          hairColoring: "Hair Coloring",
        },
      },
      navbar: {
        services: "Services",
        home: "Home",
        aboutUs: "About Us",
        login: "Login",
        signup: "Sign Up",
        logout: "Logout",
        BarbershopMP: "BarbershopMP",
      },
    },
  },
  fi: {
    translation: {
      pageTitle: "Varaustiedot",
      someText: "Sivulla oleva teksti suomeksi",
      appointmentForm: {
        customerName: "Asiakkaan nimi",
        serviceType: "Palvelun tyyppi",
        date: "Päivämäärä",
        timeSlot: "Aikaväli",
        notes: "Muistiinpanot",
        submit: "Lähetä",
        error: "Sinun on oltava kirjautunut sisään",
        selectService: "-- Valitse palvelu --",
        childrenHaircut: "Lasten leikkaus",
        adultHaircut: "Aikuisten leikkaus",
        shaving: "Partakoneajo",
        hairColoring: "Hiusväri",
        bookAppointment: "Varaa aika",
        dateAndTimeInvalid: "Virheellinen päivämäärä ja aika",
      },
      home: {
        title: "Etusivu",
        welcome: "Tervetuloa Barbershop MP:hen",
        description: "Yksi pysäkki täydellisen hiustenleikkauksen saamiseen!",
        bookNow: "Varaa nyt",
      },
      aboutUs: {
        title: "Tietoja meistä",
        description:
          "BarbershopMP, perustettu vuonna 2023 kahden kokeneen hiusmuotoilijan toimesta, on testamentti yhteisestä näkemyksestä tarjota poikkeuksellisia grooming-kokemuksia. BarbershopMP:n ytimessä on omistautuminen käsityöläisyydelle, missä jokainen hiustenleikkaus on taulu ja jokainen palvelu on mestariteos. Kutsumme sinut nauttimaan tyyliseikkailusta, jota ohjaa asiantuntevat parturimme, jotka yhdistävät perinteen moderniin tekniikkaan. BarbershopMP:n sitoutuminen huippulaatuun ulottuu tuolin ulkopuolelle tarjoten huolellisesti valikoituja tuotteita ja lämpimän ilmapiirin, joka heijastaa intohimoamme groomingiin. Tule mukaamme BarbershopMP:hen, missä jokainen käynti on mahdollisuus uudelleen määritellä tyyliäsi ja nostaa itseluottamustasi.",
        mapTitle: "BarbershopMP-kartta",
        contactTitle: "Ota yhteyttä",
        contactInfo: "Ajanvaraukset ja tiedustelut osoitteeseen",
        contactText:
          "Älä epäröi ottaa meihin yhteyttä, jos sinulla on kysyttävää tai haluat varata grooming-kokemuksen",
        openingHoursTitle: "Aukioloajat",
        openingHoursText:
          "Maanantaista perjantaihin: 9:00 AM - 8:00 PM\nLauantai: 11:00 AM - 4:00 PM\nSunnuntai: Suljettu",
      },
      services: {
        title: "Palvelut ja hinnoittelu",
        serviceTypes: {
          childrenHaircut: "Lasten leikkaus",
          adultHaircut: "Aikuisten leikkaus",
          shaving: "Partakoneajo",
          hairColoring: "Hiusväri",
        },
      },
      navbar: {
        home: "Etusivu",
        services: "Palvelut",
        aboutUs: "Tietoja meistä",
        login: "Kirjaudu sisään",
        signup: "Rekisteröidy",
        logout: "Kirjaudu ulos",
        BarbershopMP: "Parturi-kampaamo MP",
      },
    },
  },
  es: {
    translation: {
      pageTitle: "Detalles de la Reserva",
      someText: "Texto en la página en español",
      appointmentForm: {
        customerName: "Nombre del cliente",
        serviceType: "Tipo de servicio",
        date: "Fecha",
        timeSlot: "Franja horaria",
        notes: "Notas",
        submit: "Enviar",
        error: "Debes iniciar sesión",
        selectService: "-- Selecciona un servicio --",
        childrenHaircut: "Corte de niños",
        adultHaircut: "Corte de adultos",
        shaving: "Afeitado",
        hairColoring: "Coloración de cabello",
        bookAppointment: "Reservar una cita",
        dateAndTimeInvalid: "Fecha y hora no válidas",
      },
      home: {
        title: "Inicio",
        welcome: "Bienvenido a Barbershop MP",
        description: "¡Todo en uno para conseguir el corte de pelo perfecto!",
        bookNow: "Reserva ahora",
      },
      aboutUs: {
        title: "Sobre nosotros",
        description:
          "BarbershopMP, fundada en 2023 por dos estilistas senior, es un testimonio de una visión compartida de ofrecer experiencias de aseo excepcionales. En el corazón de BarbershopMP hay una dedicación a la artesanía, donde cada corte de pelo es un lienzo y cada servicio es una obra maestra. Te invitamos a disfrutar de un viaje de estilo, guiado por nuestros expertos barberos que mezclan la tradición con técnicas modernas. El compromiso de BarbershopMP con la excelencia se extiende más allá de la silla, ofreciendo productos cuidadosamente seleccionados y un ambiente cálido que refleja nuestra pasión por el aseo. Únete a nosotros en BarbershopMP, donde cada visita es una oportunidad para redefinir tu estilo y elevar tu confianza.",
        mapTitle: "Mapa de BarbershopMP",
        contactTitle: "Contáctanos",
        contactInfo: "Para citas y consultas, por favor contáctanos al",
        contactText:
          "No dudes en ponerte en contacto con nosotros si tienes alguna pregunta o para reservar tu experiencia de aseo",
        openingHoursTitle: "Horario de apertura",
        openingHoursText:
          "Lunes a viernes: 9:00 AM - 8:00 PM\nSábado: 11:00 AM - 4:00 PM\nDomingo: Cerrado",
      },
      services: {
        title: "Servicios y Precios",
        serviceTypes: {
          childrenHaircut: "Corte de niños",
          adultHaircut: "Corte de adultos",
          shaving: "Afeitado",
          hairColoring: "Coloración de cabello",
        },
      },
      navbar: {
        home: "Inicio",
        services: "Servicios",
        aboutUs: "Sobre nosotros",
        login: "Iniciar sesión",
        signup: "Registrarse",
        logout: "Cerrar sesión",
        BarbershopMP: "BarbershopMP",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: ["fi", "es", "en"], // Fallback languages (in order of preference)
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
