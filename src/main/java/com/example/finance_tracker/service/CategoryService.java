package com.example.finance_tracker.service;

import com.example.finance_tracker.model.Category;
import com.example.finance_tracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    public Category createCategory(Category category){
        return categoryRepository.save(category);
    }
    public Category updateCategory(Long id, Category updatedCategory){
        Category category = getCategoryById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        category.setName(updatedCategory.getName());
        return categoryRepository.save(category);
    }
    public void deleteCategory(Long id){
        categoryRepository.deleteById(id);
    }
}
