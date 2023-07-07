import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import request from "../../utils/request";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const newReq = async () => {
      try {
        await request.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 4000);
      } catch (error) {
        console.log(error);
      }
    };
    newReq();
  }, []);
  return (
    <div>
      Payment is succesfully finished. Thank you! You are redirecting to the
      orders page now...
    </div>
  );
};

export default Success;
