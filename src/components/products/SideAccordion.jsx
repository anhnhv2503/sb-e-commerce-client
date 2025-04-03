import { useEffect, useState } from "react";
import { getAllCategories, getBrands } from "../service/ApiFunctions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SideAccordion = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);

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
  const fetchBrands = async () => {
    try {
      setLoadingBrands(true);
      const response = await getBrands();
      setBrands(response.data?.data);
      setLoadingBrands(false);
    } catch (error) {
      console.error("Error loading brands", error);
      setLoadingBrands(true);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Thương Hiệu</AccordionTrigger>
        {brands.map((brand) => (
          <AccordionContent
            key={brand}
            className="cursor-pointer hover:bg-slate-200 px-6 py-3"
          >
            {brand}
          </AccordionContent>
        ))}
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Thể Loại</AccordionTrigger>
        {categories.map((category) => (
          <AccordionContent
            key={category.id}
            className="cursor-pointer hover:bg-slate-200 px-6 py-3"
          >
            {category.name}
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
};

export default SideAccordion;
