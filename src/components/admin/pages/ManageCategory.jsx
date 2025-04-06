import AddCategory from "@/components/admin/pages/AddCategory";
import DotsLoading from "@/components/common/DotsLoading";
import {
  deleteCategory,
  getAllCategories,
} from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FolderOpenIcon,
  FolderPlusIcon,
  PencilIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcwIcon, RefreshCwIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ManageCategory = () => {
  useDocumentTitle("Quản lý danh mục sản phẩm");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories
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

  // Search functionality
  useEffect(() => {
    if (searchQuery) {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchQuery, categories]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý danh mục sản phẩm
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Thêm, chỉnh sửa và xóa danh mục sản phẩm
          </p>
        </div>
        <Button
          onClick={() => setAddDialogOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
        >
          <FolderPlusIcon className="h-5 w-5" />
          Thêm danh mục mới
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Tìm kiếm danh mục..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
            <TagIcon className="h-4 w-4 mr-1" />
            <span className="font-medium">{categories.length} danh mục</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={fetchCategories}
            disabled={loadingCategories}
          >
            <RefreshCwIcon
              className={`h-4 w-4 ${loadingCategories ? "animate-spin" : ""}`}
            />
            {loadingCategories ? "Đang tải..." : "Làm mới"}
          </Button>
        </div>
      </div>

      {/* Categories Table */}
      <motion.div
        className="bg-white rounded-lg shadow-sm overflow-hidden"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {loadingCategories ? (
          <div className="flex justify-center items-center py-20">
            <DotsLoading />
          </div>
        ) : filteredCategories.length > 0 ? (
          <Table>
            <TableCaption>Danh sách danh mục sản phẩm.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Tên danh mục</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredCategories.map((category) => (
                  <motion.tr
                    key={category.id}
                    variants={item}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{category.id}</TableCell>
                    <TableCell className="flex items-center">
                      <TagIcon className="h-4 w-4 text-indigo-500 mr-2" />
                      {category.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <PencilIcon className="h-4 w-4" />
                          Sửa
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <TrashIcon className="h-4 w-4" />
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <FolderOpenIcon className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {searchQuery ? "Không tìm thấy danh mục" : "Chưa có danh mục nào"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? `Không tìm thấy danh mục phù hợp với từ khóa "${searchQuery}"`
                : "Bạn chưa tạo danh mục sản phẩm nào"}
            </p>
            {searchQuery ? (
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="flex items-center gap-2"
              >
                <RefreshCcwIcon className="h-4 w-4" />
                Xóa bộ lọc
              </Button>
            ) : (
              <Button
                onClick={() => setAddDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <FolderPlusIcon className="h-4 w-4" />
                Thêm danh mục mới
              </Button>
            )}
          </div>
        )}
      </motion.div>
      {addDialogOpen && (
        <AddCategory
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onSuccess={fetchCategories}
        />
      )}
    </motion.div>
  );
};

export default ManageCategory;
