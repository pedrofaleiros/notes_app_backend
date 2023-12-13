import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ActionController } from "./controllers/ActionController";
import { NoteController } from "./controllers/NoteController";
import { ActionService } from "./services/ActionService";
import { NoteService } from "./services/NoteService";

const userController: UserController = new UserController()
const actionController: ActionController = new ActionController(new ActionService())
const noteController: NoteController = new NoteController(new NoteService())

const router = Router()

//user DONE
router.post('/user', userController.createUser)
router.get('/user', isAuthenticated, userController.listAllUsers)
router.post('/session', userController.authUser)

//action DONE
router.get('/action', isAuthenticated, actionController.getActions)
router.post('/action', isAuthenticated, actionController.createAction)
router.delete('/action', isAuthenticated, actionController.deleteAction)

//note
router.post('/note', isAuthenticated, noteController.createNote)
router.put('/note', isAuthenticated, noteController.updateNote)
router.get('/note', isAuthenticated, noteController.getUserNotes)
router.get('/note/date', isAuthenticated, noteController.getNoteByDate)

router.get('/', (req, res) => res.json({ status: 'OK' }))

export { router }