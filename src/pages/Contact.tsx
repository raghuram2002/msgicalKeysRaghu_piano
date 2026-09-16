import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from 'lucide-react';
import { faqs } from '../data/faqs';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('Course inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-[#0b0c10] text-[#e5e7eb] pt-28 pb-24">
      {/* Header */}
      <section className="border-b border-[#1d212e] bg-[#0e1017] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90 inline-block">
            Student Support & Mentorship
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-white font-normal leading-tight">
            We’re Here to Guide Your Playing.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about a course level, custom 1-on-1 mentorship, or need assistance with digital downloads? Send us a message and an instructor will reply promptly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#12141c] border border-[#212634] rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h2 className="font-editorial text-2xl text-white font-normal mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              Send a Direct Message
            </h2>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl text-white">Message Received!</h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  Thank you for reaching out, {name || 'Musician'}. Our academic team reviews every inquiry and will respond to your email within 2-4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#262b3a] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#262b3a] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5 font-medium">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#262b3a] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5 font-medium">
                      Subject / Purpose
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#262b3a] rounded-xl text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
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
                  <label className="text-xs text-zinc-400 block mb-1.5 font-medium">
                    Your Musical Background & Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about what instrument you play, your current challenges, and how we can assist you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0e1016] border border-[#262b3a] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/15 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Academic Faculty</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Studio Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#12141c] border border-[#212634] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="font-editorial text-xl text-white font-normal">
                Academy Studio Offices
              </h3>

              <div className="space-y-4 text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block">General & Academic Support:</span>
                    <a
                      href="mailto:contact@magicalkeysraghu.com"
                      className="font-medium text-white hover:text-amber-400"
                    >
                      contact@magicalkeysraghu.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block">WhatsApp & Admissions:</span>
                    <span className="font-medium text-white">+1 (800) 412-2336</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Main Soundstage & Studio:</span>
                    <span className="font-medium text-white">
                      440 Harmonic Way, Suite 800, San Francisco, CA
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Instructor Office Hours:</span>
                    <span className="font-medium text-white">
                      Mon – Sat: 9:00 AM – 8:00 PM PST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick 1-on-1 callout */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#161a25] to-[#0f1118] border border-[#2a3142] space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400">
                Private Mentorship
              </span>
              <h4 className="font-editorial text-lg text-white font-normal">
                Looking for 1-on-1 Live Coaching?
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We offer monthly private masterclass cohorts where you meet your designated faculty artist twice a month over Zoom for custom video analysis.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <section className="mt-20 pt-16 border-t border-[#1d212d]" id="faq">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-400/90">
              Clear Answers
            </span>
            <h2 className="font-editorial text-3xl text-white font-normal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#12141c] border border-[#212634] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#161924] transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-sm text-white">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#1e222f] text-xs text-zinc-300 leading-relaxed">
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
