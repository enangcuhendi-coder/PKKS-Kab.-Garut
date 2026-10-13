import React from 'react';
import { PlayCircle, Upload, Award, FileSpreadsheet, MapPin, CheckCircle2 } from 'lucide-react';
import { ProfilSekolah, HasilPenilaianSummary } from '../types/pkks';

interface HeroProps {
  profil: ProfilSekolah;
  hasilSummary: HasilPenilaianSummary;
  totalIndikator: number;
  indikatorDinilai: number;
  totalBukti: number;
  onMulaiPenilaian: () => void;
  onUploadBukti: () => void;
  onLihatHasil: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profil,
  hasilSummary,
  totalIndikator,
  indikatorDinilai,
  totalBukti,
  onMulaiPenilaian,
  onUploadBukti,
  onLihatHasil,
}) => {
  const isComplete = indikatorDinilai === totalIndikator;

  return (
    <header className="bg-garut text-white pt-16 pb-24 text-center px-4 relative overflow-hidden shadow-inner no-print">
      {/* Decorative background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* District & School Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 backdrop-blur-md border border-emerald-300/30 text-emerald-100 text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-300" />
          <span>Kecamatan {profil.kecamatan}, Kab. Garut</span>
          <span className="text-emerald-400">•</span>
          <span className="font-semibold text-white">{profil.namaSekolah}</span>
          <span className="text-emerald-400">•</span>
          <span className="text-amber-200">{profil.periodePenilaian}</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md leading-tight text-white">
          Penilaian Kinerja Kepala Sekolah
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-emerald-50 leading-relaxed font-normal opacity-95">
          Platform digital terpadu untuk mempermudah evaluasi manajerial, pengembangan kewirausahaan, dan supervisi pembelajaran di lingkungan Kabupaten Garut.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3.5 mb-8">
          <button
            onClick={onMulaiPenilaian}
            className="bg-yellow-400 text-emerald-950 font-bold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg hover:bg-yellow-300 transition-transform active:scale-95 flex items-center gap-2 cursor-pointer text-sm sm:text-base border border-yellow-300/60"
          >
            <PlayCircle className="w-5 h-5 text-emerald-900" />
            <span>Mulai Penilaian</span>
          </button>

          <button
            onClick={onUploadBukti}
            className="bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold px-6 py-3 sm:py-3.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-2 backdrop-blur-sm border border-emerald-400/30 text-sm sm:text-base"
          >
            <Upload className="w-4 h-4 text-emerald-200" />
            <span>Unggah Bukti Fisik</span>
          </button>

          <button
            onClick={onLihatHasil}
            className="bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 font-semibold px-6 py-3 sm:py-3.5 rounded-full shadow-md transition-all active:scale-95 flex items-center gap-2 backdrop-blur-sm border border-emerald-400/20 text-sm sm:text-base"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-300" />
            <span>Hasil & Berita Acara</span>
          </button>
        </div>

        {/* Metric Summary Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 text-left">
          <div className="bg-emerald-950/40 border border-emerald-400/20 rounded-xl p-3 backdrop-blur-md">
            <span className="text-[11px] text-emerald-200 block uppercase font-medium">Status Instrumen</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {isComplete ? (
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
              <span className="text-base sm:text-lg font-bold text-white">
                {indikatorDinilai} / {totalIndikator} Butir
              </span>
            </div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-400/20 rounded-xl p-3 backdrop-blur-md">
            <span className="text-[11px] text-emerald-200 block uppercase font-medium">Nilai Akhir (Skala 100)</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-amber-300">{hasilSummary.skorTotalAkhir}</span>
              <span className="text-xs text-emerald-200">/ 100</span>
            </div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-400/20 rounded-xl p-3 backdrop-blur-md">
            <span className="text-[11px] text-emerald-200 block uppercase font-medium">Predikat Kinerja</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Award className="w-4 h-4 text-amber-300" />
              <span className="text-base sm:text-lg font-bold text-white">
                {hasilSummary.predikat} ({hasilSummary.predikatHuruf})
              </span>
            </div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-400/20 rounded-xl p-3 backdrop-blur-md">
            <span className="text-[11px] text-emerald-200 block uppercase font-medium">Bukti Terunggah</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-bold text-white">{totalBukti}</span>
              <span className="text-xs text-emerald-200">Dokumen</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
