import express from 'express';
import { FoldersRepository } from '../repositories/FoldersRepository';
import { FoldersService } from '../services/FoldersService';
import { RouteUtil } from './RouteUtil';

const router = express.Router();

const foldersRepository = new FoldersRepository();
const foldersService = new FoldersService();

router.get('/:uuid', async (req, res, next) => {
    const { uuid } = req.params;

    await RouteUtil.handleAsync(async () => {
        const response = await foldersService.getFolderAndChildren(uuid);
        
        if (!response.folder) return RouteUtil.sendNotFound(res);
        
        res.send(response);    
    }, next);
});

router.post('/', async (req, res, next) => {
    const { parentFolderUUID } = req.body;
    
    await RouteUtil.handleAsync(async () => {
        const folder = await foldersRepository.create(parentFolderUUID);
        res.send(folder);    
    }, next);
});

router.put('/:uuid', async (req, res, next) => {
    const { uuid } = req.params;
    const { name } = req.body;

    await RouteUtil.handleAsync(async () => {
        const folder = await foldersRepository.update(uuid, name);
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