/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ProfilSekolah, 
  Role, 
  IndikatorPKKS, 
  BuktiFisikItem, 
  StatusBukti 
} from './types/pkks';
import { 
  DEFAULT_PROFIL_SEKOLAH, 
  KOMPONEN_LIST, 
  DEFAULT_INDIKATOR_LIST, 
  DEFAULT_BUKTI_FISIK_LIST 
} from './data/defaultData';
import { hitungHasilPenilaian } from './utils/calculator';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DashboardCards } from './components/DashboardCards';
import { ProfilSekolahView } from './components/ProfilSekolahView';
import { InstrumenPenilaianView } from './components/InstrumenPenilaianView';
import { UnggahBuktiFisikView } from './components/UnggahBuktiFisikView';
import { HasilRekapitulasiView } from './components/HasilRekapitulasiView';
import { BeritaAcaraPrintModal } from './components/BeritaAcaraPrintModal';
import { PanduanModal } from './components/PanduanModal';
import { BersihkanDataModal, TipePembersihan } from './components/BersihkanDataModal';
import { Footer } from './components/Footer';
import { 
  ShieldCheck, 
  School, 
  Award, 
  CheckCircle2, 
  FileText, 
  Info, 
  Sparkles,
  ArrowRight,
  BookOpen,
  Trash2
} from 'lucide-react';

const STORAGE_KEY_PROFIL = 'epkks_garut_profil_v1';
const STORAGE_KEY_INDIKATOR = 'epkks_garut_indikator_v1';
const STORAGE_KEY_BUKTI = 'epkks_garut_bukti_v1';
const STORAGE_KEY_ROLE = 'epkks_garut_role_v1';

const EMPTY_PROFIL_SEKOLAH: ProfilSekolah = {
  namaSekolah: '',
  npsn: '',
  nss: '',
  jenjang: 'SMP',
  statusSekolah: 'Negeri',
  kecamatan: 'Garut Kota',
  alamat: '',
  akreditasi: 'Belum Terakreditasi',
  email: '',
  telepon: '',
  namaKepalaSekolah: '',
  nipKepalaSekolah: '',
  nuptkKepalaSekolah: '',
  pangkatGolonganKepalaSekolah: '',
  pendidikanTerakhirKepalaSekolah: '',
  tmtKepalaSekolah: '',
  periodePenilaian: `Tahun ${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
  tanggalPenilaian: new Date().toISOString().split('T')[0],
  namaPengawas: '',
  nipPengawas: '',
  pangkatGolonganPengawas: '',
};

export default function App() {
  // Tab navigation
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // User role ('pengawas' | 'kepala_sekolah' | 'admin_disdik')
  const [currentRole, setCurrentRole] = useState<Role>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ROLE);
    return (saved as Role) || 'pengawas';
  });

  // State data
  const [profil, setProfil] = useState<ProfilSekolah>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFIL);
      return saved ? JSON.parse(saved) : DEFAULT_PROFIL_SEKOLAH;
    } catch {
      return DEFAULT_PROFIL_SEKOLAH;
    }
  });

  const [indikatorList, setIndikatorList] = useState<IndikatorPKKS[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INDIKATOR);
      return saved ? JSON.parse(saved) : DEFAULT_INDIKATOR_LIST;
    } catch {
      return DEFAULT_INDIKATOR_LIST;
    }
  });

  const [buktiFisikList, setBuktiFisikList] = useState<BuktiFisikItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BUKTI);
      return saved ? JSON.parse(saved) : DEFAULT_BUKTI_FISIK_LIST;
    } catch {
      return DEFAULT_BUKTI_FISIK_LIST;
    }
  });

  // Modals & Navigation helpers
  const [isPanduanOpen, setIsPanduanOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isBersihkanDataOpen, setIsBersihkanDataOpen] = useState(false);
  const [selectedIndikatorFilter, setSelectedIndikatorFilter] = useState<string>('semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFIL, JSON.stringify(profil));
  }, [profil]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INDIKATOR, JSON.stringify(indikatorList));
  }, [indikatorList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BUKTI, JSON.stringify(buktiFisikList));
  }, [buktiFisikList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROLE, currentRole);
  }, [currentRole]);

  // Calculated summary
  const hasilSummary = hitungHasilPenilaian(indikatorList, KOMPONEN_LIST);
  const totalIndikator = indikatorList.length;
  const indikatorDinilai = indikatorList.filter((i) => i.skor > 0).length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handlers
  const handleUpdateSkor = (id: string, skor: number, catatan?: string) => {
    setIndikatorList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, skor, catatanPengawas: catatan !== undefined ? catatan : item.catatanPengawas } : item
      )
    );
  };

  const handleSaveProfil = (updated: ProfilSekolah) => {
    setProfil(updated);
    showToast('Profil sekolah dan tim penilai berhasil disimpan.');
  };

  const handleTambahBukti = (baru: Omit<BuktiFisikItem, 'id'>) => {
    const newItem: BuktiFisikItem = {
      ...baru,
      id: `bf-${Date.now()}`,
    };
    setBuktiFisikList((prev) => [newItem, ...prev]);
    showToast('Dokumen bukti fisik berhasil diunggah.');
  };

  const handleHapusBukti = (id: string) => {
    setBuktiFisikList((prev) => prev.filter((item) => item.id !== id));
    showToast('Dokumen bukti fisik telah dihapus.');
  };

  const handleVerifikasiBukti = (id: string, status: StatusBukti, catatan: string) => {
    setBuktiFisikList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, statusVerifikasi: status, catatanVerifikator: catatan } : item
      )
    );
    showToast('Status verifikasi dokumen diperbarui.');
  };

  const handleUpdateCatatanHasil = (catatan: string, rekomendasi: string) => {
    // We can save in localStorage or memory
    showToast('Catatan & rekomendasi pengawas tersimpan.');
  };

  const handleGoToBuktiFromIndikator = (indikatorId: string) => {
    setSelectedIndikatorFilter(indikatorId);
    setActiveTab('bukti');
  };

  const handleExecuteClean = (tipe: TipePembersihan) => {
    switch (tipe) {
      case 'reset_skor_saja':
        setIndikatorList((prev) =>
          prev.map((item) => ({ ...item, skor: 0, catatanPengawas: '' }))
        );
        showToast('Seluruh nilai skor instrumen dikosongkan (0 / Belum Dinilai).');
        break;
      case 'hapus_bukti_saja':
        setBuktiFisikList([]);
        showToast('Seluruh berkas bukti fisik digital berhasil dihapus.');
        break;
      case 'kosongkan_profil_saja':
        setProfil(EMPTY_PROFIL_SEKOLAH);
        showToast('Identitas profil sekolah berhasil dikosongkan untuk input sekolah baru.');
        break;
      case 'reset_semua_kosong':
        setProfil(EMPTY_PROFIL_SEKOLAH);
        setIndikatorList((prev) =>
          prev.map((item) => ({ ...item, skor: 0, catatanPengawas: '' }))
        );
        setBuktiFisikList([]);
        showToast('Semua data berhasil dibersihkan. Sistem siap untuk penilaian baru dari nol.');
        break;
      case 'restore_demo_garut':
        setProfil(DEFAULT_PROFIL_SEKOLAH);
        setIndikatorList(DEFAULT_INDIKATOR_LIST);
        setBuktiFisikList(DEFAULT_BUKTI_FISIK_LIST);
        showToast('Data standar contoh SMPN 1 Tarogong Kidul berhasil dipulihkan.');
        break;
    }
  };

  const handleExportJSON = () => {
    const exportData = {
      profil,
      indikatorList,
      buktiFisikList,
      hasilSummary,
      exportedAt: new Date().toISOString(),
      appName: 'E-PKKS Kabupaten Garut',
    };
    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PKKS_${profil.namaSekolah.replace(/\s+/g, '_')}_${profil.periodePenilaian.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Data PKKS berhasil diekspor ke file JSON.');
  };

  const handleImportJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profil) setProfil(parsed.profil);
      if (Array.isArray(parsed.indikatorList)) setIndikatorList(parsed.indikatorList);
      if (Array.isArray(parsed.buktiFisikList)) setBuktiFisikList(parsed.buktiFisikList);
      showToast('Data cadangan PKKS berhasil diimpor!');
    } catch {
      alert('Format file JSON tidak valid. Pastikan file berasal dari ekspor E-PKKS.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 no-print border border-gray-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenPanduan={() => setIsPanduanOpen(true)}
        onOpenBersihkanData={() => setIsBersihkanDataOpen(true)}
      />

      {/* View Switcher */}
      <div className="flex-1">
        {activeTab === 'beranda' && (
          <div>
            {/* Hero Section */}
            <Hero
              profil={profil}
              hasilSummary={hasilSummary}
              totalIndikator={totalIndikator}
              indikatorDinilai={indikatorDinilai}
              totalBukti={buktiFisikList.length}
              onMulaiPenilaian={() => setActiveTab('instrumen')}
              onUploadBukti={() => setActiveTab('bukti')}
              onLihatHasil={() => setActiveTab('hasil')}
            />

            {/* Menu Utama (Dashboard 4 Cards) */}
            <DashboardCards
              profil={profil}
              hasilSummary={hasilSummary}
              totalIndikator={totalIndikator}
              indikatorDinilai={indikatorDinilai}
              totalBukti={buktiFisikList.length}
              onOpenProfil={() => setActiveTab('profil')}
              onOpenInstrumen={() => setActiveTab('instrumen')}
              onOpenBukti={() => {
                setSelectedIndikatorFilter('semua');
                setActiveTab('bukti');
              }}
              onOpenHasil={() => setActiveTab('hasil')}
            />

            {/* Beranda: Informasi Tambahan & Quick Overview */}
            <section className="container mx-auto px-4 py-12 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ringkasan Status Evaluasi */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-700" />
                        Ringkasan Evaluasi Kinerja Satuan Pendidikan
                      </h3>
                      <p className="text-xs text-gray-500">
                        {profil.namaSekolah} • Kec. {profil.kecamatan}, Kab. Garut
                      </p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {hasilSummary.predikat} ({hasilSummary.predikatHuruf})
                    </span>
                  </div>

                  <div className="space-y-4">
                    {KOMPONEN_LIST.map((komp) => {
                      const detail = hasilSummary.skorPerolehanKomponen[komp.id] || {
                        totalSkor: 0,
                        maksSkor: 0,
                        persentase: 0,
                        nilaiTerbobot: 0,
                      };
                      return (
                        <div key={komp.id}>
                          <div className="flex justify-between items-center text-xs font-bold mb-1">
                            <span className="text-gray-800">
                              {komp.id}. {komp.nama} (Bobot {komp.bobotPersen}%)
                            </span>
                            <span className="text-emerald-800 font-mono">
                              {detail.persentase}% • Terbobot: {detail.nilaiTerbobot}
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, detail.persentase)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-gray-500">
                      Pengawas Pembina: <strong>{profil.namaPengawas}</strong>
                    </div>
                    <button
                      onClick={() => setActiveTab('hasil')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Lihat Rincian Rekap & Berita Acara</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Kolom Informasi Kebijakan Garut */}
                <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-800/60 border border-emerald-400/30 text-emerald-200 text-[11px] font-bold mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Standar PKKS Garut 2026</span>
                    </div>

                    <h4 className="text-base font-extrabold text-white mb-2 leading-snug">
                      Mewujudkan Kepemimpinan Sekolah yang Mandiri & Berakhlak
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4">
                      Sesuai arahan Dinas Pendidikan Kabupaten Garut, penilaian kinerja kepala sekolah menitikberatkan pada penguatan literasi-numerasi Rapor Pendidikan, pencegahan kekerasan (TPPK), serta kemandirian kewirausahaan berbasis potensi lokal Garut.
                    </p>

                    <div className="space-y-2 text-xs text-emerald-200 border-t border-emerald-800/60 pt-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Sinergi ARKAS & SPJ Akuntabel</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Komunitas Belajar (Kombel) PMM Aktif</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Supervisi Akademik Berdiferensiasi</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setIsPanduanOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-bold text-xs transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Buka Juknis & Panduan PKKS</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'profil' && (
          <ProfilSekolahView
            profil={profil}
            onSave={handleSaveProfil}
            onKembali={() => setActiveTab('beranda')}
          />
        )}

        {activeTab === 'instrumen' && (
          <InstrumenPenilaianView
            indikatorList={indikatorList}
            komponenList={KOMPONEN_LIST}
            buktiFisikList={buktiFisikList}
            currentRole={currentRole}
            onUpdateSkor={handleUpdateSkor}
            onGoToBukti={handleGoToBuktiFromIndikator}
            onOpenBersihkanData={() => setIsBersihkanDataOpen(true)}
          />
        )}

        {activeTab === 'bukti' && (
          <UnggahBuktiFisikView
            buktiList={buktiFisikList}
            indikatorList={indikatorList}
            currentRole={currentRole}
            selectedIndikatorIdFilter={selectedIndikatorFilter}
            onTambahBukti={handleTambahBukti}
            onHapusBukti={handleHapusBukti}
            onVerifikasiBukti={handleVerifikasiBukti}
            onOpenBersihkanData={() => setIsBersihkanDataOpen(true)}
          />
        )}

        {activeTab === 'hasil' && (
          <HasilRekapitulasiView
            profil={profil}
            komponenList={KOMPONEN_LIST}
            indikatorList={indikatorList}
            hasilSummary={hasilSummary}
            currentRole={currentRole}
            onUpdateCatatan={handleUpdateCatatanHasil}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
            onExportJSON={handleExportJSON}
            onImportJSON={handleImportJSON}
            onOpenBersihkanData={() => setIsBersihkanDataOpen(true)}
          />
        )}
      </div>

      {/* Bersihkan & Reset Data Modal */}
      {isBersihkanDataOpen && (
        <BersihkanDataModal
          profil={profil}
          indikatorList={indikatorList}
          buktiList={buktiFisikList}
          onClose={() => setIsBersihkanDataOpen(false)}
          onExecuteClean={handleExecuteClean}
          onExportBackup={handleExportJSON}
        />
      )}

      {/* Official Berita Acara Print Modal */}
      {isPrintModalOpen && (
        <BeritaAcaraPrintModal
          profil={profil}
          komponenList={KOMPONEN_LIST}
          indikatorList={indikatorList}
          hasilSummary={hasilSummary}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}

      {/* Panduan Modal */}
      {isPanduanOpen && (
        <PanduanModal onClose={() => setIsPanduanOpen(false)} />
      )}

      {/* Footer */}
      <Footer
        onOpenPanduan={() => setIsPanduanOpen(true)}
        onSelectTab={setActiveTab}
      />
    </div>
  );
}
