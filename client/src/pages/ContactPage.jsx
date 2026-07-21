import { Helmet } from "react-helmet-async";
import PageTransition from "../components/layout/PageTransition";
import ContactSection from "../components/sections/ContactSection";
const ContactPage = () => (
  <PageTransition>
    <Helmet>
      <title>Contact  | Seka Shalom Portfolio</title>
    </Helmet>
    <div className="pt-20">
      <ContactSection />
    </div>
  </PageTransition>
);
export default ContactPage;
