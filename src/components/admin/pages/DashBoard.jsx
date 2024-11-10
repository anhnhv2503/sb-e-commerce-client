import Chart from "@/components/admin/pages/Chart";
import useCurrencyFormat from "@/components/hooks/useCurrencyFormat";
import { getDashboardData } from "@/components/service/ApiFunctions";
import {
  BanknotesIcon,
  Squares2X2Icon,
  TagIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

const DashBoard = () => {
  useDocumentTitle("Thống kê");
  const [data, setData] = useState(null);
  const currency = useCurrencyFormat();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardData();
        setData(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Thống Kê</h1>
      <div className="">
        {data ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="bg-white p-4 rounded-lg shadow text-sky-600">
              <p className="text-lg font-semibold flex ">
                <TruckIcon className="w-5 h-5 mr-5" />
                Total Orders
              </p>
              <p className="text-3xl font-bold">{data.totalOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-rose-600">
              <p className="text-lg font-semibold flex ">
                <TagIcon className="w-5 h-5 mr-5" />
                Total Categories
              </p>
              <p className="text-3xl font-bold">{data.totalCategories}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-indigo-600">
              <p className="text-lg font-semibold flex ">
                <Squares2X2Icon className="w-5 h-5 mr-5" />
                Total Products
              </p>
              <p className="text-3xl font-bold">{data.totalProducts}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-teal-600">
              <p className="text-lg font-semibold flex">
                <UserGroupIcon className="w-5 h-5 mr-5" />
                Total Users
              </p>
              <p className="text-3xl font-bold">{data.totalCustomers}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-fuchsia-700">
              <p className="text-lg font-semibold flex">
                <BanknotesIcon className="w-5 h-5 mr-5" />
                Total Revenue
              </p>
              <p className="text-3xl font-bold">
                {currency.format(data.totalRevenue)}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="">
        <h2 className="text-xl font-bold mt-8 mb-4">Biểu Đồ</h2>
        <Chart />
      </div>
    </>
  );
};

export default DashBoard;
