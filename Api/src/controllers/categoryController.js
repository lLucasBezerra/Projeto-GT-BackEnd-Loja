const CategoryModel = require("../models/CategoryModel")


const categoryController = {
    searchCategories: async (req, res) => {
        
        const { limit = 12, page = 1, fields = 'name,slug', use_in_menu } = req.query;
        
        const limitParsed = limit === '-1' ? null : parseInt(limit); 
        const pageParsed = parseInt(page);
        const offset = limitParsed ? (pageParsed - 1) * limitParsed : 0;
        
        const fieldsArray = fields.split(',');
        const attributes = fieldsArray.length ? fieldsArray : null;
        
        const where = {};
        if (use_in_menu) {
          where.use_in_menu = use_in_menu === 'true';
        }
    
        try {
          const { count, rows } = await CategoryModel.findAndCountAll({
            where,
            limit: limitParsed,
            offset,
            attributes, 
          });
    
          
          return res.status(200).json({
            data: rows,
            total: count,
            limit: limitParsed,
            page: pageParsed,
          });
        } catch (error) {
          console.error(error);
          return res.status(400).json({ message: 'Erro ao buscar categorias' });
        }
      },
      getCategoryById: async (req, res) => {
        const { id } = req.params; 
    
        try {
          
          const category = await CategoryModel.findOne({ where: { id } });
    
          if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
          }
    
          
          return res.status(200).json({
            id: category.id,
            name: category.name,
            slug: category.slug,
            use_in_menu: category.use_in_menu,
          });
        } catch (error) {
          console.error(error);
          return res.status(400).json({ message: 'Erro ao buscar categoria' });
        }
      },
      createCategory: async (req, res) => {
        const { name, slug, use_in_menu } = req.body;
    
    
        if (!name || !slug || use_in_menu === undefined) {
          return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }
    
        try {
        
          const existingCategory = await CategoryModel.findOne({ where: { slug } });
          if (existingCategory) {
            return res.status(400).json({ message: "Já existe uma categoria com esse slug!" });
          }
    
        
          const newCategory = await CategoryModel.create({
            name,
            slug,
            use_in_menu
          });
    
        
          return res.status(201).json({
            id: newCategory.id,
            name: newCategory.name,
            slug: newCategory.slug,
            use_in_menu: newCategory.use_in_menu
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Erro interno do servidor" });
        }
      }
}

module.exports = categoryController;
