import AddCategory from "@/components/admin/pages/AddCategory";
import {
  deleteCategory,
  getAllCategories,
} from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageCategory = () => {
  useDocumentTitle("Quản lý danh mục sản phẩm");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await getAllCategories();
      setCategories(response.data?.data);
      setLoadingCategories(false);
    } catch (error) {
      console.error("Error loading categories", error);
      setLoadingCategories(true);
    }
  };

  const handleRemoveCategory = async (id) => {
    try {
      const response = await deleteCategory(id);
      if (response) {
        fetchCategories();
        toast.success("Category removed successfully");
      }
    } catch (error) {
      toast.loading("Cannot remove this category", { duration: 2000 });
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <AddCategory />
      </section>
      <section className="body-font mt-10">
        <Table>
          <TableCaption>A list of your Product Categoris.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveCategory(category.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default ManageCategory;
