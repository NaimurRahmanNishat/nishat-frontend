import { getBaseUrl } from "@/utils/getBaseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import TimelineStep from "./TimelineStep";

const steps = [
  {
    status: "pending",
    label: "Pending",
    description: "Your order has been created and is awaiting processing.",
    icon: {
      iconName: "edit-2-line",
      bgColor: "red-500",
      textColor: "gray-800",
    },
  },
  {
    status: "processing",
    label: "Processing",
    description: "Your order is currently being processed.",
    icon: {
      iconName: "loader-line",
      bgColor: "yellow-500",
      textColor: "yellow-800",
    },
  },
  {
    status: "shipped",
    label: "Shipped",
    description: "Your order has been shipped.",
    icon: {
      iconName: "truck-line",
      bgColor: "blue-800",
      textColor: "blue-100",
    },
  },
  {
    status: "completed",
    label: "Completed",
    description: "Your order has been successfully completed.",
    icon: { iconName: "check-line", bgColor: "green-800", textColor: "white" },
  },
];

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");
    if (sessionId) {
      const confimedPayment = async () => {
        const reponse = await axios.post(
          `${getBaseUrl()}/api/orders/confirm-payment`,
          {
            session_id: sessionId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (reponse?.data) {
          setLoading(false);
          setOrder(reponse?.data.data);
        }
      };
      confimedPayment();
    }
  }, []);

  if (loading) return <Loading />;

  const iscompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="text-2xl font-semibold mb-4">Payment {order?.status}</h2>
        <p className="mb-4">Order ID: {order?.orderId}</p>
        <p className="mb-8">Status: {order?.status}</p>
        <ol className="sm:flex items-center relative">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              iscompleted={iscompleted(step.status)}
              isCurrent={isCurrent(step.status)}
              isLastStep={index === steps.length - 1}
              icon={step.icon}
              description={step.description}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default PaymentSuccess;
