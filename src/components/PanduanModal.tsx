import React from 'react';
import { BookOpen, X, CheckCircle, HelpCircle, FileCheck, Phone, ChevronRight } from 'lucide-react';
import { FAQ_PANDUAN } from '../data/defaultData';

interface PanduanModalProps {
  onClose: () => void;
}

export const PanduanModal: React.FC<PanduanModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-6 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-garut text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-extrabold text-base">Panduan Teknis E-PKKS Kabupaten Garut</h3>
              <p className="text-xs text-emerald-100">Petunjuk Operasional Standar Penilaian Kinerja Kepala Sekolah</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-emerald-800 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-700">
          {/* Alur Kerja 4 Langkah */}
          <div>
            <h4 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                1
              </span>
              Alur Pelaksanaan E-PKKS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-200">
                <span className="font-bold text-blue-600 block mb-1">Langkah 1: Profil</span>
                <p className="text-gray-600">Lengkapi identitas sekolah, Kepala Sekolah, dan Pengawas Pembina di menu Profil Sekolah.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-200">
                <span className="font-bold text-yellow-600 block mb-1">Langkah 2: Unggah</span>
                <p className="text-gray-600">Sekolah mengunggah bukti fisik digital (SK, Dokumen Kurikulum, Foto, Laporan).</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-200">
                <span className="font-bold text-emerald-600 block mb-1">Langkah 3: Nilai</span>
                <p className="text-gray-600">Pengawas melakukan verifikasi berkas dan menetapkan skor 1 - 4 pada instrumen.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-200">
                <span className="font-bold text-rose-600 block mb-1">Langkah 4: Rekap & BA</span>
                <p className="text-gray-600">Sistem mengalkulasi skor otomatis dan menerbitkan Berita Acara resmi siap cetak.</p>
              </div>
            </div>
          </div>

          {/* Rubrik Penskoran */}
          <div className="bg-slate-50 p-4 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              Ketentuan Rubrik Penskoran (Skala 1 - 4)
            </h4>
            <div className="space-y-1.5 text-xs text-gray-600">
              <div><strong className="text-emerald-700">Skor 4 (Amat Baik):</strong> Bukti fisik lengkap, mutakhir, disahkan, terimplementasi optimal dengan prestasi/dampak positif nyata.</div>
              <div><strong className="text-blue-700">Skor 3 (Baik):</strong> Bukti fisik lengkap dan tersusun rapi sesuai standar minimal regulasi.</div>
              <div><strong className="text-amber-700">Skor 2 (Cukup):</strong> Bukti fisik sebagian ada namun belum lengkap atau belum disahkan pemangku kepentingan.</div>
              <div><strong className="text-rose-700">Skor 1 (Kurang):</strong> Belum terdapat dokumen atau pelaksanaan program belum terencana secara memadai.</div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <h4 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              Pertanyaan yang Sering Diajukan (FAQ)
            </h4>
            <div className="space-y-3">
              {FAQ_PANDUAN.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-3.5 bg-white">
                  <h5 className="font-bold text-xs sm:text-sm text-gray-900 mb-1 flex items-start gap-2">
                    <span className="text-emerald-600 font-black">Q:</span>
                    <span>{faq.tanya}</span>
                  </h5>
                  <p className="text-xs text-gray-600 pl-4 leading-relaxed">
                    {faq.jawab}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Layanan Dukungan Teknis Disdik Garut */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900">
            <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold text-emerald-950">Layanan Bantuan Teknis Dinas Pendidikan Kab. Garut:</strong>
              <p className="mt-0.5">Bidang Pembinaan Ketenagaan (PTK / GTK) - Gedung B Lt. 2 Disdik Garut, Jl. Pembangunan No. 179 Garut. Helpdesk WA: 0812-2026-xxxx.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
          >
            Mengerti & Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
