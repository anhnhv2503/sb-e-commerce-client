import VietnamReunionHero from "@/components/common/VietnamHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import vneseDev from "@/assets/vneseDev.png";

const AboutUs = () => {
  useDocumentTitle("Giới thiệu về công ty chúng tôi | Loving Vietnam");
  const [hovered, setHovered] = useState(null);
  const handleContactUs = () => {
    toast.success("We'll get back to you soon!");
  };

  const teamMembers = [
    {
      name: "Johnny Nguyen",
      role: "CEO & Founder",
      bio: "Visionary leader with 10+ years in the industry",
    },
    {
      name: "Nguyen Ha Viet Anh",
      role: "Chief Technology Officer",
      bio: "Tech expert specializing in innovative solutions",
    },
    {
      name: "Viet Anh Nguyen Ha",
      role: "Head of Marketing",
      bio: "Creative strategist driving brand growth",
    },
  ];

  return (
    <div className="font-sans">
      <VietnamReunionHero />

      {/* Hero Section with Gradient Overlay */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Giới thiệu về công ty chúng tôi{" "}
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Chúng tôi đam mê cung cấp các sản phẩm và trải nghiệm đặc biệt
              giúp thay đổi cách khách hàng đạt được mục tiêu của họ.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-white text-indigo-600 hover:bg-gray-100 font-medium px-6 py-3 rounded-full"
                onClick={handleContactUs}
              >
                Liên hệ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-indigo-600 font-medium px-6 py-3 rounded-full"
              >
                Công việc của chúng tôi
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-indigo-600 font-medium mb-2 block">
              MỤC ĐÍCH CỦA CHÚNG TÔI
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sứ mệnh của chúng tôi
            </h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi mong muốn cung cấp các giải pháp sáng tạo và bền vững
              giúp các tổ chức phát huy hết tiềm năng của mình trong bối cảnh
              thay đổi nhanh chóng hiện nay.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-indigo-600"
            >
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Sản phẩm chất lượng</h3>
              <p className="text-gray-600 mb-4">
                Chúng tôi tạo ra những sản phẩm đặc biệt kết hợp giữa sự đổi mới
                với độ tin cậy, đảm bảo khách hàng của chúng tôi nhận được các
                giải pháp vượt quá mong đợi trong khi vẫn dễ tiếp cận.
              </p>
              <Button
                variant="link"
                className="text-indigo-600 p-0 flex items-center gap-2"
              >
                Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600"
            >
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Thực hành bền vững</h3>
              <p className="text-gray-600 mb-4">
                Tính bền vững tạo thành nền tảng cho cách tiếp cận của chúng
                tôi, hướng dẫn mọi thứ từ nguồn vật liệu có trách nhiệm đến sản
                xuất thân thiện với môi trường và các hoạt động phân phối có đạo
                đức.
              </p>
              <Button
                variant="link"
                className="text-green-600 p-0 flex items-center gap-2"
              >
                Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-indigo-600 font-medium mb-2 block">
              THÀNH VIÊN CỦA CHÚNG TÔI
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Gặp gỡ đội ngũ của chúng tôi
            </h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi là một nhóm chuyên gia đa dạng, đoàn kết với nhau bởi
              niềm đam mê đổi mới và cam kết hướng đến sự xuất sắc.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="relative overflow-hidden group"
              >
                <Card className="bg-white shadow-lg rounded-xl overflow-hidden h-full">
                  <CardHeader className="p-0">
                    <div className="relative h-96 overflow-hidden">
                      <img
                        src={vneseDev}
                        alt={`${member.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6 w-full">
                          <p className="text-white text-sm mb-4">
                            {member.bio}
                          </p>
                          <div className="flex gap-3">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white hover:text-indigo-600"
                            >
                              <Linkedin className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white hover:text-indigo-600"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-indigo-600">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn sàng chuyển đổi doanh nghiệp của bạn?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Hãy tham gia cùng hàng trăm công ty đã hợp tác với chúng tôi để
              đạt được mục tiêu của họ.
            </p>
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-full text-lg">
              Bắt đầu ngay hôm nay
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
