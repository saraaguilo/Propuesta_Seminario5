import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Store from '../models/Store';

const createStore = (req: Request, res: Response, next: NextFunction) => {
    const { name, owner, products } = req.body;

    const store = new Store({
        _id: new mongoose.Types.ObjectId(),
        name,
        owner,
        products
    });

    return store
        .save()
        .then((store) => res.status(201).json({ store }))
        .catch((error) => res.status(500).json({ error }));
};

const readStore = (req: Request, res: Response, next: NextFunction) => {
    const storeId = req.params.storeId;

    return Store.findById(storeId)
        .then((store) => (store ? res.status(200).json({ store }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAllStores = (req: Request, res: Response, next: NextFunction) => {
    return Store.find()
        .then((stores) => res.status(200).json({ stores }))
        .catch((error) => res.status(500).json({ error }));
};

const updateStore = (req: Request, res: Response, next: NextFunction) => {
    const storeId = req.params.storeId;

    return Store.findById(storeId)
        .then((store) => {
            if (store) {
                store.set(req.body);

                return store
                    .save()
                    .then((store) => res.status(201).json({ store }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteStore = (req: Request, res: Response, next: NextFunction) => {
    const storeId = req.params.storeId;

    return Store.findByIdAndDelete(storeId)
        .then((store) => (store ? res.status(201).json({ store, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createStore, readStore, readAllStores, updateStore, deleteStore };
