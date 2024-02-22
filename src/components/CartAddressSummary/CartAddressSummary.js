import { Row, Col } from 'react-bootstrap';
import { getCurrentAddress } from '../../reducers/addressSlice';
import { useSelector } from 'react-redux';

export const CartAddressSummary = ({ cartItems }) => {

    const selectedAddress = useSelector(getCurrentAddress);

    return (
        <Row className="cart-address-details">
            <Col lg={4}>
                <ul className="items-selected"> <h4>Items Selected</h4>
                    {
                        cartItems.map((item, index) => (
                            <li key={index}>
                                <span>
                                    <img className="paymentImages" src={item.img_url} alt={item.title} />
                                </span>
                                <span>
                                    <span title={item.title}>{item.title?.length > 50 ? item.title?.slice(0, 50) + "..." : item.title}</span>
                                    <br />
                                    <span>Available at: ${item.price} &nbsp; &nbsp; Qty {item.quantity}</span>
                                </span>

                            </li>
                        ))
                    }
                </ul>
            </Col>
            <Col lg={4}>
                <Row>
                    <Col className="shippinglabel">Billing Address:</Col>
                    <Col className="selectedAddress-payment">
                        <p>{selectedAddress.fullName}
                            <br />{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.zipCode}
                            <br />
                            {selectedAddress.phoneNo}</p>
                    </Col>
                </Row>
            </Col>
            <Col lg={4}>
                <Row>
                    <Col className="shippinglabel">Shipping Address:</Col>
                    <Col className="selectedAddress-payment">
                        <p>{selectedAddress.fullName},
                            <br />{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.zipCode}
                            <br />
                            {selectedAddress.phoneNo}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}