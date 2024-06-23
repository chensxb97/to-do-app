// import PocketBase from 'pocketbase';
import Link from 'next/link';
import styles from './Notes.module.css';
import CreateNote from './CreateNote';

async function getNotes() {
    // const db = new PocketBase('http://127.0.0.1:8090');
    // const result = await db.records.getList('notes');
    const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await res.json();
    return data?.items as any[];
}

export default async function NotesPage() {
    const notes = await getNotes();
    return (
        <div>
            <div className={styles.grid}>
                {notes?.map((note) => {
                    return <Note key={note.id} note={note} />;
                })}
            </div>
            <CreateNote />
        </div>
    );
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format, keeping 12 as 12

    return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
}


function Note({ note }: any) {
    const { id, title, description, category, created } = note || {};
    return (
        <div>
            <Link href={`/notes/${id}`}>
                <div className={styles.note}>
                    <h2>{title}</h2>
                    <h5>{description}</h5>
                    <h2>{category}</h2>
                    <p>{formatDate(created) ?? created}</p>
                </div>
            </Link>
        </div>
    );
}