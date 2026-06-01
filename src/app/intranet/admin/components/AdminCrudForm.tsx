"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

interface Field {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
}

export default function AdminCrudForm({
  title,
  action,
  fields,
}: {
  title: string;
  action: (formData: FormData) => Promise<{ error: string } | undefined | void>;
  fields: Field[];
}) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await action(formData);
    if (result?.error) toast.error(result.error);
    else { toast.success("Salvat cu succes."); setOpen(false); }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" /> {title}
      </button>

      {open && (
        <form action={handleSubmit} className="mt-4 bg-white border border-gray-200 rounded-xl p-5 space-y-3 max-w-lg">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              {f.options ? (
                <select name={f.name} required={f.required} defaultValue={f.defaultValue}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">— Selectează —</option>
                  {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input name={f.name} type={f.type ?? "text"} required={f.required}
                  defaultValue={f.defaultValue}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Salvează
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">
              Anulează
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
