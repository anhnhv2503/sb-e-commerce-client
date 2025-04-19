import { getCartCount } from "@/components/service/ApiFunctions";
import { Client } from "@stomp/stompjs";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const response = await getCartCount();
      setCartCount(response.data?.data);
    } catch (error) {
      console.error("Error fetching cart count: ", error);
    }
  };

  useEffect(() => {
    const connectSocket = (callback) => {
      const client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        connectHeaders: {},
        reconnectDelay: 5000,
        onConnect: () => {
          client.subscribe("/topic/cart", (message) => {
            try {
              const data = JSON.parse(message.body);

              callback(data);
            } catch (error) {
              console.error("Error parsing message: ", error);
            }
          });
        },
        onDisconnect: () => {
          client.deactivate();
        },
      });
      client.activate();

      // Return client for cleanup
      return client;
    };

    // Example callback function
    const handleCartData = (data) => {
      // Do something with the cart data
      setCartCount(data);
    };

    // Connect to socket
    const client = connectSocket(handleCartData);

    fetchCartCount();

    // Cleanup on component unmount
    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, []);

  return (
    <>
      <button
        onClick={() => navigate("/user/cart")}
        className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
        aria-label="Cart"
      >
        <ShoppingBag size={22} />
        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white">
          {cartCount}
        </span>
      </button>
    </>
  );
};

export default CartIcon;
