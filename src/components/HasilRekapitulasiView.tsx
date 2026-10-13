import React, { useState } from 'react';
import { ProfilSekolah, KomponenPKKS, IndikatorPKKS, HasilPenilaianSummary, Role } from '../types/pkks';
import { 
  TrendingUp, 
  Printer, 
  Download, 
  Upload, 
  CheckCircle2, 
  Award, 
  FileCheck, 
  AlertCircle,
  FileSpreadsheet,
  Share2,
  Calendar,
  Building,
  UserCheck,
  Trash2
} from 'lucide-react';
import { formatTanggalIndonesia } from '../utils/calculator';

interface HasilRekapitulasiViewProps {
  profil: ProfilSekolah;
  komponenList: KomponenPKKS[];
  indikatorList: IndikatorPKKS[];
  hasilSummary: HasilPenilaianSummary;
  currentRole: Role;
  onUpdateCatatan: (catatan: string, rekomendasi: string) => void;
  onOpenPrintModal: () => void;
  onExportJSON: () => void;
  onImportJSON: (jsonString: string) => void;
  onOpenBersihkanData: () => void;
}

export const HasilRekapitulasiView: React.FC<HasilRekapitulasiViewProps> = ({
  profil,
  komponenList,
  indikatorList,
  hasilSummary,
  currentRole,
  onUpdateCatatan,
  onOpenPrintModal,
  onExportJSON,
  onImportJSON,
  onOpenBersihkanData,
}) => {
  const [catatanUmum, setCatatanUmum] = useState(hasilSummary.catatanUmumPengawas);
  const [rekomendasi, setRekomendasi] = useState(hasilSummary.rekomendasiTindakLanjut);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const isPengawas = currentRole === 'pengawas' || currentRole === 'admin_disdik';

  const handleSaveCatatan = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCatatan(catatanUmum, rekomendasi);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          onImportJSON(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const getPredikatBadgeStyle = (predikatHuruf: string) => {
    switch (predikatHuruf) {
      case 'A':
        return 'bg-emerald-600 text-white shadow-emerald-200';
      case 'B':
        return 'bg-blue-600 text-white shadow-blue-200';
      case 'C':
        return 'bg-amber-600 text-white shadow-amber-200';
      case 'D':
        return 'bg-orange-600 text-white shadow-orange-200';
      default:
        return 'bg-rose-600 text-white shadow-rose-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            Laporan Kinerja & Berita Acara
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-rose-600" />
            Hasil & Rekapitulasi Nilai PKKS
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Penetapan skor akhir, konversi predikat kinerja, dan pencetakan Berita Acara resmi Dinas Pendidikan Kabupaten Garut.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenPrintModal}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 text-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Berita Acara Resmi (A4)</span>
          </button>

          <button
            type="button"
            onClick={onExportJSON}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 text-xs shadow-2xs"
            title="Unduh file data cadangan (JSON)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Data</span>
          </button>

          <label className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 text-xs shadow-2xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Impor Data</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            type="button"
            onClick={onOpenBersihkanData}
            className="border border-rose-200 hover:bg-rose-50 text-rose-700 font-semibold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 text-xs shadow-2xs cursor-pointer"
            title="Bersihkan skor, dokumen atau reset data"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Bersihkan Data</span>
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center relative z-10">
          {/* School & Period details */}
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
              <Building className="w-3.5 h-3.5 text-amber-300" />
              <span>{profil.namaSekolah}</span>
              <span>•</span>
              <span>NPSN: {profil.npsn}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {profil.namaKepalaSekolah}
            </h3>
            <p className="text-sm text-emerald-100 font-medium">
              NIP: {profil.nipKepalaSekolah} • Pangkat: {profil.pangkatGolonganKepalaSekolah}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Periode: <strong>{profil.periodePenilaian}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-300" />
                <span>Pengawas: <strong>{profil.namaPengawas}</strong></span>
              </div>
            </div>
          </div>

          {/* Big Score Display */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center flex flex-col items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">
              Nilai Akhir Kinerja
            </span>
            <div className="text-5xl sm:text-6xl font-black text-amber-300 tracking-tight my-1">
              {hasilSummary.skorTotalAkhir}
            </div>
            <div className="text-xs text-emerald-100 font-semibold mb-3">
              dari skala maksimal 100.00
            </div>

            <div className={`px-5 py-1.5 rounded-full font-black text-sm uppercase tracking-wider shadow-md ${getPredikatBadgeStyle(hasilSummary.predikatHuruf)}`}>
              Predikat: {hasilSummary.predikat} ({hasilSummary.predikatHuruf})
            </div>
          </div>
        </div>
      </div>

      {/* Component Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {komponenList.map((komp) => {
          const detail = hasilSummary.skorPerolehanKomponen[komp.id] || {
            totalSkor: 0,
            maksSkor: 0,
            persentase: 0,
            nilaiTerbobot: 0,
          };

          return (
            <div
              key={komp.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase mb-2">
                  <span>Komponen {komp.id}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono">
                    Bobot {komp.bobotPersen}%
                  </span>
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm mb-2 line-clamp-1">
                  {komp.singkatan}
                </h4>

                <div className="space-y-1 mb-4 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Skor Perolehan:</span>
                    <strong className="font-mono text-gray-900">{detail.totalSkor} / {detail.maksSkor}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Ketercapaian:</span>
                    <strong className="font-mono text-emerald-700">{detail.persentase}%</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-gray-100">
                    <span className="font-bold text-gray-700">Nilai Terbobot:</span>
                    <strong className="font-mono text-sm text-gray-900">{detail.nilaiTerbobot}</strong>
                  </div>
                </div>
              </div>

              {/* Mini progress bar */}
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${Math.min(100, detail.persentase)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Table: Rekapitulasi Rinci */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-5 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
          <h4 className="font-extrabold text-gray-900 text-sm sm:text-base flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
            Tabel Rekapitulasi Nilai Per Komponen
          </h4>
          <span className="text-xs text-gray-500 font-medium">Standar Evaluasi Disdik Kab. Garut</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase font-bold text-xs border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-center w-12">No</th>
                <th className="px-4 py-3">Komponen Penilaian Kinerja</th>
                <th className="px-4 py-3 text-center">Bobot</th>
                <th className="px-4 py-3 text-center">Jml Butir</th>
                <th className="px-4 py-3 text-center">Maks Skor</th>
                <th className="px-4 py-3 text-center">Skor Perolehan</th>
                <th className="px-4 py-3 text-center">% Capaian</th>
                <th className="px-4 py-3 text-right">Nilai Terbobot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {komponenList.map((komp, index) => {
                const detail = hasilSummary.skorPerolehanKomponen[komp.id] || {
                  totalSkor: 0,
                  maksSkor: 0,
                  persentase: 0,
                  nilaiTerbobot: 0,
                };
                const jmlButir = indikatorList.filter((i) => i.komponenId === komp.id).length;

                return (
                  <tr key={komp.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-center font-bold text-gray-500">{index + 1}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-gray-900 block">{komp.nama}</span>
                      <span className="text-xs text-gray-500">{komp.deskripsi}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-emerald-700">
                      {komp.bobotPersen}%
                    </td>
                    <td className="px-4 py-3 text-center font-mono">{jmlButir}</td>
                    <td className="px-4 py-3 text-center font-mono">{detail.maksSkor}</td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-gray-900">
                      {detail.totalSkor}
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-teal-700">
                      {detail.persentase}%
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-extrabold text-gray-900">
                      {detail.nilaiTerbobot.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-100 font-extrabold text-gray-900 border-t-2 border-gray-300">
              <tr>
                <td colSpan={2} className="px-4 py-3 text-right uppercase">
                  Total Nilai Akhir (Skala 100):
                </td>
                <td className="px-4 py-3 text-center font-mono">100%</td>
                <td className="px-4 py-3 text-center font-mono">{indikatorList.length}</td>
                <td className="px-4 py-3 text-center font-mono">{indikatorList.length * 4}</td>
                <td className="px-4 py-3 text-center font-mono">
                  {indikatorList.reduce((acc, c) => acc + c.skor, 0)}
                </td>
                <td className="px-4 py-3 text-center font-mono text-emerald-800">
                  {Math.round(
                    (indikatorList.reduce((acc, c) => acc + c.skor, 0) /
                      (indikatorList.length * 4)) *
                      1000
                  ) / 10}%
                </td>
                <td className="px-4 py-3 text-right font-mono text-base text-emerald-900">
                  {hasilSummary.skorTotalAkhir.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Catatan & Rekomendasi Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-gray-100">
          <h4 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            Catatan Evaluasi & Rekomendasi Pengawas Pembina
          </h4>
          {isSavedNotice && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              ✓ Catatan Berhasil Disimpan
            </span>
          )}
        </div>

        <form onSubmit={handleSaveCatatan} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
              Catatan Umum Hasil Penilaian:
            </label>
            <textarea
              rows={3}
              disabled={!isPengawas}
              value={catatanUmum}
              onChange={(e) => setCatatanUmum(e.target.value)}
              placeholder="Tuliskan catatan umum mengenai kedisiplinan, tata kelola, dan kinerja kepala sekolah..."
              className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
              Rekomendasi Tindak Lanjut Pembinaan:
            </label>
            <textarea
              rows={3}
              disabled={!isPengawas}
              value={rekomendasi}
              onChange={(e) => setRekomendasi(e.target.value)}
              placeholder="Rekomendasi program pelatihan, penguatan manajerial, atau pembiasaan budaya mutu..."
              className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
            />
          </div>

          {isPengawas && (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
              >
                Simpan Catatan & Rekomendasi
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
