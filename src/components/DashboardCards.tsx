import React from 'react';
import { School, ClipboardList, CloudUpload, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { ProfilSekolah, HasilPenilaianSummary } from '../types/pkks';

interface DashboardCardsProps {
  profil: ProfilSekolah;
  hasilSummary: HasilPenilaianSummary;
  totalIndikator: number;
  indikatorDinilai: number;
  totalBukti: number;
  onOpenProfil: () => void;
  onOpenInstrumen: () => void;
  onOpenBukti: () => void;
  onOpenHasil: () => void;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  profil,
  hasilSummary,
  totalIndikator,
  indikatorDinilai,
  totalBukti,
  onOpenProfil,
  onOpenInstrumen,
  onOpenBukti,
  onOpenHasil,
}) => {
  return (
    <div className="container mx-auto px-4 -mt-10 sm:-mt-12 relative z-20 no-print">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Profil Sekolah */}
        <div 
          onClick={onOpenProfil}
          className="bg-white rounded-xl shadow-lg p-6 text-center card-hover border-t-4 border-blue-500 cursor-pointer flex flex-col justify-between group transition-all"
        >
          <div>
            <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
              <School className="w-8 h-8" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              {profil.npsn ? `NPSN: ${profil.npsn}` : 'Belum Lengkap'}
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
              Profil Sekolah
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              Lengkapi data identitas sekolah, Kepala Sekolah, dan Pengawas Pembina.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <button 
              type="button"
              className="text-blue-600 font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all hover:underline"
            >
              <span>Buka Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Instrumen PKKS */}
        <div 
          onClick={onOpenInstrumen}
          className="bg-white rounded-xl shadow-lg p-6 text-center card-hover border-t-4 border-green-500 cursor-pointer flex flex-col justify-between group transition-all"
        >
          <div>
            <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-200">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-50 text-green-700 border border-green-200 mb-2">
              {indikatorDinilai} dari {totalIndikator} Butir Terisi
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-green-700 transition-colors">
              Instrumen PKKS
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              Akses rubrik penilaian manajerial dan pengembangan kewirausahaan.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <button 
              type="button"
              className="text-green-700 font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all hover:underline"
            >
              <span>Mulai Isi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 3: Unggah Bukti Fisik */}
        <div 
          onClick={onOpenBukti}
          className="bg-white rounded-xl shadow-lg p-6 text-center card-hover border-t-4 border-yellow-500 cursor-pointer flex flex-col justify-between group transition-all"
        >
          <div>
            <div className="bg-yellow-100 text-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-200">
              <CloudUpload className="w-8 h-8" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-yellow-50 text-yellow-800 border border-yellow-200 mb-2">
              {totalBukti} Berkas Terunggah
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-yellow-600 transition-colors">
              Unggah Bukti Fisik
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              Ruang penyimpanan digital untuk dokumen, SK, dan laporan kegiatan.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <button 
              type="button"
              className="text-yellow-700 font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all hover:underline"
            >
              <span>Upload File</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 4: Hasil & Rekapitulasi */}
        <div 
          onClick={onOpenHasil}
          className="bg-white rounded-xl shadow-lg p-6 text-center card-hover border-t-4 border-red-500 cursor-pointer flex flex-col justify-between group transition-all"
        >
          <div>
            <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200 mb-2">
              Skor: {hasilSummary.skorTotalAkhir} ({hasilSummary.predikatHuruf})
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-red-600 transition-colors">
              Hasil & Rekapitulasi
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              Lihat skor akhir, catatan pengawas, dan cetak Berita Acara PKKS.
            </p>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <button 
              type="button"
              className="text-red-600 font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all hover:underline"
            >
              <span>Lihat Hasil</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
