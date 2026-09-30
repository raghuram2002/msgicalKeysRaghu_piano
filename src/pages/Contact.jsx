import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from 'lucide-react';
import { faqs } from '../data/faqs';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('Course inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 pt-28 pb-24">
      {/* Header */}
      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#637894] inline-block">
            Student Support & Mentorship
          </span>
          <h1 className="font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            We’re Here to Guide Your Playing.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about a course level, custom 1-on-1 mentorship, or need assistance with digital downloads? Send us a message and an instructor will reply promptly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <h2 className="font-bold text-2xl text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#7388a5]" />
              Send a Direct Message
            </h2>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out, {name || 'Musician'}. Our academic team reviews every inquiry and will respond to your email within 2-4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-600 block mb-1.5 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 block mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-600 block mb-1.5 font-medium">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-600 block mb-1.5 font-medium">
                      Subject / Purpose
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                    >
                      <option value="Course inquiry">Course recommendation & level guidance</option>
                      <option value="Personal mentorship">1-on-1 Live Instructor Mentorship</option>
                      <option value="Technical support">Technical issue or video playback</option>
                      <option value="Digital store">Digital Store (Sheets, Stems, MIDI)</option>
                      <option value="Other">Other question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-600 block mb-1.5 font-medium">
                    Your Musical Background & Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about what instrument you play, your current challenges, and how we can assist you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#7388a5] focus:bg-white resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#7388a5] hover:bg-[#5f7491] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Academic Faculty</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Studio Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-bold text-xl text-slate-900">
                Academy Studio Offices
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eef3f9] text-[#7388a5] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">General & Academic Support:</span>
                    <a
                      href="mailto:contact@signalhouse.com"
                      className="font-medium text-slate-800 hover:text-[#7388a5]"
                    >
                      contact@signalhouse.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eef3f9] text-[#7388a5] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">WhatsApp & Admissions:</span>
                    <span className="font-medium text-slate-800">+1 (800) 412-2336</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eef3f9] text-[#7388a5] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Main Soundstage & Studio:</span>
                    <span className="font-medium text-slate-800">
                      440 Harmonic Way, Suite 800, San Francisco, CA
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eef3f9] text-[#7388a5] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Instructor Office Hours:</span>
                    <span className="font-medium text-slate-800">
                      Mon – Sat: 9:00 AM – 8:00 PM PST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick 1-on-1 callout */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                Private Mentorship
              </span>
              <h4 className="font-bold text-lg text-slate-900">
                Looking for 1-on-1 Live Coaching?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We offer monthly private masterclass cohorts where you meet your designated faculty artist twice a month over Zoom for custom video analysis.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <section className="mt-20 pt-16 border-t border-slate-200" id="faq">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#637894]">
              Clear Answers
            </span>
            <h2 className="font-bold text-3xl text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm text-slate-900">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#7388a5] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
