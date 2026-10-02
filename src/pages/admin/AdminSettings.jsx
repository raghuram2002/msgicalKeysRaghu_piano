import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
  Settings,
  CreditCard,
  Video,
  Shield,
  Bell,
  Mail,
  Phone,
  Globe,
  Database,
  Cloud,
  Lock,
  Eye,
  EyeOff,
  Server,
  IndianRupee,
  Layers
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';

export const AdminSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [savedNotice, setSavedNotice] = useState(false);

  // Platform Settings State
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Magical Keys Raghu',
    tagline: 'Master the Piano & Keyboard with Raghuram',
    supportEmail: 'support@magicalkeys.com',
    supportPhone: '+91 98765 43210',
    currency: 'INR (₹)',
    timezone: 'Asia/Kolkata (IST)',
    allowNewRegistrations: true,
  });

  // Payment Gateway Settings State
  const [paymentSettings, setPaymentSettings] = useState({
    activeGateway: 'razorpay',
    environment: 'test',
    razorpayKeyId: 'rzp_test_9A2F1BC87K3M',
    razorpayKeySecret: '••••••••••••••••••••',
    stripePublishableKey: 'pk_test_51O8G2...',
    stripeSecretKey: '••••••••••••••••••••',
    webhookSecret: 'whsec_98f12a...',
    autoInvoiceGST: true,
    gstRate: 18,
  });

  // Video Hosting Settings State
  const [videoSettings, setVideoSettings] = useState({
    provider: 'cloudflare_stream',
    s3BucketName: 'cadence-magicalkeys-videos',
    s3Region: 'ap-south-1 (Mumbai)',
    cloudflareAccountId: 'cfa_8831b09fa...',
    streamCdnDomain: 'stream.magicalkeys.com',
    enableHlsAdaptiveStreaming: true,
    enableWatermark: true,
    watermarkText: 'Magical Keys Student License',
    maxUploadFileSizeMb: 2500,
  });

  const [showSecret, setShowSecret] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Settings</h1>
            <p className="text-sm text-slate-500 mt-1">
              Configure general branding, payment gateways, video infrastructure, and security
            </p>
          </div>
          {savedNotice && (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Settings saved successfully!
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'general'
                ? 'bg-[#7388a5] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            General & Branding
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'payment'
                ? 'bg-[#7388a5] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Payment Gateway (Razorpay/Stripe)
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'video'
                ? 'bg-[#7388a5] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Video & Cloud Storage
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#7388a5] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin Security & Role
          </button>
        </div>

        {/* Tab 1: General & Branding */}
        {activeTab === 'general' && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                General Platform Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, siteName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Tagline / Subheading
                  </label>
                  <input
                    type="text"
                    value={generalSettings.tagline}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, tagline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Official Support Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })
                      }
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Support / WhatsApp Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={generalSettings.supportPhone}
                      onChange={(e) =>
                        setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })
                      }
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Platform Default Currency
                  </label>
                  <input
                    type="text"
                    disabled
                    value="INR (₹) – Indian Rupee"
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed font-medium"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    All prices and transactions across Cadence Music are configured in INR.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Default Timezone
                  </label>
                  <input
                    type="text"
                    value={generalSettings.timezone}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, timezone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800">Allow New Student Sign-ups</p>
                  <p className="text-[11px] text-slate-400">
                    If disabled, only existing students can log in.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={generalSettings.allowNewRegistrations}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      allowNewRegistrations: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-[#7388a5] accent-[#7388a5] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Payment Gateways */}
        {activeTab === 'payment' && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Payment Gateway Integration</h2>
                  <p className="text-xs text-slate-500">
                    Configure UPI, Cards, Net Banking, and Wallet settlements via Razorpay or Stripe
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active in {paymentSettings.environment} mode
                </span>
              </div>

              {/* Gateway Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() =>
                    setPaymentSettings({ ...paymentSettings, activeGateway: 'razorpay' })
                  }
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentSettings.activeGateway === 'razorpay'
                      ? 'border-[#7388a5] bg-[#eef3f9]/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900">Razorpay (India Primary)</span>
                    <IndianRupee className="w-4 h-4 text-[#7388a5]" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Supports UPI AutoPay, Google Pay, PhonePe, Paytm, RuPay, and all Indian Net Banking
                  </p>
                </div>

                <div
                  onClick={() =>
                    setPaymentSettings({ ...paymentSettings, activeGateway: 'stripe' })
                  }
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentSettings.activeGateway === 'stripe'
                      ? 'border-[#7388a5] bg-[#eef3f9]/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900">Stripe (International)</span>
                    <Globe className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500">
                    Best for international credit/debit cards and multi-currency billing
                  </p>
                </div>
              </div>

              {/* Environment Toggle */}
              <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-700">Environment Mode:</span>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600">
                  <input
                    type="radio"
                    name="env"
                    value="test"
                    checked={paymentSettings.environment === 'test'}
                    onChange={(e) =>
                      setPaymentSettings({ ...paymentSettings, environment: e.target.value })
                    }
                    className="accent-[#7388a5]"
                  />
                  Test Sandbox
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600">
                  <input
                    type="radio"
                    name="env"
                    value="live"
                    checked={paymentSettings.environment === 'live'}
                    onChange={(e) =>
                      setPaymentSettings({ ...paymentSettings, environment: e.target.value })
                    }
                    className="accent-[#7388a5]"
                  />
                  Production Live
                </label>
              </div>

              {/* Keys */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Razorpay Key ID
                  </label>
                  <input
                    type="text"
                    value={paymentSettings.razorpayKeyId}
                    onChange={(e) =>
                      setPaymentSettings({ ...paymentSettings, razorpayKeyId: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 font-mono bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Razorpay Key Secret
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="text-[11px] text-[#7388a5] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {showSecret ? 'Hide' : 'Reveal'}
                    </button>
                  </div>
                  <input
                    type={showSecret ? 'text' : 'password'}
                    value={paymentSettings.razorpayKeySecret}
                    onChange={(e) =>
                      setPaymentSettings({ ...paymentSettings, razorpayKeySecret: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 font-mono bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Webhook Secret
                  </label>
                  <input
                    type="text"
                    value={paymentSettings.webhookSecret}
                    onChange={(e) =>
                      setPaymentSettings({ ...paymentSettings, webhookSecret: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 font-mono bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Payment Settings
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Video Infrastructure & Cloud Architecture */}
        {activeTab === 'video' && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  Video Hosting & Cloud Storage Architecture
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-capacity streaming setup: Video files are hosted on external CDNs while the
                  database stores metadata and lesson relationships
                </p>
              </div>

              {/* Architecture Info Box */}
              <div className="p-4 rounded-2xl bg-[#eef3f9] border border-[#cbd8e8] flex items-start gap-3">
                <Database className="w-5 h-5 text-[#475e7d] shrink-0 mt-0.5" />
                <div className="text-xs text-[#2c3d52] space-y-1">
                  <p className="font-semibold text-slate-900">
                    Dual-Tier Video Storage Architecture:
                  </p>
                  <p>
                    1. <strong>Database Layer</strong>: Stores lesson titles, modules, course mappings,
                    duration, and encrypted streaming playback tokens.
                  </p>
                  <p>
                    2. <strong>External Storage Tier</strong>: High-bitrate 4K video files are
                    uploaded straight to S3 / Cloudflare Stream with adaptive HLS transcoding,
                    ensuring 0% server overhead and instant buffering-free playback for students.
                  </p>
                </div>
              </div>

              {/* Provider Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  Active Video Delivery Provider
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'cloudflare_stream', name: 'Cloudflare Stream', desc: 'Auto HLS/DASH + DRM' },
                    { id: 'aws_s3_cloudfront', name: 'AWS S3 + CloudFront', desc: 'Secure S3 Bucket' },
                    { id: 'mux_video', name: 'Mux Video', desc: 'Developer video API' },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setVideoSettings({ ...videoSettings, provider: p.id })}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        videoSettings.provider === p.id
                          ? 'border-[#7388a5] bg-[#eef3f9]/50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-900">{p.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CDN & Bucket Config */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    S3 Bucket / Storage Namespace
                  </label>
                  <input
                    type="text"
                    value={videoSettings.s3BucketName}
                    onChange={(e) =>
                      setVideoSettings({ ...videoSettings, s3BucketName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 font-mono bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Storage Region
                  </label>
                  <input
                    type="text"
                    value={videoSettings.s3Region}
                    onChange={(e) =>
                      setVideoSettings({ ...videoSettings, s3Region: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Video CDN Custom Domain
                  </label>
                  <input
                    type="text"
                    value={videoSettings.streamCdnDomain}
                    onChange={(e) =>
                      setVideoSettings({ ...videoSettings, streamCdnDomain: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Max Video File Size (MB)
                  </label>
                  <input
                    type="number"
                    value={videoSettings.maxUploadFileSizeMb}
                    onChange={(e) =>
                      setVideoSettings({
                        ...videoSettings,
                        maxUploadFileSizeMb: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>
              </div>

              {/* Security & Watermark */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Adaptive Bitrate HLS Transcoding
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Automatically delivers 1080p, 720p, or 480p depending on student internet speed
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={videoSettings.enableHlsAdaptiveStreaming}
                    onChange={(e) =>
                      setVideoSettings({
                        ...videoSettings,
                        enableHlsAdaptiveStreaming: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-[#7388a5] accent-[#7388a5] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Anti-Piracy Dynamic Watermarking
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Overlays student email subtly across player to prevent screen capture leaks
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={videoSettings.enableWatermark}
                    onChange={(e) =>
                      setVideoSettings({ ...videoSettings, enableWatermark: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#7388a5] accent-[#7388a5] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Video Storage Config
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: Admin Profile & Security */}
        {activeTab === 'security' && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Admin Account & Credentials</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage your administrator credentials and role-based permissions
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <img
                  src={
                    user?.avatar ||
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
                  }
                  alt={user?.name}
                  className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-2xs"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{user?.name || 'Raghu Admin'}</h3>
                  <p className="text-xs text-slate-500">{user?.email || 'admin@magicalkeys.com'}</p>
                  <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200">
                    Role: Super Administrator
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Admin Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name || 'Raghu Admin'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || 'admin@magicalkeys.com'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Change Password
                  </label>
                  <input
                    type="password"
                    placeholder="New password (leave blank to keep current)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7388a5] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7388a5] hover:bg-[#5f7491] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" /> Update Profile & Security
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};
