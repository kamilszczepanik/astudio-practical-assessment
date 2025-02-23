import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Category } from '../../types/products';
import api from '../../services/api';

interface CategoryDropdownProps {
  selectedCategory?: string;
  setSelectedCategory: (category?: string) => void;
  setCurrentPage: (page: number) => void;
}

export const CategoryDropdown = ({
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
}: CategoryDropdownProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await api.getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category?: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-custom-black/20 ml-2 rounded px-3 py-1 text-sm">
        {selectedCategory ? 
          categories.find(cat => cat.slug === selectedCategory)?.name : 
          'Category'
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => handleCategoryChange(undefined)}
          className="cursor-pointer"
        >
          All Categories
        </DropdownMenuItem>
        {categories.map(category => (
          <DropdownMenuItem
            key={category.slug}
            onClick={() => handleCategoryChange(category.slug)}
            className="cursor-pointer"
          >
            {category.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 