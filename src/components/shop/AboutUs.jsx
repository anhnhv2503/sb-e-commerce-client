import vneseDev from "@/assets/vneseDev.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

/**
 * AboutUs Page
 * Redesigned to match SKILL.md artistic design system
 */
const AboutUs = () => {
  useDocumentTitle("Giới thiệu về chúng tôi — VA Shop");
  const [hovered, setHovered] = useState(null);
  
  const handleContactUs = () => {
    toast.success("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.");
  };

  const teamMembers = [
    {
      name: "Johnny Nguyen",
      role: "CEO & Founder",
      bio: "Lãnh đạo có tầm nhìn với hơn 10 năm kinh nghiệm trong ngành",
    },
    {
      name: "Nguyen Ha Viet Anh",
      role: "Chief Technology Officer",
      bio: "Chuyên gia công nghệ tập trung vào các giải pháp đổi mới",
    },
    {
      name: "Viet Anh Nguyen Ha",
      role: "Head of Marketing",
      bio: "Chiến lược gia sáng tạo thúc đẩy tăng trưởng thương hiệu",
    },
  ];

  return (
    <div className="font-sans bg-gray-50/50">
      {/* Hero Section with Premium Gradient Overlay */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#3B82F6] opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
        
        {/* Abstract decorative glowing orb */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Câu Chuyện <br/><span className="text-[#3B82F6]">Của Chúng Tôi</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-300 leading-relaxed font-light">
              Chúng tôi đam mê cung cấp các sản phẩm và trải nghiệm đặc biệt
              giúp thay đổi cách khách hàng đạt được mục tiêu của họ trong kỷ nguyên số.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button
                className="h-14 px-8 bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 rounded-full font-semibold text-base transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                onClick={handleContactUs}
              >
                Liên Hệ Ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="h-14 px-8 bg-transparent border border-white/30 text-white hover:bg-white hover:text-[#111827] rounded-full font-semibold text-base transition-all backdrop-blur-sm"
              >
                Dự Án Của Chúng Tôi
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[#3B82F6] font-bold tracking-widest text-sm uppercase mb-3 block">
              Mục Đích Cốt Lõi
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#111827]">
              Sứ Mệnh Của VA Shop
            </h2>
            <div className="h-1.5 w-24 bg-[#3B82F6] rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cung cấp các giải pháp sáng tạo và bền vững giúp cá nhân và tổ chức phát huy hết tiềm năng của mình trong bối cảnh thay đổi nhanh chóng hiện nay.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Core Value 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-10 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#3B82F6]/10 transition-colors" />
              <div className="relative z-10">
                <div className="bg-blue-50 rounded-2xl w-16 h-16 flex items-center justify-center mb-8 border border-blue-100">
                  <svg
                    className="w-8 h-8 text-[#3B82F6]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"></path>
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-[#111827]">Sản Phẩm Chất Lượng</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Chúng tôi tạo ra những sản phẩm đặc biệt kết hợp giữa sự đổi mới với độ tin cậy, đảm bảo khách hàng nhận được giải pháp vượt qua mong đợi trong khi vẫn dễ dàng tiếp cận.
                </p>
                <Button
                  variant="link"
                  className="text-[#3B82F6] p-0 font-bold hover:text-[#2563EB] flex items-center gap-2"
                >
                  Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Core Value 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-10 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-100 transition-colors" />
              <div className="relative z-10">
                <div className="bg-emerald-50 rounded-2xl w-16 h-16 flex items-center justify-center mb-8 border border-emerald-100">
                  <svg
                    className="w-8 h-8 text-emerald-500"
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
                <h3 className="font-display text-2xl font-bold mb-4 text-[#111827]">Phát Triển Bền Vững</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Tính bền vững tạo thành nền tảng cho cách tiếp cận của chúng tôi, hướng dẫn mọi thứ từ nguồn vật liệu có trách nhiệm đến sản xuất thân thiện với môi trường.
                </p>
                <Button
                  variant="link"
                  className="text-emerald-600 p-0 font-bold hover:text-emerald-700 flex items-center gap-2"
                >
                  Tìm hiểu thêm <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-[#3B82F6] font-bold tracking-widest text-sm uppercase mb-3 block">
              Thành Viên Nòng Cốt
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#111827]">
              Gặp Gỡ Đội Ngũ Của Chúng Tôi
            </h2>
            <div className="h-1.5 w-24 bg-[#3B82F6] rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi là một nhóm chuyên gia đa dạng, đoàn kết với nhau bởi
              niềm đam mê đổi mới và cam kết hướng đến sự xuất sắc.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="relative group"
              >
                <Card className="bg-white shadow-lg border-gray-100 rounded-3xl overflow-hidden h-full hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <CardHeader className="p-0">
                    <div className="relative h-[400px] overflow-hidden">
                      <img
                        src={vneseDev}
                        alt={`${member.name}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                      
                      {/* Hidden info appearing on hover */}
                      <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-gray-200 text-sm mb-6 leading-relaxed font-light">
                          {member.bio}
                        </p>
                        <div className="flex gap-3">
                          <Button
                            size="icon"
                            className="w-10 h-10 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-[#3B82F6] transition-colors border border-white/20"
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            className="w-10 h-10 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-[#3B82F6] transition-colors border border-white/20"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 absolute bottom-0 left-0 right-0 group-hover:opacity-0 transition-opacity duration-300 bg-gradient-to-t from-[#111827] to-transparent pt-32 pointer-events-none">
                    <h3 className="font-display text-2xl font-bold mb-2 text-white">{member.name}</h3>
                    <p className="text-[#3B82F6] font-semibold tracking-wide text-sm uppercase">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
