import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ActionController } from "./controllers/ActionController";
import { NoteController } from "./controllers/NoteController";
import { ActionService } from "./services/ActionService";
import { NoteService } from "./services/NoteService";
import { DoneController } from "./controllers/DoneController";
import { DoneService } from "./services/DoneService";

const userController: UserController = new UserController()
const actionController: ActionController = new ActionController(new ActionService())
const noteController: NoteController = new NoteController(new NoteService())
const doneController: DoneController = new DoneController(new DoneService())

const router = Router()

router.post('/user', userController.createUser)
router.post('/session', userController.authUser)
// router.get('/user', isAuthenticated, userController.listAllUsers)

router.get('/action', isAuthenticated, actionController.getActions)
router.post('/action', isAuthenticated, actionController.createAction)
router.delete('/action', isAuthenticated, actionController.deleteAction)

router.post('/note', isAuthenticated, noteController.createNote)
router.put('/note', isAuthenticated, noteController.updateNote)
router.get('/note', isAuthenticated, noteController.getUserNotes)
router.get('/note/date', isAuthenticated, noteController.getNoteByDate)

router.post('/done', isAuthenticated, doneController.createDone)
router.put('/done', isAuthenticated, doneController.updateDone)
router.delete('/done', isAuthenticated, doneController.deleteDone)

router.get('/', (req, res) => res.json({ status: 'OK' }))

export { router }