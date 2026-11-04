import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllCategories, getBrands } from "../service/ApiFunctions";

/**
 * SideAccordion — filter sidebar.
 * Hairline-separated groups with label-style headings. The selected option is
 * marked in brand pink; clicking it again clears that filter.
 */
const SideAccordion = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  useEffect(() => {
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
    fetchCategories();
    fetchBrands();
  }, []);

  const groups = [
    {
      value: "brands",
      title: "Thương Hiệu",
      param: "brand",
      options: brands.map((b) => ({ id: b?.id, name: b?.name })),
    },
    {
      value: "categories",
      title: "Thể Loại",
      param: "category",
      options: categories.map((c) => ({ id: c?.id, name: c?.name })),
    },
  ];

  return (
    <div>
      <h3 className="eyebrow border-b border-brand-ink pb-3 text-brand-ink">
        Bộ Lọc
      </h3>

      <Accordion
        type="multiple"
        defaultValue={["brands", "categories"]}
        className="w-full"
      >
        {groups.map((group) => {
          const selected = searchParams.get(group.param);
          return (
            <AccordionItem
              key={group.value}
              value={group.value}
              className="border-b border-hairline"
            >
              <AccordionTrigger className="font-label py-4 text-sm tracking-[0.038em] text-brand-ink hover:no-underline">
                {group.title}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <ul className="space-y-1">
                  {group.options.map((option) => {
                    const isActive = selected === option.name;
                    return (
                      <li key={option.id}>
                        <button
                          type="button"
                          onClick={() => toggleParam(group.param, option.name)}
                          aria-pressed={isActive}
                          className={`flex w-full items-center justify-between rounded py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue ${
                            isActive
                              ? "font-semibold text-brand-pink"
                              : "text-[#363537] hover:text-brand-orange"
                          }`}
                        >
                          {option.name}
                          {isActive && (
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-brand-pink"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SideAccordion;
