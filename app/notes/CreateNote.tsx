'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateNote() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Normal');

    const router = useRouter();

    const create = async () => {
        // const db = new PocketBase('http://127.0.0.1:8090');

        // await db.records.create('notes', {
        //   title,
        //   description,
        //   category
        // });

        await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
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

        setCategory('Normal');
        setDescription('');
        setTitle('');

        router.refresh();
    }

    const options = ["Urgent", "Normal", "Backlog"]

    return (
        <main>
            <form onSubmit={create}>
                <h3>Create New Note</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"  // Apply the CSS class
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input"  // Apply the CSS class
                />
                <select
                    placeholder="Urgency"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-input"  // Apply the CSS class
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <button type="submit">
                    Create note
                </button>
            </form>
        </main>
    )
}