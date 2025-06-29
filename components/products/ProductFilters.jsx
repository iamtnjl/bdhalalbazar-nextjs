import React from "react";
import ProductFilterDrawerPanel from "./ProductFilterDrawerPanel";
import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/helpers/APIKit";
import Button from "../shared/Button";
import SearchAndSelect from "../from/SearchAndSelect";
import {
  formatFilterOptions,
  loadOptions,
  transformOptionsData,
} from "@/common/helpers/UtilKit";
import PaginatedSelect from "../from/PaginatedSelect";
import { useFilters } from "@/providers/FiltersProvider";
import { useTranslation } from "react-i18next";

const ProductFilters = (props) => {
  const { params, updateParams, closeFilterModal, triggerURLUpdate } =
    useFilters();
  const {
    selectedCategories,
    selectedBrands,
    selectedColors,
    selectedMaterials,
    selectedSubcategories,
  } = props;
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <Dialog.Title className="text-xl text-primary font-semibold">
          <p>{t("product.filter.title")}</p>
        </Dialog.Title>

        <div className="flex h-7 ml-5 items-center">
          <button
            type="button"
            className="rounded-md text-gray-700 hover:text-gray-600"
            onClick={() => closeFilterModal()}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.0"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4 pb-8">
        <PaginatedSelect
          label={t("product.filter.categories")}
          placeholder={t("product.filter.categories")}
          loadOptions={(inputValue, _, page) =>
            loadOptions(inputValue, _, page, APIKit.tags.getCategoriesList)
          }
          additional={{ page: 1 }}
          isMulti={true}
          onChange={(items) => updateParams("categories", items)}
          value={selectedCategories?.filter((option) =>
            params?.categories?.includes(option.value)
          )}
        />
        <PaginatedSelect
          label={t("product.filter.subcategories")}
          placeholder={t("product.filter.subcategories")}
          loadOptions={(inputValue, _, page) =>
            loadOptions(inputValue, _, page, APIKit.tags.getSubCategoriesList)
          }
          additional={{ page: 1 }}
          isMulti={true}
          onChange={(items) => updateParams("subCategory", items)}
          value={selectedSubcategories?.filter((option) =>
            params?.subCategory?.includes(option.value)
          )}
        />
        <PaginatedSelect
          label={t("product.filter.brands")}
          placeholder={t("product.filter.brands")}
          loadOptions={(inputValue, _, page) =>
            loadOptions(inputValue, _, page, APIKit.tags.getBrandsList)
          }
          additional={{ page: 1 }}
          isMulti={true}
          onChange={(items) => updateParams("brands", items)}
          value={selectedBrands?.filter((option) =>
            params?.brands?.includes(option.value)
          )}
        />
        <PaginatedSelect
          label={t("product.filter.colors")}
          placeholder={t("product.filter.colors")}
          loadOptions={(inputValue, _, page) =>
            loadOptions(inputValue, _, page, APIKit.tags.getColorList)
          }
          additional={{ page: 1 }}
          isMulti={true}
          onChange={(items) => updateParams("colors", items)}
          value={selectedColors?.filter((option) =>
            params?.colors?.includes(option.value)
          )}
        />
        <PaginatedSelect
          label={t("product.filter.materials")}
          placeholder={t("product.filter.materials")}
          loadOptions={(inputValue, _, page) =>
            loadOptions(inputValue, _, page, APIKit.tags.getMaterialList)
          }
          additional={{ page: 1 }}
          isMulti={true}
          onChange={(items) => updateParams("materials", items)}
          value={selectedMaterials?.filter((option) =>
            params?.materials?.includes(option.value)
          )}
        />
      </div>

      <div className="flex flex-shrink-0 justify-end border-t border-gray-200 pt-4 items-center gap-4">
        <Button variant="white" onClick={() => closeFilterModal()}>
          {t("ctaButton.cancel")}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            triggerURLUpdate();
          }}
        >
          {t("ctaButton.applyFilter")}
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
