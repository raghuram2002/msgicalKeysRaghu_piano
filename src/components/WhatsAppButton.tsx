import React, { useState } from 'react';
import { MessageCircle, X, Send, Music2 } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [instrument, setInstrument] = useState('Piano');
  const [message, setMessage] = useState('Hi! I would like to inquire about personal 1-on-1 mentorship & live feedback.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
          className="group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#131620] hover:bg-[#1c2130] text-zinc-100 rounded-full border border-emerald-500/40 shadow-xl shadow-emerald-950/40 transition-all transform hover:scale-105 cursor-pointer"
          title="Inquire about 1-on-1 personal mentorship"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <div className="text-left pr-1 hidden sm:block">
            <span className="block text-[10px] uppercase tracking-wider text-emerald-400 font-semibold leading-none">
              Music Concierge
            </span>
            <span className="text-xs font-medium text-zinc-200">1-on-1 Inquiries</span>
          </div>
        </button>
      </div>

      {/* Concierge Inquiry Dialog */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-[#11131a] border border-[#262c3d] rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          id="whatsapp-inquiry-box"
        >
          <div className="p-4 bg-gradient-to-r from-emerald-950/70 to-[#12151f] border-b border-[#242a3a] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
                <Music2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Magical Keys Raghu Concierge</h4>
                <p className="text-[11px] text-emerald-400/90">Instant instructor feedback & guidance</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4">
            {submitted ? (
              <div className="py-8 text-center text-emerald-400 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <h5 className="font-semibold text-white">Inquiry Received!</h5>
                <p className="text-xs text-zinc-400">
                  Our academic counselor will reach out on WhatsApp/Email within 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171a24] border border-[#292f3f] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Instrument of Interest</label>
                  <select
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171a24] border border-[#292f3f] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Piano">Piano & Keyboard</option>
                    <option value="Indian Melodies">Bollywood & Indian Piano</option>
                    <option value="Acoustic Guitar">Acoustic / Fingerstyle Guitar</option>
                    <option value="Music Theory">Music Theory & Harmony</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Message</label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-[#171a24] border border-[#292f3f] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-emerald-900/30 cursor-pointer"
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
