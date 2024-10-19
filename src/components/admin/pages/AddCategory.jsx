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
import toast from "react-hot-toast";
import { addCategory } from "@/components/service/ApiFunctions";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCategory = async () => {
    if (categoryName.trim() === "") {
      return toast.error("Category name is required");
    } else {
      try {
        const response = await addCategory(categoryName);
        if (response) {
          toast.success("Category added successfully");
          setCategoryName("");
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error adding category: ", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ Category</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add more category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="">
              Category Name
            </Label>
            <Input
              id="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddCategory}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
