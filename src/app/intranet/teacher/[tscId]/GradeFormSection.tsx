"use client";

import { useState } from "react";
import { addGrade, updateGrade, deleteGrade } from "../../actions/grades";
import { Pencil, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

type Student = { id: string; name: string };
type Grade = { id: number; student_id: string; value: number; type: string; date: string };

const GRADE_TYPES = ["teza", "test", "oral", "tema"];

export default function GradeFormSection({
  tscId,
  students,
  grades,
}: {
  tscId: number;
  students: Student[];
  grades: Grade[];
}) {
  const [editingId, setEditingId] = useState<number | null>(null);

  async function handleAdd(formData: FormData) {
    formData.set("teacher_subject_class_id", String(tscId));
    const result = await addGrade(formData);
    if (result?.error) toast.error(result.error);
    else toast.success("Notă adăugată.");
  }

  async function handleUpdate(formData: FormData) {
    formData.set("teacher_subject_class_id", String(tscId));
    const result = await updateGrade(formData);
    if (result?.error) toast.error(result.error);
    else { toast.success("Notă actualizată."); setEditingId(null); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Ești sigur că vrei să ștergi această notă?")) return;
    const result = await deleteGrade(id, tscId);
    if (result?.error) toast.error(result.error);
    else toast.success("Notă ștearsă.");
  }

  const studentName = (id: string) =>
    students.find((s) => s.id === id)?.name ?? id;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-500" /> Adaugă notă
      </h2>

      <form action={handleAdd} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 mb-6">
        <select name="student_id" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="">— Selectează elevul —</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <input name="value" type="number" min={1} max={10} required placeholder="Notă (1-10)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          <select name="type" required className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">— Tip —</option>
            {GRADE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input name="date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
          Salvează nota
        </button>
      </form>

      <h2 className="text-lg font-semibold text-gray-700 mb-3">Note acordate</h2>
      {grades.length === 0 ? (
        <p className="text-gray-400 text-sm">Nu există note.</p>
      ) : (
        <div className="space-y-2">
          {grades.map((g) => (
            <div key={g.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
              {editingId === g.id ? (
                <form action={handleUpdate} className="flex flex-wrap gap-2 items-center">
                  <input type="hidden" name="id" value={g.id} />
                  <span className="text-sm text-gray-600 shrink-0">{studentName(g.student_id)}</span>
                  <input name="value" type="number" min={1} max={10} defaultValue={g.value} required
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-sm" />
                  <select name="type" defaultValue={g.type} required
                    className="border border-gray-300 rounded px-2 py-1 text-sm">
                    {GRADE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input name="date" type="date" defaultValue={g.date} required
                    className="border border-gray-300 rounded px-2 py-1 text-sm" />
                  <button type="submit" className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg">Salvează</button>
                  <button type="button" onClick={() => setEditingId(null)} className="text-xs text-gray-500">Anulează</button>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-gray-800">{studentName(g.student_id)}</span>
                    <span className="ml-3 text-blue-700 font-bold">{g.value}</span>
                    <span className="ml-2 text-xs text-gray-500 uppercase">{g.type}</span>
                    <span className="ml-2 text-xs text-gray-400">{g.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingId(g.id)} className="text-gray-400 hover:text-blue-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(g.id)} className="text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
