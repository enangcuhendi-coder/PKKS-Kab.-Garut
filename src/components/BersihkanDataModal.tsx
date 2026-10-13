import React, { useState } from 'react';
import { 
  Trash2, 
  RotateCcw, 
  AlertTriangle, 
  Download, 
  CheckCircle2, 
  FileText, 
  ClipboardList, 
  Building2, 
  X,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { ProfilSekolah, IndikatorPKKS, BuktiFisikItem } from '../types/pkks';

export type TipePembersihan = 
  | 'reset_semua_kosong' 
  | 'reset_skor_saja' 
  | 'hapus_bukti_saja' 
  | 'kosongkan_profil_saja' 
  | 'restore_demo_garut';

interface BersihkanDataModalProps {
  profil: ProfilSekolah;
  indikatorList: IndikatorPKKS[];
  buktiList: BuktiFisikItem[];
  onClose: () => void;
  onExecuteClean: (tipe: TipePembersihan) => void;
  onExportBackup: () => void;
}

export const BersihkanDataModal: React.FC<BersihkanDataModalProps> = ({
  profil,
  indikatorList,
  buktiList,
  onClose,
  onExecuteClean,
  onExportBackup,
}) => {
  const [selectedTipe, setSelectedTipe] = useState<TipePembersihan>('reset_skor_saja');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const totalButirTerisi = indikatorList.filter((i) => i.skor > 0).length;
  const totalBukti = buktiList.length;

  const handleConfirm = () => {
    if (!isConfirmed && selectedTipe !== 'restore_demo_garut') return;
    onExecuteClean(selectedTipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full my-6 overflow-hidden flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-150 border border-gray-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-red-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Trash2 className="w-5 h-5 text-rose-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Bersihkan & Reset Data PKKS</h3>
              <p className="text-xs text-rose-200">Pengelolaan siklus penilaian & pengosongan data sekolah</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-gray-700">
          {/* Ringkasan Data Saat Ini */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-gray-200">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Status Data Satuan Pendidikan Saat Ini:</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Sekolah</span>
                <strong className="text-gray-900 font-bold block truncate" title={profil.namaSekolah}>
                  {profil.namaSekolah || 'Belum diisi'}
                </strong>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Skor Terisi</span>
                <strong className="text-emerald-700 font-extrabold text-sm block">
                  {totalButirTerisi} / {indikatorList.length} Butir
                </strong>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Bukti Fisik</span>
                <strong className="text-blue-700 font-extrabold text-sm block">
                  {totalBukti} Berkas
                </strong>
              </div>
            </div>
          </div>

          {/* Backup Reminder Banner */}
          <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Ingin menyimpan salinan sebelum dibersihkan?</span>
            </div>
            <button
              type="button"
              onClick={onExportBackup}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 transition shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Backup (JSON)</span>
            </button>
          </div>

          {/* Pilihan Aksi Pembersihan */}
          <div>
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-2.5">
              Pilih Opsi Pembersihan Data:
            </label>

            <div className="space-y-2.5">
              {/* Opsi 1: Reset Skor Saja */}
              <label 
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                  selectedTipe === 'reset_skor_saja' 
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="tipePembersihan"
                  value="reset_skor_saja"
                  checked={selectedTipe === 'reset_skor_saja'}
                  onChange={() => setSelectedTipe('reset_skor_saja')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-emerald-700" />
                    <span>Kosongkan Nilai Skor Instrumen Saja (Rekomendasi)</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Seluruh nilai skor (1-4) dan catatan pengawas dikembalikan ke 0 (Belum Dinilai). Data profil sekolah dan dokumen bukti fisik tetap tersimpan aman.
                  </p>
                </div>
              </label>

              {/* Opsi 2: Hapus Bukti Fisik Saja */}
              <label 
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                  selectedTipe === 'hapus_bukti_saja' 
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="tipePembersihan"
                  value="hapus_bukti_saja"
                  checked={selectedTipe === 'hapus_bukti_saja'}
                  onChange={() => setSelectedTipe('hapus_bukti_saja')}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span>Hapus Seluruh Bukti Fisik Digital</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Menghapus seluruh {totalBukti} dokumen lampiran di repositori digital. Skor instrumen dan identitas sekolah tidak diubah.
                  </p>
                </div>
              </label>

              {/* Opsi 3: Kosongkan Profil Saja */}
              <label 
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                  selectedTipe === 'kosongkan_profil_saja' 
                    ? 'border-purple-600 bg-purple-50/50 shadow-xs' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="tipePembersihan"
                  value="kosongkan_profil_saja"
                  checked={selectedTipe === 'kosongkan_profil_saja'}
                  onChange={() => setSelectedTipe('kosongkan_profil_saja')}
                  className="mt-1 text-purple-600 focus:ring-purple-500"
                />
                <div className="flex-1">
                  <div className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-700" />
                    <span>Kosongkan Identitas Profil Sekolah</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Mengosongkan form identitas sekolah, data Kepala Sekolah, dan Pengawas Pembina agar siap diisi untuk satuan pendidikan lain.
                  </p>
                </div>
              </label>

              {/* Opsi 4: Bersihkan Semua (Form Kosong Total) */}
              <label 
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                  selectedTipe === 'reset_semua_kosong' 
                    ? 'border-rose-600 bg-rose-50/50 shadow-xs' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="tipePembersihan"
                  value="reset_semua_kosong"
                  checked={selectedTipe === 'reset_semua_kosong'}
                  onChange={() => setSelectedTipe('reset_semua_kosong')}
                  className="mt-1 text-rose-600 focus:ring-rose-500"
                />
                <div className="flex-1">
                  <div className="font-bold text-sm text-rose-900 flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-rose-600" />
                    <span>Bersihkan Semua (Mulai Penilaian Baru dari Nol)</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Mengosongkan seluruh skor, menghapus semua dokumen bukti fisik, dan mengosongkan identitas profil.
                  </p>
                </div>
              </label>

              {/* Opsi 5: Kembalikan Data Contoh / Demo Garut */}
              <label 
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                  selectedTipe === 'restore_demo_garut' 
                    ? 'border-amber-600 bg-amber-50/50 shadow-xs' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="tipePembersihan"
                  value="restore_demo_garut"
                  checked={selectedTipe === 'restore_demo_garut'}
                  onChange={() => setSelectedTipe('restore_demo_garut')}
                  className="mt-1 text-amber-600 focus:ring-amber-500"
                />
                <div className="flex-1">
                  <div className="font-bold text-sm text-amber-950 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-700" />
                    <span>Pulihkan ke Data Standar / Contoh Demo Garut</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    Memuat kembali contoh resmi SMP Negeri 1 Tarogong Kidul lengkap dengan skor terisi dan dokumen bukti fisik pramuat.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Konfirmasi Checkbox jika opsi destruktif */}
          {selectedTipe !== 'restore_demo_garut' && (
            <div className="pt-2">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 h-4 w-4"
                />
                <span className="text-xs font-semibold text-gray-800">
                  Saya memahami tindakan pembersihan ini dan ingin memprosesnya sekarang.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Footer Modal Action */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={!isConfirmed && selectedTipe !== 'restore_demo_garut'}
            onClick={handleConfirm}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer ${
              !isConfirmed && selectedTipe !== 'restore_demo_garut'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : selectedTipe === 'restore_demo_garut'
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-rose-700 hover:bg-rose-800 text-white'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>
              {selectedTipe === 'restore_demo_garut' 
                ? 'Pulihkan Data Standar' 
                : 'Eksekusi Bersihkan Data'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
