import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { IAuthor } from '../models/Author';
import { IBook } from '../models/Book';
import { IStore } from '../models/Store';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}/)
                .required(),
            title: Joi.string().required(),
            category: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}/)
                .required(),
            title: Joi.string().required(),
            category: Joi.string().required(),
            price: Joi.number().required()
        })
    },
    store: {
        // Nuevo esquema para Store
        create: Joi.object<IStore>({
            name: Joi.string().required(),
            owner: Joi.string().required(),
            products: Joi.string().required()
        }),
        update: Joi.object<IStore>({
            name: Joi.string().required(),
            owner: Joi.string().required(),
            products: Joi.string().required()
        })
    }
};
