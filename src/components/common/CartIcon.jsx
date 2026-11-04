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
        className="icon-btn relative"
        aria-label="Giỏ hàng"
      >
        <ShoppingBag size={22} strokeWidth={1.5} />
        {cartCount > 0 && (
          <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-pink px-1 font-mono text-[10px] leading-none text-white">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </button>
    </>
  );
};

export default CartIcon;
