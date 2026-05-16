import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

/**
 * EditProfile Component
 * Redesigned to match SKILL.md artistic design system
 */
const EditProfile = ({ setIsEditing, user, fetchUser }) => {
  // We'll use local state for editing. For full functionality, you'd wire this to an API.
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // This is a placeholder for actual save logic
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      // In a real scenario, you'd call fetchUser() here
      toast.success("Đã cập nhật thông tin thành công!");
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm ring-1 ring-[#3B82F6]/5 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]" />
      
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h3 className="font-display text-xl font-bold text-[#111827]">
          Chỉnh Sửa Thông Tin
        </h3>
        <p className="text-gray-500 text-sm mt-1">Cập nhật thông tin liên hệ và giao hàng của bạn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
            Họ và tên
          </label>
          <Input 
            id="fullName" 
            name="fullName" 
            value={formData.fullName}
            onChange={handleChange}
            className="h-11 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827] rounded-xl transition-all"
            placeholder="Nhập họ và tên"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
            Số điện thoại
          </label>
          <Input 
            id="phone" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}
            className="h-11 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827] font-mono rounded-xl transition-all"
            placeholder="Nhập số điện thoại"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
          Địa chỉ giao hàng
        </label>
        <Textarea 
          id="address" 
          name="address" 
          rows={4} 
          value={formData.address}
          onChange={handleChange}
          className="bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] text-[#111827] rounded-xl transition-all resize-y p-3"
          placeholder="Nhập địa chỉ nhận hàng chi tiết..."
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-4 border-t border-gray-100">
        <Button 
          variant="outline" 
          onClick={() => setIsEditing(false)}
          disabled={isLoading}
          className="h-11 px-6 border-gray-200 text-gray-600 hover:text-[#111827] hover:bg-gray-50 rounded-xl font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] w-full sm:w-auto"
        >
          <X size={18} className="mr-2" />
          Hủy Bỏ
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isLoading || !formData.fullName}
          className="h-11 px-8 bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-md shadow-blue-500/20 rounded-xl font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] w-full sm:w-auto disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={18} className="mr-2" />
              Lưu Thay Đổi
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default EditProfile;
