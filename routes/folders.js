import express from 'express';
import { FoldersRepository } from '../repositories/FoldersRepository';
import { RouteUtil } from './RouteUtil';

const router = express.Router();

const foldersRepository = new FoldersRepository();

router.get('/:uuid', async (req, res, next) => {
    const { uuid } = req.params;

    await RouteUtil.handleAsync(async () => {
        const folder = await foldersRepository.findOne(uuid);
        if (!folder) return RouteUtil.sendNotFound(res);
        res.send(folder);    
    }, next);
});

router.post('/', async (req, res, next) => {
    const { name, parentFolderUuid } = req.body;
    
    await RouteUtil.handleAsync(async () => {
        const folder = await foldersRepository.create(name, parentFolderUuid);
        res.send(folder);    
    }, next);
});

router.put('/:uuid', async (req, res, next) => {
    const { uuid } = req.params;
    const { name, parentFolderUuid } = req.body;

    await RouteUtil.handleAsync(async () => {
        const folder = await foldersRepository.update(uuid, name, parentFolderUuid);
        if (!folder) return RouteUtil.sendNotFound(res);
        res.send(folder);    
    }, next);
});

router.delete('/:uuid', async (req, res, next) => {
    const { uuid } = req.params;

    await RouteUtil.handleAsync(async () => {
        await foldersRepository.delete(uuid);
        RouteUtil.sendSuccess(res);
    }, next);
});

export default router;