import mongoose from 'mongoose';
const Comment = require('../models/commentModel');
const Post = require('../models/commentModel');
const User = require('../models/commentModel');

export default {
    // Método para obter um comentário por ID
    async getAllReservations() {
            const comment = await Comment.findById(id).populate('autor postagem'); // Popula os dados do autor e da postagem
            if (comment) {
                return comment;
            } else {
                throw new Error("Erro");
            }
    },

    // Método para criar um novo comentário
    async getReservation(userId: String) {
            // Verifica se a postagem e o autor existem
            const post = await Post.findById(postagemId);
            const author = await User.findById(autorId);

            if (!post || !author) {
                throw new Error("Autor ou Post não encontrado");
            }

            // Cria um novo comentário
            const newComment = new Comment({
                postagem: postagemId,
                autor: autorId,
                conteudo
            });

            // Salva o comentário no banco de dados
            const savedComment = await newComment.save();

            if (savedComment) {
                return savedComment;
            } else {
                throw new Error("Erro");
            }

    },
    // Método para criar um novo comentário
    async createReservation(userId: String) {
        // Verifica se a postagem e o autor existem
        const post = await Post.findById(postagemId);
        const author = await User.findById(autorId);

        if (!post || !author) {
            throw new Error("Autor ou Post não encontrado");
        }

        // Cria um novo comentário
        const newComment = new Comment({
            postagem: postagemId,
            autor: autorId,
            conteudo
        });

        // Salva o comentário no banco de dados
        const savedComment = await newComment.save();

        if (savedComment) {
            return savedComment;
        } else {
            throw new Error("Erro");
        }

    }
};
