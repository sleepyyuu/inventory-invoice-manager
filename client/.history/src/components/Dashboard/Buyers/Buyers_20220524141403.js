import useVerifyForEndpointAction from "../../../hooks/useVerifyForEndpointAction";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./Buyers.css";

export default function Buyers(props) {
  const { setSelectedCategory } = props;
  const verify = useVerifyForEndpointAction();
  const [loading, setLoading] = useState(true);
  const [buyers, setBuyers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStateCreate, setmenuStateCreate] = useState(false);
  const [newBuyerName, setNewBuyerName] = useState("");
  const [newBuyerId, setNewBuyerId] = useState("");
  const [newBuyerPhoneNumber, setNewBuyerPhoneNumber] = useState("");
  const [newBuyerAddress, setNewBuyerAddress] = useState("");
  const [error, setError] = useState();
  const route = "/buyers";
  const getDB = async () => {
    const responseBuyers = await verify("readAll", route);
    setBuyers(responseBuyers);
    setLoading(false);
  };
  useEffect(() => {
    setSelectedCategory("Buyers");
    getDB();
  }, []);

  const handlePostAction = async (e) => {
    e.preventDefault();
    if (newBuyerName === "") {
      setError([{ msg: "Name is required" }]);
      return;
    }
    let response;
    const body = {
      company_name: newBuyerName,
      address: newBuyerAddress,
      phone_number: newBuyerPhoneNumber,
    };
    if (menuStateCreate) {
      response = await verify("create", route, body);
    } else {
      body.buyerId = newBuyerId;
      response = await verify("update", route + "/" + newBuyerId, body);
    }
    if (response.status === 200) {
      getDB();
      setShowMenu(false);
      setError(null);
      setNewBuyerName("");
      setNewBuyerPhoneNumber("");
      setNewBuyerAddress("");
      setNewBuyerId("");
    } else {
      setError(response);
    }
  };

  const handleEdit = async (buyer) => {
    setError(null);
    setNewBuyerId(buyer._id);
    setNewBuyerName(buyer.company_name);
    setNewBuyerPhoneNumber(buyer.phone_number);
    setNewBuyerAddress(buyer.address);
    setShowMenu(true);
  };

  const handleDelete = async (id) => {
    let originalArray = buyers;
    let filteredArray = buyers.filter((buyer) => {
      return buyer._id !== id;
    });
    setBuyers(filteredArray);
    const response = await verify("delete", route + "/" + id, { buyerId: id });
    if (response.status === 200) {
    } else {
      setBuyers(originalArray);
      setError(response);
    }
  };

  return (
    <div>
      <div className="dashboardInfoHeader">
        <h3 className="infoPageTitle">Buyers</h3>
        <div className="dashboardButtons">
          <button>add thing button</button>
          <button>other button</button>
        </div>
      </div>
    </div>
  );
}
