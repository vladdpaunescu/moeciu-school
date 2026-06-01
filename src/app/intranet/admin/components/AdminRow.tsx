"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Field {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  type?: string;
  options?: { value: string; label: string }[];
}

export default function AdminRow({
  id,
  label,
  sublabel,
  deleteAction,
  editAction,
  editFields,
}: {
  id: number;
  label: string;
  sublabel?: string;
  deleteAction: (id: number) => Promise<{ error: string } | undefined | void>;
  editAction?: (formData: FormData) => Promise<{ error: string } | undefined | void>;
  editFields?: Field[];
}) {
  const [editing, setEditing] = useState(false);

  async function handleDelete() {
    if (!confirm(`Ștergi "${label}"?`)) return;
    const result = await deleteAction(id);
    if (result?.error) toast.error(result.error);
    else toast.success("Șters.");
  }

  async function handleEdit(formData: FormData) {
    if (!editAction) return;
    formData.set("id", String(id));
    const result = await editAction(formData);
    if (result?.error) toast.error(result.error);
    else { toast.success("Actualizat."); setEditing(false); }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
      {editing && editFields ? (
        <form action={handleEdit} className="space-y-2">
          {editFields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-gray-600 mb-0.5">{f.label}</label>
              {f.options ? (
                <select name={f.name} required={f.required} defaultValue={f.defaultValue}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input name={f.name} type={f.type ?? "text"} required={f.required}
                  defaultValue={f.defaultValue}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button type="submit" className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg">Salvează</button>
            <button type="button" onClick={() => setEditing(false)} className="text-xs text-gray-500">Anulează</button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-gray-800">{label}</span>
            {sublabel && <span className="ml-2 text-sm text-gray-500">{sublabel}</span>}
          </div>
          <div className="flex gap-3">
            {editAction && editFields && (
              <button onClick={() => setEditing(true)} className="text-gray-400 hover:text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            )}
            <button onClick={handleDelete} className="text-gray-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
