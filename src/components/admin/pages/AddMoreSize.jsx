import React, { useState } from "react";
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
import { addMoreSizeForProduct } from "@/components/service/ApiFunctions";
import toast, { Toaster } from "react-hot-toast";
import { sizeOptions } from "../../../data/data";

const AddMoreSize = ({ productId }) => {
  const [sizeName, setSizeName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddMoreSize = async () => {
    ``;
    try {
      const response = await addMoreSizeForProduct(
        productId,
        sizeName,
        quantity
      );
      if (response.status === 200) {
        toast.success("Size Added!");
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add More Size</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add more size for product {productId}</DialogTitle>
          <DialogDescription>
            Please insert the size and quantity for the product
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Size Name
            </Label>
            <Select onValueChange={(value) => setSizeName(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Size" />
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
              Quantity
            </Label>
            <Input
              id="quantity"
              placeholder="Quantity"
              className="col-span-3"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddMoreSize}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default AddMoreSize;
