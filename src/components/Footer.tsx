import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { LogoGarut } from './LogoGarut';

interface FooterProps {
  onOpenPanduan: () => void;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPanduan, onSelectTab }) => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 text-center mt-12 border-t border-gray-700 no-print">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-center items-center gap-3 mb-4">
          <LogoGarut className="h-9 w-auto opacity-95 drop-shadow-xs" />
          <div className="text-left">
            <h4 className="text-white font-extrabold text-sm tracking-wide">E-PKKS KABUPATEN GARUT</h4>
            <p className="text-[11px] text-gray-400">Pemerintah Daerah Kabupaten Garut - Dinas Pendidikan</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-gray-400 mb-6">
          <button onClick={() => onSelectTab('beranda')} className="hover:text-emerald-400 transition">
            Beranda
          </button>
          <span>•</span>
          <button onClick={() => onSelectTab('profil')} className="hover:text-emerald-400 transition">
            Profil Sekolah
          </button>
          <span>•</span>
          <button onClick={() => onSelectTab('instrumen')} className="hover:text-emerald-400 transition">
            Instrumen Rubrik
          </button>
          <span>•</span>
          <button onClick={() => onSelectTab('bukti')} className="hover:text-emerald-400 transition">
            Bukti Fisik
          </button>
          <span>•</span>
          <button onClick={() => onSelectTab('hasil')} className="hover:text-emerald-400 transition">
            Hasil & Berita Acara
          </button>
          <span>•</span>
          <button onClick={onOpenPanduan} className="hover:text-emerald-400 transition text-amber-300">
            Buku Panduan
          </button>
        </div>

        <p className="mb-2 text-sm text-gray-300 font-medium">
          Hak Cipta &copy; 2026. Aplikasi Penilaian Kinerja Kepala Sekolah (PKKS)
        </p>
        <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
          Dinas Pendidikan Kabupaten Garut - Dirancang khusus untuk kemudahan Pengawas & Kepala Sekolah dalam evaluasi terpadu jenjang SD dan SMP di 42 Kecamatan Kabupaten Garut.
        </p>
      </div>
    </footer>
  );
};
