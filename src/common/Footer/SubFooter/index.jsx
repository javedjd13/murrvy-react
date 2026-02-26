// import { CommonPath, Weaccept } from "@/Constant";
// import Image from "next/image";
// import Link from "next/link";
// import { Col } from "reactstrap";

// const SubFooter = () => {
//   return (
//     <Col md="6">
//       <ul>
//         <li className="font-dark">{Weaccept}</li>
//         <li>
//           <Link href="#javascript">
//             <Image width={37} height={21} src={`${CommonPath}/payment-icon/1.jpg`} className="img-fluid" alt="payment icon" />
//           </Link>
//         </li>
//         <li>
//           <Link href="#javascript">
//             <Image width={36} height={21} src={`${CommonPath}/payment-icon/2.jpg`} className="img-fluid" alt="payment icon" />
//           </Link>
//         </li>
//         <li>
//           <Link href="#javascript">
//             <Image width={36} height={21} src={`${CommonPath}/payment-icon/3.jpg`} className="img-fluid" alt="payment icon" />
//           </Link>
//         </li>
//         <li>
//           <Link href="#javascript">
//             <Image width={55} height={21} src={`${CommonPath}/payment-icon/4.jpg`} className="img-fluid" alt="payment icon" />
//           </Link>
//         </li>
//       </ul>
//     </Col>
//   );
// };
// export default SubFooter;



import { CommonPath, Weaccept } from "../../../constant/index";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import img1 from "../../../assets/images/payment-icon/1.jpg"
import img2 from "../../../assets/images/payment-icon/2.jpg"
import img3 from "../../../assets/images/payment-icon/3.jpg"
import img4 from "../../../assets/images/payment-icon/4.jpg"

const SubFooter = () => {
  return (
    <Col md="6">
      <ul>
        <li className="font-dark">{Weaccept}</li>

        <li>
          <Link to="#javascript">
            <img
              width="37"
              height="21"
              src={img1}
              className="img-fluid"
              alt="payment icon"
            />
          </Link>
        </li>

        <li>
          <Link to="#javascript">
            <img
              width="36"
              height="21"
                           src={img2}

              className="img-fluid"
              alt="payment icon"
            />
          </Link>
        </li>

        <li>
          <Link to="#javascript">
            <img
              width="36"
              height="21"
                            src={img3}

              className="img-fluid"
              alt="payment icon"
            />
          </Link>
        </li>

        <li>
          <Link to="#javascript">
            <img
              width="55"
              height="21"
                          src={img4}

              className="img-fluid"
              alt="payment icon"
            />
          </Link>
        </li>
      </ul>
    </Col>
  );
};

export default SubFooter;
