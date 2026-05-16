import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, Layers, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllCategories, getBrands } from "../service/ApiFunctions";

/**
 * SideAccordion
 * Styled filter sidebar with icons and hover states.
 * SKILL.md: 44px+ touch targets on filter items, visible hover feedback.
 */
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <Filter size={16} className="text-[#3B82F6]" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-[#111827] uppercase tracking-wider font-mono">
          Bộ Lọc
        </h3>
      </div>

      <Accordion type="multiple" defaultValue={["brands", "categories"]} className="w-full space-y-2">
        {/* Brands */}
        <AccordionItem value="brands" className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium text-[#111827] hover:bg-gray-50 hover:no-underline">
            <span className="flex items-center gap-2">
              <Tag size={14} className="text-gray-400" aria-hidden="true" />
              Thương Hiệu
            </span>
          </AccordionTrigger>
          <div className="border-t border-gray-100">
            {brands.map((brand) => (
              <AccordionContent
                key={brand}
                className="cursor-pointer hover:bg-[#3B82F6]/5 px-4 py-2.5 text-sm text-gray-600 hover:text-[#3B82F6] transition-colors border-b border-gray-50 last:border-0"
                onClick={() => handleParamsChange("brand", brand)}
              >
                {brand}
              </AccordionContent>
            ))}
          </div>
        </AccordionItem>

        {/* Categories */}
        <AccordionItem value="categories" className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium text-[#111827] hover:bg-gray-50 hover:no-underline">
            <span className="flex items-center gap-2">
              <Layers size={14} className="text-gray-400" aria-hidden="true" />
              Thể Loại
            </span>
          </AccordionTrigger>
          <div className="border-t border-gray-100">
            {categories.map((category) => (
              <AccordionContent
                key={category.id}
                className="cursor-pointer hover:bg-[#3B82F6]/5 px-4 py-2.5 text-sm text-gray-600 hover:text-[#3B82F6] transition-colors border-b border-gray-50 last:border-0"
                onClick={() => handleParamsChange("category", category.name)}
              >
                {category.name}
              </AccordionContent>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SideAccordion;
