import styles from '../Notes.module.css';
import Link from 'next/link';
import { formatDate } from '../page';
import CreateNote from '../CreateNote';

async function getNote(noteId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await res.json();
    return data;
}

export default async function NotePage({ params }: any) {
    const fetchedNote = await getNote(params.id);
    return (
        <div className={styles.note}>
            <h2>{fetchedNote.title}</h2>
            <h5>{fetchedNote.description}</h5>
            <h2>{fetchedNote.category}</h2>
            <p>{formatDate(fetchedNote.created) ?? fetchedNote.created}</p>
        </div>
    );
}