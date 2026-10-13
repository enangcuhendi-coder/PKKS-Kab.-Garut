import React, { useState } from 'react';
import { BuktiFisikItem, IndikatorPKKS, Role, StatusBukti } from '../types/pkks';
import { 
  CloudUpload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Search, 
  Plus, 
  Trash2, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  FileCheck2,
  FolderOpen
} from 'lucide-react';

interface UnggahBuktiFisikViewProps {
  buktiList: BuktiFisikItem[];
  indikatorList: IndikatorPKKS[];
  currentRole: Role;
  selectedIndikatorIdFilter?: string;
  onTambahBukti: (baru: Omit<BuktiFisikItem, 'id'>) => void;
  onHapusBukti: (id: string) => void;
  onVerifikasiBukti: (id: string, status: StatusBukti, catatan: string) => void;
  onOpenBersihkanData?: () => void;
}

export const UnggahBuktiFisikView: React.FC<UnggahBuktiFisikViewProps> = ({
  buktiList,
  indikatorList,
  currentRole,
  selectedIndikatorIdFilter,
  onTambahBukti,
  onHapusBukti,
  onVerifikasiBukti,
  onOpenBersihkanData,
}) => {
  const [filterIndikator, setFilterIndikator] = useState<string>(selectedIndikatorIdFilter || 'semua');
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewItem, setPreviewItem] = useState<BuktiFisikItem | null>(null);
  const [verifyItem, setVerifyItem] = useState<BuktiFisikItem | null>(null);

  // Form states for new upload
  const [newIndikatorId, setNewIndikatorId] = useState(indikatorList[0]?.id || 'M-01');
  const [newNamaDokumen, setNewNamaDokumen] = useState('');
  const [newKategori, setNewKategori] = useState('Perencanaan');
  const [newKeterangan, setNewKeterangan] = useState('');
  const [simulatedFileName, setSimulatedFileName] = useState('');

  // Form states for verification
  const [verifyStatus, setVerifyStatus] = useState<StatusBukti>('lengkap');
  const [verifyCatatan, setVerifyCatatan] = useState('');

  const isPengawas = currentRole === 'pengawas' || currentRole === 'admin_disdik';

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSimulatedFileName(file.name);
      if (!newNamaDokumen) {
        setNewNamaDokumen(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSimpanUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNamaDokumen) return;

    onTambahBukti({
      indikatorId: newIndikatorId,
      namaDokumen: newNamaDokumen.endsWith('.pdf') ? newNamaDokumen : `${newNamaDokumen}.pdf`,
      kategori: newKategori,
      tanggalUnggah: new Date().toISOString().split('T')[0],
      ukuranFile: '2.4 MB',
      fileType: 'pdf',
      fileUrl: `https://storage.garutkab.go.id/disdik/pkks/${encodeURIComponent(newNamaDokumen)}.pdf`,
      keterangan: newKeterangan || 'Dokumen bukti fisik digital satuan pendidikan',
      statusVerifikasi: isPengawas ? 'lengkap' : 'belum_lengkap',
      catatanVerifikator: isPengawas ? 'Telah diverifikasi langsung oleh Pengawas.' : undefined,
    });

    // Reset & close
    setNewNamaDokumen('');
    setNewKeterangan('');
    setSimulatedFileName('');
    setShowUploadModal(false);
  };

  const handleSimpanVerifikasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyItem) {
      onVerifikasiBukti(verifyItem.id, verifyStatus, verifyCatatan);
      setVerifyItem(null);
    }
  };

  const filteredBukti = buktiList.filter((item) => {
    const matchInd = filterIndikator === 'semua' || item.indikatorId === filterIndikator;
    const matchStat = filterStatus === 'semua' || item.statusVerifikasi === filterStatus;
    const matchQuery =
      item.namaDokumen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.keterangan && item.keterangan.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchInd && matchStat && matchQuery;
  });

  const getStatusBadge = (status: StatusBukti) => {
    switch (status) {
      case 'lengkap':
        return {
          icon: CheckCircle,
          label: 'Terverifikasi Valid',
          classes: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        };
      case 'perlu_revisi':
        return {
          icon: AlertTriangle,
          label: 'Perlu Revisi',
          classes: 'bg-amber-100 text-amber-800 border-amber-300',
        };
      default:
        return {
          icon: Clock,
          label: 'Menunggu Verifikasi',
          classes: 'bg-slate-100 text-slate-700 border-slate-300',
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            Repositori Dokumen Digital
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 flex items-center gap-2">
            <CloudUpload className="w-7 h-7 text-amber-600" />
            Unggah & Verifikasi Bukti Fisik PKKS
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Pengarsipan dokumen SK, program kerja, laporan kegiatan, dan foto portofolio Kabupaten Garut.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenBersihkanData && (
            <button
              type="button"
              onClick={onOpenBersihkanData}
              className="border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3.5 py-2.5 rounded-xl shadow-2xs transition flex items-center gap-1.5 text-xs cursor-pointer"
              title="Bersihkan seluruh berkas bukti fisik"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>Bersihkan Berkas</span>
            </button>
          )}

          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Unggah Berkas Baru</span>
          </button>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase">Total Dokumen</div>
            <div className="text-2xl font-black text-gray-900">{buktiList.length} Berkas</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase">Terverifikasi Valid</div>
            <div className="text-2xl font-black text-emerald-700">
              {buktiList.filter((b) => b.statusVerifikasi === 'lengkap').length} Berkas
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase">Perlu Perbaikan / Antrean</div>
            <div className="text-2xl font-black text-amber-700">
              {buktiList.filter((b) => b.statusVerifikasi !== 'lengkap').length} Berkas
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama dokumen atau kategori..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-emerald-600"
          />
        </div>

        <div>
          <select
            value={filterIndikator}
            onChange={(e) => setFilterIndikator(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm bg-white font-medium text-gray-700 focus:outline-emerald-600"
          >
            <option value="semua">Semua Butir Indikator</option>
            {indikatorList.map((ind) => (
              <option key={ind.id} value={ind.id}>
                {ind.kode} - {ind.subKomponen}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm bg-white font-medium text-gray-700 focus:outline-emerald-600"
          >
            <option value="semua">Semua Status Verifikasi</option>
            <option value="lengkap">Terverifikasi Valid</option>
            <option value="perlu_revisi">Perlu Revisi</option>
            <option value="belum_lengkap">Menunggu Verifikasi</option>
          </select>
        </div>
      </div>

      {/* Table of Evidence */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-gray-600 text-xs uppercase font-bold border-b border-gray-200">
              <tr>
                <th className="px-5 py-3.5">Dokumen & Kategori</th>
                <th className="px-4 py-3.5">Butir Indikator</th>
                <th className="px-4 py-3.5">Tgl Unggah</th>
                <th className="px-4 py-3.5">Status Verifikasi</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBukti.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="font-semibold">Belum ada bukti fisik yang sesuai kriteria.</p>
                    <p className="text-xs text-gray-400 mt-1">Klik tombol &quot;Unggah Berkas Baru&quot; untuk menambahkan dokumen.</p>
                  </td>
                </tr>
              ) : (
                filteredBukti.map((item) => {
                  const targetInd = indikatorList.find((i) => i.id === item.indikatorId);
                  const statusInfo = getStatusBadge(item.statusVerifikasi);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-red-50 text-red-600 shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block leading-tight hover:text-emerald-700 cursor-pointer" onClick={() => setPreviewItem(item)}>
                              {item.namaDokumen}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                {item.kategori}
                              </span>
                              {item.ukuranFile && (
                                <span className="text-[11px] text-gray-400 font-mono">
                                  {item.ukuranFile}
                                </span>
                              )}
                            </div>
                            {item.keterangan && (
                              <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic">
                                &quot;{item.keterangan}&quot;
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {targetInd ? (
                          <div>
                            <span className="font-extrabold text-emerald-800 text-xs px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                              {targetInd.kode}
                            </span>
                            <span className="block text-xs text-gray-600 mt-1 font-medium line-clamp-1">
                              {targetInd.subKomponen}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                        {item.tanggalUnggah}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusInfo.classes}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{statusInfo.label}</span>
                        </span>
                        {item.catatanVerifikator && (
                          <div className="text-[11px] text-gray-500 mt-1 max-w-[200px] truncate" title={item.catatanVerifikator}>
                            Catatan: {item.catatanVerifikator}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewItem(item)}
                            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Lihat Pratinjau Dokumen"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {isPengawas && (
                            <button
                              type="button"
                              onClick={() => {
                                setVerifyItem(item);
                                setVerifyStatus(item.statusVerifikasi);
                                setVerifyCatatan(item.catatanVerifikator || '');
                              }}
                              className="p-1.5 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition"
                              title="Verifikasi Dokumen (Pengawas)"
                            >
                              <ShieldCheck className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onHapusBukti(item.id)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Hapus Dokumen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: UNGGAH BUKTI BARU */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
                <CloudUpload className="w-5 h-5 text-emerald-700" />
                Unggah Bukti Fisik Digital
              </h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimpanUpload} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Pilih Butir Indikator PKKS <span className="text-red-500">*</span>
                </label>
                <select
                  value={newIndikatorId}
                  onChange={(e) => setNewIndikatorId(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-gray-300 bg-white font-medium"
                >
                  {indikatorList.map((ind) => (
                    <option key={ind.id} value={ind.id}>
                      {ind.kode} - {ind.subKomponen}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Nama Dokumen / Berkas <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newNamaDokumen}
                  onChange={(e) => setNewNamaDokumen(e.target.value)}
                  placeholder="Contoh: SK_Pembagian_Tugas_Guru_2025_2026.pdf"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Kategori Dokumen
                </label>
                <select
                  value={newKategori}
                  onChange={(e) => setNewKategori(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-gray-300 bg-white font-medium"
                >
                  <option value="Perencanaan">Perencanaan (RKJM/RKT/RKAS)</option>
                  <option value="Kurikulum">Kurikulum & Pembelajaran (KOSP/Modul Ajar)</option>
                  <option value="Kesiswaan">Kesiswaan & Prestasi</option>
                  <option value="Sarpras">Sarana dan Prasarana</option>
                  <option value="Keuangan">Keuangan BOS & ARKAS</option>
                  <option value="Kewirausahaan">Pengembangan Kewirausahaan</option>
                  <option value="Supervisi">Supervisi Guru dan Tendik</option>
                  <option value="PKB">Pengembangan Keprofesian (PKB)</option>
                </select>
              </div>

              {/* Upload file selector simulation */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Pilih File (PDF, DOCX, JPG - Maks 10MB)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-slate-50 transition cursor-pointer">
                  <input
                    type="file"
                    id="fileUploadInput"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label htmlFor="fileUploadInput" className="cursor-pointer block">
                    <CloudUpload className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-emerald-700 block">
                      {simulatedFileName ? `File Terpilih: ${simulatedFileName}` : 'Klik untuk memilih berkas dari komputer'}
                    </span>
                    <span className="text-[11px] text-gray-400">Format yang didukung: .pdf, .docx, .png, .jpg</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Keterangan Singkat
                </label>
                <input
                  type="text"
                  value={newKeterangan}
                  onChange={(e) => setNewKeterangan(e.target.value)}
                  placeholder="Catatan keabsahan atau nomor surat pengesahan..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-gray-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md"
                >
                  Simpan & Unggah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VERIFIKASI PENGAWAS */}
      {verifyItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                Verifikasi Dokumen Bukti Fisik
              </h3>
              <button
                type="button"
                onClick={() => setVerifyItem(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimpanVerifikasi} className="mt-4 space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-gray-200">
                <div className="text-xs font-bold text-gray-800 truncate">{verifyItem.namaDokumen}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">Kategori: {verifyItem.kategori}</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Keputusan Verifikasi
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50 cursor-pointer">
                    <input
                      type="radio"
                      name="verifyStatus"
                      value="lengkap"
                      checked={verifyStatus === 'lengkap'}
                      onChange={() => setVerifyStatus('lengkap')}
                      className="text-emerald-600"
                    />
                    <span className="text-xs font-bold text-emerald-900">Terverifikasi Valid & Lengkap</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-amber-200 bg-amber-50/50 cursor-pointer">
                    <input
                      type="radio"
                      name="verifyStatus"
                      value="perlu_revisi"
                      checked={verifyStatus === 'perlu_revisi'}
                      onChange={() => setVerifyStatus('perlu_revisi')}
                      className="text-amber-600"
                    />
                    <span className="text-xs font-bold text-amber-900">Perlu Revisi / Tambahan Bukti</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <input
                      type="radio"
                      name="verifyStatus"
                      value="belum_lengkap"
                      checked={verifyStatus === 'belum_lengkap'}
                      onChange={() => setVerifyStatus('belum_lengkap')}
                      className="text-slate-600"
                    />
                    <span className="text-xs font-bold text-slate-800">Menunggu Kelengkapan</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Catatan Pengawas Pembina:
                </label>
                <textarea
                  rows={3}
                  value={verifyCatatan}
                  onChange={(e) => setVerifyCatatan(e.target.value)}
                  placeholder="Berikan umpan balik atau instruksi perbaikan berkas..."
                  className="w-full text-xs p-3 rounded-lg border border-gray-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setVerifyItem(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md"
                >
                  Simpan Verifikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PRATINJAU DOKUMEN DIGITAL */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                <h3 className="font-extrabold text-base text-gray-900 truncate max-w-md">
                  {previewItem.namaDokumen}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Document Preview Simulator Box */}
            <div className="my-5 bg-slate-100 rounded-xl p-8 border border-gray-200 text-center relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Arsip Resmi Disdik Garut
              </div>
              <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg border border-gray-200 text-left">
                <div className="border-b-2 border-emerald-800 pb-2 mb-4 text-center">
                  <h4 className="font-black text-xs uppercase text-emerald-900">
                    PEMERINTAH DAERAH KABUPATEN GARUT
                  </h4>
                  <p className="text-[10px] font-bold text-gray-600">DINAS PENDIDIKAN</p>
                </div>
                <div className="text-center font-bold text-sm text-gray-900 mb-2">
                  DOKUMEN BUKTI FISIK PKKS
                </div>
                <div className="space-y-1.5 text-xs text-gray-700 bg-slate-50 p-3 rounded">
                  <div><strong>Nama File:</strong> {previewItem.namaDokumen}</div>
                  <div><strong>Kategori:</strong> {previewItem.kategori}</div>
                  <div><strong>Status:</strong> {previewItem.statusVerifikasi.toUpperCase()}</div>
                  <div><strong>Tanggal Simpan:</strong> {previewItem.tanggalUnggah}</div>
                </div>
                {previewItem.catatanVerifikator && (
                  <div className="mt-3 p-2.5 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-900">
                    <strong>Catatan Pengawas:</strong> {previewItem.catatanVerifikator}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400 font-mono">ID: {previewItem.id}</span>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="px-5 py-2 rounded-lg bg-gray-900 text-white font-bold text-xs"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
