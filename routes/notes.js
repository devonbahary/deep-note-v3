import express from 'express';
import { NotesRepository } from '../repositories/NotesRepository';
import { RouteUtil } from './RouteUtil';

const router = express.Router();

const notesRepository = new NotesRepository();

router.get('/:uuid', async (req, res, next) => {
    const { uuid } = req.params;

    await RouteUtil.handleAsync(async () => {
        const note = await notesRepository.findOne(uuid);
        if (!note) return RouteUtil.sendNotFound(res);
        
        res.send(note);    
    }, next);
});

router.post('/', async (req, res, next) => {
    const { name, parentFolderUUID, text } = req.body;
    
    await RouteUtil.handleAsync(async () => {
        const note = await notesRepository.create(parentFolderUUID, name, text);
        res.send(note);    
    }, next);
});

router.put('/:uuid', async (req, res, next) => {
    const { uuid } = req.params;
    const { name, text } = req.body;

    await RouteUtil.handleAsync(async () => {
        const note = await notesRepository.update(uuid, name, text);
        if (!note) return RouteUtil.sendNotFound(res);
        res.send(note);    
    }, next);
});

router.delete('/:uuid', async (req, res, next) => {
    const { uuid } = req.params;

    await RouteUtil.handleAsync(async () => {
        await notesRepository.delete(uuid);
        RouteUtil.sendSuccess(res);
    }, next);
});

export default router;