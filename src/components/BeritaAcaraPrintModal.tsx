import React from 'react';
import { ProfilSekolah, KomponenPKKS, IndikatorPKKS, HasilPenilaianSummary } from '../types/pkks';
import { Printer, X, Download } from 'lucide-react';
import { formatTanggalIndonesia } from '../utils/calculator';
import { LogoGarut } from './LogoGarut';

interface BeritaAcaraPrintModalProps {
  profil: ProfilSekolah;
  komponenList: KomponenPKKS[];
  indikatorList: IndikatorPKKS[];
  hasilSummary: HasilPenilaianSummary;
  onClose: () => void;
}

export const BeritaAcaraPrintModal: React.FC<BeritaAcaraPrintModalProps> = ({
  profil,
  komponenList,
  indikatorList,
  hasilSummary,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const currentYear = new Date().getFullYear();
  const nomorSurat = `421.2 / 0842 - Disdik / ${currentYear}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-6 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm">Pratinjau Cetak Berita Acara PKKS Kabupaten Garut</h3>
              <p className="text-[11px] text-gray-400">Siap dicetak pada kertas A4 standar kedinasan</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Sekarang (PDF / Kertas)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className="p-6 sm:p-12 overflow-y-auto bg-white font-serif text-black leading-relaxed selection:bg-gray-200">
          {/* KOP SURAT DINAS PENDIDIKAN KABUPATEN GARUT */}
          <div className="border-b-[3px] border-black pb-3 mb-6 relative">
            <div className="flex items-center justify-center gap-4 text-center">
              <LogoGarut
                className="h-20 sm:h-24 w-auto object-contain absolute left-2 top-0"
              />
              <div className="flex-1 px-14 sm:px-20 font-sans">
                <h3 className="text-base sm:text-lg font-bold tracking-wider uppercase text-black">
                  PEMERINTAH DAERAH KABUPATEN GARUT
                </h3>
                <h2 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-black mt-0.5">
                  DINAS PENDIDIKAN
                </h2>
                <p className="text-[11px] text-black mt-1 font-medium">
                  Jalan Pembangunan No. 179, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151
                </p>
                <p className="text-[11px] text-black font-medium">
                  Telepon: (0262) 233156 | Pos-el: disdik@garutkab.go.id | Laman: disdik.garutkab.go.id
                </p>
              </div>
            </div>
            {/* Double underline decoration */}
            <div className="border-b border-black mt-1" />
          </div>

          {/* JUDUL BERITA ACARA */}
          <div className="text-center mb-6 font-sans">
            <h3 className="text-base sm:text-lg font-bold uppercase underline tracking-wide">
              BERITA ACARA HASIL PENILAIAN KINERJA KEPALA SEKOLAH (PKKS)
            </h3>
            <p className="text-xs font-semibold text-gray-800 mt-1">
              Nomor: {nomorSurat}
            </p>
          </div>

          {/* NARASI PEMBUKA */}
          <div className="text-xs sm:text-sm text-justify mb-5 font-sans space-y-2">
            <p>
              Pada hari ini, bertempat di <strong>{profil.namaSekolah}</strong>, Kecamatan {profil.kecamatan}, Kabupaten Garut, telah dilaksanakan Verifikasi, Observasi, dan Penilaian Kinerja Kepala Sekolah (PKKS) untuk periode penugasan <strong>{profil.periodePenilaian}</strong> berdasarkan regulasi dan instrumen resmi Dinas Pendidikan Kabupaten Garut.
            </p>
            <p>Penilaian kinerja ini dilaksanakan terhadap:</p>
          </div>

          {/* TABEL IDENTITAS */}
          <div className="mb-6 font-sans text-xs sm:text-sm pl-4">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-48 py-1 font-semibold">Nama Kepala Sekolah</td>
                  <td className="w-4 py-1">:</td>
                  <td className="py-1 font-bold">{profil.namaKepalaSekolah}</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold">NIP / NUPTK</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-mono">{profil.nipKepalaSekolah} / {profil.nuptkKepalaSekolah || '-'}</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold">Pangkat / Golongan Ruang</td>
                  <td className="py-1">:</td>
                  <td className="py-1">{profil.pangkatGolonganKepalaSekolah}</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold">Unit Kerja / Satuan Pendidikan</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-bold">{profil.namaSekolah}</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold">NPSN / NSS</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-mono">{profil.npsn} / {profil.nss || '-'}</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold">Alamat Sekolah</td>
                  <td className="py-1">:</td>
                  <td className="py-1">{profil.alamat}, Kec. {profil.kecamatan}, Kab. Garut</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs sm:text-sm font-sans mb-3">
            <p>Oleh Tim Penilai / Pengawas Pembina Satuan Pendidikan:</p>
          </div>

          <div className="mb-6 font-sans text-xs sm:text-sm pl-4">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-48 py-1 font-semibold">1. Pengawas Pembina 1</td>
                  <td className="w-4 py-1">:</td>
                  <td className="py-1 font-bold">{profil.namaPengawas}</td>
                </tr>
                <tr>
                  <td className="py-1 font-semibold">&nbsp;&nbsp;&nbsp;&nbsp;NIP / Jabatan</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-mono">{profil.nipPengawas} ({profil.pangkatGolonganPengawas})</td>
                </tr>
                {profil.namaPengawas2 && (
                  <>
                    <tr>
                      <td className="w-48 py-1 font-semibold">2. Pengawas Pembina 2</td>
                      <td className="w-4 py-1">:</td>
                      <td className="py-1 font-bold">{profil.namaPengawas2}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">&nbsp;&nbsp;&nbsp;&nbsp;NIP</td>
                      <td className="py-1">:</td>
                      <td className="py-1 font-mono">{profil.nipPengawas2}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* TABEL HASIL PENILAIAN */}
          <div className="mb-6 font-sans">
            <h4 className="text-xs sm:text-sm font-bold uppercase mb-2">
              A. REKAPITULASI CAPAIAN NILAI KINERJA:
            </h4>
            <table className="w-full border-collapse border border-black text-xs sm:text-sm text-center">
              <thead>
                <tr className="bg-gray-100 font-bold border-b border-black">
                  <th className="border border-black p-2 w-10">No</th>
                  <th className="border border-black p-2 text-left">Komponen Penilaian</th>
                  <th className="border border-black p-2 w-16">Bobot</th>
                  <th className="border border-black p-2 w-20">Skor Max</th>
                  <th className="border border-black p-2 w-20">Perolehan</th>
                  <th className="border border-black p-2 w-20">% Capaian</th>
                  <th className="border border-black p-2 w-24">Nilai Terbobot</th>
                </tr>
              </thead>
              <tbody>
                {komponenList.map((k, idx) => {
                  const item = hasilSummary.skorPerolehanKomponen[k.id] || {
                    totalSkor: 0,
                    maksSkor: 0,
                    persentase: 0,
                    nilaiTerbobot: 0,
                  };
                  return (
                    <tr key={k.id} className="border-b border-black">
                      <td className="border border-black p-1.5">{idx + 1}</td>
                      <td className="border border-black p-1.5 text-left font-medium">{k.nama}</td>
                      <td className="border border-black p-1.5">{k.bobotPersen}%</td>
                      <td className="border border-black p-1.5">{item.maksSkor}</td>
                      <td className="border border-black p-1.5 font-bold">{item.totalSkor}</td>
                      <td className="border border-black p-1.5">{item.persentase}%</td>
                      <td className="border border-black p-1.5 font-bold">{item.nilaiTerbobot.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="font-bold bg-gray-50 border-t-2 border-black">
                  <td colSpan={2} className="border border-black p-2 text-right">TOTAL NILAI AKHIR (SKALA 100):</td>
                  <td className="border border-black p-2">100%</td>
                  <td className="border border-black p-2">{indikatorList.length * 4}</td>
                  <td className="border border-black p-2">{indikatorList.reduce((acc, c) => acc + c.skor, 0)}</td>
                  <td className="border border-black p-2">
                    {Math.round((indikatorList.reduce((acc, c) => acc + c.skor, 0) / (indikatorList.length * 4)) * 100)}%
                  </td>
                  <td className="border border-black p-2 text-base font-black">
                    {hasilSummary.skorTotalAkhir.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* KESIMPULAN & PREDIKAT */}
          <div className="mb-6 font-sans text-xs sm:text-sm bg-gray-50 p-4 border border-black rounded-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">PREDIKAT KINERJA :</span>
              <span className="font-black text-sm uppercase px-2 py-0.5 bg-black text-white rounded">
                {hasilSummary.predikat} ({hasilSummary.predikatHuruf})
              </span>
            </div>
            <div>
              <p className="font-bold">Catatan Umum Pengawas:</p>
              <p className="italic">{hasilSummary.catatanUmumPengawas}</p>
            </div>
            <div>
              <p className="font-bold">Rekomendasi Tindak Lanjut:</p>
              <p className="italic">{hasilSummary.rekomendasiTindakLanjut}</p>
            </div>
          </div>

          <div className="text-xs font-sans text-justify mb-8">
            <p>
              Demikian Berita Acara ini dibuat dan ditandatangani dengan sebenarnya oleh pihak-pihak terkait untuk dipergunakan sebagaimana mestinya sebagai bahan evaluasi dan pembinaan karir Kepala Sekolah di lingkungan Pemerintah Daerah Kabupaten Garut.
            </p>
          </div>

          {/* TANDA TANGAN */}
          <div className="font-sans text-xs sm:text-sm mt-8">
            <div className="text-right mb-4">
              Garut, {formatTanggalIndonesia(profil.tanggalPenilaian || new Date().toISOString().split('T')[0])}
            </div>

            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <p className="font-medium">Kepala Sekolah Yang Dinilai,</p>
                <div className="h-20" />
                <p className="font-bold underline">{profil.namaKepalaSekolah}</p>
                <p className="font-mono text-xs">NIP. {profil.nipKepalaSekolah}</p>
              </div>

              <div>
                <p className="font-medium">Pengawas Pembina / Tim Penilai,</p>
                <div className="h-20" />
                <p className="font-bold underline">{profil.namaPengawas}</p>
                <p className="font-mono text-xs">NIP. {profil.nipPengawas}</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="font-medium">Mengetahui,</p>
              <p className="font-bold uppercase">Kepala Dinas Pendidikan Kabupaten Garut</p>
              <div className="h-20" />
              <p className="font-bold underline">H. ADE MANADIN, S.Pd., M.Pd.</p>
              <p className="font-mono text-xs">Pembina Utama Muda, IV/c • NIP. 19690314 199303 1 003</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
