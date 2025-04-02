import { addMoreSizeForProduct } from "@/components/service/ApiFunctions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { sizeOptions } from "../../../data/data.js";
import Loading from "@/components/common/Loading.jsx";

const AddMoreSize = ({ productId, fetchProduct }) => {
  const [sizeName, setSizeName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleAddMoreSize = async () => {
    if (!sizeName || !quantity) {
      toast.error("Vui lòng điền đầy đủ thông tin");
    } else {
      try {
        const response = await addMoreSizeForProduct(
          productId,
          sizeName,
          quantity
        );
        if (response.status === 200) {
          toast.success("Thêm thành công!");
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            setSizeName("");
            setQuantity("");
          }, 1000);
          fetchProduct();
          setOpen(false);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleOpenModal}>
          Thêm Size
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm size cho sản phẩm {productId}</DialogTitle>
          <DialogDescription>
            Vui lòng chọn size và số lượng cần thêm
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên size
            </Label>
            <Select onValueChange={(value) => setSizeName(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn size" />
              </SelectTrigger>
              <SelectContent>
                {sizeOptions.map((size) => (
                  <SelectItem key={size.id} value={size.name}>
                    {size.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Số lượng
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Số lượng"
              className="col-span-3"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          {isLoading ? (
            <Loading />
          ) : (
            <Button type="submit" onClick={handleAddMoreSize}>
              Thêm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default AddMoreSize;
