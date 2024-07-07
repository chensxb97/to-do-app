// import PocketBase from 'pocketbase';
import styles from './Note.module.css';
import Link from 'next/link';

import { formatDate } from './util';
import EditNote, { BackButton } from './actions';

async function getNote(noteId: string) {
    // const db = new PocketBase('http://127.0.0.1:8090');
    // await db.records.getOne('notes', {
    //   id
    // });
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`, { cache: 'no-store' }
    );
    const data = await res.json();
    return data;
}

export function Note({ note }: any) {
    const { id, title, description, category, created } = note || {};
    const categoryClass = category ? styles[`${category.toLowerCase()}`] : '';
    return (
        <div>
            <Link href={`/note/${id}`}>
                <div className={`${styles.note} ${categoryClass}`}>
                    <h2>{title}</h2>
                    <h5>{description}</h5>
                    <p>{formatDate(created) ?? created}</p>
                </div>
            </Link >
        </div >
    );
}


export default async function NotePage({ params }: any) {
    const fetchedNote = await getNote(params.id);
    return (
        <>
            <Note note={fetchedNote} />
            <EditNote note={fetchedNote} />
            <div className="back">
                <BackButton />
            </div>
        </>
    );
}