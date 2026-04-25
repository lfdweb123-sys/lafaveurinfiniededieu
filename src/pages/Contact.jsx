import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success('Message envoyé ! Nous vous répondrons sous 24h.');
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 pt-24">
        <div className="bg-white rounded-2xl border p-8 max-w-md w-full text-center shadow-sm">
          <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Message envoyé !</h2>
          <p className="text-gray-500">Nous vous répondrons dans les plus brefs délais.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-gray-600">Une question, un projet ? Nous sommes à votre écoute.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Mail, title: 'Email', value: 'contact@lfd.com' },
            { icon: Phone, title: 'Téléphone', value: '+229 97 00 00 00' },
            { icon: MapPin, title: 'Adresse', value: 'Cotonou, Bénin' }
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border p-6 text-center">
              <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <c.icon size={18} className="text-gold-600" />
              </div>
              <h3 className="font-bold text-gray-900">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Nom</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Sujet</label>
              <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Message</label>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows="4"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400 outline-none resize-none" />
            </div>
            <button type="submit" className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
              <Send size={14} /> Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}