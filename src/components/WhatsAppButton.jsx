import React, { useState } from 'react';
import { MessageCircle, X, Send, Music2 } from 'lucide-react';

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [instrument, setInstrument] = useState('Piano');
  const [message, setMessage] = useState('Hi! I would like to inquire about personal 1-on-1 mentorship & live feedback.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 2200);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40" id="whatsapp-floating-trigger">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white hover:bg-slate-50 text-slate-800 rounded-full border border-slate-200 shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          title="Inquire about 1-on-1 personal mentorship"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
          <div className="text-left pr-1 hidden sm:block">
            <span className="block text-[10px] uppercase tracking-wider text-emerald-700 font-semibold leading-none">
              Music Concierge
            </span>
            <span className="text-xs font-medium text-slate-700">1-on-1 Inquiries</span>
          </div>
        </button>
      </div>

      {/* Concierge Inquiry Dialog */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          id="whatsapp-inquiry-box"
        >
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Music2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Music Concierge</h4>
                <p className="text-[11px] text-emerald-700">Instant instructor feedback & guidance</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4">
            {submitted ? (
              <div className="py-8 text-center text-emerald-600 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <h5 className="font-semibold text-slate-900">Inquiry Received!</h5>
                <p className="text-xs text-slate-500">
                  Our academic counselor will reach out on WhatsApp/Email within 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Instrument of Interest</label>
                  <select
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Piano">Piano & Keyboard</option>
                    <option value="Indian Melodies">Bollywood & Indian Piano</option>
                    <option value="Acoustic Guitar">Acoustic / Fingerstyle Guitar</option>
                    <option value="Music Theory">Music Theory & Harmony</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Message</label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
