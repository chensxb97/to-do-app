
"use client"
// import PocketBase from 'pocketbase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function DeleteButton({ noteId }: any) {
    const router = useRouter()
    const deleteNote = async (e: any) => {
        e.preventDefault();
        // const db = new PocketBase('http://127.0.0.1:8090');
        // await db.records.delete('notes', {
        //   id
        // });
        await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        router.push('/')
        router.refresh()
    }

    return (
        <button className="delete" onClick={deleteNote}>Delete</button>
    )
}

function CloneButton({ title, description, category }: any) {
    const router = useRouter()
    const cloneNote = async (e: any) => {
        e.preventDefault();
        // const db = new PocketBase('http://127.0.0.1:8090');
        // await db.records.create('notes', {
        //   title,
        //   description,
        //   category
        // });
        const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                category
            }),
        });
        const data = await res.json()
        router.push(`/note/${data.id}`)
        router.refresh();
    }
    return (
        <button className="clone" onClick={cloneNote}>Clone</button>
    )
}

export function BackButton() {
    const router = useRouter()
    const goBack = async () => {
        router.push(`/`)
    }
    return (
        <button onClick={goBack}>Back to Home</button>
    )
}

export default function EditNote({ note }: any) {
    const [noteId] = useState(note && note.id ? note.id : "");
    const [title, setTitle] = useState(note && note.title ? note.title : "");
    const [description, setDescription] = useState(note && note.description ? note.description : '');
    const [category, setCategory] = useState(note && note.category ? note.category : 'Normal');

    const router = useRouter();

    const editNote = async () => {
        // const db = new PocketBase('http://127.0.0.1:8090');
        // await db.records.update('notes', {
        //   id: noteId,
        //   title,
        //   description,
        //   category
        // });
        await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${noteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                category
            }),
        })
        router.refresh()
    }

    const options = ["Urgent", "Normal", "Backlog"]

    return (
        <main>
            <form onSubmit={() => editNote()}>
                <h3>Edit Note</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input"
                />
                <select
                    placeholder="Urgency"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-input"
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="form-submit">
                    <CloneButton title={title} description={description} category={category} />
                    <DeleteButton noteId={noteId} />
                    <button className="create" type="submit">
                        Update
                    </button>
                </div>
            </form>
        </main>
    )
}