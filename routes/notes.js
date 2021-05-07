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

router.put('/name/:uuid', async (req, res, next) => {
    const { uuid } = req.params;
    const { name } = req.body;

    await RouteUtil.handleAsync(async () => {
        const note = await notesRepository.updateName(uuid, name);
        if (!note) return RouteUtil.sendNotFound(res);
        res.send(note); 
    }, next);
});

router.put('/text/:uuid', async (req, res, next) => {
    const { uuid } = req.params;
    const { text } = req.body;

    await RouteUtil.handleAsync(async () => {
        await notesRepository.updateText(uuid, text);
        RouteUtil.sendSuccess(res);
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