import React, { useState } from 'react';
import { ProfilSekolah } from '../types/pkks';
import { KECAMATAN_GARUT } from '../data/defaultData';
import { School, User, Shield, Save, CheckCircle, RotateCcw, Building2, MapPin } from 'lucide-react';

interface ProfilSekolahViewProps {
  profil: ProfilSekolah;
  onSave: (updated: ProfilSekolah) => void;
  onKembali: () => void;
}

export const ProfilSekolahView: React.FC<ProfilSekolahViewProps> = ({
  profil,
  onSave,
  onKembali,
}) => {
  const [formData, setFormData] = useState<ProfilSekolah>({ ...profil });
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const loadPresetSD = () => {
    setFormData({
      ...formData,
      namaSekolah: 'SD Negeri 1 Garut Kota',
      npsn: '20208112',
      nss: '101021101001',
      jenjang: 'SD',
      statusSekolah: 'Negeri',
      kecamatan: 'Garut Kota',
      alamat: 'Jl. Ahmad Yani No. 45, Pakuwon, Kec. Garut Kota, Kab. Garut',
      akreditasi: 'A',
      email: 'sdn1garutkota@garutkab.go.id',
      telepon: '(0262) 232111',
      namaKepalaSekolah: 'H. Asep Ridwan, S.Pd., M.M.',
      nipKepalaSekolah: '19710408 199403 1 003',
      nuptkKepalaSekolah: '3245749651200023',
      pangkatGolonganKepalaSekolah: 'Pembina / IV-a',
      pendidikanTerakhirKepalaSekolah: 'S2 Magister Manajemen',
      tmtKepalaSekolah: '12 Januari 2022',
      periodePenilaian: 'Tahun 2025/2026',
      tanggalPenilaian: new Date().toISOString().split('T')[0],
      namaPengawas: 'Dra. Hj. Imas Siti Sarah, M.Pd.',
      nipPengawas: '19661102 199203 2 004',
      pangkatGolonganPengawas: 'Pengawas Sekolah Ahli Madya / IV-b',
    });
  };

  const loadPresetSMP = () => {
    setFormData({
      ...formData,
      namaSekolah: 'SMP Negeri 1 Tarogong Kidul',
      npsn: '20209458',
      nss: '201021102001',
      jenjang: 'SMP',
      statusSekolah: 'Negeri',
      kecamatan: 'Tarogong Kidul',
      alamat: 'Jl. Pembangunan No. 82, Jayawaras, Kec. Tarogong Kidul, Kab. Garut',
      akreditasi: 'A',
      email: 'smpn1tarogongkidul@garutkab.go.id',
      telepon: '(0262) 231456',
      namaKepalaSekolah: 'Drs. H. Maman Suherman, M.Pd.',
      nipKepalaSekolah: '19680512 199303 1 004',
      nuptkKepalaSekolah: '4539746648200012',
      pangkatGolonganKepalaSekolah: 'Pembina Utama Muda / IV-c',
      pendidikanTerakhirKepalaSekolah: 'S2 Manajemen Pendidikan',
      tmtKepalaSekolah: '01 Juli 2021',
      periodePenilaian: 'Tahun 2025/2026',
      tanggalPenilaian: new Date().toISOString().split('T')[0],
      namaPengawas: 'Hj. Neneng Rohayati, M.Pd.',
      nipPengawas: '19670821 199103 2 005',
      pangkatGolonganPengawas: 'Pengawas Sekolah Ahli Madya / IV-b',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Formulir Data Master
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 flex items-center gap-2">
            <School className="w-7 h-7 text-blue-600" />
            Profil Satuan Pendidikan & Tim Penilai
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Data ini akan menjadi dasar identitas pada instrumen, rekapitulasi nilai, serta Berita Acara PKKS Kabupaten Garut.
          </p>
        </div>

        {/* Action presets */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadPresetSMP}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition shadow-2xs"
          >
            Contoh SMP
          </button>
          <button
            type="button"
            onClick={loadPresetSD}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition shadow-2xs"
          >
            Contoh SD
          </button>
        </div>
      </div>

      {showSavedToast && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-sm font-semibold">
            Data profil sekolah, Kepala Sekolah, dan Pengawas Pembina berhasil diperbarui ke sistem!
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BAGIAN 1: IDENTITAS SEKOLAH */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">1. Identitas Satuan Pendidikan</h3>
              <p className="text-xs text-gray-500">Karakteristik sekolah di lingkungan Dinas Pendidikan Kabupaten Garut</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Nama Resmi Sekolah <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaSekolah"
                required
                value={formData.namaSekolah}
                onChange={handleChange}
                placeholder="Contoh: SMP Negeri 1 Tarogong Kidul"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Jenjang Pendidikan
              </label>
              <select
                name="jenjang"
                value={formData.jenjang}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium text-gray-900 bg-white"
              >
                <option value="SD">SD (Sekolah Dasar)</option>
                <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                <option value="PAUD">PAUD / TK</option>
                <option value="PKBM">PKBM / Kesetaraan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                NPSN (Nomor Pokok Sekolah) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="npsn"
                required
                value={formData.npsn}
                onChange={handleChange}
                placeholder="Contoh: 20209458"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                NSS / Nomor Statistik Sekolah
              </label>
              <input
                type="text"
                name="nss"
                value={formData.nss}
                onChange={handleChange}
                placeholder="Contoh: 201021102001"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Status Sekolah
              </label>
              <select
                name="statusSekolah"
                value={formData.statusSekolah}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium text-gray-900 bg-white"
              >
                <option value="Negeri">Negeri</option>
                <option value="Swasta">Swasta</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Kecamatan (Kab. Garut) <span className="text-red-500">*</span>
              </label>
              <select
                name="kecamatan"
                value={formData.kecamatan}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium text-gray-900 bg-white"
              >
                {KECAMATAN_GARUT.map((kec) => (
                  <option key={kec} value={kec}>
                    Kec. {kec}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Status Akreditasi BAN-SM
              </label>
              <select
                name="akreditasi"
                value={formData.akreditasi}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium text-gray-900 bg-white"
              >
                <option value="A">Terakreditasi A (Unggul)</option>
                <option value="B">Terakreditasi B (Baik)</option>
                <option value="C">Terakreditasi C (Cukup)</option>
                <option value="Belum Terakreditasi">Belum Terakreditasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Email Sekolah
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sekolah@garutkab.go.id"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Alamat Lengkap Satuan Pendidikan
              </label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                placeholder="Nama Jalan, Desa/Kelurahan, Kode Pos"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2: DATA KEPALA SEKOLAH */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">2. Data Kepala Sekolah (Yang Dinilai)</h3>
              <p className="text-xs text-gray-500">Identitas kepegawaian dan kepemimpinan sekolah</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Nama Lengkap & Gelar <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaKepalaSekolah"
                required
                value={formData.namaKepalaSekolah}
                onChange={handleChange}
                placeholder="Contoh: Drs. H. Maman Suherman, M.Pd."
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                NIP (Nomor Induk Pegawai) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nipKepalaSekolah"
                required
                value={formData.nipKepalaSekolah}
                onChange={handleChange}
                placeholder="19680512 199303 1 004"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-mono text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                NUPTK
              </label>
              <input
                type="text"
                name="nuptkKepalaSekolah"
                value={formData.nuptkKepalaSekolah}
                onChange={handleChange}
                placeholder="16 digit NUPTK"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-mono text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Pangkat / Golongan Ruang
              </label>
              <input
                type="text"
                name="pangkatGolonganKepalaSekolah"
                value={formData.pangkatGolonganKepalaSekolah}
                onChange={handleChange}
                placeholder="Contoh: Pembina Utama Muda / IV-c"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Pendidikan Terakhir
              </label>
              <input
                type="text"
                name="pendidikanTerakhirKepalaSekolah"
                value={formData.pendidikanTerakhirKepalaSekolah}
                onChange={handleChange}
                placeholder="Contoh: S2 Manajemen Pendidikan"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                TMT sebagai Kepala Sekolah
              </label>
              <input
                type="text"
                name="tmtKepalaSekolah"
                value={formData.tmtKepalaSekolah}
                onChange={handleChange}
                placeholder="Contoh: 01 Juli 2021"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Tahun / Periode Penilaian
              </label>
              <input
                type="text"
                name="periodePenilaian"
                value={formData.periodePenilaian}
                onChange={handleChange}
                placeholder="Contoh: Tahun 2025/2026"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-semibold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Tanggal Pelaksanaan Penilaian
              </label>
              <input
                type="date"
                name="tanggalPenilaian"
                value={formData.tanggalPenilaian}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3: TIM PENILAI / PENGAWAS PEMBINA */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">3. Tim Penilai (Pengawas Pembina Disdik Garut)</h3>
              <p className="text-xs text-gray-500">Aparatur fungsional pengawas yang bertugas memvalidasi dan menilai</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Nama Pengawas Pembina (Penilai 1) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaPengawas"
                required
                value={formData.namaPengawas}
                onChange={handleChange}
                placeholder="Contoh: Hj. Neneng Rohayati, M.Pd."
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                NIP Pengawas Penilai 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nipPengawas"
                required
                value={formData.nipPengawas}
                onChange={handleChange}
                placeholder="19670821 199103 2 005"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-mono text-gray-900"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Pangkat / Jabatan Fungsional Pengawas
              </label>
              <input
                type="text"
                name="pangkatGolonganPengawas"
                value={formData.pangkatGolonganPengawas}
                onChange={handleChange}
                placeholder="Contoh: Pengawas Sekolah Ahli Madya / IV-b"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-gray-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                Nama Pengawas Pendamping / Penilai 2 (Opsional)
              </label>
              <input
                type="text"
                name="namaPengawas2"
                value={formData.namaPengawas2 || ''}
                onChange={handleChange}
                placeholder="Contoh: Drs. Aep Saepudin, M.M.Pd."
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                NIP Penilai 2
              </label>
              <input
                type="text"
                name="nipPengawas2"
                value={formData.nipPengawas2 || ''}
                onChange={handleChange}
                placeholder="19700315 199512 1 002"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-mono text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onKembali}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition text-sm"
          >
            Kembali ke Beranda
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-md hover:shadow-lg transition flex items-center gap-2 text-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
