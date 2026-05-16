import AddCategory from "@/components/admin/pages/AddCategory";
import DotsLoading from "@/components/common/DotsLoading";
import { getAllCategories } from "@/components/service/ApiFunctions";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  FolderOpen,
  FolderPlus,
  Pencil,
  RefreshCcw,
  RefreshCw,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

/**
 * ManageCategory Page
 * Redesigned to match SKILL.md artistic design system
 */
const ManageCategory = () => {
  useDocumentTitle("Danh Mục — VA Shop Admin");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await getAllCategories();
      const data = response.data?.data || [];
      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      console.error("Error loading categories", error);
      toast.error("Không thể tải danh sách danh mục");
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchQuery, categories]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-6 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#111827] flex items-center gap-3">
            <FolderOpen size={28} className="text-[#3B82F6]" />
            Danh Mục
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý và tổ chức các danh mục sản phẩm
          </p>
        </div>

        {/* We use the AddCategory component here which has its own trigger button */}
        <AddCategory
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onSuccess={fetchCategories}
        />
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Tìm kiếm danh mục..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6] rounded-lg text-[#111827] w-full"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center h-11 px-4 bg-blue-50 text-[#3B82F6] rounded-lg border border-blue-100">
            <Tag size={16} className="mr-2" />
            <span className="text-sm font-semibold whitespace-nowrap font-mono">
              {categories.length} Danh Mục
            </span>
          </div>
          <button
            onClick={fetchCategories}
            disabled={loadingCategories}
            className="flex items-center justify-center h-11 px-4 gap-2 bg-white border border-gray-200 text-gray-600 hover:text-[#111827] hover:bg-gray-50 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] disabled:opacity-50"
            aria-label="Làm mới"
          >
            <RefreshCw
              size={16}
              className={loadingCategories ? "animate-spin" : ""}
            />
            <span className="text-sm font-semibold hidden sm:inline">
              Làm Mới
            </span>
          </button>
        </div>
      </div>

      {/* Table Area */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {loadingCategories ? (
          <div className="flex justify-center items-center h-64">
            <DotsLoading />
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/80">
                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                  <TableHead className="w-[100px] py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                    ID
                  </TableHead>
                  <TableHead className="py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                    Tên Danh Mục
                  </TableHead>
                  <TableHead className="py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                    Thao Tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredCategories.map((category) => (
                    <motion.tr
                      key={category.id}
                      variants={itemVariants}
                      className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors group"
                    >
                      <TableCell className="py-4">
                        <span className="font-mono text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                          #{String(category.id).padStart(3, "0")}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#3B82F6] transition-colors">
                            <Tag
                              size={14}
                              className="text-[#3B82F6] group-hover:text-white transition-colors"
                            />
                          </div>
                          <span className="font-semibold text-[#111827]">
                            {category.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-[#3B82F6] bg-blue-50 hover:bg-blue-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]">
                            <Pencil size={14} />
                            Sửa
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500">
                            <Trash2 size={14} />
                            Xóa
                          </button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FolderOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">
              {searchQuery ? "Không Tìm Thấy Kết Quả" : "Chưa Có Danh Mục"}
            </h3>
            <p className="text-gray-500 max-w-sm mb-6">
              {searchQuery
                ? `Không tìm thấy danh mục nào phù hợp với "${searchQuery}". Vui lòng thử lại.`
                : "Hệ thống chưa có danh mục sản phẩm nào. Hãy tạo danh mục đầu tiên."}
            </p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="flex items-center gap-2 h-10 px-4 bg-white border border-gray-200 text-gray-600 hover:text-[#111827] rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <RefreshCcw size={16} />
                <span className="font-semibold text-sm">Xóa Tìm Kiếm</span>
              </button>
            ) : (
              <button
                onClick={() => setAddDialogOpen(true)}
                className="flex items-center gap-2 h-10 px-5 bg-[#3B82F6] text-white hover:bg-[#2563EB] rounded-lg shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
              >
                <FolderPlus size={16} />
                <span className="font-semibold text-sm">Thêm Mới</span>
              </button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ManageCategory;
