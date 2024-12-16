import React, { useState } from 'react';
import { Book, Plus } from 'lucide-react';
import { AudioRecorder } from './components/AudioRecorder';
import { ImageUploader } from './components/ImageUploader';
import { JournalEntry } from './components/JournalEntry';
import type { JournalEntry as JournalEntryType } from './types';

function App() {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
  });

  const handleAudioSave = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const entry: JournalEntryType = {
      id: Date.now().toString(),
      title: 'Audio Note',
      content: 'Audio recording',
      date: new Date(),
      audioUrl,
      type: 'audio',
    };
    setEntries([entry, ...entries]);
  };

  const handleImageUpload = (files: FileList) => {
    const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    const entry: JournalEntryType = {
      id: Date.now().toString(),
      title: 'Image Notes',
      content: 'Uploaded images',
      date: new Date(),
      imageUrls,
      type: 'image',
    };
    setEntries([entry, ...entries]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: JournalEntryType = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date(),
      type: 'text',
    };
    setEntries([entry, ...entries]);
    setNewEntry({ title: '', content: '' });
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">My Journal</h1>
            </div>
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus size={20} />
              New Entry
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {isCreating && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Write your thoughts..."
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                className="w-full h-32 mb-4 px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <AudioRecorder onSave={handleAudioSave} />
                  <ImageUploader onUpload={handleImageUpload} />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {entries.map((entry) => (
            <JournalEntry key={entry.id} entry={entry} />
          ))}
          {entries.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No journal entries yet. Start by creating one!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;