`use client`;

import { useEffect, useMemo, useState } from 'react';
import {
  Loader2,
  Info,
  Users,
  Table2,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { Expense, Guest, Table, WeddingData, WeddingInfo } from '@/types';

type TabKey = 'info' | 'guests' | 'tables' | 'expenses';

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'info', label: 'Información', icon: Info },
  { key: 'guests', label: 'Invitados', icon: Users },
  { key: 'tables', label: 'Mesas', icon: Table2 },
  { key: 'expenses', label: 'Gastos', icon: DollarSign },
];

interface AdminDashboardProps {
  token: string;
}

export default function AdminDashboard({ token }: AdminDashboardProps) {
  const [data, setData] = useState<WeddingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabKey>('info');
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('No se pudo cargar la información');
      const json = (await response.json()) as WeddingData;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-white rounded-3xl shadow-lg min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
        <p className="text-red-600 font-semibold mb-4">{error ?? 'Error desconocido'}</p>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-6 py-2 bg-rose-600 text-white rounded-full"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
      <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                tab === key
                  ? 'bg-rose-600 text-white border-rose-600 shadow-lg'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === 'info' && (
          <InfoTab
            info={data.weddingInfo}
            token={token}
            onUpdated={async () => fetchData()}
          />
        )}
        {tab === 'guests' && (
          <GuestsTab
            guests={data.guests}
            tables={data.tables}
            token={token}
            onChange={fetchData}
          />
        )}
        {tab === 'tables' && (
          <TablesTab
            tables={data.tables}
            guests={data.guests}
            token={token}
            onChange={fetchData}
          />
        )}
        {tab === 'expenses' && (
          <ExpensesTab
            expenses={data.expenses}
            token={token}
            onChange={fetchData}
          />
        )}
    </div>
  );
}

function InfoTab({
  info,
  token,
  onUpdated,
}: {
  info: WeddingInfo;
  token: string;
  onUpdated: () => void;
}) {
  const [form, setForm] = useState(info);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => setForm(info), [info]);

  const updateNested = (path: string[], value: string | number) => {
    setForm((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)) as WeddingInfo;
      let current: any = updated;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('No se pudo guardar');
      setMessage('Información actualizada');
      onUpdated();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nombre 1</label>
          <input
            value={form.couple.name1}
            onChange={(e) => updateNested(['couple', 'name1'], e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nombre 2</label>
          <input
            value={form.couple.name2}
            onChange={(e) => updateNested(['couple', 'name2'], e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Fecha</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateNested(['date'], e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Hora</label>
          <input
            type="time"
            value={form.time}
            onChange={(e) => updateNested(['time'], e.target.value)}
            className="input"
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Encabezado</label>
          <input
            value={form.hero.headline}
            onChange={(e) => updateNested(['hero', 'headline'], e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Subtítulo</label>
          <input
            value={form.hero.subheadline}
            onChange={(e) => updateNested(['hero', 'subheadline'], e.target.value)}
            className="input"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Imagen Principal (Hero)
          </label>
          
          {/* Vista previa de la imagen actual */}
          {form.hero.image && (
            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2">Vista previa:</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={form.hero.image}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Subir desde ordenador */}
          <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subir imagen desde tu ordenador
            </label>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append('file', file);
                formData.append('description', 'Imagen principal del matrimonio');

                try {
                  setMessage('Subiendo imagen...');
                  const res = await fetch('/api/admin/upload', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                  });

                  if (!res.ok) {
                    const error = await res.json();
                    setMessage(`Error: ${error.error || 'Error al subir la imagen'}`);
                    setTimeout(() => setMessage(null), 5000);
                    return;
                  }

                  const data = await res.json();
                  const imagePath = data.path || data.url;

                  setForm((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      image: imagePath,
                    },
                  }));

                  e.target.value = '';
                  setMessage('✅ Imagen subida correctamente');
                  setTimeout(() => setMessage(null), 3000);
                } catch (err) {
                  setMessage('❌ Error al subir la imagen. Intenta nuevamente.');
                  setTimeout(() => setMessage(null), 5000);
                }
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
            />
            <p className="text-xs text-gray-500 mt-2">
              Formatos permitidos: JPG, PNG, WEBP. Tamaño máximo: 5MB.
            </p>
          </div>

          {/* O agregar URL externa */}
          <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              O agrega una URL externa
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                value={form.hero.image || ''}
                onChange={(e) => updateNested(['hero', 'image'], e.target.value)}
                className="flex-1 input"
                placeholder="https://ejemplo.com/foto.jpg"
              />
              <button
                type="button"
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      image: '',
                    },
                  }));
                  setMessage('Imagen eliminada');
                  setTimeout(() => setMessage(null), 3000);
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold text-sm whitespace-nowrap"
                disabled={!form.hero.image}
              >
                Eliminar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Puedes usar una URL externa o una ruta relativa (ej: /images/foto.jpg)
            </p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="card-title">Ceremonia</h3>
          <label className="label">Nombre</label>
          <input
            value={form.ceremony.name}
            onChange={(e) => updateNested(['ceremony', 'name'], e.target.value)}
            className="input"
          />
          <label className="label mt-4">Dirección</label>
          <input
            value={form.ceremony.address}
            onChange={(e) => updateNested(['ceremony', 'address'], e.target.value)}
            className="input"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">Latitud</label>
              <input
                type="number"
                step="0.0001"
                value={form.ceremony.lat}
                onChange={(e) =>
                  updateNested(['ceremony', 'lat'], Number(e.target.value))
                }
                className="input"
              />
            </div>
            <div>
              <label className="label">Longitud</label>
              <input
                type="number"
                step="0.0001"
                value={form.ceremony.lng}
                onChange={(e) =>
                  updateNested(['ceremony', 'lng'], Number(e.target.value))
                }
                className="input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">Fecha de Ceremonia</label>
              <input
                type="date"
                value={form.ceremony.date || ''}
                onChange={(e) => updateNested(['ceremony', 'date'], e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Hora de Ceremonia</label>
              <input
                type="time"
                value={form.ceremony.time || ''}
                onChange={(e) => updateNested(['ceremony', 'time'], e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Recepción</h3>
          <label className="label">Nombre</label>
          <input
            value={form.reception.name}
            onChange={(e) => updateNested(['reception', 'name'], e.target.value)}
            className="input"
          />
          <label className="label mt-4">Dirección</label>
          <input
            value={form.reception.address}
            onChange={(e) => updateNested(['reception', 'address'], e.target.value)}
            className="input"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">Latitud</label>
              <input
                type="number"
                step="0.0001"
                value={form.reception.lat}
                onChange={(e) =>
                  updateNested(['reception', 'lat'], Number(e.target.value))
                }
                className="input"
              />
            </div>
            <div>
              <label className="label">Longitud</label>
              <input
                type="number"
                step="0.0001"
                value={form.reception.lng}
                onChange={(e) =>
                  updateNested(['reception', 'lng'], Number(e.target.value))
                }
                className="input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">Fecha de Celebración</label>
              <input
                type="date"
                value={form.reception.date || ''}
                onChange={(e) => updateNested(['reception', 'date'], e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Hora de Celebración</label>
              <input
                type="time"
                value={form.reception.time || ''}
                onChange={(e) => updateNested(['reception', 'time'], e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <label className="label">Código de vestimenta</label>
        <textarea
          value={form.dressCode}
          onChange={(e) => updateNested(['dressCode'], e.target.value)}
          className="input h-24"
        />
      </section>

      <section className="card">
        <h3 className="card-title">Regalos</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Tipo de cuenta</label>
            <select
              value={form.giftAccount.accountType}
              onChange={(e) =>
                updateNested(['giftAccount', 'accountType'], e.target.value)
              }
              className="input"
            >
              <option value="cuenta_rut">Cuenta RUT</option>
              <option value="cuenta_corriente">Cuenta Corriente</option>
              <option value="cuenta_vista">Cuenta Vista</option>
              <option value="chequera_electronica">Chequera Electrónica</option>
              <option value="cuenta_ahorro">Cuenta de Ahorro</option>
            </select>
          </div>
          <div>
            <label className="label">Banco</label>
            <input
              value={form.giftAccount.bank}
              onChange={(e) => updateNested(['giftAccount', 'bank'], e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Titular</label>
            <input
              value={form.giftAccount.accountHolder}
              onChange={(e) => updateNested(['giftAccount', 'accountHolder'], e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Número de cuenta</label>
            <input
              value={form.giftAccount.accountNumber}
              onChange={(e) => updateNested(['giftAccount', 'accountNumber'], e.target.value)}
              className="input"
            />
          </div>
          {form.giftAccount.accountType === 'cuenta_rut' && (
            <div>
              <label className="label">RUT del titular</label>
              <input
                value={form.giftAccount.accountRut ?? ''}
                onChange={(e) => updateNested(['giftAccount', 'accountRut'], e.target.value)}
                className="input"
                placeholder="12.345.678-9"
              />
            </div>
          )}
          <div>
            <label className="label">Moneda</label>
            <input
              value={form.giftAccount.currency}
              onChange={(e) => updateNested(['giftAccount', 'currency'], e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Meta</label>
            <input
              type="number"
              value={form.giftAccount.goal}
              onChange={(e) => updateNested(['giftAccount', 'goal'], Number(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="label">Progreso actual</label>
            <input
              type="number"
              value={form.giftAccount.totalReceived}
              onChange={(e) =>
                updateNested(['giftAccount', 'totalReceived'], Number(e.target.value))
              }
              className="input"
            />
          </div>
        </div>
      </section>

      <section className="card">
        <label className="label">Mensaje para WhatsApp</label>
        <textarea
          value={form.whatsappMessage}
          onChange={(e) => updateNested(['whatsappMessage'], e.target.value)}
          className="input h-32"
        />
        <p className="text-xs text-gray-500 mt-2">
          Puedes usar <code>{'{confirmUrl}'}</code> para insertar automáticamente el enlace al
          formulario de confirmación.
        </p>
      </section>

      <section className="card">
        <h3 className="card-title">Información Adicional</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Contacto</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Teléfono</label>
                <input
                  value={form.additionalInfo?.contact?.phone || ''}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      additionalInfo: {
                        ...prev.additionalInfo,
                        contact: {
                          ...prev.additionalInfo?.contact,
                          phone: e.target.value,
                        },
                      },
                    }));
                  }}
                  className="input"
                  placeholder="+56 9 1234 5678"
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={form.additionalInfo?.contact?.email || ''}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      additionalInfo: {
                        ...prev.additionalInfo,
                        contact: {
                          ...prev.additionalInfo?.contact,
                          email: e.target.value,
                        },
                      },
                    }));
                  }}
                  className="input"
                  placeholder="contacto@ejemplo.cl"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Transporte</h4>
            <div className="space-y-4">
              <div>
                <label className="label">Descripción</label>
                <input
                  value={form.additionalInfo?.transport?.description || ''}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      additionalInfo: {
                        ...prev.additionalInfo,
                        transport: {
                          ...prev.additionalInfo?.transport,
                          description: e.target.value,
                        },
                      },
                    }));
                  }}
                  className="input"
                  placeholder="Información sobre cómo llegar"
                />
              </div>
              <div>
                <label className="label">Detalles (uno por línea)</label>
                <textarea
                  value={form.additionalInfo?.transport?.details?.join('\n') || ''}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      additionalInfo: {
                        ...prev.additionalInfo,
                        transport: {
                          ...prev.additionalInfo?.transport,
                          details: e.target.value.split('\n').filter(Boolean),
                        },
                      },
                    }));
                  }}
                  className="input h-24"
                  placeholder="Estacionamiento disponible&#10;Transfer coordinado"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Alojamiento</h4>
            <div className="space-y-4">
              <div>
                <label className="label">Descripción</label>
                <input
                  value={form.additionalInfo?.accommodation?.description || ''}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      additionalInfo: {
                        ...prev.additionalInfo,
                        accommodation: {
                          ...prev.additionalInfo?.accommodation,
                          description: e.target.value,
                        },
                      },
                    }));
                  }}
                  className="input"
                  placeholder="Hoteles recomendados cerca del evento"
                />
              </div>
              <div>
                <label className="label">Detalles (uno por línea)</label>
                <textarea
                  value={form.additionalInfo?.accommodation?.details?.join('\n') || ''}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      additionalInfo: {
                        ...prev.additionalInfo,
                        accommodation: {
                          ...prev.additionalInfo?.accommodation,
                          details: e.target.value.split('\n').filter(Boolean),
                        },
                      },
                    }));
                  }}
                  className="input h-24"
                  placeholder="Hotel Ejemplo (código: NOVIOS)&#10;Hostal Cerca - 5 min caminando"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Música</h4>
            <div className="space-y-4">
              <div>
                <label className="label">Descripción</label>
                <input
                  value={form.additionalInfo?.music?.description || ''}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      additionalInfo: {
                        ...prev.additionalInfo,
                        music: {
                          ...prev.additionalInfo?.music,
                          description: e.target.value,
                        },
                      },
                    }));
                  }}
                  className="input"
                  placeholder="¿Tienes alguna canción especial?"
                />
              </div>
              <div>
                <label className="label">Detalles (uno por línea)</label>
                <textarea
                  value={form.additionalInfo?.music?.details?.join('\n') || ''}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      additionalInfo: {
                        ...prev.additionalInfo,
                        music: {
                          ...prev.additionalInfo?.music,
                          details: e.target.value.split('\n').filter(Boolean),
                        },
                      },
                    }));
                  }}
                  className="input h-24"
                  placeholder="Comparte tus sugerencias&#10;Email: playlist@ejemplo.cl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h3 className="card-title">Galería de Fotos</h3>
        <p className="text-sm text-gray-600 mb-4">
          Sube fotos desde tu PC o teléfono, o agrega URLs de imágenes externas.
        </p>

        {/* Formulario de carga */}
        <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Subir nueva foto
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const descriptionInput = document.getElementById('new-photo-description') as HTMLInputElement;
                  const description = descriptionInput?.value || 'Foto del matrimonio';

                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('description', description);

                  try {
                    setMessage('Subiendo foto...');
                    const res = await fetch('/api/admin/upload', {
                      method: 'POST',
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      body: formData,
                    });

                    if (!res.ok) {
                      const error = await res.json();
                      setMessage(`Error: ${error.error || 'Error al subir la foto'}`);
                      setTimeout(() => setMessage(null), 5000);
                      return;
                    }

                    const data = await res.json();
                    const newImage = { src: data.path || data.url, alt: data.description || description };

                    setForm((prev) => ({
                      ...prev,
                      photoGallery: {
                        images: [...(prev.photoGallery?.images || []), newImage],
                      },
                    }));

                    // Limpiar inputs
                    e.target.value = '';
                    if (descriptionInput) descriptionInput.value = '';
                    setMessage('✅ Foto subida correctamente');
                    setTimeout(() => setMessage(null), 3000);
                  } catch (err) {
                    setMessage('❌ Error al subir la foto. Intenta nuevamente.');
                    setTimeout(() => setMessage(null), 5000);
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
              />
            </div>
            <input
              id="new-photo-description"
              type="text"
              placeholder="Descripción de la foto"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Formatos permitidos: JPG, PNG, WEBP. Tamaño máximo: 5MB. Las fotos se guardan en tu servidor.
          </p>
        </div>

        {/* Agregar URL externa */}
        <div className="mb-6 p-4 border border-gray-200 rounded-xl bg-gray-50">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            O agrega una URL externa
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              id="external-photo-url"
              placeholder="https://ejemplo.com/foto.jpg"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <input
              type="text"
              id="external-photo-desc"
              placeholder="Descripción"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => {
                const urlInput = document.getElementById('external-photo-url') as HTMLInputElement;
                const descInput = document.getElementById('external-photo-desc') as HTMLInputElement;
                const url = urlInput?.value.trim();
                const desc = descInput?.value.trim() || 'Foto del matrimonio';

                if (!url) {
                  alert('Por favor ingresa una URL');
                  return;
                }

                const newImage = { src: url, alt: desc };
                setForm((prev) => ({
                  ...prev,
                  photoGallery: {
                    images: [...(prev.photoGallery?.images || []), newImage],
                  },
                }));

                urlInput.value = '';
                descInput.value = '';
                setMessage('Foto agregada');
                setTimeout(() => setMessage(null), 3000);
              }}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-semibold"
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Lista de fotos existentes */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 mb-4">
            Fotos en la galería ({form.photoGallery?.images?.length || 0})
          </h4>
          {form.photoGallery?.images && form.photoGallery.images.length > 0 ? (
            <div className="space-y-3">
              {form.photoGallery.images.map((img, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white hover:border-rose-300 transition-colors"
                >
                  <div className="relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImagen%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute -top-2 -left-2 bg-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Descripción (texto que aparece en el carrusel)
                    </label>
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => {
                        const newImages = [...(form.photoGallery?.images || [])];
                        newImages[index] = { ...newImages[index], alt: e.target.value };
                        setForm((prev) => ({
                          ...prev,
                          photoGallery: { images: newImages },
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Ej: Nuestra ceremonia en la iglesia"
                    />
                    <p className="text-xs text-gray-400 mt-1 truncate" title={img.src}>
                      {img.src.startsWith('/images/') ? '📁 Imagen local' : img.src}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...(form.photoGallery?.images || [])];
                          [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
                          setForm((prev) => ({
                            ...prev,
                            photoGallery: { images: newImages },
                          }));
                        }}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                        title="Mover arriba"
                      >
                        ↑
                      </button>
                    )}
                    {index < (form.photoGallery?.images?.length || 0) - 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...(form.photoGallery?.images || [])];
                          [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
                          setForm((prev) => ({
                            ...prev,
                            photoGallery: { images: newImages },
                          }));
                        }}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                        title="Mover abajo"
                      >
                        ↓
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = form.photoGallery?.images?.filter((_, i) => i !== index) || [];
                        setForm((prev) => ({
                          ...prev,
                          photoGallery: { images: newImages },
                        }));
                        setMessage('Foto eliminada');
                        setTimeout(() => setMessage(null), 3000);
                      }}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-semibold text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
              <p className="text-gray-400 mb-2">No hay fotos en la galería aún</p>
              <p className="text-xs text-gray-500">Sube tu primera foto usando el formulario de arriba</p>
            </div>
          )}
        </div>
      </section>

      {message && (
        <p
          className={`text-sm rounded-xl px-4 py-2 border ${
            message.startsWith('Error:') || message.startsWith('❌')
              ? 'text-red-600 bg-red-50 border-red-100'
              : message.startsWith('✅')
              ? 'text-green-600 bg-green-50 border-green-100'
              : 'text-blue-600 bg-blue-50 border-blue-100'
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-full font-semibold shadow-lg disabled:opacity-50"
      >
        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
        Guardar cambios
      </button>
    </form>
  );
}

function GuestsTab({
  guests,
  tables,
  token,
  onChange,
}: {
  guests: Guest[];
  tables: Table[];
  token: string;
  onChange: () => void;
}) {
  const [form, setForm] = useState<Omit<Guest, 'id'>>({
    name: '',
    confirmed: false,
  });
  const [loading, setLoading] = useState(false);

  const request = async (
    url: string,
    options?: RequestInit,
  ) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options?.headers ?? {}),
        },
      });
      if (!res.ok) throw new Error('Error en la operación');
      await onChange();
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    await request('/api/admin/guests', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    setForm({ name: '', confirmed: false });
  };

  const toggleConfirm = async (guest: Guest) => {
    await request('/api/admin/guests', {
      method: 'PUT',
      body: JSON.stringify({ id: guest.id, confirmed: !guest.confirmed }),
    });
  };

  const deleteGuest = async (guest: Guest) => {
    await request(`/api/admin/guests?id=${guest.id}`, { method: 'DELETE' });
  };

  const assignGuest = async (guestId: string, tableId: string | '') => {
    await request('/api/admin/guests', {
      method: 'PUT',
      body: JSON.stringify({ id: guestId, tableId: tableId || null }),
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="card grid md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="label">Nombre completo *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="input"
          />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            value={form.email ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="input"
          />
        </div>
        <div>
          <label className="label">Teléfono</label>
          <input
            value={form.phone ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            className="input"
          />
        </div>
        <div className="md:col-span-4 flex items-center gap-3">
          <input
            type="checkbox"
            id="confirmed"
            checked={form.confirmed}
            onChange={(e) => setForm((prev) => ({ ...prev, confirmed: e.target.checked }))}
            className="w-4 h-4 text-rose-600"
          />
          <label htmlFor="confirmed" className="text-sm font-semibold text-gray-600">
            Confirmado
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-full"
        >
          <Plus className="w-4 h-4" />
          Agregar invitado
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {guests.map((guest) => (
          <div key={guest.id} className="p-4 border rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">{guest.name}</h4>
                <p className="text-sm text-gray-500">
                  {guest.email ?? 'Sin email'} • {guest.phone ?? 'Sin teléfono'}
                </p>
              </div>
              <button
                onClick={() => deleteGuest(guest)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleConfirm(guest)}
                className={`px-4 py-1 text-sm rounded-full ${
                  guest.confirmed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {guest.confirmed ? 'Confirmado' : 'Pendiente'}
              </button>
              <select
                value={guest.tableId ?? ''}
                onChange={(e) => assignGuest(guest.id, e.target.value)}
                className="input text-sm"
              >
                <option value="">Sin mesa</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name} ({table.guestIds.length}/{table.capacity})
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TablesTab({
  tables,
  guests,
  token,
  onChange,
}: {
  tables: Table[];
  guests: Guest[];
  token: string;
  onChange: () => void;
}) {
  const [form, setForm] = useState({ name: '', capacity: 8 });
  const [loading, setLoading] = useState(false);

  const availableGuests = useMemo(
    () => guests.filter((guest) => !guest.tableId),
    [guests],
  );

  const request = async (url: string, options?: RequestInit) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options?.headers ?? {}),
        },
      });
      if (!res.ok) throw new Error('Error en la operación');
      await onChange();
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    await request('/api/admin/tables', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    setForm({ name: '', capacity: 8 });
  };

  const updateCapacity = async (table: Table, capacity: number) => {
    await request('/api/admin/tables', {
      method: 'PUT',
      body: JSON.stringify({ id: table.id, capacity }),
    });
  };

  const deleteTable = async (table: Table) => {
    await request(`/api/admin/tables?id=${table.id}`, { method: 'DELETE' });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="card grid md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="label">Nombre de la mesa</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="input"
          />
        </div>
        <div>
          <label className="label">Capacidad (1-10)</label>
          <input
            type="number"
            min={1}
            max={10}
            value={form.capacity}
            onChange={(e) => setForm((prev) => ({ ...prev, capacity: Number(e.target.value) }))}
            className="input"
          />
        </div>
        <button
          type="submit"
          className="md:col-span-3 inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full"
        >
          <Plus className="w-4 h-4" />
          Crear mesa
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {tables.map((table) => (
          <div key={table.id} className="p-4 border rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">{table.name}</h4>
                <p className="text-sm text-gray-500">
                  {table.guestIds.length} / {table.capacity} invitados
                </p>
              </div>
              <button
                onClick={() => deleteTable(table)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-600">Capacidad:</label>
              <input
                type="number"
                min={1}
                max={10}
                value={table.capacity}
                onChange={(e) => updateCapacity(table, Number(e.target.value))}
                className="input w-24"
              />
            </div>

            <div className="space-y-2">
              {table.guestIds.length === 0 && (
                <p className="text-sm text-gray-400">Sin invitados asignados</p>
              )}
              {table.guestIds.map((guestId) => {
                const guest = guests.find((g) => g.id === guestId);
                if (!guest) return null;
                return (
                  <div key={guestId} className="flex items-center justify-between text-sm">
                    <span>{guest.name}</span>
                    <button
                      onClick={() => request('/api/admin/guests', {
                        method: 'PUT',
                        body: JSON.stringify({ id: guest.id, tableId: null }),
                      })}
                      className="text-xs text-red-500"
                    >
                      Quitar
                    </button>
                  </div>
                );
              })}
            </div>

            {table.guestIds.length < table.capacity && (
              <select
                className="input text-sm"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) {
                    request('/api/admin/guests', {
                      method: 'PUT',
                      body: JSON.stringify({ id: e.target.value, tableId: table.id }),
                    });
                    e.target.value = '';
                  }
                }}
              >
                <option value="">Asignar invitado...</option>
                {availableGuests.map((guest) => (
                  <option key={guest.id} value={guest.id}>
                    {guest.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpensesTab({
  expenses,
  token,
  onChange,
}: {
  expenses: Expense[];
  token: string;
  onChange: () => void;
}) {
  const [form, setForm] = useState<Omit<Expense, 'id'>>({
    description: '',
    amount: 0,
    category: 'Otros',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const categories = [
    'Ceremonia',
    'Recepción',
    'Comida y Bebida',
    'Decoración',
    'Fotografía',
    'Música',
    'Vestimenta',
    'Transporte',
    'Otros',
  ];

  const currencyFormatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  const request = async (url: string, options?: RequestInit) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options?.headers ?? {}),
      },
    });
    if (!res.ok) throw new Error('Error en la operación');
    await onChange();
  };

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    await request('/api/admin/expenses', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    setForm((prev) => ({ ...prev, description: '', amount: 0, notes: '' }));
  };

  const deleteExpense = async (expense: Expense) => {
    await request(`/api/admin/expenses?id=${expense.id}`, { method: 'DELETE' });
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="card grid md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="label">Descripción</label>
          <input
            required
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="input"
          />
        </div>
        <div>
          <label className="label">Cantidad (CLP)</label>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: Number(e.target.value) }))}
            className="input"
          />
        </div>
        <div>
          <label className="label">Categoría</label>
          <select
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            className="input"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Fecha</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            className="input"
          />
        </div>
        <div className="md:col-span-2">
          <label className="label">Notas</label>
          <input
            value={form.notes ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
            className="input"
          />
        </div>
        <button
          type="submit"
          className="md:col-span-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full"
        >
          <Plus className="w-4 h-4" />
          Registrar gasto
        </button>
      </form>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">
          Total registrado: {currencyFormatter.format(total)}
        </h3>
      </div>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="p-4 border rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >
            <div>
              <h4 className="font-semibold text-gray-800">{expense.description}</h4>
              <p className="text-sm text-gray-500">
                {expense.category} • {new Date(expense.date).toLocaleDateString('es-ES')}
              </p>
              {expense.notes && (
                <p className="text-sm text-gray-400">Notas: {expense.notes}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-bold text-red-600">
                {currencyFormatter.format(expense.amount)}
              </p>
              <button
                onClick={() => deleteExpense(expense)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {expenses.length === 0 && (
          <p className="text-center text-gray-400">Aún no has registrado gastos.</p>
        )}
      </div>
    </div>
  );
}

