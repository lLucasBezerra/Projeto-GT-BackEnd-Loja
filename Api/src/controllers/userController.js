const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const userController = {
  getUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await UserModel.findOne({ where: { id } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json({
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  },

  createUser: async (req, res) => {
    const { firstname, surname, email, password, confirmPassword } = req.body;

    if (!firstname || !surname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Todos os Campos são obrigatórios!" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "As senhas não são iguais!" });
    }

    try {
      const existingUser = await UserModel.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email já utilizado" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({
        firstname,
        surname,
        email,
        password: hashedPassword,
      });


      return res.status(201).json({
        id: newUser.id,
        firstname: newUser.firstname,
        surname: newUser.surname,
        email: newUser.email,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { firstname, surname, email } = req.body;

    
    if (!firstname || !surname || !email) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    try {
      
      const user = await UserModel.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      user.firstname = firstname;
      user.surname = surname;
      user.email = email;

      await user.save();

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await UserModel.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      await user.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};

module.exports = userController;
