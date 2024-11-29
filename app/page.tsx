"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { NoteData } from "./types/Note";
import NoteList from "./components/note-list/NoteList";
import Sidebar from "./components/sidebar/Sidebar";
import NoteStats from "./components/note-stats/NoteStat";

export default function Home() {
    const [notes, setNotes] = useState<NoteData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterId, setFilterId] = useState<number>(0);

    useEffect(() => {
        const fetchNotes = async () => {
            setIsLoading(true);
            if (filterId === 0) {
                const { data } = await supabase
                    .from("notes")
                    .select("*")
                    .order("created_at", { ascending: false });
                setNotes(data || []);
            } else {
                const { data } = await supabase
                    .from("notes")
                    .select("*")
                    .eq("category", filterId)
                    .order("created_at", { ascending: false });
                setNotes(data || []);
            }
            setIsLoading(false);
        };
        fetchNotes();
    }, [filterId]);

    const addNewNote = async () => {
        const newNote: Omit<NoteData, "id"> = {
            title: "Nueva Nota",
            content: "",
            category: 1, // Por defecto, categoría "Ideas"
            created_at: new Date(),
            status: 0, // Estado inicial "incompleto"
        };

        const { data, error } = await supabase
            .from("notes")
            .insert(newNote)
            .select()
            .single();

        if (!error && data) {
            setNotes([data, ...notes]);
        } else {
            console.error("Error al agregar la nota:", error);
        }
    };

    const updateNote = async (updatedNote: NoteData) => {
        const updatedNotes = notes.map(note =>
            note.id === updatedNote.id ? updatedNote : note
        );
        setNotes(updatedNotes);

        if (updatedNote.id.toString().includes(".")) {
            if (updatedNote.title === "" && updatedNote.content === "") {
                setNotes(notes =>
                    notes.filter(note => note.id !== updatedNote.id)
                );
                return;
            }

            const { data, error } = await supabase
                .from("notes")
                .insert({
                    title: updatedNote.title,
                    content: updatedNote.content,
                    category: updatedNote.category,
                })
                .select()
                .single();

            if (!error && data) {
                setNotes(notes =>
                    notes.map(note =>
                        note.id === updatedNote.id ? data : note
                    )
                );
            }
        } else {
            await supabase
                .from("notes")
                .update({
                    title: updatedNote.title,
                    content: updatedNote.content,
                    category: updatedNote.category,
                })
                .eq("id", updatedNote.id);
        }
    };

    const deleteNote = async (noteId: number) => {
        setNotes(notes.filter(note => note.id !== noteId));
        await supabase
            .from("notes")
            .delete()
            .eq("id", noteId);
    };

    return (
        <div className="flex flex-row h-screen bg-black">
            <div className="max-w-60 border-r shadow-md bg-black text-neonGreen">
                <Sidebar onFilterChange={setFilterId} />
            </div>
            <div className="w-full text-neonGreen">
                <div className="flex flex-col p-4 space-y-4">
                    {/* Componente NoteStats */}
                    <NoteStats />

                    {/* Botón para agregar una nueva tarea */}
                    <button
                        onClick={addNewNote}
                        className="self-start px-4 py-2 bg-neonGreen text-black font-bold rounded hover:bg-emeraldGreen"
                    >
                        Agregar Nota
                    </button>

                    {/* Skeleton loader o lista de notas */}
                    {isLoading
                        ? skeletonLoader()
                        : notes.length === 0 ? (
                            <p className="text-xl font-semibold animate-pulse text-neonGreen">
                                No hay notas con esta categoría...
                            </p>
                        ) : (
                            <NoteList
                                notes={notes}
                                onUpdateNote={updateNote}
                                onDeleteNote={deleteNote}
                            />
                        )}
                </div>
            </div>
        </div>
    );
}

const skeletonLoader = () => {
    return (
        <div className="w-full h-screen flex p-4">
            <div className="space-y-2.5 animate-pulse w-full">
                <div className="flex items-center w-full space-x-4">
                    <div className="shadow-sm rounded-md h-44 bg-neonGreen w-full"></div>
                    <div className="shadow-sm rounded-md h-44 bg-neonGreen w-full"></div>
                    <div className="shadow-sm rounded-md h-44 bg-neonGreen w-full"></div>
                    <div className="shadow-sm rounded-md h-44 bg-neonGreen w-full"></div>
                </div>
                <span className="sr-only text-neonGreen">Cargando...</span>
            </div>
        </div>
    );
};
