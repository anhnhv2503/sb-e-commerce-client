import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Slash } from "lucide-react";

const CartBreadcrumb = () => {
  const nav = useNavigate();
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex flex-wrap items-center">
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => nav("/")}
            className="text-gray-600 cursor-pointer"
          >
            Trang Chủ
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => nav("/shop")}
            className="text-gray-600 cursor-pointer"
          >
            Cửa Hàng
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold cursor-pointer">
            Giỏ Hàng
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CartBreadcrumb;
