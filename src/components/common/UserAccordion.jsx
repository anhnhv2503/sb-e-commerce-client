import Logout from "@/components/logout/Logout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const UserAccordion = () => {
  const token = localStorage.getItem("accessToken");
  const nav = useNavigate();
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <UserIcon className="h-6 w-6 text-gray-900" />
        </AccordionTrigger>
        <AccordionContent>
          {token ? (
            <ul tabIndex={0} className="z-[1] mt-3 w-52 p-2">
              <li>
                <a
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => nav("/user/profile")}
                >
                  Thông Tin
                </a>
              </li>
              <li>
                <a
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => nav("/user/my-orders")}
                >
                  Đơn Hàng Của Tôi
                </a>
              </li>
              <hr />
              <li>
                <Logout />
              </li>
            </ul>
          ) : (
            <ul tabIndex={0} className=" z-[1] mt-3 w-52 p-2 ">
              <li>
                <a
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => nav("/login")}
                >
                  Đăng Nhập
                </a>
              </li>
              <hr />
              <li>
                <a
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => nav("/register")}
                >
                  Đăng Kí
                </a>
              </li>
            </ul>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UserAccordion;
