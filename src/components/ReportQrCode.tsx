import React, { useState } from 'react';
import { QrCode, Download, Printer, Share2, Check, Smartphone, ExternalLink, Sparkles } from 'lucide-react';

interface ReportQrCodeProps {
  referenceId: string;
  studentName?: string;
  primaryRoleTitle: string;
  onPrint: () => void;
}

export const ReportQrCode: React.FC<ReportQrCodeProps> = ({
  referenceId,
  studentName,
  primaryRoleTitle,
  onPrint
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Construct absolute report URL for mobile scanning
  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const reportUrl = `${baseUrl}?ref=${encodeURIComponent(referenceId)}`;
  
  // Public high-speed QR code generator API
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&format=svg&data=${encodeURIComponent(reportUrl)}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(reportUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MindLyft AI Career Report - ${studentName || 'Student'} (${referenceId})</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; color: #1e293b; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 24px; }
    h1 { color: #0f172a; margin-top: 0; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: #e0e7ff; color: #3730a3; font-weight: bold; font-size: 12px; }
    .meta { color: #64748b; font-size: 14px; margin-bottom: 16px; }
    .btn { display: inline-block; padding: 10px 20px; background: #0f172a; color: white; border-radius: 8px; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">MindLyft AI Career Guidance</span>
    <h1>${primaryRoleTitle}</h1>
    <div class="meta">
      <strong>Candidate:</strong> ${studentName || 'Student'} &bull; 
      <strong>Reference ID:</strong> ${referenceId} &bull; 
      <strong>Date:</strong> ${new Date().toLocaleDateString()}
    </div>
    <p>This verified career guidance report is stored online and can be accessed anytime using the link below:</p>
    <p><a href="${reportUrl}" class="btn" target="_blank">Open Live Interactive Report</a></p>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MindLyft_Report_${referenceId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/60 relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Column: Info & Download Actions */}
        <div className="space-y-4 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Smartphone className="w-3.5 h-3.5 text-indigo-300 animate-pulse" />
            <span>Mobile Report Scanner & Instant Download</span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Scan to Download & View on Your Phone
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Open your smartphone camera or any QR scanner to instantly access, view, and save{' '}
              <strong className="text-white">{studentName ? `${studentName}'s` : 'your'}</strong> full career roadmap and project files anywhere.
            </p>
          </div>

          {/* Student Reference ID pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs font-mono">
            <span className="text-slate-400 font-sans">Report Ref:</span>
            <span className="font-bold text-brand-300">{referenceId}</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5 no-print">
            <button
              onClick={onPrint}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-700" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Report File</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Copy Report Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: QR Scanner Box */}
        <div className="flex flex-col items-center shrink-0">
          <div className="p-3.5 bg-white rounded-3xl shadow-2xl border-4 border-indigo-400/40 relative group">
            {/* Animated scanning laser line */}
            <div className="absolute inset-x-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent top-4 animate-scan pointer-events-none opacity-80" />

            {!imageError ? (
              <img
                src={qrImageUrl}
                alt={`QR Scanner Code for ${referenceId}`}
                width={160}
                height={160}
                onError={() => setImageError(true)}
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl object-contain block"
              />
            ) : (
              /* Offline Fallback Vector QR Display */
              <div className="w-36 h-36 sm:w-40 sm:h-40 bg-slate-900 text-white rounded-xl flex flex-col items-center justify-center p-3 text-center">
                <QrCode className="w-12 h-12 text-brand-400 mb-1" />
                <span className="text-[10px] font-mono font-bold text-brand-300">{referenceId}</span>
                <span className="text-[9px] text-slate-400">Offline Report Key</span>
              </div>
            )}
          </div>

          <div className="mt-2 text-center">
            <span className="text-[11px] font-semibold text-indigo-200 flex items-center justify-center gap-1">
              <QrCode className="w-3 h-3 text-indigo-400" />
              <span>Scan with any camera app</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
