import { NoteEntity } from "../models/NoteEntity";

export function generateNoteId(note: NoteEntity): string {
	return `${note.date.getFullYear()}-${note.date.getMonth()}-${note.date.getDate()}-${note.user_id}`
}