import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { getAllCategories, getBrands } from "../service/ApiFunctions";

const SideAccordion = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const params = new URLSearchParams(location.search);

  const handleParamsChange = (key, value) => {
    params.set(key, value);
    const newParams = params.toString();
    window.history.replaceState({}, "", `?${newParams}`);
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data?.data);
    } catch (error) {
      console.error("Error loading categories", error);
    }
  };
  const fetchBrands = async () => {
    try {
      const response = await getBrands();
      setBrands(response.data?.data);
    } catch (error) {
      console.error("Error loading brands", error);
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
            onClick={() => handleParamsChange("brand", brand)}
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
            onClick={() => handleParamsChange("category", category.name)}
          >
            {category.name}
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
};

export default SideAccordion;
