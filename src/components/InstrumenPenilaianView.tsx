import React, { useState } from 'react';
import { IndikatorPKKS, KomponenPKKS, BuktiFisikItem, Role } from '../types/pkks';
import { 
  ClipboardList, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Info,
  HelpCircle,
  Trash2
} from 'lucide-react';

interface InstrumenPenilaianViewProps {
  indikatorList: IndikatorPKKS[];
  komponenList: KomponenPKKS[];
  buktiFisikList: BuktiFisikItem[];
  currentRole: Role;
  onUpdateSkor: (id: string, skor: number, catatan?: string) => void;
  onGoToBukti: (indikatorId: string) => void;
  onOpenBersihkanData?: () => void;
}

export const InstrumenPenilaianView: React.FC<InstrumenPenilaianViewProps> = ({
  indikatorList,
  komponenList,
  buktiFisikList,
  currentRole,
  onUpdateSkor,
  onGoToBukti,
  onOpenBersihkanData,
}) => {
  const [selectedKomponenId, setSelectedKomponenId] = useState<number | 'semua'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSkor, setFilterSkor] = useState<'semua' | 'belum' | '1-2' | '3-4'>('semua');

  // Filtered indicators
  const filteredIndikator = indikatorList.filter((item) => {
    const matchKomponen = selectedKomponenId === 'semua' || item.komponenId === selectedKomponenId;
    const matchQuery =
      item.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subKomponen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pernyataan.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchSkor = true;
    if (filterSkor === 'belum') matchSkor = item.skor === 0;
    else if (filterSkor === '1-2') matchSkor = item.skor === 1 || item.skor === 2;
    else if (filterSkor === '3-4') matchSkor = item.skor === 3 || item.skor === 4;

    return matchKomponen && matchQuery && matchSkor;
  });

  const totalItem = indikatorList.length;
  const sudahDinilaiCount = indikatorList.filter((i) => i.skor > 0).length;
  const progressPercent = Math.round((sudahDinilaiCount / totalItem) * 100);

  const getSkorBadge = (skor: number) => {
    switch (skor) {
      case 4:
        return { label: 'Amat Baik (4)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 3:
        return { label: 'Baik (3)', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 2:
        return { label: 'Cukup (2)', color: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 1:
        return { label: 'Kurang (1)', color: 'bg-rose-100 text-rose-800 border-rose-300' };
      default:
        return { label: 'Belum Dinilai (0)', color: 'bg-gray-100 text-gray-600 border-gray-300' };
    }
  };

  const isEvaluator = currentRole === 'pengawas' || currentRole === 'admin_disdik';

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Rubrik Penilaian Terstandar
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 flex items-center gap-2">
            <ClipboardList className="w-7 h-7 text-emerald-700" />
            Instrumen Penilaian Kinerja Kepala Sekolah
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Permendikbudristek & Panduan Teknis E-PKKS Dinas Pendidikan Kabupaten Garut.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Evaluator Badge Note */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Hak Akses Nilai: <strong className="text-gray-900">{isEvaluator ? 'Aktif (Pengawas)' : 'Hanya Lihat (Kepala Sekolah)'}</strong>
            </span>
          </div>

          {onOpenBersihkanData && (
            <button
              type="button"
              onClick={onOpenBersihkanData}
              className="px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Bersihkan skor instrumen atau reset data"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Bersihkan Data</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <span>Progres Pengisian Butir Instrumen</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {sudahDinilaiCount} dari {totalItem} Butir Terisi
            </span>
          </div>
          <span className="text-sm font-extrabold text-emerald-700">{progressPercent}% Selesai</span>
        </div>
        <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs by Komponen */}
      <div className="flex overflow-x-auto gap-2 pb-2 mb-4 no-scrollbar">
        <button
          onClick={() => setSelectedKomponenId('semua')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-2xs ${
            selectedKomponenId === 'semua'
              ? 'bg-emerald-700 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Semua Komponen ({indikatorList.length})
        </button>
        {komponenList.map((komp) => {
          const totalKomp = indikatorList.filter((i) => i.komponenId === komp.id).length;
          const filledKomp = indikatorList.filter((i) => i.komponenId === komp.id && i.skor > 0).length;
          const isSelected = selectedKomponenId === komp.id;
          return (
            <button
              key={komp.id}
              onClick={() => setSelectedKomponenId(komp.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-2xs flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{komp.id}. {komp.singkatan}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {filledKomp}/{totalKomp}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-3 sm:p-4 mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode butir (misal: 1.1) atau nama indikator..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-gray-200 text-sm focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Filter Skor:</span>
          <select
            value={filterSkor}
            onChange={(e) => setFilterSkor(e.target.value as any)}
            className="text-xs font-semibold px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-emerald-600"
          >
            <option value="semua">Semua Butir</option>
            <option value="belum">Belum Dinilai</option>
            <option value="1-2">Skor 1 - 2 (Perlu Penguatan)</option>
            <option value="3-4">Skor 3 - 4 (Baik/Amat Baik)</option>
          </select>
        </div>
      </div>

      {/* Role notice for Kepala Sekolah */}
      {!isEvaluator && (
        <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-3 text-xs sm:text-sm">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Mode Kepala Sekolah:</strong> Anda sedang meninjau instrumen rubrik penilaian. Penentuan skor akhir dilakukan oleh Pengawas Pembina. Pastikan Anda telah mengunggah semua dokumen bukti fisik yang dipersyaratkan di modul <em>Unggah Bukti Fisik</em>.
          </div>
        </div>
      )}

      {/* Indicator Cards List */}
      <div className="space-y-6">
        {filteredIndikator.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h4 className="font-bold text-gray-800 text-base">Tidak ada butir indikator yang cocok</h4>
            <p className="text-xs text-gray-500 mt-1">Coba sesuaikan kata kunci pencarian atau ubah filter komponen.</p>
          </div>
        ) : (
          filteredIndikator.map((item, idx) => {
            const badge = getSkorBadge(item.skor);
            const komp = komponenList.find((k) => k.id === item.komponenId);
            const uploadedBukti = buktiFisikList.filter((b) => b.indikatorId === item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
              >
                {/* Top header of indicator */}
                <div className="bg-slate-50/80 px-5 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                      {item.kode}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                        {komp?.nama} • {item.subKomponen}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 leading-snug">
                        {item.pernyataan}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-6">
                  {/* Rubric Score Options (1 to 4) */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Rubrik Kriteria Penilaian (Skala 1 - 4):
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {([1, 2, 3, 4] as const).map((scoreVal) => {
                        const isSelected = item.skor === scoreVal;
                        const scoreTitles = {
                          1: 'Skor 1 - Kurang',
                          2: 'Skor 2 - Cukup',
                          3: 'Skor 3 - Baik',
                          4: 'Skor 4 - Amat Baik'
                        };
                        const scoreColors = {
                          1: isSelected ? 'border-rose-500 bg-rose-50/70 text-rose-950 ring-2 ring-rose-400' : 'border-gray-200 hover:border-rose-300',
                          2: isSelected ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-400' : 'border-gray-200 hover:border-amber-300',
                          3: isSelected ? 'border-blue-500 bg-blue-50/70 text-blue-950 ring-2 ring-blue-400' : 'border-gray-200 hover:border-blue-300',
                          4: isSelected ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-500' : 'border-gray-200 hover:border-emerald-400'
                        };

                        return (
                          <div
                            key={scoreVal}
                            onClick={() => {
                              if (isEvaluator) {
                                onUpdateSkor(item.id, scoreVal, item.catatanPengawas);
                              }
                            }}
                            className={`p-3.5 rounded-xl border transition-all text-left flex items-start gap-3 ${scoreColors[scoreVal]} ${
                              isEvaluator ? 'cursor-pointer' : 'cursor-default'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`skor-${item.id}`}
                              checked={isSelected}
                              disabled={!isEvaluator}
                              onChange={() => onUpdateSkor(item.id, scoreVal, item.catatanPengawas)}
                              className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <div className="flex-1">
                              <div className="text-xs font-bold uppercase tracking-wide flex items-center justify-between mb-1">
                                <span>{scoreTitles[scoreVal]}</span>
                                {isSelected && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-700 text-white">
                                    Dipilih
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-700 leading-relaxed font-normal">
                                {item.kriteriaSkor[scoreVal]}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bukti Fisik Required vs Uploaded */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-emerald-700" />
                        Bukti Fisik / Dokumen Penunjang:
                      </div>
                      <button
                        type="button"
                        onClick={() => onGoToBukti(item.id)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Kelola Dokumen ({uploadedBukti.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {item.buktiFisikWajib.map((dok, dIdx) => {
                        // Check if an uploaded document matches or covers this
                        const isUploaded = uploadedBukti.length > 0;
                        return (
                          <div
                            key={dIdx}
                            className="text-xs text-gray-700 flex items-start gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                            <span className="flex-1">{dok}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Catatan / Rekomendasi Pengawas */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Catatan & Rekomendasi Pengawas Pembina:
                    </label>
                    <textarea
                      rows={2}
                      disabled={!isEvaluator}
                      value={item.catatanPengawas || ''}
                      onChange={(e) => onUpdateSkor(item.id, item.skor, e.target.value)}
                      placeholder={
                        isEvaluator
                          ? 'Tuliskan catatan verifikasi bukti atau rekomendasi perbaikan untuk butir ini...'
                          : 'Catatan pengawas akan tampil di sini setelah dilakukan visitasi penilaian.'
                      }
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white disabled:bg-gray-50 text-gray-800"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
