import { Container, Row } from "reactstrap";
import ContactFooter from "./ContactFooter";
import MenuFooter from "./MenuFooter";
import GetTouch from "./GetTouch";
import QuestionTabs from "./QuestionTab";

const footerData = [
  {
    title: "About us",
    subMenu: [
      { id: 1, menu: "Home", url: "/" },
      { id: 2, menu: "Shop", url: "/shop" },
      { id: 3, menu: "About Us", url: "/about" },
      { id: 4, menu: "Contact", url: "/contact" },
    ],
  },
  {
    title: "New Categories",
    subMenu: [
      { id: 1, menu: "Latest Shoes", url: "/shop" },
      { id: 2, menu: "Branded Jeans", url: "/shop" },
      { id: 3, menu: "New Jackets", url: "/shop" },
      { id: 4, menu: "Colorfull Hoodies", url: "/shop" },
      { id: 5, menu: "Shiner Goggles", url: "/shop" },
    ],
  },
  {
    title: "Get Help",
    subMenu: [
      { id: 1, menu: "Your Orders", url: "/orders" },
      { id: 2, menu: "Your Account", url: "/user-dashboard" },
      { id: 3, menu: "Track Orders", url: "/track" },
      { id: 4, menu: "Your Wishlist", url: "/wishlist" },
      { id: 5, menu: "Shopping FAQs", url: "/faq" },
    ],
  },
];

const MainFooter = ({ QuestionTab }) => {
  return (
    <Container>
      <Row className="gy-4">
        <ContactFooter />
        <MenuFooter getFooter={footerData} />
        {QuestionTab ? <QuestionTabs /> : <GetTouch />}
      </Row>
    </Container>
  );
};

export default MainFooter;