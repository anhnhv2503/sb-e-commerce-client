import React, { useEffect } from "react";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CircleStackIcon,
  CubeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  useDocumentTitle("Admin Home");
  const navigate = useNavigate();

  // Get current hour to personalize greeting
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const quickLinks = [
    {
      title: "Products",
      description:
        "Manage your product inventory, add new items, and update existing ones",
      icon: <CubeIcon className="h-6 w-6" />,
      color: "from-indigo-500 to-purple-600",
      path: "/admin/product/list",
    },
    {
      title: "Orders",
      description:
        "View and process customer orders, manage shipping and returns",
      icon: <ShoppingBagIcon className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-400",
      path: "/admin/manage/orders",
    },
    {
      title: "Categories",
      description:
        "Organize your products by creating and managing product categories",
      icon: <CircleStackIcon className="h-6 w-6" />,
      color: "from-rose-500 to-pink-500",
      path: "/admin/manage/category",
    },
    {
      title: "Customers",
      description: "View customer information and purchase history",
      icon: <UserGroupIcon className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-500",
      path: "/admin/manage/user",
    },
    {
      title: "Analytics",
      description: "View sales reports, customer trends, and business metrics",
      icon: <ChartBarIcon className="h-6 w-6" />,
      color: "from-amber-500 to-orange-500",
      path: "/admin/dashboard",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                ></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"></rect>
          </svg>
        </div>
        <div className="relative">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-lg bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-sm mb-4">
              {getCurrentGreeting()}, Admin
            </span>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to VA Shop Admin Panel
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Manage your e-commerce business, track sales, and deliver
              exceptional customer experiences from one central dashboard.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4"
            >
              View Dashboard
              <ChartBarIcon className="ml-2 h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/admin/manage/orders")}
              className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Recent Orders
              <ClipboardDocumentListIcon className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="space-y-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-gray-900"
        >
          Quick Access
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative overflow-hidden rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate(link.path)}
            >
              <div
                className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${link.color}`}
              ></div>
              <div className="flex items-start mb-4">
                <div
                  className={`rounded-lg bg-gradient-to-br ${link.color} p-3 text-white`}
                >
                  {link.icon}
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {link.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{link.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-indigo-600">
                Manage
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mission Statement Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-xl bg-gradient-to-br from-indigo-50 to-white p-8 shadow-md border border-indigo-100"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-shrink-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At VA Shop, we strive to bring the latest trends and timeless
              pieces to our customers. We believe in creating a shopping
              experience that combines quality, affordability, and exceptional
              service to exceed customer expectations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our commitment to quality and customer satisfaction drives
              everything we do. Through this admin panel, you have the tools to
              ensure we maintain those standards across our entire online
              shopping experience.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Support Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="rounded-xl bg-white p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-start space-x-4">
          <div className="rounded-full bg-blue-500/10 p-3">
            <EnvelopeIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Need Support?</h3>
            <p className="mt-1 text-gray-600">
              If you have any questions or need assistance, feel free to reach
              out to our support team at{" "}
              <a
                href="mailto:prjonlineshop@gmail.com"
                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                prjonlineshop@gmail.com
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPage;
